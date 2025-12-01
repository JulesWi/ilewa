"use client"

import { useState, useEffect, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Loader2 } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface LocationPickerProps {
  onLocationSelect: (location: {
    name: string
    latitude: number
    longitude: number
  }) => void
  initialLocation?: string
  initialLat?: number
  initialLng?: number
}

interface SearchResult {
  display_name: string
  lat: string
  lon: string
}

// Composant pour gérer les clics sur la carte
function MapClickHandler({ onLocationClick }: { onLocationClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationClick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function LocationPicker({ 
  onLocationSelect, 
  initialLocation = '', 
  initialLat = 0, 
  initialLng = 0 
}: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState(initialLocation)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(
    initialLat && initialLng ? [initialLat, initialLng] : null
  )
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.3703, 2.3912]) // Cotonou par défaut

  // Géocodage avec Nominatim (OpenStreetMap)
  const searchLocation = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([])
      return
    }

    setSearching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=bj,tg,ci,sn,ml,ne,bf,gh,ng,cm,ga,cg&limit=5`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'ILEWA-App/1.0'
          }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        console.log('Résultats géocodage:', data)
        setSearchResults(data)
        setShowResults(true)
      } else {
        console.error('Erreur HTTP géocodage:', response.status)
      }
    } catch (error) {
      console.error('Erreur de géocodage:', error)
      // Ne pas afficher d'erreur à l'utilisateur, juste ne pas montrer de résultats
    } finally {
      setSearching(false)
    }
  }, [])

  // Géocodage inverse (coordonnées -> nom de lieu)
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'ILEWA-App/1.0'
          }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        console.log('Géocodage inverse:', data)
        return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      }
    } catch (error) {
      console.error('Erreur de géocodage inverse:', error)
    }
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  }, [])

  // Gérer la sélection d'un résultat de recherche
  const handleSelectResult = async (result: SearchResult) => {
    const lat = parseFloat(result.lat)
    const lng = parseFloat(result.lon)
    
    setSelectedPosition([lat, lng])
    setMapCenter([lat, lng])
    setSearchQuery(result.display_name)
    setShowResults(false)
    
    onLocationSelect({
      name: result.display_name,
      latitude: lat,
      longitude: lng
    })
  }

  // Gérer le clic sur la carte
  const handleMapClick = async (lat: number, lng: number) => {
    setSelectedPosition([lat, lng])
    
    // Géocodage inverse pour obtenir le nom du lieu
    const locationName = await reverseGeocode(lat, lng)
    // Ne pas mettre à jour searchQuery pour garder le nom du lieu
    // setSearchQuery(locationName)
    
    onLocationSelect({
      name: locationName,
      latitude: lat,
      longitude: lng
    })
  }

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchLocation(searchQuery)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, searchLocation])

  return (
    <div className="space-y-4">
      {/* Barre de recherche */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un lieu (ex: Cotonou, Bénin)"
            className="pl-10 pr-10"
          />
          {searching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
          )}
        </div>

        {/* Résultats de recherche */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleSelectResult(result)}
                className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-start gap-2 border-b border-slate-100 last:border-b-0"
              >
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{result.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mini-carte interactive */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
          <p className="text-sm text-slate-600 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Cliquez sur la carte pour sélectionner l'emplacement exact
          </p>
        </div>
        
        <div className="h-64 relative">
          <MapContainer
            center={mapCenter}
            zoom={selectedPosition ? 13 : 6}
            className="h-full w-full"
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapClickHandler onLocationClick={handleMapClick} />
            
            {selectedPosition && (
              <Marker position={selectedPosition} />
            )}
          </MapContainer>
        </div>

        {/* Affichage des coordonnées */}
        {selectedPosition && (
          <div className="bg-slate-50 px-4 py-2 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              <span className="font-medium">Coordonnées:</span>{' '}
              {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
