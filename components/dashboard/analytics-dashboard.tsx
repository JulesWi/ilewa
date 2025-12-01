"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts"
import { 
  TrendingUp, Users, MapPin, CheckCircle, Clock, XCircle,
  Download, Plus, Eye
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import MapPreview from "./map-preview"
import { mockStats } from "@/lib/mock-projects"

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

export default function AnalyticsDashboard() {
  console.log('AnalyticsDashboard - Rendu du composant')
  
  const [stats, setStats] = useState({
    totalProjects: 0,
    approvedProjects: 0,
    pendingProjects: 0,
    rejectedProjects: 0,
    totalUsers: 0,
    myProjects: 0,
  })
  
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [timelineData, setTimelineData] = useState<any[]>([])
  const [statusData, setStatusData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('AnalyticsDashboard - useEffect appelé')
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      console.log('fetchAnalytics - Début du chargement')
      
      // Utiliser directement les mock stats pour éviter les problèmes Supabase
      console.log('Utilisation des statistiques de démonstration')
      setStats(mockStats)
        
        // Données par catégorie (mock)
        const catData = [
          { name: 'Économie', value: mockStats.categories.economie },
          { name: 'Santé', value: mockStats.categories.sante },
          { name: 'Environnement', value: mockStats.categories.environnement },
          { name: 'Éducation', value: mockStats.categories.education },
          { name: 'Épidémie', value: mockStats.categories.epidemie },
        ]
        setCategoryData(catData)

        // Données de statut pour le pie chart
        setStatusData([
          { name: 'Approuvés', value: mockStats.approvedProjects },
          { name: 'En attente', value: mockStats.pendingProjects },
          { name: 'Rejetés', value: mockStats.rejectedProjects },
        ])

        // Timeline des 6 derniers mois (mock)
        const timeData = [
          { month: 'Nov', projets: 18 },
          { month: 'Déc', projets: 20 },
          { month: 'Jan', projets: 22 },
          { month: 'Fév', projets: 21 },
          { month: 'Mar', projets: 23 },
          { month: 'Avr', projets: 24 },
        ]
        setTimelineData(timeData)
      
      console.log('fetchAnalytics - Données chargées avec succès')
      setLoading(false)
    } catch (error) {
      console.error('fetchAnalytics - Erreur:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-gray-600 dark:text-gray-400">Vue d'ensemble de vos projets et statistiques</p>
        </div>
        <div className="flex gap-3">
          <Link href="/map">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Voir la carte
            </Button>
          </Link>
          <Link href="/submit-project">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau projet
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projets</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">Sur la plateforme</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets Approuvés</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approvedProjects}</div>
            <p className="text-xs text-muted-foreground">Visibles sur la carte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingProjects}</div>
            <p className="text-xs text-muted-foreground">En cours de validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mes Projets</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.myProjects}</div>
            <p className="text-xs text-muted-foreground">Projets soumis</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="categories">Par Catégorie</TabsTrigger>
          <TabsTrigger value="timeline">Évolution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des Statuts</CardTitle>
                <CardDescription>Distribution des projets par statut</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Projets par Catégorie</CardTitle>
                <CardDescription>Vue radar des catégories</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={categoryData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar name="Projets" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Map Preview */}
            <MapPreview projectCount={stats.approvedProjects} />
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projets Approuvés par Catégorie</CardTitle>
              <CardDescription>Nombre de projets actifs dans chaque catégorie</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Projets" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Projets</CardTitle>
              <CardDescription>Nombre de projets soumis par mois</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="projets" stroke="#3b82f6" strokeWidth={2} name="Projets" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/submit-project">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>Soumettre un projet</span>
              </Button>
            </Link>
            <Link href="/map">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <MapPin className="h-6 w-6" />
                <span>Explorer la carte</span>
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2" onClick={() => window.print()}>
              <Download className="h-6 w-6" />
              <span>Exporter les données</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
