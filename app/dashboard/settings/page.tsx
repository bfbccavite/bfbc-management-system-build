import { requireCapability } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import type { ChurchSettings } from "@/lib/types"
import { SettingsForm } from "./settings-form"

export default async function SettingsPage() {
  await requireCapability("manage_settings")
  const supabase = await createClient()
  const { data } = await supabase
    .from("church_settings")
    .select("*")
    .eq("id", 1)
    .single<ChurchSettings>()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Church Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage the church identity used across the system.
        </p>
      </div>
      <SettingsForm settings={data} />
    </div>
  )
}
