"use server"

import { createAdminClient } from "@/lib/supabase/admin"

export type SetupState = { ok?: boolean; error?: string }

/** True when the system has no staff accounts yet. */
export async function setupNeeded(): Promise<boolean> {
  const admin = createAdminClient()
  const { count, error } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true })
  if (error) return false
  return (count ?? 0) === 0
}

export async function createFirstAdmin(
  _prev: SetupState,
  formData: FormData,
): Promise<SetupState> {
  const admin = createAdminClient()

  // Guard: refuse if any account already exists.
  const { count } = await admin.from("profiles").select("id", { count: "exact", head: true })
  if ((count ?? 0) > 0) {
    return { error: "Setup has already been completed." }
  }

  const full_name = String(formData.get("full_name") ?? "").trim()
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!full_name) return { error: "Full name is required." }
  if (!email) return { error: "Email is required." }
  if (password.length < 8) return { error: "Password must be at least 8 characters." }

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role: "super_admin", active: true },
  })

  if (error) return { error: error.message }

  return { ok: true }
}
