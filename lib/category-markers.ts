/**
 * Marqueurs de carte par catégorie avec symboles/émojis
 * Utilise des icônes SVG et émojis pour représenter chaque thématique
 */

export interface CategoryMarker {
  symbol: string        // Émoji ou caractère
  color: string         // Couleur du marqueur
  bgColor: string       // Couleur de fond
  borderColor: string   // Couleur de bordure
  name: string          // Nom de la catégorie
  icon?: string         // Icône Lucide alternative
}

export const categoryMarkers: Record<string, CategoryMarker> = {
  economie: {
    symbol: '💰',
    color: '#059669',      // Vert émeraude
    bgColor: '#d1fae5',    // Vert clair
    borderColor: '#047857',
    name: 'Économie',
    icon: 'TrendingUp'
  },
  sante: {
    symbol: '🏥',
    color: '#dc2626',      // Rouge
    bgColor: '#fee2e2',    // Rouge clair
    borderColor: '#b91c1c',
    name: 'Santé',
    icon: 'Heart'
  },
  environnement: {
    symbol: '🌱',
    color: '#16a34a',      // Vert
    bgColor: '#dcfce7',    // Vert très clair
    borderColor: '#15803d',
    name: 'Environnement',
    icon: 'Leaf'
  },
  education: {
    symbol: '📚',
    color: '#2563eb',      // Bleu
    bgColor: '#dbeafe',    // Bleu clair
    borderColor: '#1d4ed8',
    name: 'Éducation',
    icon: 'GraduationCap'
  },
  epidemie: {
    symbol: '🦠',
    color: '#9333ea',      // Violet
    bgColor: '#f3e8ff',    // Violet clair
    borderColor: '#7e22ce',
    name: 'Épidémie',
    icon: 'Activity'
  },
  default: {
    symbol: '📍',
    color: '#64748b',      // Gris ardoise
    bgColor: '#f1f5f9',    // Gris très clair
    borderColor: '#475569',
    name: 'Autre',
    icon: 'MapPin'
  }
}

/**
 * Symboles alternatifs (caractères Unicode)
 * Utilisables si les émojis ne s'affichent pas bien
 */
export const categorySymbols: Record<string, string> = {
  economie: '₣',        // Symbole franc
  sante: '⚕',           // Caducée médical
  environnement: '♻',   // Recyclage
  education: '✎',       // Crayon
  epidemie: '⚠',        // Attention
  default: '●'          // Point
}

/**
 * Créer un marqueur HTML personnalisé pour Leaflet
 */
export function createCustomMarkerHTML(category: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
  const marker = categoryMarkers[category] || categoryMarkers.default
  
  const sizes = {
    small: { width: 32, height: 40, fontSize: 16, symbolSize: 18 },
    medium: { width: 40, height: 50, fontSize: 20, symbolSize: 22 },
    large: { width: 48, height: 60, fontSize: 24, symbolSize: 26 }
  }
  
  const s = sizes[size]
  
  return `
    <div style="
      position: relative;
      width: ${s.width}px;
      height: ${s.height}px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <!-- Pin de fond -->
      <svg width="${s.width}" height="${s.height}" viewBox="0 0 40 50" style="position: absolute; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
        <!-- Corps du pin -->
        <path d="M20 0 C10 0, 0 8, 0 18 C0 28, 20 50, 20 50 C20 50, 40 28, 40 18 C40 8, 30 0, 20 0 Z" 
              fill="${marker.bgColor}" 
              stroke="${marker.borderColor}" 
              stroke-width="2"/>
        <!-- Cercle intérieur -->
        <circle cx="20" cy="16" r="12" 
                fill="white" 
                stroke="${marker.color}" 
                stroke-width="2"/>
      </svg>
      
      <!-- Symbole/Émoji -->
      <div style="
        position: absolute;
        top: 4px;
        font-size: ${s.symbolSize}px;
        z-index: 1;
        user-select: none;
      ">
        ${marker.symbol}
      </div>
    </div>
  `
}

/**
 * Créer un marqueur simple (cercle avec symbole)
 */
export function createSimpleMarkerHTML(category: string, size: number = 36): string {
  const marker = categoryMarkers[category] || categoryMarkers.default
  
  return `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${marker.bgColor};
      border: 3px solid ${marker.color};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size * 0.5}px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      cursor: pointer;
      transition: transform 0.2s;
    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
      ${marker.symbol}
    </div>
  `
}

/**
 * Créer un marqueur cluster (pour groupes de projets)
 */
export function createClusterMarkerHTML(count: number, categories: string[]): string {
  // Déterminer la couleur dominante
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const dominantCategory = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'default'
  
  const marker = categoryMarkers[dominantCategory] || categoryMarkers.default
  
  const size = Math.min(60, 40 + Math.log(count) * 10)
  
  return `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${marker.color};
      border: 4px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size * 0.4}px;
      font-weight: bold;
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      cursor: pointer;
      transition: transform 0.2s;
    " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
      ${count}
    </div>
  `
}

/**
 * Obtenir les informations d'une catégorie
 */
export function getCategoryInfo(category: string): CategoryMarker {
  return categoryMarkers[category] || categoryMarkers.default
}

/**
 * Liste de toutes les catégories avec leurs infos
 */
export function getAllCategories(): Array<{ key: string; info: CategoryMarker }> {
  return Object.entries(categoryMarkers)
    .filter(([key]) => key !== 'default')
    .map(([key, info]) => ({ key, info }))
}
