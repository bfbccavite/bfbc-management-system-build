import { requireProfile } from "@/lib/auth"
import { roleLabel, ROLE_DESCRIPTIONS } from "@/lib/roles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfileForm } from "./profile-form"

export default async function ProfilePage() {
  const profile = await requireProfile()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your personal details. Your role is managed by an administrator.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Account</CardTitle>
          <Badge variant="secondary">{roleLabel(profile.role)}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>{profile.email}</p>
          <p>{ROLE_DESCRIPTIONS[profile.role]}</p>
        </CardContent>
      </Card>

      <ProfileForm profile={{ full_name: profile.full_name, phone: profile.phone }} />
    </div>
  )
}
