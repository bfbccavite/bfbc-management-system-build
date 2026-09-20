import { createClient } from "@supabase/supabase-js"

// Service-role client for privileged server-only operations (creating staff
// accounts, confirming emails). NEVER import this into client components.
export function createAdminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
