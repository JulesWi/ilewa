"use client"

import { useState, useEffect, type ReactNode } from 'react'
import { LanguageContext } from '@/hooks/useTranslation'
import { detectBrowserLanguage, getTranslations, type Language, type Translations } from '@/lib/i18n'

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

/**
 * Language Provider Component
 * Wraps the app to provide language context
 * Automatically detects browser language on mount
 */
export function LanguageProvider({ children, defaultLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage || 'en')
  const [translations, setTranslations] = useState<Translations>(getTranslations(defaultLanguage || 'en'))
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Check localStorage first
    const savedLang = localStorage.getItem('ilewa-language') as Language | null
    
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
      setLanguageState(savedLang)
      setTranslations(getTranslations(savedLang))
    } else {
      // Detect browser language
      const detectedLang = detectBrowserLanguage()
      setLanguageState(detectedLang)
      setTranslations(getTranslations(detectedLang))
      localStorage.setItem('ilewa-language', detectedLang)
    }
    
    setIsInitialized(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setTranslations(getTranslations(lang))
    if (typeof window !== 'undefined') {
      localStorage.setItem('ilewa-language', lang)
    }
  }

  // Prevent flash of wrong language
  if (!isInitialized) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  )
}
