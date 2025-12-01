"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, ExternalLink, Calendar, User, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { getMockProjects } from '@/lib/mock-projects'
import { getCategoryInfo } from '@/lib/category-markers'
import Link from 'next/link'

interface Project {
  id: number
  name: string
  description: string
  category: string
  location: string
  latitude: number
  longitude: number
  repository_url: string
  status: string
  author_id: string
  created_at: string
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !data || data.length === 0) {
        console.log('Utilisation des données de démonstration')
        const mockData = getMockProjects()
        setProjects(mockData as any)
      } else {
        setProjects(data as any)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
      const mockData = getMockProjects()
      setProjects(mockData as any)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    return project.status === filter
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { label: 'Approuvé', className: 'bg-green-100 text-green-800 border-green-200' },
      pending: { label: 'En attente', className: 'bg-orange-100 text-orange-800 border-orange-200' },
      rejected: { label: 'Rejeté', className: 'bg-red-100 text-red-800 border-red-200' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Tous ({projects.length})
        </Button>
        <Button
          variant={filter === 'approved' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('approved')}
        >
          Approuvés ({projects.filter(p => p.status === 'approved').length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          En attente ({projects.filter(p => p.status === 'pending').length})
        </Button>
        <Button
          variant={filter === 'rejected' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('rejected')}
        >
          Rejetés ({projects.filter(p => p.status === 'rejected').length})
        </Button>
      </div>

      {/* Grille de projets */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const categoryInfo = getCategoryInfo(project.category)
          return (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categoryInfo.symbol}</span>
                    <div>
                      <CardTitle className="text-base line-clamp-1">{project.name}</CardTitle>
                      <CardDescription className="text-xs">{categoryInfo.name}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Description */}
                <p className="text-sm text-slate-600 line-clamp-2">
                  {project.description || 'Aucune description disponible'}
                </p>

                {/* Informations */}
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {project.repository_url && (
                    <Link href={project.repository_url} target="_blank" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Voir le projet
                      </Button>
                    </Link>
                  )}
                  <Link href={`/map?project=${project.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-3 w-3 mr-1" />
                      Sur la carte
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Message si aucun projet */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">Aucun projet trouvé pour ce filtre</p>
        </div>
      )}
    </div>
  )
}
