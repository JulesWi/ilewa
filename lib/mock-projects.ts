// Mock data pour les projets de démonstration

export const mockProjects = [
  // Projets Économie
  {
    id: "mock-1",
    name: "Microfinance Rurale",
    category: "economie",
    author_id: "demo-user",
    description: "Programme de microcrédits pour les agriculteurs ruraux en Afrique de l'Ouest",
    latitude: 12.6392,
    longitude: -8.0029,
    status: "approved",
    repository_url: "https://github.com/example/microfinance",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "mock-2",
    name: "Coopérative Agricole",
    category: "economie",
    author_id: "demo-user",
    description: "Réseau de coopératives pour la commercialisation des produits agricoles",
    latitude: 6.1256,
    longitude: 1.2221,
    status: "approved",
    repository_url: "https://github.com/example/cooperative",
    created_at: "2024-02-10T14:30:00Z",
    updated_at: "2024-02-10T14:30:00Z"
  },
  
  // Projets Santé
  {
    id: "mock-3",
    name: "Clinique Mobile",
    category: "sante",
    author_id: "demo-user",
    description: "Service de santé mobile pour les zones rurales isolées",
    latitude: 14.4974,
    longitude: -14.4524,
    status: "approved",
    repository_url: "https://github.com/example/mobile-clinic",
    created_at: "2024-01-20T09:15:00Z",
    updated_at: "2024-01-20T09:15:00Z"
  },
  {
    id: "mock-4",
    name: "Télémédecine",
    category: "sante",
    author_id: "demo-user",
    description: "Plateforme de consultation médicale à distance",
    latitude: 5.3600,
    longitude: -4.0083,
    status: "approved",
    repository_url: "https://github.com/example/telemedicine",
    created_at: "2024-02-05T11:45:00Z",
    updated_at: "2024-02-05T11:45:00Z"
  },
  
  // Projets Environnement
  {
    id: "mock-5",
    name: "Reforestation",
    category: "environnement",
    author_id: "demo-user",
    description: "Programme de plantation d'arbres et restauration des forêts",
    latitude: -1.9403,
    longitude: 29.8739,
    status: "approved",
    repository_url: "https://github.com/example/reforestation",
    created_at: "2024-01-25T08:00:00Z",
    updated_at: "2024-01-25T08:00:00Z"
  },
  {
    id: "mock-6",
    name: "Énergie Solaire",
    category: "environnement",
    author_id: "demo-user",
    description: "Installation de panneaux solaires dans les villages",
    latitude: 9.0820,
    longitude: 8.6753,
    status: "approved",
    repository_url: "https://github.com/example/solar-energy",
    created_at: "2024-02-15T13:20:00Z",
    updated_at: "2024-02-15T13:20:00Z"
  },
  
  // Projets Éducation
  {
    id: "mock-7",
    name: "École Numérique",
    category: "education",
    author_id: "demo-user",
    description: "Programme d'équipement informatique pour les écoles rurales",
    latitude: 15.5007,
    longitude: 32.5599,
    status: "approved",
    repository_url: "https://github.com/example/digital-school",
    created_at: "2024-01-30T10:30:00Z",
    updated_at: "2024-01-30T10:30:00Z"
  },
  {
    id: "mock-8",
    name: "Bibliothèque Mobile",
    category: "education",
    author_id: "demo-user",
    description: "Service de bibliothèque itinérante pour promouvoir la lecture",
    latitude: 33.8869,
    longitude: 9.5375,
    status: "approved",
    repository_url: "https://github.com/example/mobile-library",
    created_at: "2024-02-20T15:00:00Z",
    updated_at: "2024-02-20T15:00:00Z"
  },
  
  // Projets Épidémie
  {
    id: "mock-9",
    name: "Surveillance Épidémiologique",
    category: "epidemie",
    author_id: "demo-user",
    description: "Système de surveillance et d'alerte précoce des maladies",
    latitude: 4.0511,
    longitude: 9.7679,
    status: "approved",
    repository_url: "https://github.com/example/epidemic-surveillance",
    created_at: "2024-01-18T12:00:00Z",
    updated_at: "2024-01-18T12:00:00Z"
  },
  {
    id: "mock-10",
    name: "Vaccination Mobile",
    category: "epidemie",
    author_id: "demo-user",
    description: "Campagne de vaccination dans les zones reculées",
    latitude: 0.3476,
    longitude: 32.5825,
    status: "approved",
    repository_url: "https://github.com/example/mobile-vaccination",
    created_at: "2024-02-12T09:30:00Z",
    updated_at: "2024-02-12T09:30:00Z"
  },
  
  // Projets supplémentaires pour enrichir la carte
  {
    id: "mock-11",
    name: "Agriculture Urbaine",
    category: "environnement",
    author_id: "demo-user",
    description: "Jardins communautaires en milieu urbain",
    latitude: 6.5244,
    longitude: 3.3792,
    status: "approved",
    repository_url: "https://github.com/example/urban-farming",
    created_at: "2024-03-01T10:00:00Z",
    updated_at: "2024-03-01T10:00:00Z"
  },
  {
    id: "mock-12",
    name: "Formation Professionnelle",
    category: "education",
    author_id: "demo-user",
    description: "Centre de formation aux métiers du numérique",
    latitude: 36.8065,
    longitude: 10.1815,
    status: "approved",
    repository_url: "https://github.com/example/vocational-training",
    created_at: "2024-03-05T14:00:00Z",
    updated_at: "2024-03-05T14:00:00Z"
  },
  {
    id: "mock-13",
    name: "Eau Potable",
    category: "sante",
    author_id: "demo-user",
    description: "Installation de puits et systèmes de filtration d'eau",
    latitude: 12.3714,
    longitude: -1.5197,
    status: "approved",
    repository_url: "https://github.com/example/clean-water",
    created_at: "2024-03-10T11:00:00Z",
    updated_at: "2024-03-10T11:00:00Z"
  },
  {
    id: "mock-14",
    name: "Artisanat Local",
    category: "economie",
    author_id: "demo-user",
    description: "Plateforme e-commerce pour artisans locaux",
    latitude: 18.0735,
    longitude: -15.9582,
    status: "approved",
    repository_url: "https://github.com/example/local-crafts",
    created_at: "2024-03-15T16:00:00Z",
    updated_at: "2024-03-15T16:00:00Z"
  },
  {
    id: "mock-15",
    name: "Gestion des Déchets",
    category: "environnement",
    author_id: "demo-user",
    description: "Programme de recyclage et compostage communautaire",
    latitude: -4.0435,
    longitude: 39.6682,
    status: "approved",
    repository_url: "https://github.com/example/waste-management",
    created_at: "2024-03-20T13:30:00Z",
    updated_at: "2024-03-20T13:30:00Z"
  },
  {
    id: "mock-16",
    name: "Alphabétisation Adultes",
    category: "education",
    author_id: "demo-user",
    description: "Programme d'alphabétisation pour adultes",
    latitude: 13.4432,
    longitude: 2.1098,
    status: "approved",
    repository_url: "https://github.com/example/adult-literacy",
    created_at: "2024-03-25T09:00:00Z",
    updated_at: "2024-03-25T09:00:00Z"
  },
  {
    id: "mock-17",
    name: "Nutrition Infantile",
    category: "sante",
    author_id: "demo-user",
    description: "Programme de lutte contre la malnutrition infantile",
    latitude: 7.5400,
    longitude: -5.5471,
    status: "approved",
    repository_url: "https://github.com/example/child-nutrition",
    created_at: "2024-04-01T10:30:00Z",
    updated_at: "2024-04-01T10:30:00Z"
  },
  {
    id: "mock-18",
    name: "Tourisme Durable",
    category: "economie",
    author_id: "demo-user",
    description: "Développement de l'écotourisme communautaire",
    latitude: -25.7479,
    longitude: 28.2293,
    status: "approved",
    repository_url: "https://github.com/example/sustainable-tourism",
    created_at: "2024-04-05T15:00:00Z",
    updated_at: "2024-04-05T15:00:00Z"
  },
  {
    id: "mock-19",
    name: "Prévention Paludisme",
    category: "epidemie",
    author_id: "demo-user",
    description: "Distribution de moustiquaires et sensibilisation",
    latitude: 3.8480,
    longitude: 11.5021,
    status: "approved",
    repository_url: "https://github.com/example/malaria-prevention",
    created_at: "2024-04-10T12:00:00Z",
    updated_at: "2024-04-10T12:00:00Z"
  },
  {
    id: "mock-20",
    name: "Conservation Biodiversité",
    category: "environnement",
    author_id: "demo-user",
    description: "Protection des espèces menacées et de leurs habitats",
    latitude: -18.7669,
    longitude: 46.8691,
    status: "approved",
    repository_url: "https://github.com/example/biodiversity",
    created_at: "2024-04-15T14:30:00Z",
    updated_at: "2024-04-15T14:30:00Z"
  },
  {
    id: "mock-21",
    name: "STEM pour Filles",
    category: "education",
    author_id: "demo-user",
    description: "Programme d'encouragement des filles dans les sciences",
    latitude: 1.3733,
    longitude: 32.2903,
    status: "approved",
    repository_url: "https://github.com/example/stem-girls",
    created_at: "2024-04-20T11:00:00Z",
    updated_at: "2024-04-20T11:00:00Z"
  },
  {
    id: "mock-22",
    name: "Banque Céréalière",
    category: "economie",
    author_id: "demo-user",
    description: "Stockage et gestion des récoltes céréalières",
    latitude: 11.8657,
    longitude: 15.0444,
    status: "approved",
    repository_url: "https://github.com/example/grain-bank",
    created_at: "2024-04-25T16:00:00Z",
    updated_at: "2024-04-25T16:00:00Z"
  },
  {
    id: "mock-23",
    name: "Santé Maternelle",
    category: "sante",
    author_id: "demo-user",
    description: "Amélioration des soins prénataux et postnataux",
    latitude: 8.9806,
    longitude: 38.7578,
    status: "approved",
    repository_url: "https://github.com/example/maternal-health",
    created_at: "2024-05-01T09:30:00Z",
    updated_at: "2024-05-01T09:30:00Z"
  },
  {
    id: "mock-24",
    name: "Lutte Anti-Vectorielle",
    category: "epidemie",
    author_id: "demo-user",
    description: "Contrôle des vecteurs de maladies tropicales",
    latitude: -15.4167,
    longitude: 28.2833,
    status: "approved",
    repository_url: "https://github.com/example/vector-control",
    created_at: "2024-05-05T13:00:00Z",
    updated_at: "2024-05-05T13:00:00Z"
  }
]

// Fonction pour obtenir les projets mock
export function getMockProjects() {
  return mockProjects
}

// Fonction pour obtenir les projets par catégorie
export function getMockProjectsByCategory(category: string) {
  if (category === "all") return mockProjects
  return mockProjects.filter(p => p.category === category)
}

// Statistiques mock
export const mockStats = {
  totalProjects: 24,
  approvedProjects: 24,
  pendingProjects: 0,
  rejectedProjects: 0,
  totalUsers: 156,
  myProjects: 0,
  categories: {
    economie: 5,
    sante: 5,
    environnement: 6,
    education: 5,
    epidemie: 3
  }
}
