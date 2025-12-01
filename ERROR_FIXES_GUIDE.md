# 🚨 Guide de Correction des Erreurs - ILEWA

## 📋 Erreurs Identifiées

### 1. **Erreur de Récursion Infinie Supabase**
```
ERROR: infinite recursion detected in policy for relation "users"
```

### 2. **Erreur SSR avec Leaflet**
```
window is not defined (SSR error with Leaflet)
```

### 3. **Erreur 500 lors du chargement des projets**
```
Failed to load resource: the server responded with a status of 500
```

---

## 🔧 Solutions Appliquées

### 1. **Correction de la Récursion Infinie**

#### **Problème**
Les policies admin référençaient la table `users` dans leur condition `USING`, créant une boucle infinie :

```sql
-- PROBLÉMATIQUE
CREATE POLICY "Admins can manage all projects"
ON projects FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users  -- ❌ Récursion infinie !
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);
```

#### **Solution**
Utiliser `auth.jwt()` au lieu de référencer la table `users` :

```sql
-- SOLUTION
CREATE POLICY "Admins can manage all projects"
ON projects FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'  -- ✅ Pas de récursion
);
```

#### **Fichiers Modifiés**
- `supabase-policies.sql` - Policies corrigées
- `fix-policies.sql` - Script de réparation complet

---

### 2. **Correction de l'Erreur SSR Leaflet**

#### **Problème**
Leaflet utilise `window` qui n'existe pas côté serveur (SSR) :

```tsx
// PROBLÉMATIQUE
import { MapContainer } from "react-leaflet"  // ❌ Erreur SSR
```

#### **Solution**
Ajout d'une vérification côté client dans `MapWrapper` :

```tsx
// SOLUTION
export default function MapWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)  // ✅ Attendre le côté client
  }, [])

  if (!isClient) {
    return <MapLoading />  // ✅ Fallback pendant le SSR
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<MapLoading />}>
        <MapInterface />  // ✅ Chargé seulement côté client
      </Suspense>
    </ErrorBoundary>
  )
}
```

#### **Fichiers Modifiés**
- `components/map/map-wrapper.tsx` - Vérification côté client

---

### 3. **Correction de l'Erreur 500**

#### **Cause**
L'erreur 500 est causée par la récursion infinie dans les policies Supabase.

#### **Solution**
Une fois les policies corrigées, l'erreur 500 disparaîtra automatiquement.

---

## 📝 Instructions de Déploiement

### **Étape 1 : Appliquer les Corrections Supabase**

1. **Connectez-vous à votre dashboard Supabase**
2. **Allez dans SQL Editor**
3. **Exécutez le script de correction** :
   ```sql
   -- Copiez et exécutez le contenu de fix-policies.sql
   ```

### **Étape 2 : Redémarrer l'Application**

```bash
# Arrêter le serveur de développement
Ctrl + C

# Redémarrer
npm run dev
```

### **Étape 3 : Vérifier les Corrections**

1. **Ouvrir la console du navigateur**
2. **Vérifier qu'il n'y a plus d'erreurs** :
   - ✅ Pas d'erreur de récursion
   - ✅ Pas d'erreur SSR
   - ✅ Pas d'erreur 500

---

## 🔍 Vérifications Post-Correction

### **Console Browser**
```javascript
// Devrait être vide ou contenir seulement :
// [Fast Refresh] done in XXXms
```

### **Réseau (Network)**
```
✅ projects?select=*&status=eq.approved - Status 200
✅ Pas d'erreur 500
```

### **Fonctionnalités**
- ✅ Carte se charge correctement
- ✅ Projets s'affichent sur la carte
- ✅ Navigation fonctionne
- ✅ Dashboard accessible

---

## 🚨 Si les Erreurs Persistent

### **Erreur de Récursion**
```sql
-- Vérifier que toutes les policies admin utilisent auth.jwt()
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('users', 'projects', 'daily_quotes');
```

### **Erreur SSR**
```tsx
// Vérifier que MapWrapper utilise la vérification côté client
if (!isClient) {
  return <MapLoading />
}
```

### **Erreur 500**
1. Vérifier les logs Supabase
2. Tester les requêtes SQL manuellement
3. Vérifier les permissions RLS

---

## 📊 État Final Attendu

### **Console Propre**
```
✅ Pas d'erreur de récursion
✅ Pas d'erreur SSR  
✅ Pas d'erreur 500
✅ React DevTools suggestion (normal)
✅ Fast Refresh messages (normal)
```

### **Application Fonctionnelle**
- ✅ **Dashboard** : Statistiques et prévisualisation carte
- ✅ **Carte** : Chargement correct avec contrôles intégrés
- ✅ **Navigation** : Transitions fluides entre les vues
- ✅ **Authentification** : Connexion/déconnexion
- ✅ **Projets** : Affichage et soumission

---

**Une fois ces corrections appliquées, l'application ILEWA devrait fonctionner parfaitement sans erreurs !** 🎉

Les erreurs de récursion, SSR et 500 seront résolues, permettant une expérience utilisateur fluide.
