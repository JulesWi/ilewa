# 🚀 Guide de Push vers GitHub - ILEWA

## 📋 Prérequis

- [x] Git installé sur votre machine
- [x] Compte GitHub créé
- [x] Repository GitHub créé (ou à créer)

---

## 🔧 Configuration Initiale

### 1. Configurer Git (si pas déjà fait)
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### 2. Vérifier que .gitignore est correct
Le fichier `.gitignore` doit contenir :
```
/node_modules
/.next
.env
.env.local
.env*.local
```

---

## 🌟 Première Fois - Initialiser le Repository

### Option A : Repository GitHub déjà créé

1. **Initialiser Git localement**
```bash
cd "C:/__Workspace and Data__/Projet/ILEWA"
git init
```

2. **Ajouter tous les fichiers**
```bash
git add .
```

3. **Créer le premier commit**
```bash
git commit -m "🎉 Initial commit - ILEWA Platform

✨ Fonctionnalités:
- Carte interactive avec Leaflet
- Marqueurs symboliques par catégorie
- Autocomplétion géocodée
- Formulaire de soumission de projets
- Dashboard utilisateur et admin
- Authentification Supabase
- Protection des routes
- Interface responsive

🎨 Technologies:
- Next.js 14 + TypeScript
- Tailwind CSS
- Supabase
- Leaflet + Nominatim"
```

4. **Lier au repository GitHub**
```bash
# Remplacer par votre URL GitHub
git remote add origin https://github.com/votre-utilisateur/ilewa.git
```

5. **Pousser vers GitHub**
```bash
git branch -M main
git push -u origin main
```

### Option B : Créer un nouveau repository GitHub

1. **Aller sur GitHub** → New Repository
2. **Nom** : `ilewa`
3. **Description** : `🌍 Plateforme cartographique interactive pour projets en Afrique de l'Ouest`
4. **Public** ou **Private** selon votre choix
5. **NE PAS** initialiser avec README (on a déjà le nôtre)
6. **Créer** le repository
7. **Suivre les instructions** de l'Option A ci-dessus

---

## 🔄 Mises à Jour Futures

### Workflow Standard

1. **Vérifier le statut**
```bash
git status
```

2. **Ajouter les fichiers modifiés**
```bash
# Tous les fichiers
git add .

# Ou fichiers spécifiques
git add components/map/map-interface.tsx
git add lib/category-markers.ts
```

3. **Commit avec message descriptif**
```bash
git commit -m "✨ Add category markers with symbols

- Create lib/category-markers.ts
- Add MapLegend component
- Update documentation
- Add marker demo page"
```

4. **Pousser vers GitHub**
```bash
git push origin main
```

---

## 📝 Conventions de Commit

### Format Recommandé
```
<emoji> <type>: <description>

[corps optionnel]

[footer optionnel]
```

### Émojis Conventionnels
```
✨ :sparkles:       Nouvelle fonctionnalité
🐛 :bug:            Correction de bug
📝 :memo:           Documentation
🎨 :art:            Amélioration du style/UI
♻️ :recycle:        Refactoring
⚡ :zap:            Performance
🔒 :lock:           Sécurité
🚀 :rocket:         Déploiement
🔧 :wrench:         Configuration
✅ :white_check:    Tests
```

### Exemples
```bash
git commit -m "✨ Add geocoding autocomplete to project form"
git commit -m "🐛 Fix calendar z-index issue on map page"
git commit -m "📝 Update README with new features"
git commit -m "🎨 Harmonize color palette across pages"
git commit -m "🔒 Add middleware route protection"
```

---

## 🌿 Gestion des Branches

### Créer une branche pour une fonctionnalité
```bash
# Créer et basculer sur une nouvelle branche
git checkout -b feature/notifications

# Travailler sur la branche
git add .
git commit -m "✨ Add notification system"

# Pousser la branche
git push origin feature/notifications
```

### Fusionner une branche
```bash
# Retourner sur main
git checkout main

# Fusionner la branche
git merge feature/notifications

# Pousser les changements
git push origin main

# Supprimer la branche (optionnel)
git branch -d feature/notifications
git push origin --delete feature/notifications
```

---

## 🔍 Commandes Utiles

### Voir l'historique
```bash
git log --oneline --graph --all
```

### Voir les différences
```bash
# Différences non staged
git diff

# Différences staged
git diff --staged
```

### Annuler des changements
```bash
# Annuler les modifications d'un fichier
git checkout -- fichier.ts

# Retirer un fichier du staging
git reset HEAD fichier.ts

# Annuler le dernier commit (garder les changements)
git reset --soft HEAD~1

# Annuler le dernier commit (supprimer les changements)
git reset --hard HEAD~1
```

---

## 📦 Fichiers à NE PAS Pousser

### Vérifier .gitignore
Ces fichiers/dossiers ne doivent JAMAIS être poussés :
```
❌ node_modules/
❌ .next/
❌ .env
❌ .env.local
❌ .env*.local
❌ *.log
❌ .DS_Store
❌ Thumbs.db
```

### Si vous avez accidentellement commit un fichier sensible
```bash
# Retirer du cache Git
git rm --cached .env

# Commit la suppression
git commit -m "🔒 Remove .env from tracking"

# Pousser
git push origin main
```

---

## 🚨 Résolution de Problèmes

### Erreur : "Updates were rejected"
```bash
# Récupérer les changements distants
git pull origin main --rebase

# Résoudre les conflits si nécessaire
# Puis pousser
git push origin main
```

### Erreur : "Permission denied"
```bash
# Vérifier l'URL du remote
git remote -v

# Si HTTPS, passer en SSH ou utiliser un token
git remote set-url origin https://TOKEN@github.com/user/repo.git
```

### Conflits de fusion
```bash
# Voir les fichiers en conflit
git status

# Éditer les fichiers pour résoudre les conflits
# Chercher les marqueurs <<<<<<<, =======, >>>>>>>

# Marquer comme résolu
git add fichier-resolu.ts

# Continuer le merge/rebase
git commit
```

---

## 📊 Checklist Avant Push

- [ ] Code testé localement (`npm run dev`)
- [ ] Pas d'erreurs TypeScript (`npm run lint`)
- [ ] Fichiers sensibles dans `.gitignore`
- [ ] Message de commit descriptif
- [ ] Documentation mise à jour si nécessaire
- [ ] README à jour avec nouvelles fonctionnalités

---

## 🎯 Commandes Rapides - Copier/Coller

### Premier Push
```bash
cd "C:/__Workspace and Data__/Projet/ILEWA"
git init
git add .
git commit -m "🎉 Initial commit - ILEWA Platform"
git remote add origin https://github.com/VOTRE-USERNAME/ilewa.git
git branch -M main
git push -u origin main
```

### Push Standard
```bash
git add .
git commit -m "✨ Votre message de commit"
git push origin main
```

### Vérifier le Statut
```bash
git status
git log --oneline -5
```

---

## 🔗 Ressources

- [Documentation Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitmoji](https://gitmoji.dev/)

---

**Prêt à pousser vers GitHub ! 🚀**
