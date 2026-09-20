"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"

export function LogoutButton({
  variant = "ghost",
  className,
  withIcon = true,
}: {
  variant?: "ghost" | "secondary" | "outline" | "default"
  className?: string
  withIcon?: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <Button variant={variant} className={className} onClick={handleLogout} disabled={loading}>
      {withIcon && (loading ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />)}
      Sign out
    </Button>
  )
}
