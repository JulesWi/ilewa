import L from "leaflet"

// Correction des icônes par défaut de Leaflet
export function fixLeafletIcons() {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon-2x.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
  })
}

// Icônes personnalisées pour différentes catégories
export const categoryIcons = {
  education: new L.Icon({
    iconUrl: "/images/markers/education-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  }),
  environment: new L.Icon({
    iconUrl: "/images/markers/environment-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  }),
  technology: new L.Icon({
    iconUrl: "/images/markers/technology-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  }),
  water: new L.Icon({
    iconUrl: "/images/markers/water-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  }),
  health: new L.Icon({
    iconUrl: "/images/markers/health-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  }),
  economy: new L.Icon({
    iconUrl: "/images/markers/economy-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  }),
  default: new L.Icon({
    iconUrl: "/images/markers/default-marker.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41],
  }),
}

// Fonction pour obtenir l'icône en fonction de la catégorie
export function getCategoryIcon(category: string): L.Icon {
  return categoryIcons[category as keyof typeof categoryIcons] || categoryIcons.default
}

