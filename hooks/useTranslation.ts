"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import { detectBrowserLanguage, getTranslations, type Language, type Translations } from '@/lib/i18n'

// Context for language state
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Hook to use translations in components
 * Automatically detects browser language on first load
 * Persists language preference in localStorage
 */
export function useTranslation() {
  const context = useContext(LanguageContext)
  
  if (context) {
    return context
  }
  
  // Fallback if not using LanguageProvider
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations>(getTranslations('en'))

  useEffect(() => {
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
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setTranslations(getTranslations(lang))
    localStorage.setItem('ilewa-language', lang)
  }

  return {
    language,
    setLanguage,
    t: translations,
  }
}

/**
 * Get a specific translation key
 * Example: tr('nav.home') => "Home" or "Accueil"
 */
export function useTranslationKey(key: string): string {
  const { t, language } = useTranslation()
  const keys = key.split('.')
  let value: any = t
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) {
      console.warn(`Translation key not found: ${key} for language: ${language}`)
      return key
    }
  }
  
  return value
}
