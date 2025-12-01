"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { supabase } from "@/lib/supabaseClient"
import { getMockProjects, getMockProjectsByCategory } from "@/lib/mock-projects"
import MapWidgets from "@/components/map/map-widgets"
import ProjectPopup from "@/components/map/project-popup"
import { createCustomMarkerHTML, getCategoryInfo } from "@/lib/category-markers"

// Function to create custom marker icon from category
const createMarkerIcon = (category: string) => {
  const html = createCustomMarkerHTML(category)
  return L.divIcon({
    html,
    className: 'custom-marker-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })
}

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

interface MapInterfaceProps {
  initialPosition?: {
    lat: number
    lng: number
    zoom: number
  }
  highlightProjectId?: string | null
}

export default function MapInterface({ initialPosition, highlightProjectId }: MapInterfaceProps = {}) {
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
  const [allProjects, setAllProjects] = useState<any[]>([]) // Store all projects
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    initialPosition ? [initialPosition.lat, initialPosition.lng] : [6.3703, 2.3912]
  )
  const [mapZoom, setMapZoom] = useState(initialPosition?.zoom || 6)

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
    return createMarkerIcon(category)
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

  // Highlight project if ID is provided
  useEffect(() => {
    if (highlightProjectId && allProjects.length > 0) {
      const project = allProjects.find(p => p.id.toString() === highlightProjectId)
      if (project) {
        setSelectedProject(project)
        setShowProjectPopup(true)
      }
    }
  }, [highlightProjectId, allProjects])

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
          <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full rounded-b-lg" zoomControl={false}>
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

      {/* Statistiques de la carte */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-xs" style={{ zIndex: 1000 }}>
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Statistiques</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Projets visibles</span>
            <span className="text-sm font-bold text-blue-600">{filteredProjects.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Total projets</span>
            <span className="text-sm font-bold text-slate-800">{allProjects.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Catégorie active</span>
            <span className="text-xs font-medium text-slate-700">
              {selectedCategory === "all" ? "Toutes" : selectedCategory}
            </span>
          </div>
        </div>
      </div>

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

