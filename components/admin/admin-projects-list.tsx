"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, X, Eye } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useToast } from "@/components/ui/use-toast"

export default function AdminProjectsList() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          users:author_id (full_name, email)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les projets",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewProject = (project: any) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleApproveProject = async (id: string) => {
    try {
      const updateData: any = { status: "approved", updated_at: new Date().toISOString() }
      // @ts-ignore - Supabase typing issue
      const { error } = await supabase
        .from("projects")
        .update(updateData)
        .eq("id", id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Le projet a été approuvé",
      })

      // Mettre à jour la liste des projets
      setProjects(projects.map((project) => (project.id === id ? { ...project, status: "approved" } : project)))

      setIsDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'approuver le projet",
        variant: "destructive",
      })
    }
  }

  const handleRejectProject = async (id: string) => {
    try {
      const updateData: any = { status: "rejected", updated_at: new Date().toISOString() }
      // @ts-ignore - Supabase typing issue
      const { error } = await supabase
        .from("projects")
        .update(updateData)
        .eq("id", id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Le projet a été rejeté",
      })

      // Mettre à jour la liste des projets
      setProjects(projects.map((project) => (project.id === id ? { ...project, status: "rejected" } : project)))

      setIsDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de rejeter le projet",
        variant: "destructive",
      })
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      education: "bg-blue-100 text-blue-800",
      environment: "bg-green-100 text-green-800",
      technology: "bg-purple-100 text-purple-800",
      water: "bg-cyan-100 text-cyan-800",
      health: "bg-red-100 text-red-800",
      economy: "bg-amber-100 text-amber-800",
      culture: "bg-pink-100 text-pink-800",
      tourism: "bg-indigo-100 text-indigo-800",
      default: "bg-gray-100 text-gray-800",
    }

    return colors[category] || colors.default
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800",
    }

    return colors[status] || colors.default
  }

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      approved: "Approuvé",
      pending: "En attente",
      rejected: "Rejeté",
    }

    return statusMap[status] || status
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gestion des projets</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Aucun projet trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.users?.full_name || "Utilisateur inconnu"}</TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
                        </TableCell>
                        <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleViewProject(project)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Voir</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-green-600 hover:bg-green-100 hover:text-green-700"
                              onClick={() => handleApproveProject(project.id)}
                              disabled={project.status === "approved"}
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Approuver</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-600 hover:bg-red-100 hover:text-red-700"
                              onClick={() => handleRejectProject(project.id)}
                              disabled={project.status === "rejected"}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Rejeter</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedProject && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedProject.name}</DialogTitle>
              <DialogDescription>
                Soumis par {selectedProject.users?.full_name || "Utilisateur inconnu"} le{" "}
                {new Date(selectedProject.created_at).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Catégorie</h4>
                <p>
                  <Badge className={getCategoryColor(selectedProject.category)}>{selectedProject.category}</Badge>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.description || "Aucune description fournie"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">URL du dépôt</h4>
                <p className="text-sm text-blue-600 underline">
                  <a href={selectedProject.repository_url} target="_blank" rel="noopener noreferrer">
                    {selectedProject.repository_url}
                  </a>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Coordonnées</h4>
                <p className="text-sm">
                  Latitude: {selectedProject.latitude}, Longitude: {selectedProject.longitude}
                </p>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button
                variant="destructive"
                onClick={() => handleRejectProject(selectedProject.id)}
                disabled={selectedProject.status === "rejected"}
              >
                Rejeter
              </Button>
              <Button
                variant="default"
                onClick={() => handleApproveProject(selectedProject.id)}
                disabled={selectedProject.status === "approved"}
              >
                Approuver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

