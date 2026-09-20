import { LogoutButton } from "@/components/auth/logout-button"

export default function InactivePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-sidebar p-6 text-center">
      <h1 className="text-xl font-semibold text-sidebar-foreground">Account deactivated</h1>
      <p className="max-w-sm text-sm text-sidebar-foreground/70">
        Your account is currently inactive. Please contact the church administrator to restore access.
      </p>
      <LogoutButton variant="secondary" />
    </main>
  )
}
