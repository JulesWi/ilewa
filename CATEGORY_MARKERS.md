# 📍 Marqueurs de Carte par Catégorie - ILEWA

## 🎨 Symboles et Couleurs

### **1. Économie** 💰
```
Symbole: 💰 (Sac d'argent)
Couleur: #059669 (Vert émeraude)
Fond: #d1fae5 (Vert clair)
Bordure: #047857 (Vert foncé)
Icône Lucide: TrendingUp
```

**Alternatives** :
- 💵 Billet de banque
- 📈 Graphique croissant
- 🏦 Banque
- ₣ Symbole franc

**Utilisation** : Projets économiques, microfinance, commerce, agriculture commerciale

---

### **2. Santé** 🏥
```
Symbole: 🏥 (Hôpital)
Couleur: #dc2626 (Rouge)
Fond: #fee2e2 (Rouge clair)
Bordure: #b91c1c (Rouge foncé)
Icône Lucide: Heart
```

**Alternatives** :
- ⚕️ Caducée médical
- 💊 Médicament
- 🩺 Stéthoscope
- ❤️ Cœur

**Utilisation** : Centres de santé, dispensaires, campagnes médicales, nutrition

---

### **3. Environnement** 🌱
```
Symbole: 🌱 (Pousse)
Couleur: #16a34a (Vert)
Fond: #dcfce7 (Vert très clair)
Bordure: #15803d (Vert foncé)
Icône Lucide: Leaf
```

**Alternatives** :
- 🌳 Arbre
- ♻️ Recyclage
- 🌍 Terre
- 💧 Goutte d'eau

**Utilisation** : Reforestation, gestion des déchets, eau potable, énergies renouvelables

---

### **4. Éducation** 📚
```
Symbole: 📚 (Livres)
Couleur: #2563eb (Bleu)
Fond: #dbeafe (Bleu clair)
Bordure: #1d4ed8 (Bleu foncé)
Icône Lucide: GraduationCap
```

**Alternatives** :
- 🎓 Chapeau de diplômé
- ✏️ Crayon
- 📖 Livre ouvert
- 🏫 École

**Utilisation** : Écoles, bibliothèques, formations, alphabétisation

---

### **5. Épidémie** 🦠
```
Symbole: 🦠 (Virus)
Couleur: #9333ea (Violet)
Fond: #f3e8ff (Violet clair)
Bordure: #7e22ce (Violet foncé)
Icône Lucide: Activity
```

**Alternatives** :
- ⚠️ Attention
- 🛡️ Bouclier
- 💉 Seringue
- 🔬 Microscope

**Utilisation** : Prévention, vaccination, surveillance épidémiologique, sensibilisation

---

### **6. Défaut** 📍
```
Symbole: 📍 (Pin)
Couleur: #64748b (Gris ardoise)
Fond: #f1f5f9 (Gris très clair)
Bordure: #475569 (Gris foncé)
Icône Lucide: MapPin
```

**Utilisation** : Projets non catégorisés ou catégories futures

---

## 🎯 Types de Marqueurs

### **1. Marqueur Pin Standard**
```
     ╭─────╮
    │  💰  │
    │      │
     ╲   ╱
       ▼
```

**Caractéristiques** :
- Forme de pin classique
- Symbole au centre
- Ombre portée
- Tailles : small (32px), medium (40px), large (48px)

**Code** :
```typescript
createCustomMarkerHTML('economie', 'medium')
```

---

### **2. Marqueur Cercle Simple**
```
   ┌─────┐
   │ 💰  │
   └─────┘
```

**Caractéristiques** :
- Cercle avec bordure colorée
- Fond clair
- Effet hover (agrandissement)
- Taille personnalisable

**Code** :
```typescript
createSimpleMarkerHTML('economie', 36)
```

---

### **3. Marqueur Cluster**
```
   ┌─────┐
   │  5  │
   └─────┘
```

**Caractéristiques** :
- Cercle avec nombre de projets
- Couleur de la catégorie dominante
- Taille proportionnelle au nombre
- Bordure blanche

**Code** :
```typescript
createClusterMarkerHTML(5, ['economie', 'economie', 'sante', 'education', 'economie'])
```

---

## 🎨 Palette de Couleurs Complète

### **Couleurs Principales**
```css
Économie:      #059669  /* Vert émeraude */
Santé:         #dc2626  /* Rouge */
Environnement: #16a34a  /* Vert */
Éducation:     #2563eb  /* Bleu */
Épidémie:      #9333ea  /* Violet */
Défaut:        #64748b  /* Gris ardoise */
```

### **Couleurs de Fond**
```css
Économie:      #d1fae5  /* Vert clair */
Santé:         #fee2e2  /* Rouge clair */
Environnement: #dcfce7  /* Vert très clair */
Éducation:     #dbeafe  /* Bleu clair */
Épidémie:      #f3e8ff  /* Violet clair */
Défaut:        #f1f5f9  /* Gris très clair */
```

