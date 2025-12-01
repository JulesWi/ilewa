# 🎯 Améliorations du Formulaire de Soumission - ILEWA

## ✨ Nouvelles Fonctionnalités

### **1. Sélecteur de Localisation Interactif**
**Fichier** : `components/project/location-picker.tsx` *(NOUVEAU)*

#### **Fonctionnalités**
- ✅ **Recherche géocodée** avec autocomplétion (Nominatim/OpenStreetMap)
- ✅ **Mini-carte interactive** (Leaflet) pour sélectionner l'emplacement
- ✅ **Clic sur la carte** pour définir les coordonnées
- ✅ **Géocodage inverse** : coordonnées → nom de lieu
- ✅ **Affichage des coordonnées** en temps réel

#### **Recherche Géocodée**
```typescript
// Recherche avec autocomplétion
const searchLocation = async (query: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=bj,tg,ci,sn,ml,ne,bf,gh,ng,cm,ga,cg&limit=5`
  )
  // Affiche les résultats en dropdown
}
```

**Pays supportés** : Bénin, Togo, Côte d'Ivoire, Sénégal, Mali, Niger, Burkina Faso, Ghana, Nigeria, Cameroun, Gabon, Congo

#### **Géocodage Inverse**
```typescript
// Clic sur la carte → nom du lieu
const reverseGeocode = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  )
  return data.display_name
}
```

#### **Interface**
```
┌─────────────────────────────────────────┐
│ 🔍 Rechercher un lieu (ex: Cotonou)    │
│ ┌─────────────────────────────────────┐ │
│ │ Cotonou, Bénin                      │ │
│ │ Porto-Novo, Bénin                   │ │
│ │ Abomey, Bénin                       │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 📍 Cliquez sur la carte pour sélectionner│
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │         [CARTE INTERACTIVE]         │ │
│ │              📍 Marker              │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│ Coordonnées: 6.370300, 2.391200        │
└─────────────────────────────────────────┘
```

---

### **2. Validation des Champs Obligatoires**
**Fichier** : `components/project/project-form.tsx`

#### **Champs Obligatoires**
- ✅ **Catégorie** *
- ✅ **Nom du projet** *
- ✅ **URL du projet** *
- ✅ **Localisation** * (avec coordonnées)

#### **Affichage des Erreurs**
```typescript
const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.category) newErrors.category = 'La catégorie est obligatoire'
  if (!formData.name) newErrors.name = 'Le nom du projet est obligatoire'
  if (!formData.repository_url) newErrors.repository_url = 'L\'URL du projet est obligatoire'
  if (!formData.location) newErrors.location = 'La localisation est obligatoire'
  if (!formData.latitude || !formData.longitude) {
    newErrors.coordinates = 'Les coordonnées sont obligatoires'
  }

  return Object.keys(newErrors).length === 0
}
```

#### **Interface avec Erreurs**
```tsx
<label>
  Nom du projet <span className="text-red-500">*</span>
</label>
<Input 
  className={errors.name ? 'border-red-500' : ''}
/>
{errors.name && (
  <p className="text-sm text-red-500 flex items-center gap-1">
    <AlertCircle className="h-3 w-3" />
    {errors.name}
  </p>
)}
```

---

### **3. Catégories Harmonisées**
**Fichier** : `components/project/project-form.tsx`

#### **Nouvelles Catégories**
```typescript
<SelectContent>
  <SelectItem value="economie">Économie</SelectItem>
  <SelectItem value="sante">Santé</SelectItem>
  <SelectItem value="environnement">Environnement</SelectItem>
  <SelectItem value="education">Éducation</SelectItem>
  <SelectItem value="epidemie">Épidémie</SelectItem>
</SelectContent>
```

**Cohérence** : Mêmes catégories que les mock data et la carte

---

## 🎨 Expérience Utilisateur

### **Flux de Soumission**

#### **1. Remplir les Informations de Base**
```
1. Sélectionner une catégorie *
2. Entrer le nom du projet *
3. Entrer l'URL du projet *
4. Ajouter une description (optionnel)
```

#### **2. Définir la Localisation**
```
Option A: Recherche
├─ Taper "Cotonou" dans la barre de recherche
├─ Sélectionner "Cotonou, Bénin" dans les résultats
└─ Les coordonnées sont automatiquement remplies ✅

