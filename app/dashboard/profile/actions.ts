"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { getSessionProfile } from "@/lib/auth"

export type ProfileState = { ok?: boolean; error?: string }

export async function updateOwnProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const profile = await getSessionProfile()
  if (!profile) return { error: "You are not signed in." }

  const full_name = String(formData.get("full_name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()

  if (!full_name) return { error: "Full name is required." }

  const supabase = await createClient()
  // Note: role/active are protected server-side by a DB trigger, so even
  // though we only send name/phone, tampering elsewhere is also blocked.
  const { error } = await supabase
    .from("profiles")
    .update({ full_name, phone: phone || null })
    .eq("id", profile.id)

  if (error) return { error: error.message }

  revalidatePath("/dashboard/profile")
  revalidatePath("/dashboard")
  return { ok: true }
}
