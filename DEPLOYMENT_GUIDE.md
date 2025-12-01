# 🚀 Guide de Déploiement sur Vercel

## 📋 Prérequis

### 1. Compte Vercel
- Créer un compte sur [vercel.com](https://vercel.com)
- Connecter votre compte GitHub

### 2. Variables d'Environnement Supabase
Récupérez ces informations depuis votre dashboard Supabase :
- `NEXT_PUBLIC_SUPABASE_URL` : URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme (anon/public key)

**Où trouver ces informations ?**
1. Allez sur [supabase.com](https://supabase.com)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🔧 Méthode 1 : Déploiement via l'Interface Vercel (Recommandé)

### Étape 1 : Importer le Projet

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Cliquez sur **"Import Git Repository"**
3. Sélectionnez votre repository GitHub : `JulesWi/ilewa`
4. Cliquez sur **"Import"**

### Étape 2 : Configurer le Projet

Vercel détectera automatiquement Next.js. Vérifiez les paramètres :

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

### Étape 3 : Ajouter les Variables d'Environnement

Dans la section **"Environment Variables"** :

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://votre-projet.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Important** : Cochez les 3 environnements (Production, Preview, Development)

### Étape 4 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Votre site sera disponible sur `https://ilewa.vercel.app` (ou un nom similaire)

---

## 🔧 Méthode 2 : Déploiement via CLI Vercel

### Installation de Vercel CLI

```bash
npm install -g vercel
```

### Connexion à Vercel

```bash
vercel login
```

### Premier Déploiement

```bash
# Dans le dossier du projet
cd "c:/__Workspace and Data__/Projet/ILEWA"

# Déployer
vercel
```

Suivez les instructions :
- **Set up and deploy?** → Yes
- **Which scope?** → Votre compte
- **Link to existing project?** → No
- **Project name?** → ilewa
- **Directory?** → ./
- **Override settings?** → No

### Ajouter les Variables d'Environnement

```bash
# Ajouter SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL

# Ajouter SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Pour chaque variable :
- **Value?** → Collez la valeur
- **Environment?** → Sélectionnez Production, Preview, Development

### Redéployer avec les Variables

```bash
vercel --prod
```

---

## 🔧 Méthode 3 : Déploiement Automatique (CI/CD)

Une fois le projet importé sur Vercel, chaque `git push` sur `main` déclenchera automatiquement un déploiement.

### Configuration Automatique

1. **Push sur GitHub** :
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Vercel détecte automatiquement** le push
3. **Build et déploiement** en 2-3 minutes
4. **URL de production** mise à jour

---

## ✅ Vérification Post-Déploiement

### 1. Tester les Fonctionnalités

- [ ] Page d'accueil charge correctement
- [ ] Authentification fonctionne
- [ ] Carte interactive s'affiche
- [ ] Formulaire de soumission fonctionne
- [ ] Dashboard affiche les projets
- [ ] Changement de langue fonctionne

### 2. Vérifier les Variables d'Environnement

Dans le dashboard Vercel :
1. Allez dans **Settings** → **Environment Variables**
2. Vérifiez que les 2 variables sont présentes
3. Vérifiez qu'elles sont actives pour tous les environnements

### 3. Vérifier les Logs

En cas d'erreur :
1. Allez dans **Deployments**
2. Cliquez sur le déploiement
3. Consultez les **Build Logs** et **Function Logs**

---

## 🔒 Configuration Supabase pour Vercel

### Ajouter le Domaine Vercel aux URLs Autorisées

1. Allez sur [supabase.com](https://supabase.com)
2. Sélectionnez votre projet
3. Allez dans **Authentication** → **URL Configuration**
4. Ajoutez dans **Site URL** :
   ```
   https://ilewa.vercel.app
   ```
5. Ajoutez dans **Redirect URLs** :
   ```
   https://ilewa.vercel.app/auth/callback
   https://ilewa.vercel.app/**
   ```

---

## 🌐 Domaine Personnalisé (Optionnel)

### Ajouter un Domaine

1. Dans Vercel, allez dans **Settings** → **Domains**
2. Cliquez sur **"Add"**
3. Entrez votre domaine (ex: `ilewa.com`)
4. Suivez les instructions pour configurer les DNS

### Configuration DNS

Ajoutez ces enregistrements chez votre registrar :

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## 🐛 Résolution des Problèmes Courants

### Erreur : "Module not found"

**Solution** : Vérifiez que toutes les dépendances sont dans `package.json`
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Erreur : "Supabase client error"

**Solution** : Vérifiez les variables d'environnement
1. Dashboard Vercel → Settings → Environment Variables
2. Vérifiez que les valeurs sont correctes
3. Redéployez : **Deployments** → **...** → **Redeploy**

### Erreur : "Build failed"

**Solution** : Consultez les logs
1. Allez dans **Deployments**
2. Cliquez sur le déploiement échoué
3. Consultez **Build Logs**
4. Corrigez l'erreur localement
5. Poussez les corrections

### Carte ne s'affiche pas

**Solution** : Problème de chargement côté client
- Vérifiez que `"use client"` est présent dans les composants carte
- Vérifiez que Leaflet est bien chargé côté client uniquement

---

## 📊 Monitoring et Analytics

### Vercel Analytics

1. Allez dans **Analytics** dans le dashboard Vercel
2. Activez **Web Analytics** (gratuit)
3. Suivez les visites, performances, etc.

### Vercel Speed Insights

1. Installez le package :
```bash
npm install @vercel/speed-insights
```

2. Ajoutez dans `app/layout.tsx` :
```typescript
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

## 🔄 Workflow de Développement

### Branches et Environnements

```
main (production)     → https://ilewa.vercel.app
develop (preview)     → https://ilewa-git-develop.vercel.app
feature/* (preview)   → https://ilewa-git-feature-*.vercel.app
```

### Déploiement par Environnement

```bash
# Preview (branche develop)
git checkout develop
git push origin develop

# Production (branche main)
git checkout main
git merge develop
git push origin main
```

---

## 📝 Checklist de Déploiement

- [ ] Compte Vercel créé et GitHub connecté
- [ ] Variables d'environnement Supabase récupérées
- [ ] Projet importé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Premier déploiement réussi
- [ ] URLs Vercel ajoutées dans Supabase
- [ ] Tests fonctionnels effectués
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Analytics activé (optionnel)

---

## 🎯 Résumé Rapide

### Déploiement en 5 Minutes

1. **Vercel** : [vercel.com/new](https://vercel.com/new)
2. **Import** : Sélectionnez `JulesWi/ilewa`
3. **Variables** :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** : Cliquez sur "Deploy"
5. **Supabase** : Ajoutez l'URL Vercel dans les redirections

**C'est tout ! 🚀**

---

## 📞 Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **Documentation Supabase** : [supabase.com/docs](https://supabase.com/docs)

---

**Bon déploiement ! 🎉**
