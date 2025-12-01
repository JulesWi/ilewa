# 📊 Structure de la Base de Données ILEWA

## Tables et Colonnes

### 1. **users**
```sql
id UUID (PK)
email TEXT
full_name TEXT
avatar_url TEXT
role TEXT (default: 'user')
created_at TIMESTAMPTZ
last_seen_at TIMESTAMPTZ
```
**Colonne utilisateur** : `id`

---

### 2. **projects**
```sql
id UUID (PK)
name TEXT
description TEXT
category TEXT
author_id UUID (FK → users.id)
repository_url TEXT
latitude DECIMAL
longitude DECIMAL
status TEXT (default: 'pending')
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```
**Colonne utilisateur** : `author_id`

---

### 3. **comments**
```sql
id UUID (PK)
project_id UUID (FK → projects.id)
author_id UUID (FK → users.id)
content TEXT
parent_id UUID (FK → comments.id)
created_at TIMESTAMPTZ
```
**Colonne utilisateur** : `author_id` ⚠️ (PAS user_id)

---

### 4. **likes**
```sql
id UUID (PK)
user_id UUID (FK → users.id)
project_id UUID (FK → projects.id)
created_at TIMESTAMPTZ
UNIQUE(user_id, project_id)
```
**Colonne utilisateur** : `user_id` ✅

---

### 5. **messages**
```sql
id UUID (PK)
sender_id UUID (FK → users.id)
receiver_id UUID (FK → users.id)
content TEXT
read BOOLEAN
created_at TIMESTAMPTZ
```
**Colonnes utilisateur** : `sender_id`, `receiver_id` ⚠️ (PAS user_id)

---

### 6. **notifications**
```sql
id UUID (PK)
user_id UUID (FK → users.id)
type TEXT
title TEXT
message TEXT
read BOOLEAN
created_at TIMESTAMPTZ
```
**Colonne utilisateur** : `user_id` ✅

---

### 7. **daily_quotes**
```sql
id UUID (PK)
text TEXT
author TEXT
source_url TEXT
created_at TIMESTAMPTZ
```
**Colonne utilisateur** : AUCUNE

---

## Index Créés

```sql
-- Projects
idx_projects_status ON projects(status)
idx_projects_author ON projects(author_id)
idx_projects_category ON projects(category)
idx_projects_location ON projects(latitude, longitude)

-- Comments
idx_comments_project ON comments(project_id)
idx_comments_author ON comments(author_id) ✅

-- Likes
idx_likes_project ON likes(project_id)
idx_likes_user ON likes(user_id) ✅

-- Messages
idx_messages_sender ON messages(sender_id) ✅
idx_messages_receiver ON messages(receiver_id) ✅

-- Notifications
idx_notifications_user ON notifications(user_id) ✅
```

---

## Résumé des Colonnes Utilisateur par Table

| Table | Colonne(s) Utilisateur |
|-------|------------------------|
| users | `id` |
| projects | `author_id` |
| comments | `author_id` ⚠️ |
| likes | `user_id` ✅ |
| messages | `sender_id`, `receiver_id` ⚠️ |
| notifications | `user_id` ✅ |
| daily_quotes | AUCUNE |

---

## Policies RLS Configurées

### Projects
- ✅ Public peut voir les projets approuvés (`status = 'approved'`)
- ✅ Utilisateurs voient leurs propres projets (`author_id = auth.uid()`)
- ✅ Utilisateurs authentifiés peuvent créer des projets
- ✅ Utilisateurs peuvent modifier leurs projets en attente
- ✅ Admins peuvent tout faire

### Users
- ✅ Tout le monde peut voir les profils
- ✅ Utilisateurs peuvent modifier leur propre profil (`id = auth.uid()`)
- ✅ Admins peuvent tout gérer

### Comments
- ✅ Public peut voir les commentaires sur projets approuvés
- ✅ Utilisateurs authentifiés peuvent créer des commentaires (`author_id = auth.uid()`)
- ✅ Utilisateurs peuvent modifier/supprimer leurs commentaires

### Likes
- ✅ Tout le monde peut voir les likes
- ✅ Utilisateurs authentifiés peuvent créer des likes (`user_id = auth.uid()`)
- ✅ Utilisateurs peuvent supprimer leurs likes

### Messages
- ✅ Utilisateurs voient les messages envoyés/reçus (`sender_id` ou `receiver_id = auth.uid()`)
- ✅ Utilisateurs authentifiés peuvent envoyer des messages
- ✅ Destinataires peuvent marquer comme lu

### Notifications
- ✅ Utilisateurs voient leurs notifications (`user_id = auth.uid()`)
- ✅ Système peut créer des notifications
- ✅ Utilisateurs peuvent modifier/supprimer leurs notifications

### Daily Quotes
- ✅ Tout le monde peut voir les citations
- ✅ Seuls les admins peuvent gérer les citations

---

## Trigger Automatique

```sql
-- Création automatique du profil utilisateur lors de l'inscription
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

Ce trigger crée automatiquement une entrée dans `public.users` quand un utilisateur s'inscrit via Supabase Auth.

---

## ✅ Fichier Corrigé

Le fichier `supabase-policies.sql` a été corrigé pour :
- ✅ Utiliser `author_id` pour `comments` (au lieu de `user_id`)
- ✅ Utiliser `sender_id`/`receiver_id` pour `messages`
- ✅ Utiliser `user_id` pour `likes` et `notifications`
- ✅ Créer les bons index avec les bons noms de colonnes

**Vous pouvez maintenant exécuter `supabase-policies.sql` sans erreur !** 🚀
