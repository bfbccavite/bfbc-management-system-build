import type { Role } from "@/lib/roles"

export type Profile = {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: Role
  active: boolean
  created_at: string
  updated_at: string
  last_login_at: string | null
}

export type ChurchSettings = {
  id: number
  church_name: string
  abbreviation: string
  address: string
  logo_url: string | null
  timezone: string
  default_service: string | null
  updated_at: string
  updated_by: string | null
}

export type AuditLog = {
  id: number
  created_at: string
  actor_id: string | null
  actor_name: string | null
  action: string
  entity: string | null
  entity_id: string | null
  summary: string | null
  metadata: Record<string, unknown> | null
}
