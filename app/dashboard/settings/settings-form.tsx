"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { updateChurchSettings, type SettingsState } from "./actions"
import type { ChurchSettings } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save changes"}
    </Button>
  )
}

export function SettingsForm({ settings }: { settings: ChurchSettings | null }) {
  const [state, formAction] = useActionState<SettingsState, FormData>(updateChurchSettings, {})

  useEffect(() => {
    if (state.ok) toast.success("Settings saved")
    else if (state.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction}>
      <Card>
        <CardContent className="flex flex-col gap-5 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="church_name">Church name</Label>
            <Input
              id="church_name"
              name="church_name"
              defaultValue={settings?.church_name ?? ""}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="abbreviation">Abbreviation</Label>
              <Input
                id="abbreviation"
                name="abbreviation"
                defaultValue={settings?.abbreviation ?? ""}
                maxLength={8}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                name="timezone"
                defaultValue={settings?.timezone ?? "Asia/Manila"}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              rows={2}
              defaultValue={settings?.address ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="default_service">Default service name (optional)</Label>
            <Input
              id="default_service"
              name="default_service"
              placeholder="e.g. Sunday Morning Worship"
              defaultValue={settings?.default_service ?? ""}
            />
          </div>

          <div className="flex justify-end">
            <SaveButton />
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
