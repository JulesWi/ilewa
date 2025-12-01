"use client"

import { Suspense, lazy, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ErrorBoundary } from '@/components/error-boundary'
import { MapLoading } from '@/components/loading-fallback'

// Lazy load du composant carte pour éviter les erreurs SSR
const MapInterface = lazy(() => import('./map-interface').then(module => {
  console.log('MapInterface chargé avec succès')
  return module
}).catch(error => {
  console.error('Erreur lors du chargement de MapInterface:', error)
  throw error
}))

export default function MapWrapper() {
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <MapLoading />
  }

  // Récupérer les paramètres de l'URL
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const zoom = searchParams.get('zoom')
  const projectId = searchParams.get('project')

  const initialPosition = lat && lng ? {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    zoom: zoom ? parseInt(zoom) : 15
  } : undefined

  return (
    <ErrorBoundary
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-lg font-semibold">Erreur de chargement de la carte</h2>
            <p className="text-sm text-muted-foreground">
              La carte n'a pas pu être chargée. Veuillez recharger la page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Recharger
            </button>
          </div>
        </div>
      }
    >
      <Suspense fallback={<MapLoading />}>
        <MapInterface initialPosition={initialPosition} highlightProjectId={projectId} />
      </Suspense>
    </ErrorBoundary>
  )
}
