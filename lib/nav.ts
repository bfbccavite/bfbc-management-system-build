import type { Capability } from "@/lib/roles"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  HeartHandshake,
  BarChart3,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** Capability required to see this item. Omitted = visible to all staff. */
  capability?: Capability
}

export type NavSection = {
  heading: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    heading: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    heading: "Records",
    items: [
      { label: "Members", href: "/dashboard/members", icon: Users, capability: "view_members" },
      {
        label: "Attendance",
        href: "/dashboard/attendance",
        icon: ClipboardList,
        capability: "view_attendance",
      },
      {
        label: "Visitation",
        href: "/dashboard/visitation",
        icon: HeartHandshake,
        capability: "view_visitation",
      },
      {
        label: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
        capability: "view_reports",
      },
    ],
  },
  {
    heading: "Administration",
    items: [
      {
        label: "Users",
        href: "/dashboard/users",
        icon: ShieldCheck,
        capability: "manage_users",
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        capability: "manage_settings",
      },
    ],
  },
]