### **Couleurs de Bordure**
```css
Économie:      #047857  /* Vert foncé */
Santé:         #b91c1c  /* Rouge foncé */
Environnement: #15803d  /* Vert foncé */
Éducation:     #1d4ed8  /* Bleu foncé */
Épidémie:      #7e22ce  /* Violet foncé */
Défaut:        #475569  /* Gris foncé */
```

---

## 📊 Exemples d'Utilisation

### **1. Carte Interactive**
```typescript
import { createCustomMarkerHTML, getCategoryInfo } from '@/lib/category-markers'
import L from 'leaflet'

// Créer un marqueur personnalisé
const markerHTML = createCustomMarkerHTML('economie', 'medium')
const icon = L.divIcon({
  html: markerHTML,
  className: 'custom-marker',
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50]
})

// Ajouter à la carte
L.marker([6.3703, 2.3912], { icon }).addTo(map)
```

### **2. Légende**
```tsx
import MapLegend from '@/components/map/map-legend'

// Légende complète
<MapLegend />

// Légende compacte
<MapLegend compact />

// Légende avec fermeture
<MapLegend onClose={() => setShowLegend(false)} />
```

### **3. Filtre par Catégorie**
```tsx
import { getAllCategories } from '@/lib/category-markers'

const categories = getAllCategories()

<select>
  <option value="all">Toutes les catégories</option>
  {categories.map(({ key, info }) => (
    <option key={key} value={key}>
      {info.symbol} {info.name}
    </option>
  ))}
</select>
```

---

## 🎯 Avantages des Symboles

### **Performance**
- ✅ **Léger** : Pas de chargement d'images
- ✅ **Rapide** : Rendu instantané
- ✅ **Scalable** : SVG vectoriel
- ✅ **Cache** : Pas de requêtes réseau

### **Accessibilité**
- ✅ **Universel** : Émojis reconnus partout
- ✅ **Colorblind-friendly** : Symboles + couleurs
- ✅ **Lisible** : Contraste élevé
- ✅ **Intuitif** : Association visuelle claire

### **Maintenance**
- ✅ **Simple** : Pas de gestion d'assets
- ✅ **Flexible** : Changement facile
- ✅ **Cohérent** : Palette centralisée
- ✅ **Extensible** : Ajout de catégories facile

---

## 🔧 Personnalisation

### **Ajouter une Nouvelle Catégorie**
```typescript
// Dans lib/category-markers.ts
export const categoryMarkers: Record<string, CategoryMarker> = {
  // ... catégories existantes
  
  infrastructure: {
    symbol: '🏗️',
    color: '#f59e0b',      // Orange
    bgColor: '#fef3c7',    // Orange clair
    borderColor: '#d97706',
    name: 'Infrastructure',
    icon: 'Building'
  }
}
```

### **Modifier un Symbole**
```typescript
// Changer le symbole d'économie
economie: {
  symbol: '📈',  // Au lieu de 💰
  // ... reste inchangé
}
```

### **Créer un Style Personnalisé**
```typescript
export function createCustomStyle(category: string): string {
  const marker = getCategoryInfo(category)
  
  return `
    <div style="
      background: linear-gradient(135deg, ${marker.bgColor}, ${marker.color});
      border: 2px solid ${marker.borderColor};
      border-radius: 8px;
      padding: 8px;
      font-size: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    ">
      ${marker.symbol}
    </div>
  `
}
```

---

## 📱 Responsive

### **Tailles Adaptatives**
```typescript
// Mobile
createCustomMarkerHTML('economie', 'small')   // 32px

// Tablette
createCustomMarkerHTML('economie', 'medium')  // 40px

// Desktop
createCustomMarkerHTML('economie', 'large')   // 48px
```

### **Détection Automatique**
```typescript
const isMobile = window.innerWidth < 768
const size = isMobile ? 'small' : 'medium'
createCustomMarkerHTML(category, size)
```

---

## 🧪 Tests Visuels

### **Rendu des Symboles**
```
💰 🏥 🌱 📚 🦠 📍
```

### **Avec Couleurs**
```
🟢 💰  Économie
🔴 🏥  Santé
🟢 🌱  Environnement
🔵 📚  Éducation
🟣 🦠  Épidémie
⚪ 📍  Défaut
```

### **Cluster**
```
🟢 5   (5 projets économie)
🔴 12  (12 projets santé)
🟣 3   (3 projets épidémie)
```

---

## 📋 Checklist d'Intégration

### **Phase 1 : Marqueurs de Base**
- [x] Créer `lib/category-markers.ts`
- [x] Définir symboles et couleurs
- [x] Créer fonctions de génération HTML
- [ ] Intégrer dans `map-interface.tsx`
- [ ] Tester sur différents navigateurs

### **Phase 2 : Légende**
- [x] Créer `components/map/map-legend.tsx`
- [ ] Ajouter à l'interface carte
- [ ] Rendre responsive
- [ ] Ajouter animations

### **Phase 3 : Clusters**
- [ ] Implémenter clustering Leaflet
- [ ] Utiliser `createClusterMarkerHTML`
- [ ] Optimiser performance
- [ ] Tester avec beaucoup de projets

---

**Les marqueurs symboliques sont prêts à être intégrés dans la carte !** 🎨✨
