"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import ProjectPopup from "./project-popup"
import "leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
import type * as L_GEOMETRYUTIL from "leaflet-geometryutil"
import { supabase } from "@/lib/supabase-client"

// Extend L namespace to include GeometryUtil
declare module "leaflet" {
  export let GeometryUtil: typeof L_GEOMETRYUTIL
}

// Initialize Supabase client
// Supprimez les lignes suivantes :
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
// const supabase = createClient(supabaseUrl, supabaseKey)

// Define marker icon
const defaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Define basemap layers
const baseMaps = {
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  esri: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
  topo: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
}

interface Project {
  id: number
  name: string
  category: string
  author: string
  description: string
  date: string
  repository_url: string
  latitude: number
  longitude: number
}

interface MapComponentProps {
  onMapReady: (map: L.Map) => void
  activeBaseMap: string
  filters: {
    category: string
    dateRange: {
      startDate: Date | null
      endDate: Date | null
    }
  }
}

export default function MapComponent({ onMapReady, activeBaseMap, filters }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<{ [key: string]: L.TileLayer }>({})
  const markersRef = useRef<L.LayerGroup | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      let query = supabase.from("projects").select("*")

      // Apply category filter if not 'all'
      if (filters.category && filters.category !== "all") {
        query = query.eq("category", filters.category)
      }

      // Apply date range filter if present
      if (filters.dateRange.startDate) {
        query = query.gte("date", filters.dateRange.startDate.toISOString().split("T")[0])
      }

      if (filters.dateRange.endDate) {
        query = query.lte("date", filters.dateRange.endDate.toISOString().split("T")[0])
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching projects:", error.message)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error fetching projects:", error)
      return []
    }
  }, [filters])

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return

    // Create map if it doesn't exist
    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current).setView([0, 0], 2)

      // Create base layers
      Object.entries(baseMaps).forEach(([key, layer]) => {
        layersRef.current[key] = L.tileLayer(layer.url, {
          attribution: layer.attribution,
        })
      })

      // Add default layer to map
      layersRef.current.osm.addTo(map)

      // Create markers layer group
      markersRef.current = L.layerGroup().addTo(map)

      // Add draw control
      const drawControl = new L.Control.Draw({
        draw: {
          polyline: true,
          polygon: true,
          circle: true,
          rectangle: true,
          marker: false,
        },
      })
      map.addControl(drawControl)

      // Event handler for draw:created
      map.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer
        markersRef.current?.addLayer(layer)

        if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
          const distance = L.GeometryUtil.length(layer)
          layer.bindPopup(`Distance: ${distance.toFixed(2)} meters`).openPopup()
        } else if (layer instanceof L.Circle) {
          const area = L.GeometryUtil.geodesicArea(layer.getLatLngs())
          layer.bindPopup(`Area: ${area.toFixed(2)} square meters`).openPopup()
        }
      })

      // Set map reference
      mapRef.current = map
      onMapReady(map)
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onMapReady])

  // Handle base map changes
  useEffect(() => {
    if (!mapRef.current || !layersRef.current) return

    // Remove all base layers
    Object.values(layersRef.current).forEach((layer) => {
      if (mapRef.current?.hasLayer(layer)) {
        mapRef.current.removeLayer(layer)
      }
    })

    // Add selected base layer
    if (layersRef.current[activeBaseMap]) {
      layersRef.current[activeBaseMap].addTo(mapRef.current)
    }
  }, [activeBaseMap])

  // Fetch projects from Supabase
  useEffect(() => {
    async function getProjects() {
      setIsLoading(true)
      setError(null)
      try {
        const projectsData = await fetchProjects()
        setProjects(projectsData)
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    getProjects()
  }, [fetchProjects])

  // Update markers when projects change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return

    // Clear existing markers
    markersRef.current.clearLayers()

    // Add markers for each project
    projects.forEach((project) => {
      const marker = L.marker([project.latitude, project.longitude], { icon: defaultIcon }).addTo(markersRef.current!)

      marker.on("click", () => {
        setSelectedProject(project)
      })
    })

    // Fit bounds if there are markers
    if (projects.length > 0) {
      const bounds = L.featureGroup(markersRef.current.getLayers()).getBounds()
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [projects])

  return (
    <>
      <div ref={mapContainerRef} className="absolute inset-0 h-full w-full z-10" />
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-75">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-75">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedProject && (
        <div className="absolute inset-0 z-30">
          <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
      )}
    </>
  )
}

