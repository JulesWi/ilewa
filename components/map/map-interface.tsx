"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { supabase } from "@/lib/supabaseClient"
import { getMockProjects, getMockProjectsByCategory } from "@/lib/mock-projects"
import FloatingAddButton from "@/components/map/floating-add-button"
import MapWidgets from "@/components/map/map-widgets"
import ProjectPopup from "@/components/map/project-popup"

// Custom marker icons
const redMarkerIcon = new L.Icon({
  iconUrl: "/red-marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
})

const blueMarkerIcon = new L.Icon({
  iconUrl: "/blue-marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
})

// Sample project data
const projects = [
  {
    id: 1,
    position: [35.6895, 139.6917],
    category: "education",
    title: "School proximity",
    author: "Harold Cooper",
    icon: redMarkerIcon,
  },
  {
    id: 2,
    position: [40.7128, -74.006],
    category: "technology",
    title: "Smart City Initiative",
    author: "Harold Cooper",
    icon: redMarkerIcon,
  },
  {
    id: 3,
    position: [48.8566, 2.3522],
    category: "environment",
    title: "Urban Green Spaces",
    author: "John Smith",
    icon: redMarkerIcon,
  },
  {
    id: 4,
    position: [-33.8688, 151.2093],
    category: "water",
    title: "Water Quality Monitoring",
    author: "Emma Johnson",
    icon: blueMarkerIcon,
  },
  {
    id: 5,
    position: [19.4326, -99.1332],
    category: "education",
    title: "Digital Classroom",
    author: "Maria Rodriguez",
    icon: redMarkerIcon,
  },
  {
    id: 6,
    position: [-23.5505, -46.6333],
    category: "water",
    title: "Rainwater Harvesting",
    author: "Carlos Mendez",
    icon: blueMarkerIcon,
  },
  {
    id: 7,
    position: [55.7558, 37.6173],
    category: "technology",
    title: "IoT Traffic Management",
    author: "Alexei Petrov",
    icon: redMarkerIcon,
  },
  {
    id: 8,
    position: [30.0444, 31.2357],
    category: "water",
    title: "Nile Conservation",
    author: "Ahmed Hassan",
    icon: blueMarkerIcon,
  },
  {
    id: 9,
    position: [-34.6037, -58.3816],
    category: "environment",
    title: "Urban Biodiversity",
    author: "Sofia Garcia",
    icon: blueMarkerIcon,
  },
]

// Basemap options
const basemaps = {
  OSM: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  TOPO: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
  SAT: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
}

// Map controller component to change the basemap
function BasemapController({ selectedBasemap, setSelectedBasemap }) {
  const map = useMap()

  useEffect(() => {
    if (selectedBasemap) {
      const { url, attribution } = basemaps[selectedBasemap]
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer)
        }
      })
      L.tileLayer(url, { attribution }).addTo(map)
    }
  }, [map, selectedBasemap])

  return null
}

// Measurement tools controller
function MeasurementController({ activeTool, setActiveTool }) {
  const map = useMap()
  const drawRef = useRef(null)

  useEffect(() => {
    if (!map || !activeTool) return

    // Clean up previous drawing tools
    if (drawRef.current) {
      map.removeControl(drawRef.current)
    }

    // Initialize draw control based on active tool
    if (activeTool === "point" || activeTool === "circle" || activeTool === "polygon") {
      // Here we would initialize the appropriate Leaflet.Draw control
      // This is a simplified version
      const drawControl = new L.Control.Draw({
        draw: {
          marker: activeTool === "point",
          circle: activeTool === "circle",
          polygon: activeTool === "polygon",
          polyline: false,
          rectangle: false,
          circlemarker: false,
        },
      })

      map.addControl(drawControl)
      drawRef.current = drawControl
    }

    return () => {
      if (drawRef.current) {
        map.removeControl(drawRef.current)
      }
    }
  }, [map, activeTool])

  return null
}

