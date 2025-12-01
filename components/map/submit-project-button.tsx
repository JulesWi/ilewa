"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

const categories = [
  { value: "economie", label: "Économie" },
  { value: "sante", label: "Santé" },
  { value: "environnement", label: "Environnement" },
  { value: "epidemie", label: "Épidémie" },
  { value: "education", label: "Éducation" },
  { value: "mine", label: "Mine" },
  { value: "ecosysteme-aquatique", label: "Écosystème aquatique" },
  { value: "technologie", label: "Technologie" },
  { value: "politique", label: "Politique" },
  { value: "crime", label: "Crime" },
  { value: "culture", label: "Culture" },
  { value: "tourisme", label: "Tourisme" },
  { value: "pauvrete", label: "Pauvreté" },
  { value: "incendie", label: "Incendie" },
]

interface SubmitProjectButtonProps {
  onClose: () => void
}

export default function SubmitProjectButton({ onClose }: SubmitProjectButtonProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    category: "",
    description: "",
    date: "",
    repository_url: "",
    latitude: "",
    longitude: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate form data
      if (
        !formData.name ||
        !formData.author ||
        !formData.category ||
        !formData.description ||
        !formData.date ||
        !formData.repository_url ||
        !formData.latitude ||
        !formData.longitude
      ) {
        throw new Error("Veuillez remplir tous les champs obligatoires.")
      }

      // Convert latitude and longitude to numbers
      const latitude = Number.parseFloat(formData.latitude)
      const longitude = Number.parseFloat(formData.longitude)

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Les coordonnées doivent être des nombres valides.")
      }

      // Submit to Supabase
      const { data, error } = await supabase.from("projects").insert([
        {
          ...formData,
          latitude,
          longitude,
          status: "pending", // Default status for new projects
        },
      ])

      if (error) throw error

      // Reset form and close
      setFormData({
        name: "",
        author: "",
        category: "",
        description: "",
        date: "",
        repository_url: "",
        latitude: "",
        longitude: "",
      })

      onClose()
      router.refresh() // Refresh the page to show the new project
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la soumission du projet.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Soumettre un projet</CardTitle>
          <CardDescription>Partagez votre projet avec la communauté</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Fermer</span>
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du projet</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom du projet"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Auteur</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Votre nom"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date d'exécution</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description du projet"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repository_url">URL du dépôt</Label>
            <Input
              id="repository_url"
              name="repository_url"
              value={formData.repository_url}
              onChange={handleChange}
              placeholder="https://github.com/username/repository"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Ex: 48.8566"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Ex: 2.3522"
                required
              />
            </div>
          </div>

          {error && <div className="rounded-md bg-red-50 p-2 text-sm text-red-500">{error}</div>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Soumission..." : "Soumettre"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

