"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Loader2 } from 'lucide-react'

interface LocationAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onLocationSelect: (location: {
    name: string
    latitude: number
    longitude: number
  }) => void
  placeholder?: string
  className?: string
}

interface SearchResult {
  display_name: string
  lat: string
  lon: string
}

export default function LocationAutocomplete({
  value,
  onChange,
  onLocationSelect,
  placeholder = "Ex: Cotonou, Bénin",
  className = ""
}: LocationAutocompleteProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Géocodage avec Nominatim
  const searchLocation = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setSearching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
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
        setShowResults(data.length > 0)
      } else {
        console.error('Erreur HTTP géocodage:', response.status, response.statusText)
        setSearchResults([])
        setShowResults(false)
      }
    } catch (error) {
      console.error('Erreur de géocodage:', error instanceof Error ? error.message : 'Erreur inconnue', error)
      setSearchResults([])
      setShowResults(false)
    } finally {
      setSearching(false)
    }
  }, [])

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.length >= 3) {
        searchLocation(value)
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [value, searchLocation])

  // Fermer les résultats si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat)
    const lng = parseFloat(result.lon)
    
    onChange(result.display_name)
    setShowResults(false)
    
    onLocationSelect({
      name: result.display_name,
      latitude: lat,
      longitude: lng
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    if (e.target.value.length >= 3) {
      setShowResults(true)
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`pl-10 pr-10 ${className}`}
          autoComplete="off"
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
        )}
      </div>

      {/* Résultats de recherche */}
      {showResults && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelectResult(result)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-start gap-3 border-b border-slate-100 last:border-b-0 transition-colors"
            >
              <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 font-medium truncate">
                  {result.display_name.split(',')[0]}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {result.display_name}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Message si aucun résultat */}
      {showResults && searchResults.length === 0 && !searching && value.length >= 3 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg p-4"
        >
          <p className="text-sm text-slate-500 text-center">
            Aucun lieu trouvé pour "{value}"
          </p>
        </div>
      )}
    </div>
  )
}
