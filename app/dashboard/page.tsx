import Link from "next/link"
import { requireProfile } from "@/lib/auth"
import { can, roleLabel, ROLE_DESCRIPTIONS } from "@/lib/roles"
import { NAV_SECTIONS } from "@/lib/nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function DashboardPage() {
  const profile = await requireProfile()

  const quickLinks = NAV_SECTIONS.flatMap((s) => s.items).filter(
    (item) => item.href !== "/dashboard" && (!item.capability || can(profile.role, item.capability)),
  )

  const firstName = profile.full_name?.trim().split(/\s+/)[0] || "there"

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Welcome back, {firstName}
          </h1>
          <Badge variant="secondary" className="font-medium">
            {roleLabel(profile.role)}
          </Badge>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {ROLE_DESCRIPTIONS[profile.role]}
        </p>
      </div>

      <section aria-labelledby="quicklinks-heading" className="flex flex-col gap-4">
        <h2 id="quicklinks-heading" className="text-sm font-medium text-muted-foreground">
          Your modules
        </h2>
        {quickLinks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              You don&apos;t have any modules assigned yet. Contact a super admin if this seems
              wrong.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full transition-colors hover:border-primary/40 hover:bg-accent/40">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <CardTitle className="text-base">{item.label}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>Open the {item.label.toLowerCase()} module.</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Getting started</CardTitle>
          <CardDescription>
            This is the foundation of your church records system. Records modules (members,
            attendance, visitation, and reports) become available as they are rolled out.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
