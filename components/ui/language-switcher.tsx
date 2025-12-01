"use client"

import { Globe } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/hooks/useTranslation"
import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
  showLabel?: boolean
}

/**
 * Language Switcher Component
 * Allows users to switch between English and French
 */
export function LanguageSwitcher({ 
  variant = "ghost", 
  size = "default",
  showLabel = false 
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useTranslation()

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ModernButton variant={variant} size={size} className="gap-2">
          <Globe className="h-4 w-4" />
          {showLabel && (
            <>
              <span className="hidden sm:inline">{currentLanguage.name}</span>
              <span className="sm:hidden">{currentLanguage.flag}</span>
            </>
          )}
          {!showLabel && <span>{currentLanguage.flag}</span>}
        </ModernButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? "bg-slate-100 font-medium" : ""}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-slate-500">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
