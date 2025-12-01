"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus } from "lucide-react"

interface ProjectsListProps {
  className?: string
}

// Mock projects data
const projects = [
  {
    id: 1,
    name: "Analyse des zones inondables",
    category: "environnement",
    date: "2023-05-15",
    status: "approved",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    name: "Impact économique du COVID-19",
    category: "economie",
    date: "2023-04-20",
    status: "pending",
    likes: 12,
    comments: 3,
  },
  {
    id: 3,
    name: "Cartographie des centres de santé",
    category: "sante",
    date: "2023-06-10",
    status: "approved",
    likes: 36,
    comments: 15,
  },
  {
    id: 4,
    name: "Suivi des cas d'épidémie",
    category: "epidemie",
    date: "2023-03-05",
    status: "rejected",
    likes: 8,
    comments: 2,
  },
  {
    id: 5,
    name: "Zones touristiques populaires",
    category: "tourisme",
    date: "2023-07-01",
    status: "approved",
    likes: 42,
    comments: 11,
  },
]

export default function ProjectsList({ className }: ProjectsListProps) {
  const [filter, setFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    return project.status === filter
  })

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      economie: "bg-green-100 text-green-800 hover:bg-green-200",
      sante: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      environnement: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      epidemie: "bg-red-100 text-red-800 hover:bg-red-200",
      tourisme: "bg-amber-100 text-amber-800 hover:bg-amber-200",
      default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    }

    return colors[category] || colors.default
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      approved: "bg-green-100 text-green-800 hover:bg-green-200",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      rejected: "bg-red-100 text-red-800 hover:bg-red-200",
      default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    }

    return colors[status] || colors.default
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Mes projets</CardTitle>
          <CardDescription>Gérez vos projets soumis et suivez leur statut</CardDescription>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau projet
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Tous
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("approved")}
          >
            Approuvés
          </Button>
          <Button variant={filter === "pending" ? "default" : "outline"} size="sm" onClick={() => setFilter("pending")}>
            En attente
          </Button>
          <Button
            variant={filter === "rejected" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("rejected")}
          >
            Rejetés
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Commentaires</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/projects/${project.id}`} className="hover:underline">
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
                  </TableCell>
                  <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status === "approved" && "Approuvé"}
                      {project.status === "pending" && "En attente"}
                      {project.status === "rejected" && "Rejeté"}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.likes}</TableCell>
                  <TableCell>{project.comments}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

