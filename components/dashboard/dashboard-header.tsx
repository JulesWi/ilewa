"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, Settings, User } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <span className="text-xl font-bold">ILE WA GPT</span>
      </Link>
      <nav className="hidden flex-1 md:flex">
        <ul className="flex flex-1 items-center gap-4 text-sm font-medium">
          <li>
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Tableau de bord
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/projects"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/dashboard/projects" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Mes projets
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/messages"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/dashboard/messages" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Messages
            </Link>
          </li>
          {pathname.includes("/admin") && (
            <li>
              <Link
                href="/admin"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === "/admin" ? "text-foreground" : "text-foreground/60"
                }`}
              >
                Administration
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="flex flex-1 items-center justify-end gap-4 md:flex-initial">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Utilisateur</p>
                <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

