import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "BFBC Church Management System",
  description:
    "Membership, attendance, ushering, and visitation management for Bethel Fundamental Baptist Church.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#2b3a55",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
