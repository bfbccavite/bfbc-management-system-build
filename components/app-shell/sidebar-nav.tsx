"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_SECTIONS } from "@/lib/nav"
import { can, type Role } from "@/lib/roles"
import { cn } from "@/lib/utils"

export function SidebarNav({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6 px-3 py-4" aria-label="Main navigation">
      {NAV_SECTIONS.map((section) => {
        const items = section.items.filter(
          (item) => !item.capability || can(role, item.capability),
        )
        if (items.length === 0) return null

        return (
          <div key={section.heading} className="flex flex-col gap-1">
            <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {section.heading}
            </p>
            {items.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        )
      })}
    </nav>
  )
}
