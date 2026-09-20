import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-sidebar p-6 text-center">
      <h1 className="text-xl font-semibold text-sidebar-foreground">Authentication error</h1>
      <p className="max-w-sm text-sm text-sidebar-foreground/70">
        We couldn&apos;t complete your sign-in. The link may have expired or already been used.
      </p>
      <Button asChild variant="secondary">
        <Link href="/auth/login">Back to sign in</Link>
      </Button>
    </main>
  )
}
