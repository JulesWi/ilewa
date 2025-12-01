# 🔧 Configuration Supabase - ILEWA

## ✅ Étapes Déjà Complétées
- [x] Clés Supabase ajoutées dans `.env.example`
- [x] Dépendances installées
- [x] Fichiers SQL créés

## 🚀 Configuration Requise

### Étape 1 : Créer le fichier `.env.local`

**IMPORTANT** : Créez manuellement le fichier `.env.local` à la racine du projet avec ce contenu :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://odivkvqlltyusyhkjjrk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kaXZrdnFsbHR5dXN5aGtqanJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjQ1NzIsImV4cCI6MjA4MDA0MDU3Mn0.VcCAVhrowekxMsbqTVqTyF9S6dThTBU29vrpuKCVP7k

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Étape 2 : Exécuter les Scripts SQL dans Supabase

Allez sur : https://supabase.com/dashboard/project/odivkvqlltyusyhkjjrk/editor

#### A. Créer les Tables (si pas déjà fait)

Exécutez le fichier `schema.sql` dans le SQL Editor :

```sql
-- Copiez tout le contenu de schema.sql et exécutez-le
```

#### B. Configurer les Policies RLS

Exécutez le fichier `supabase-policies.sql` dans le SQL Editor :

```sql
-- Copiez tout le contenu de supabase-policies.sql et exécutez-le
```

**Ce script configure** :
- ✅ Row Level Security sur toutes les tables
- ✅ Accès public aux projets approuvés
- ✅ Accès privé pour les utilisateurs
- ✅ Accès admin complet
- ✅ Trigger automatique pour créer les profils utilisateurs
- ✅ Indexes pour les performances

### Étape 3 : Créer Votre Premier Compte Admin

1. Lancez l'application : `pnpm dev`
2. Allez sur : http://localhost:3000
3. Cliquez sur "Se connecter"
4. Créez un compte avec votre email

5. Dans Supabase SQL Editor, exécutez :

```sql
-- Remplacez par votre email
UPDATE users
SET role = 'admin'
WHERE email = 'votre@email.com';
```

### Étape 4 : Vérifier la Configuration

Dans Supabase SQL Editor, vérifiez que tout est OK :

```sql
-- Vérifier les tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Vérifier les policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';

-- Vérifier le trigger
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

## 🎯 Résultat Attendu

Après configuration, vous aurez :

### Routes Publiques (Accessibles à tous)
- `/` - Landing page moderne
- `/map` - Carte interactive avec tous les projets approuvés

### Routes Protégées (Authentification requise)
- `/dashboard` - Dashboard analytique avec graphiques
- `/submit-project` - Formulaire de soumission de projet
- `/auth` - Page de connexion/inscription

### Routes Admin (Rôle admin requis)
- `/admin` - Dashboard de validation des projets

## 🔐 Sécurité Configurée

### Row Level Security (RLS)

**Projets** :
- ✅ Tout le monde voit les projets approuvés
- ✅ Les utilisateurs voient leurs propres projets (tous statuts)
- ✅ Les utilisateurs peuvent créer des projets (status: pending)
- ✅ Les admins peuvent tout faire

**Utilisateurs** :
- ✅ Tout le monde peut voir les profils (pour les auteurs)
- ✅ Les utilisateurs peuvent modifier leur propre profil
- ✅ Les admins peuvent tout gérer

**Commentaires** :
- ✅ Visibles sur les projets approuvés
- ✅ Les utilisateurs peuvent créer/modifier/supprimer leurs commentaires

**Messages & Notifications** :
- ✅ Les utilisateurs voient uniquement leurs propres messages/notifications

## 📊 Données de Test (Optionnel)

Pour tester rapidement, vous pouvez insérer des données de test :

```sql
-- Insérer des citations du jour
INSERT INTO daily_quotes (text, author, source_url) VALUES
('L''innovation distingue un leader d''un suiveur.', 'Steve Jobs', 'https://example.com'),
('Le succès n''est pas final, l''échec n''est pas fatal.', 'Winston Churchill', 'https://example.com'),
('La seule façon de faire du bon travail est d''aimer ce que vous faites.', 'Steve Jobs', 'https://example.com');

-- Insérer un projet de test (après avoir créé votre compte)
INSERT INTO projects (name, description, category, author_id, repository_url, latitude, longitude, status)
VALUES (
  'Projet Test',
  'Ceci est un projet de test pour vérifier le fonctionnement',
  'technology',
  'VOTRE_USER_ID_ICI', -- Remplacez par votre ID utilisateur
  'https://github.com/example/project',
  48.8566,
  2.3522,
  'approved'
);
```

## 🚨 Troubleshooting

### Erreur : "Invalid API key"
- Vérifiez que `.env.local` existe et contient les bonnes clés
- Redémarrez le serveur de développement

### Erreur : "Row Level Security policy violation"
- Vérifiez que `supabase-policies.sql` a été exécuté
- Vérifiez que RLS est activé sur les tables

### Les projets n'apparaissent pas sur la carte
- Vérifiez que le statut est `'approved'`
- Vérifiez les coordonnées GPS (latitude, longitude)

### Impossible de soumettre un projet
- Vérifiez que vous êtes connecté
- Vérifiez que le trigger de création d'utilisateur fonctionne

## ✅ Checklist Finale

Avant de lancer l'application :

- [ ] `.env.local` créé avec les clés Supabase
- [ ] `schema.sql` exécuté dans Supabase
- [ ] `supabase-policies.sql` exécuté dans Supabase
- [ ] Compte créé et promu admin
- [ ] Dépendances installées (`pnpm install`)

Une fois tout configuré, lancez :

```bash
pnpm dev
```

Et accédez à : **http://localhost:3000** 🎉

---

**Votre application ILEWA est maintenant prête pour l'exploitation !**
