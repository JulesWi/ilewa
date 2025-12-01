"use client"

import { ModernButton } from "@/components/ui/modern-button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { BarChart3, Map, Plus, User, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useTranslation } from "@/hooks/useTranslation"

export default function NavigationHeader() {
  const pathname = usePathname()
  const { user, isAuthenticated, signOut } = useAuth()
  const { t } = useTranslation()

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold text-slate-800 hover:text-slate-600 transition-colors">
            ILEWA
          </Link>
          
          <nav className="flex space-x-2">
            <Link href="/dashboard">
              <ModernButton
                variant={isActive("/dashboard") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>{t.nav.dashboard}</span>
              </ModernButton>
            </Link>
            
            <Link href="/map">
              <ModernButton
                variant={isActive("/map") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Map className="h-4 w-4" />
                <span>{t.nav.map}</span>
              </ModernButton>
            </Link>
            
            <Link href="/submit-project">
              <ModernButton
                variant={isActive("/submit-project") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>{t.nav.newProject}</span>
              </ModernButton>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <ModernButton
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{t.nav.signOut}</span>
              </ModernButton>
            </div>
          ) : (
            <Link href="/auth">
              <ModernButton variant="default">
                {t.nav.signIn}
              </ModernButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
