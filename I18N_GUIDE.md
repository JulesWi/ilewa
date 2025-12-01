# 🌍 ILEWA i18n System - Internationalization Guide

## ✨ Features

- **Automatic Language Detection** - Detects browser language on first visit
- **Persistent Preference** - Saves language choice in localStorage
- **Easy Switching** - Language switcher component in navigation
- **Type-Safe** - Full TypeScript support
- **Simple API** - Easy to use hook-based system

---

## 🚀 Quick Start

### **1. Use Translations in Components**

```typescript
import { useTranslation } from '@/hooks/useTranslation'

export default function MyComponent() {
  const { t, language, setLanguage } = useTranslation()
  
  return (
    <div>
      <h1>{t.landing.title}</h1>
      <p>{t.landing.description}</p>
      <button onClick={() => setLanguage('fr')}>
        Français
      </button>
    </div>
  )
}
```

### **2. Add Language Switcher**

```typescript
import { LanguageSwitcher } from '@/components/ui/language-switcher'

export default function Header() {
  return (
    <header>
      <nav>
        {/* Your navigation */}
      </nav>
      <LanguageSwitcher />
    </header>
  )
}
```

---

## 📁 File Structure

```
lib/
├── i18n.ts                    # Translation definitions (en, fr)
└── translations.ts            # Legacy (can be removed)

hooks/
└── useTranslation.ts          # Translation hook

components/
├── providers/
│   └── language-provider.tsx  # Language context provider
└── ui/
    └── language-switcher.tsx  # Language selector component
```

---

## 🔧 How It Works

### **1. Language Detection**

When a user visits the site for the first time:

```typescript
// 1. Check localStorage
const savedLang = localStorage.getItem('ilewa-language')

// 2. If not found, detect browser language
const browserLang = navigator.language // e.g., "fr-FR", "en-US"

// 3. Match to supported language
if (browserLang.startsWith('fr')) {
  return 'fr'
} else {
  return 'en' // Default
}

// 4. Save preference
localStorage.setItem('ilewa-language', detectedLang)
```

### **2. Language Provider**

Wraps the entire app to provide language context:

```typescript
// app/layout.tsx
<LanguageProvider>
  {children}
</LanguageProvider>
```

### **3. useTranslation Hook**

Access translations in any component:

```typescript
const { t, language, setLanguage } = useTranslation()

// t = { nav: { home: "Home", ... }, auth: { ... }, ... }
// language = 'en' | 'fr'
// setLanguage = (lang) => void
```

---

## 📝 Adding Translations

### **Add New Translation Keys**

Edit `lib/i18n.ts`:

```typescript
export const en = {
  // ... existing translations
  
  newSection: {
    title: "My Title",
    description: "My description",
  },
}

export const fr = {
  // ... existing translations
  
  newSection: {
    title: "Mon titre",
    description: "Ma description",
  },
}
```

### **Use in Component**

```typescript
const { t } = useTranslation()

<h1>{t.newSection.title}</h1>
<p>{t.newSection.description}</p>
```

---

## 🎨 Language Switcher Variants

### **Default (Icon Only)**
```typescript
<LanguageSwitcher />
```

### **With Label**
```typescript
<LanguageSwitcher showLabel />
```

### **Different Variants**
```typescript
<LanguageSwitcher variant="outline" size="sm" />
<LanguageSwitcher variant="ghost" size="lg" showLabel />
```

---

## 🌐 Supported Languages

| Code | Language | Flag | Status |
|------|----------|------|--------|
| `en` | English  | 🇬🇧   | ✅ Complete |
| `fr` | Français | 🇫🇷   | ✅ Complete |

### **Adding More Languages**

1. **Add translations in `lib/i18n.ts`**:
```typescript
export const es = {
  nav: {
    home: "Inicio",
    map: "Mapa",
    // ...
  },
  // ...
}

export const languages = {
  en,
  fr,
  es, // New language
}

export type Language = 'en' | 'fr' | 'es'
```

2. **Update language detection**:
```typescript
export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language
  
  if (browserLang.startsWith('fr')) return 'fr'
  if (browserLang.startsWith('es')) return 'es'
  
  return 'en'
}
```