export default function MapInterface() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showComments, setShowComments] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showQuote, setShowQuote] = useState(false)
  const [showProjectPopup, setShowProjectPopup] = useState(false)
  const [selectedBasemap, setSelectedBasemap] = useState("OSM")
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [allProjects, setAllProjects] = useState<any[]>(projects) // Store all projects

  // Fix Leaflet icon issues
  useEffect(() => {
    // Fix Leaflet default icon
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    })
  }, [])

  // Function to get the correct icon based on category
  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case "education":
        return redMarkerIcon
      case "technology":
        return redMarkerIcon
      case "environment":
        return redMarkerIcon
      case "water":
        return blueMarkerIcon
      default:
        return redMarkerIcon
    }
  }, [])

  // Fonction pour charger les projets depuis Supabase avec fallback sur mock data
  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("status", "approved")

      // Si erreur ou pas de données, utiliser les mock projects
      if (error || !data || data.length === 0) {
        console.log("Utilisation des données de démonstration")
        const mockData = getMockProjects()
        const projectsData = mockData.map((project) => ({
          id: project.id,
          position: [project.latitude, project.longitude],
          category: project.category,
          title: project.name,
          author: project.author_id,
          description: project.description,
          repository_url: project.repository_url,
          icon: getCategoryIcon(project.category),
        }))
        setAllProjects(projectsData)
        setFilteredProjects(projectsData)
        return
      }

      // Transformer les données Supabase pour les adapter au format attendu
      const projectsData = data.map((project) => ({
        id: project.id,
        position: [project.latitude, project.longitude],
        category: project.category,
        title: project.name,
        author: project.author_id,
        description: project.description,
        repository_url: project.repository_url,
        icon: getCategoryIcon(project.category),
      }))

      setAllProjects(projectsData)
      setFilteredProjects(projectsData)
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error)
      // En cas d'erreur, utiliser les mock projects
      const mockData = getMockProjects()
      const projectsData = mockData.map((project) => ({
        id: project.id,
        position: [project.latitude, project.longitude],
        category: project.category,
        title: project.name,
        author: project.author_id,
        description: project.description,
        repository_url: project.repository_url,
        icon: getCategoryIcon(project.category),
      }))
      setAllProjects(projectsData)
      setFilteredProjects(projectsData)
    }
  }, [getCategoryIcon])

  // Appelez cette fonction dans un useEffect
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Filter projects when category changes
  useEffect(() => {
    let newFilteredProjects = allProjects

    if (selectedCategory && selectedCategory !== "all") {
      newFilteredProjects = allProjects.filter((project) => project.category === selectedCategory)
    }

    setFilteredProjects(newFilteredProjects)
  }, [selectedCategory, allProjects])

  const handleToolSelect = (tool: string) => {
    setActiveTool(tool === activeTool ? null : tool)
  }

  const handleBaseMapChange = (baseMap: string) => {
    setSelectedBasemap(baseMap)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setShowProjectPopup(true)
  }

  const handleToggleCalendar = () => setShowCalendar(!showCalendar)
  const handleToggleQuote = () => setShowQuote(!showQuote)
  const handleToggleComments = () => setShowComments(!showComments)

  return (
    <div className="relative h-full w-full p-4">
      {/* Conteneur de la carte avec design toolbox */}
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 h-full flex flex-col">
        {/* Header de la carte avec contrôles */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 rounded-t-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Carte Interactive</h2>
              <p className="text-sm text-slate-600">Explorez les projets géolocalisés</p>
            </div>
          </div>
          
          {/* Contrôles intégrés */}
          <div className="flex flex-wrap gap-4">
            {/* Sélecteur de fond de carte */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Fond :</span>
              <select 
                value={selectedBasemap} 
                onChange={(e) => handleBaseMapChange(e.target.value)}
                className="px-3 py-1 text-sm border border-slate-300 rounded-md bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="OSM">OpenStreetMap</option>
                <option value="TOPO">Topographique</option>
                <option value="SAT">Satellite</option>
              </select>
            </div>
            
            {/* Filtre de catégorie */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Catégorie :</span>
              <select 
                value={selectedCategory || "all"} 
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-3 py-1 text-sm border border-slate-300 rounded-md bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="all">Toutes</option>
                <option value="economie">Économie</option>
                <option value="sante">Santé</option>
                <option value="environnement">Environnement</option>
                <option value="epidemie">Épidémie</option>
                <option value="education">Éducation</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Conteneur de la carte */}
        <div className="flex-1 relative" style={{ zIndex: 1 }}>
          <MapContainer center={[20, 0]} zoom={2} className="h-full w-full rounded-b-lg" zoomControl={false}>
        <TileLayer url={basemaps.OSM.url} attribution={basemaps.OSM.attribution} />
        <ZoomControl position="bottomright" />

        <BasemapController selectedBasemap={selectedBasemap} setSelectedBasemap={setSelectedBasemap} />

        <MeasurementController activeTool={activeTool} setActiveTool={setActiveTool} />

        {filteredProjects.map((project) => (
          <Marker
            key={project.id}
            position={project.position as [number, number]}
            icon={project.icon}
            eventHandlers={{
              click: () => handleProjectClick(project),
            }}
          />
        ))}
        </MapContainer>
        </div>
      </div>

      {/* Widgets Repositionnés */}
      <MapWidgets
        showCalendar={showCalendar}
        showQuote={showQuote}
        showComments={showComments}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        onCloseCalendar={() => setShowCalendar(false)}
        onCloseQuote={() => setShowQuote(false)}
        onCloseComments={() => setShowComments(false)}
        selectedProject={selectedProject}
      />

      {/* Bouton Flottant Ajouter Projet */}
      <FloatingAddButton />

      {/* Popup Raffiné pour les Projets */}
      {showProjectPopup && selectedProject && (
        <ProjectPopup
          project={{
            id: selectedProject.id,
            name: selectedProject.title,
            category: selectedProject.category,
            author: selectedProject.author,
            description: selectedProject.description || "Description du projet...",
            date: new Date().toISOString(),
            repository_url: selectedProject.repository_url || "#",
            latitude: selectedProject.position[0],
            longitude: selectedProject.position[1],
          }}
          onClose={() => setShowProjectPopup(false)}
        />
      )}
    </div>
  )
}

