import { redirect } from "next/navigation"
import { setupNeeded } from "./actions"
import { SetupForm } from "./setup-form"
import { ChurchMark } from "@/components/app-shell/church-mark"

export default async function SetupPage() {
  const needed = await setupNeeded()
  if (!needed) redirect("/auth/login")

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <ChurchMark abbreviation="BFBC" className="h-12 w-12 text-sm" />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Create the first administrator</h1>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              This one-time setup creates the Super Admin account for your church records system.
            </p>
          </div>
        </div>
        <SetupForm />
      </div>
    </div>
  )
}