3. **Add to language switcher**:
```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]
```

---

## 🔍 Examples

### **Navigation**
```typescript
const { t } = useTranslation()

<nav>
  <Link href="/dashboard">{t.nav.dashboard}</Link>
  <Link href="/map">{t.nav.map}</Link>
  <Link href="/submit-project">{t.nav.submitProject}</Link>
</nav>
```

### **Authentication Form**
```typescript
const { t } = useTranslation()

<form>
  <label>{t.auth.email}</label>
  <input type="email" />
  
  <label>{t.auth.password}</label>
  <input type="password" />
  
  <button>{t.auth.signIn}</button>
</form>
```

### **Project Form**
```typescript
const { t } = useTranslation()

<form>
  <h1>{t.projectForm.title}</h1>
  
  <label>{t.projectForm.name}</label>
  <input placeholder={t.projectForm.namePlaceholder} />
  
  <label>{t.projectForm.category}</label>
  <select>
    <option>{t.categories.economy}</option>
    <option>{t.categories.health}</option>
    <option>{t.categories.environment}</option>
  </select>
  
  <button>{t.projectForm.submit}</button>
</form>
```

### **Dynamic Language Switch**
```typescript
const { language, setLanguage } = useTranslation()

<div>
  <p>Current: {language}</p>
  <button onClick={() => setLanguage('en')}>English</button>
  <button onClick={() => setLanguage('fr')}>Français</button>
</div>
```

---

## 🎯 Best Practices

### **1. Always Use Translations**
❌ **Bad**:
```typescript
<h1>Welcome to ILEWA</h1>
```

✅ **Good**:
```typescript
const { t } = useTranslation()
<h1>{t.landing.title}</h1>
```

### **2. Group Related Translations**
```typescript
// Good structure
export const en = {
  auth: {
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
  },
  projectForm: {
    title: "Submit Project",
    name: "Project Name",
    // ...
  },
}
```

### **3. Use Descriptive Keys**
❌ **Bad**:
```typescript
t.btn1, t.text2, t.label3
```

✅ **Good**:
```typescript
t.auth.signIn, t.projectForm.submit, t.nav.dashboard
```

### **4. Keep Translations Consistent**
- Use the same terminology across the app
- Match tone and formality
- Keep translations up-to-date

---

## 🐛 Troubleshooting

### **Translations Not Showing**

1. **Check if LanguageProvider is wrapping your app**:
```typescript
// app/layout.tsx
<LanguageProvider>
  {children}
</LanguageProvider>
```

2. **Check if using the hook correctly**:
```typescript
const { t } = useTranslation()
// NOT: const t = useTranslation()
```

3. **Check translation key exists**:
```typescript
// Make sure the key exists in lib/i18n.ts
console.log(t.nav.home) // Should not be undefined
```

### **Language Not Detected**

1. **Clear localStorage**:
```javascript
localStorage.removeItem('ilewa-language')
```

2. **Check browser language**:
```javascript
console.log(navigator.language)
```

3. **Force a language**:
```typescript
const { setLanguage } = useTranslation()
setLanguage('fr')
```

---

## 📊 Translation Coverage

### **Current Status**

| Section | English | French |
|---------|---------|--------|
| Navigation | ✅ 100% | ✅ 100% |
| Authentication | ✅ 100% | ✅ 100% |
| Landing Page | ✅ 100% | ✅ 100% |
| Features | ✅ 100% | ✅ 100% |
| Project Form | ✅ 100% | ✅ 100% |
| Map Interface | ✅ 100% | ✅ 100% |
| Dashboard | ✅ 100% | ✅ 100% |
| Categories | ✅ 100% | ✅ 100% |
| Common | ✅ 100% | ✅ 100% |

---

## 🚀 Next Steps

1. **Complete remaining components**
   - Update all components to use `useTranslation()`
   - Remove hardcoded strings

2. **Add more languages**
   - Spanish (es)
   - Portuguese (pt)
   - Arabic (ar)

3. **Advanced features**
   - Date/time localization
   - Number formatting
   - Pluralization rules
   - RTL support for Arabic

---

**The i18n system is ready! Your app now automatically detects the user's language! 🌍**
