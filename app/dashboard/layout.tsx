import type { ReactNode } from "react"
import { requireProfile } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { SidebarNav } from "@/components/app-shell/sidebar-nav"
import { AppHeader } from "@/components/app-shell/app-header"
import { ChurchMark } from "@/components/app-shell/church-mark"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const profile = await requireProfile()
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from("church_settings")
    .select("church_name, abbreviation")
    .eq("id", 1)
    .single()

  const churchName = settings?.church_name ?? "Bethel Fundamental Baptist Church"
  const abbreviation = settings?.abbreviation ?? "BFBC"

  return (
    <div className="flex min-h-svh bg-muted/30">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <ChurchMark abbreviation={abbreviation} />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-sidebar-foreground">{abbreviation}</p>
            <p className="text-xs text-sidebar-foreground/60">Church Records</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav role={profile.role} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          profile={{ full_name: profile.full_name, email: profile.email, role: profile.role }}
          churchName={churchName}
          abbreviation={abbreviation}
        />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  )
}