Option B: Clic sur la carte
├─ Cliquer sur l'emplacement exact sur la carte
├─ Le nom du lieu est automatiquement récupéré
└─ Les coordonnées sont automatiquement remplies ✅
```

#### **3. Informations Complémentaires**
```
5. Sélectionner une date de réalisation (optionnel)
6. Ajouter des informations supplémentaires (optionnel)
```

#### **4. Validation et Soumission**
```
7. Cliquer sur "Soumettre le projet"
8. Validation automatique des champs obligatoires
9. Affichage des erreurs si champs manquants
10. Soumission à Supabase si tout est valide
11. Notification de succès
12. Redirection vers la page d'accueil
```

---

## 🔧 Détails Techniques

### **Chargement Dynamique**
```typescript
// Charger LocationPicker uniquement côté client (Leaflet ne supporte pas SSR)
const LocationPicker = dynamic(() => import('./location-picker'), { ssr: false })
```

### **Gestion des États**
```typescript
const [formData, setFormData] = useState({
  category: "",
  name: "",
  repository_url: "",
  description: "",
  location: "",      // Nom du lieu
  latitude: "",      // Coordonnée Y
  longitude: "",     // Coordonnée X
  additional_info: "",
})

const [errors, setErrors] = useState<Record<string, string>>({})
```

### **Callback de Sélection**
```typescript
const handleLocationSelect = (location: {
  name: string
  latitude: number
  longitude: number
}) => {
  setFormData((prev) => ({
    ...prev,
    location: location.name,
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
  }))
  // Effacer les erreurs
  setErrors((prev) => ({ ...prev, location: '', coordinates: '' }))
}
```

---

## 📊 API Utilisées

### **Nominatim (OpenStreetMap)**

#### **Recherche (Géocodage)**
```
GET https://nominatim.openstreetmap.org/search
?format=json
&q=Cotonou
&countrycodes=bj,tg,ci,sn,ml,ne,bf,gh,ng,cm,ga,cg
&limit=5
```

**Réponse** :
```json
[
  {
    "display_name": "Cotonou, Bénin",
    "lat": "6.3703",
    "lon": "2.3912"
  }
]
```

#### **Géocodage Inverse**
```
GET https://nominatim.openstreetmap.org/reverse
?format=json
&lat=6.3703
&lon=2.3912
&zoom=10
```

**Réponse** :
```json
{
  "display_name": "Cotonou, Littoral, Bénin"
}
```

---

## 🎯 Avantages

### **Pour l'Utilisateur**
- ✅ **Recherche intuitive** : Taper le nom de la ville
- ✅ **Sélection visuelle** : Cliquer sur la carte
- ✅ **Pas de saisie manuelle** des coordonnées
- ✅ **Validation en temps réel** des champs
- ✅ **Messages d'erreur clairs**

### **Pour la Qualité des Données**
- ✅ **Coordonnées précises** (géocodage OpenStreetMap)
- ✅ **Noms de lieux standardisés**
- ✅ **Validation obligatoire** des champs essentiels
- ✅ **Moins d'erreurs** de saisie

### **Pour le Développement**
- ✅ **Composant réutilisable** (`LocationPicker`)
- ✅ **API gratuite** (Nominatim)
- ✅ **Pas de clé API** requise
- ✅ **Intégration Leaflet** existante

---

## 🧪 Tests à Effectuer

### **1. Recherche Géocodée**
- [ ] Taper "Cotonou" → Vérifier les résultats
- [ ] Sélectionner un résultat → Vérifier les coordonnées
- [ ] Taper "Abomey" → Vérifier les résultats
- [ ] Recherche avec moins de 3 caractères → Pas de résultats

### **2. Clic sur la Carte**
- [ ] Cliquer sur Cotonou → Vérifier le nom et coordonnées
- [ ] Cliquer sur Porto-Novo → Vérifier le géocodage inverse
- [ ] Cliquer en pleine mer → Vérifier les coordonnées brutes

### **3. Validation**
- [ ] Soumettre sans catégorie → Erreur affichée
- [ ] Soumettre sans nom → Erreur affichée
- [ ] Soumettre sans URL → Erreur affichée
- [ ] Soumettre sans localisation → Erreur affichée
- [ ] Remplir tous les champs → Soumission réussie

### **4. Intégration**
- [ ] Vérifier que le projet apparaît dans Supabase
- [ ] Vérifier le statut "pending"
- [ ] Vérifier les coordonnées enregistrées

---

## 📝 Notes Importantes

### **Limitations Nominatim**
- **Limite de requêtes** : 1 requête/seconde
- **Usage Policy** : https://operations.osmfoundation.org/policies/nominatim/
- **Debounce** : 500ms implémenté pour respecter les limites

### **Pays Couverts**
Actuellement limité à l'Afrique de l'Ouest et Centrale :
- Bénin (bj), Togo (tg), Côte d'Ivoire (ci)
- Sénégal (sn), Mali (ml), Niger (ne)
- Burkina Faso (bf), Ghana (gh), Nigeria (ng)
- Cameroun (cm), Gabon (ga), Congo (cg)

**Extension possible** : Ajouter d'autres codes pays dans la requête

---

**Le formulaire de soumission est maintenant beaucoup plus intuitif avec recherche géocodée, carte interactive et validation des champs obligatoires !** 🎉
