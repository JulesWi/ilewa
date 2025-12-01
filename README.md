# 🌍 ILEWA - Plateforme Cartographique Interactive

> Application web de visualisation et gestion de projets géolocalisés en Afrique de l'Ouest

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e)](https://supabase.com/)

## 📋 Description

ILEWA est une plateforme cartographique interactive permettant de visualiser, soumettre et gérer des projets de développement en Afrique de l'Ouest. L'application utilise Next.js 14 avec App Router, Tailwind CSS, Leaflet pour la cartographie, et Supabase pour le backend.

## ✨ Fonctionnalités Principales

### 🗺️ Carte Interactive
- **Visualisation géographique** avec Leaflet et OpenStreetMap
- **Marqueurs symboliques** par catégorie (💰 Économie, 🏥 Santé, 🌱 Environnement, 📚 Éducation, 🦠 Épidémie)
- **Fonds de carte multiples** (OSM, Topographique, Satellite)
- **Outils de mesure** (distance, surface, périmètre)
- **Clustering intelligent** pour les groupes de projets
- **Popups détaillés** avec informations complètes

### 📝 Soumission de Projets
- **Formulaire intuitif** avec validation en temps réel
- **Autocomplétion géocodée** (Nominatim/OpenStreetMap)
- **Sélection sur carte** pour coordonnées précises
- **Catégorisation** par thématique
- **Upload de fichiers** et liens vers repositories

### 📊 Tableaux de Bord
- **Dashboard utilisateur** avec statistiques personnelles
- **Dashboard administrateur** pour validation des projets
- **Graphiques interactifs** (Recharts)
- **Données en temps réel** avec Supabase

### 🔐 Authentification
- **Connexion sécurisée** via Supabase Auth
- **Protection des routes** (middleware + client-side)
- **Gestion des sessions** persistantes
- **Rôles utilisateurs** (user, admin)

### 🎨 Interface Moderne
- **Design cohérent** avec palette gris/bleu
- **Composants réutilisables** (ModernButton, Cards, etc.)
- **Responsive** (mobile, tablette, desktop)
- **Animations fluides** et transitions

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/votre-utilisateur/ilewa.git
cd ilewa
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Remplir `.env.local` avec vos clés Supabase :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

4. **Configurer la base de données Supabase**

Exécuter les scripts SQL dans l'ordre :
- `supabase-policies.sql` - Création des tables et policies RLS
- `fix-policies.sql` - Corrections des policies
- `add-location-column.sql` - Ajout de la colonne location

5. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
ilewa/
├── app/                      # Next.js App Router
│   ├── auth/                # Page d'authentification
│   ├── dashboard/           # Dashboard utilisateur
│   ├── map/                 # Page carte interactive
│   └── submit-project/      # Formulaire de soumission
├── components/              # Composants React
│   ├── auth/               # Authentification
│   ├── dashboard/          # Composants dashboard
│   ├── landing/            # Page d'accueil
│   ├── layout/             # Layout et navigation
│   ├── map/                # Composants carte
│   ├── project/            # Formulaires et projets
│   └── ui/                 # Composants UI réutilisables
├── hooks/                   # Custom React hooks
│   └── useAuth.ts          # Hook d'authentification
├── lib/                     # Utilitaires
│   ├── category-markers.ts # Marqueurs de carte
│   ├── mock-projects.ts    # Données de démonstration
│   └── supabaseClient.ts   # Client Supabase
├── public/                  # Assets statiques
└── styles/                  # Styles globaux
```

## 🎨 Technologies Utilisées

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utility-first
- **Leaflet** - Cartographie interactive
- **Recharts** - Graphiques et visualisations
- **Lucide React** - Icônes modernes
- **date-fns** - Manipulation de dates

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL - Base de données
  - Auth - Authentification
  - RLS - Row Level Security
  - Realtime - Mises à jour en temps réel

### APIs Externes
- **Nominatim** - Géocodage (OpenStreetMap)
- **OpenStreetMap** - Fonds de carte
- **Esri** - Cartes satellite et topographiques

## 🗄️ Base de Données

### Tables Principales
- `users` - Utilisateurs de l'application
- `projects` - Projets géolocalisés
- `comments` - Commentaires sur les projets
- `likes` - Likes des projets
- `messages` - Messages entre utilisateurs
- `notifications` - Notifications utilisateurs
- `daily_quotes` - Citations journalières

### Catégories de Projets
- 💰 **Économie** - Projets économiques, microfinance
- 🏥 **Santé** - Centres de santé, campagnes médicales
- 🌱 **Environnement** - Reforestation, gestion des déchets
- 📚 **Éducation** - Écoles, bibliothèques, formations
- 🦠 **Épidémie** - Prévention, vaccination, sensibilisation

## 🎯 Fonctionnalités Avancées

### Marqueurs Symboliques
Les marqueurs de carte utilisent des émojis et des couleurs pour représenter chaque catégorie :
- Légers et rapides (pas d'images à charger)
- Accessibles (symboles + couleurs)
- Personnalisables facilement

Voir `lib/category-markers.ts` et `CATEGORY_MARKERS.md` pour plus de détails.

### Autocomplétion Géocodée
Le formulaire de soumission intègre une recherche géocodée avec Nominatim :
- Suggestions en temps réel (debounce 500ms)
- Couverture Afrique de l'Ouest et Centrale
- Géocodage inverse (coordonnées → nom de lieu)

Voir `components/project/location-autocomplete.tsx`

### Protection des Routes
Double protection pour les routes sensibles :
- **Middleware** (server-side) - Vérifie les cookies Supabase
- **ProtectedRoute** (client-side) - Vérifie la session utilisateur

Voir `middleware.ts` et `components/auth/protected-route.tsx`

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de dev
npm run build        # Build de production
npm run start        # Lancer le serveur de prod
npm run lint         # Linter le code

# Utilitaires
npm run type-check   # Vérifier les types TypeScript
```

## 🔧 Configuration

### Variables d'Environnement
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Optionnel
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Supabase RLS Policies
Les policies de sécurité Row Level Security sont configurées pour :
- Lecture publique des projets approuvés
- Modification uniquement par l'auteur
- Administration par les admins
- Protection des données utilisateurs

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

## 📚 Documentation

- [CATEGORY_MARKERS.md](./CATEGORY_MARKERS.md) - Guide des marqueurs de carte
- [DATABASE_STRUCTURE.md](./DATABASE_STRUCTURE.md) - Structure de la base de données
- [PROJECT_FORM_IMPROVEMENTS.md](./PROJECT_FORM_IMPROVEMENTS.md) - Améliorations du formulaire
- [AUTOCOMPLETE_INTEGRATION.md](./AUTOCOMPLETE_INTEGRATION.md) - Intégration de l'autocomplétion
- [UI_FIXES.md](./UI_FIXES.md) - Corrections d'interface

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développement initial*

## 🙏 Remerciements

- OpenStreetMap pour les fonds de carte
- Nominatim pour le géocodage
- Supabase pour le backend
- La communauté Next.js

---

**Fait avec ❤️ pour l'Afrique de l'Ouest**
