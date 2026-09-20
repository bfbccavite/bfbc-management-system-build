import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { setupNeeded } from "@/app/setup/actions"
import { Church } from "lucide-react"

export default async function LoginPage() {
  if (await setupNeeded()) redirect("/setup")

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-sidebar p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Church className="size-7" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              Bethel Fundamental Baptist Church
            </h1>
            <p className="text-sm text-sidebar-foreground/70">Church Management System</p>
          </div>
        </div>
        <LoginForm />
        <p className="text-center text-xs text-sidebar-foreground/50">
          Accounts are provisioned by the church administrator.
        </p>
      </div>
    </main>
  )
}
