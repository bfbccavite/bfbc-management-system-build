"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { createFirstAdmin, type SetupState } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating account..." : "Create administrator"}
    </Button>
  )
}

export function SetupForm() {
  const router = useRouter()
  const [state, formAction] = useActionState<SetupState, FormData>(createFirstAdmin, {})

  useEffect(() => {
    if (state.ok) {
      toast.success("Administrator created. You can now sign in.")
      router.replace("/auth/login")
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state, router])

  return (
    <form action={formAction}>
      <Card>
        <CardContent className="flex flex-col gap-5 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" name="full_name" autoComplete="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <p className="text-xs text-muted-foreground">At least 8 characters.</p>
          </div>
          <SubmitButton />
        </CardContent>
      </Card>
    </form>
  )
}
