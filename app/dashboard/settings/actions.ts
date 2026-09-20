"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { getSessionProfile } from "@/lib/auth"

export type SettingsState = { ok?: boolean; error?: string }

export async function updateChurchSettings(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const profile = await getSessionProfile()
  if (!profile || profile.role !== "super_admin") {
    return { error: "You are not authorized to change settings." }
  }

  const church_name = String(formData.get("church_name") ?? "").trim()
  const abbreviation = String(formData.get("abbreviation") ?? "").trim()
  const address = String(formData.get("address") ?? "").trim()
  const timezone = String(formData.get("timezone") ?? "").trim()
  const default_service = String(formData.get("default_service") ?? "").trim()

  if (!church_name) return { error: "Church name is required." }
  if (!abbreviation) return { error: "Abbreviation is required." }

  const supabase = await createClient()
  const { error } = await supabase
    .from("church_settings")
    .update({
      church_name,
      abbreviation,
      address,
      timezone: timezone || "Asia/Manila",
      default_service: default_service || null,
      updated_by: profile.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1)

  if (error) return { error: error.message }

  await supabase.rpc("log_audit", {
    p_action: "settings.update",
    p_entity: "church_settings",
    p_entity_id: "1",
    p_summary: `Updated church settings`,
    p_metadata: null,
  })

  revalidatePath("/dashboard/settings")
  revalidatePath("/dashboard")
  return { ok: true }
}
