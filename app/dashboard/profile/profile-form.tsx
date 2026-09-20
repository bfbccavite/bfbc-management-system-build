"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { updateOwnProfile, type ProfileState } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save changes"}
    </Button>
  )
}

export function ProfileForm({
  profile,
}: {
  profile: { full_name: string; phone: string | null }
}) {
  const [state, formAction] = useActionState<ProfileState, FormData>(updateOwnProfile, {})

  useEffect(() => {
    if (state.ok) toast.success("Profile updated")
    else if (state.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction}>
      <Card>
        <CardContent className="flex flex-col gap-5 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="full_name">Full name</Label>
            <Input
              id="full_name"
              name="full_name"
              defaultValue={profile.full_name}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" name="phone" type="tel" defaultValue={profile.phone ?? ""} />
          </div>
          <div className="flex justify-end">
            <SaveButton />
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
