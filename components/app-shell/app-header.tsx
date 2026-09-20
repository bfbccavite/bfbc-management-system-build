"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarNav } from "./sidebar-nav"
import { LogoutButton } from "@/components/auth/logout-button"
import { initials, roleLabel, type Role } from "@/lib/roles"
import { ChurchMark } from "./church-mark"

type HeaderProfile = {
  full_name: string
  email: string
  role: Role
}

export function AppHeader({
  profile,
  churchName,
  abbreviation,
}: {
  profile: HeaderProfile
  churchName: string
  abbreviation: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
            <ChurchMark abbreviation={abbreviation} />
            <span className="text-sm font-semibold text-sidebar-foreground">{churchName}</span>
          </div>
          <SidebarNav role={profile.role} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-sm font-medium">{profile.full_name || "Staff"}</p>
              <p className="text-xs text-muted-foreground">{roleLabel(profile.role)}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span className="truncate">{profile.full_name || "Staff"}</span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {profile.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/dashboard/profile">My Profile</a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="p-1">
            <LogoutButton className="w-full justify-start" />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
