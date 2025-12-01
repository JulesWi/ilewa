"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// Remplacer cette ligne d'importation si elle existe
// import { supabase } from "@/lib/supabase-client";

// Au lieu de
import { supabase } from "@/lib/supabaseClient"
import { useToast } from "@/components/ui/use-toast"
import AdminProjectsList from "./admin-projects-list"
import AdminUsersList from "./admin-users-list"

export default function AdminDashboard() {
  const { toast } = useToast()
  const [stats, setStats] = useState({
    pendingProjects: 0,
    approvedProjects: 0,
    rejectedProjects: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Récupérer les statistiques des projets
        const { data: pendingProjects, error: pendingError } = await supabase
          .from("projects")
          .select("id", { count: "exact" })
          .eq("status", "pending")

        const { data: approvedProjects, error: approvedError } = await supabase
          .from("projects")
          .select("id", { count: "exact" })
          .eq("status", "approved")

        const { data: rejectedProjects, error: rejectedError } = await supabase
          .from("projects")
          .select("id", { count: "exact" })
          .eq("status", "rejected")

        // Récupérer le nombre total d'utilisateurs
        const { data: users, error: usersError } = await supabase.from("users").select("id", { count: "exact" })

        if (pendingError || approvedError || rejectedError || usersError) {
          throw new Error("Erreur lors de la récupération des statistiques")
        }

        setStats({
          pendingProjects: pendingProjects?.length || 0,
          approvedProjects: approvedProjects?.length || 0,
          rejectedProjects: rejectedProjects?.length || 0,
          totalUsers: users?.length || 0,
        })
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message || "Une erreur est survenue",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [toast])

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord administrateur</h1>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projets en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingProjects}</div>
            <p className="text-xs text-muted-foreground">Nécessitent une validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projets approuvés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedProjects}</div>
            <p className="text-xs text-muted-foreground">Visibles sur la carte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projets rejetés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejectedProjects}</div>
            <p className="text-xs text-muted-foreground">Non approuvés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Utilisateurs inscrits</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <AdminProjectsList />
        </TabsContent>

        <TabsContent value="users">
          <AdminUsersList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

