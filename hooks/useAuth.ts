"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export function useAuth(requireAuth = false) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Vérifier la session actuelle
    const checkUser = async () => {
      try {
        console.log('useAuth - Vérification de la session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('useAuth - Erreur lors de la vérification de la session:', error)
          setUser(null)
          setLoading(false)
        } else {
          console.log('useAuth - Session trouvée:', !!session?.user)
          setUser(session?.user ?? null)
          setLoading(false)
        }

        // Si l'authentification est requise et qu'il n'y a pas d'utilisateur
        if (requireAuth && !session?.user) {
          console.log('useAuth - Authentification requise, redirection vers /auth')
          router.push('/auth')
        }
      } catch (error) {
        console.error('useAuth - Erreur lors de la vérification de l\'utilisateur:', error)
        setUser(null)
        setLoading(false)
      }
    }

    checkUser()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_IN') {
          console.log('Utilisateur connecté')
          // Ne pas rediriger ici, laisser la page gérer la redirection
        } else if (event === 'SIGNED_OUT') {
          console.log('Utilisateur déconnecté')
          if (requireAuth) {
            router.push('/auth')
          }
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [requireAuth, router])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut
  }
}
