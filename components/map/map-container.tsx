"use client"

import { useState, useMemo, useCallback } from "react"
import type { Map } from "leaflet"
import dynamic from "next/dynamic"
import MapControls from "./map-controls"
import ProjectFilters from "./project-filters"
import SubmitProjectButton from "./submit-project-button"
import { useSearchParams } from "next/navigation"

const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  ),
})

export default function MapContainer() {
  const [map, setMap] = useState<Map | null>(null)
  const [activeBaseMap, setActiveBaseMap] = useState<string>("osm")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const searchParams = useSearchParams()

  const category = searchParams.get("category")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  const initialFilters = useMemo(
    () => ({
      category: category || "all",
      dateRange: {
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    }),
    [category, startDate, endDate],
  )

  const [filters, setFilters] = useState(initialFilters)

  // Stabilize all callback functions
  const handleMapReady = useCallback((mapInstance: Map) => {
    setMap(mapInstance)
  }, []) // Pas de dépendances, car setMap est stable

  const handleBaseMapChange = useCallback((baseMap: string) => {
    setActiveBaseMap(baseMap)
  }, [])

  const toggleFilters = useCallback(() => {
    setIsFilterOpen((prev) => !prev)
    setIsSubmitOpen(false)
  }, [])

  const toggleSubmitForm = useCallback(() => {
    setIsSubmitOpen((prev) => !prev)
    setIsFilterOpen(false)
  }, [])

  const handleFilterChange = useCallback((newFilters: typeof initialFilters) => {
    setFilters(newFilters)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <MapComponent onMapReady={handleMapReady} activeBaseMap={activeBaseMap} filters={filters} />

      <div className="absolute left-4 top-4 z-20">
        <MapControls
          activeBaseMap={activeBaseMap}
          onBaseMapChange={handleBaseMapChange}
          onToggleFilters={toggleFilters}
          onToggleSubmitForm={toggleSubmitForm}
        />
      </div>

      {isFilterOpen && (
        <div className="absolute left-4 right-4 top-[calc(4rem+80px)] z-10 md:left-auto md:right-4 md:w-80">
          <ProjectFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>
      )}

      {isSubmitOpen && (
        <div className="absolute left-4 right-4 top-[calc(4rem+80px)] z-10 md:left-auto md:right-4 md:w-96">
          <SubmitProjectButton onClose={() => setIsSubmitOpen(false)} />
        </div>
      )}
    </div>
  )
}

