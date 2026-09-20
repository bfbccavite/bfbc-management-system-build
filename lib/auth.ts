import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { Profile } from "@/lib/types"
import type { Capability, Role } from "@/lib/roles"
import { can } from "@/lib/roles"

/**
 * Returns the current session profile or null. Reads the authenticated user
 * from Supabase, then loads the matching staff profile row.
 */
export async function getSessionProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, active, created_at, updated_at, last_login_at")
    .eq("id", user.id)
    .single()

  return (data as Profile) ?? null
}

/**
 * Guard for server components/pages. Redirects to login when unauthenticated
 * and to /inactive when the account has been deactivated.
 */
export async function requireProfile(): Promise<Profile> {
  const profile = await getSessionProfile()
  if (!profile) redirect("/auth/login")
  if (!profile.active) redirect("/inactive")
  return profile
}

export async function requireCapability(capability: Capability): Promise<Profile> {
  const profile = await requireProfile()
  if (!can(profile.role, capability)) redirect("/dashboard")
  return profile
}

export async function requireRole(role: Role): Promise<Profile> {
  const profile = await requireProfile()
  if (profile.role !== role) redirect("/dashboard")
  return profile
}
