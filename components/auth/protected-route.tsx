"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { LoadingFallback } from '@/components/loading-fallback'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth(false) // Ne pas rediriger automatiquement
  const router = useRouter()

  useEffect(() => {
    console.log("ProtectedRoute - loading:", loading, "user:", !!user)
    // Rediriger seulement si pas de chargement et pas d'utilisateur
    if (!loading && !user) {
      console.log("Pas d'utilisateur, redirection vers /auth")
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    console.log("ProtectedRoute - Chargement en cours...")
    return <LoadingFallback message="Vérification de l'authentification..." />
  }

  if (!user) {
    console.log("ProtectedRoute - Pas d'utilisateur, affichage redirection")
    return <LoadingFallback message="Redirection..." />
  }

  console.log("ProtectedRoute - Utilisateur authentifié, affichage du contenu")
  return <>{children}</>
}
