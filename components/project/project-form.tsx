"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2, AlertCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"
import { useToast } from "@/components/ui/use-toast"
import dynamic from 'next/dynamic'
import LocationAutocomplete from './location-autocomplete'

// Charger LocationPicker uniquement côté client
const LocationPicker = dynamic(() => import('./location-picker'), { ssr: false })

export default function ProjectForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    repository_url: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    additional_info: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleLocationSelect = (location: { name: string; latitude: number; longitude: number }) => {
    setFormData((prev) => ({
      ...prev,
      location: location.name,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
    }))
    // Effacer les erreurs de localisation
    setErrors((prev) => ({ ...prev, location: '', latitude: '', longitude: '' }))
  }

  // Validation des champs
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.category) newErrors.category = 'La catégorie est obligatoire'
    if (!formData.name) newErrors.name = 'Le nom du projet est obligatoire'
    if (!formData.repository_url) newErrors.repository_url = 'L\'URL du projet est obligatoire'
    if (!formData.location) newErrors.location = 'La localisation est obligatoire'
    if (!formData.latitude || !formData.longitude) {
      newErrors.coordinates = 'Les coordonnées sont obligatoires'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Valider le formulaire
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Vérifier si l'utilisateur est connecté
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour soumettre un projet",
          variant: "destructive",
        })
        router.push("/auth")
        return
      }

      // Convertir les coordonnées en nombres
      const latitude = Number.parseFloat(formData.latitude)
      const longitude = Number.parseFloat(formData.longitude)

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error("Les coordonnées doivent être des nombres valides")
      }

      // Soumettre le projet à Supabase
      const { error } = await supabase.from("projects").insert({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        author_id: user.id,
        repository_url: formData.repository_url,
        location: formData.location, // Nom textuel du lieu
        latitude: latitude,
        longitude: longitude,
        status: "pending", // En attente de validation par un administrateur
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Succès",
        description: "Votre projet a été soumis avec succès et est en attente de validation",
      })

      // Rediriger vers la page d'accueil
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la soumission du projet",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Soumettre un nouveau projet</CardTitle>
        <CardDescription>Remplissez les détails pour ajouter votre projet à la carte</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economie">Économie</SelectItem>
                <SelectItem value="sante">Santé</SelectItem>
                <SelectItem value="environnement">Environnement</SelectItem>
                <SelectItem value="education">Éducation</SelectItem>
                <SelectItem value="epidemie">Épidémie</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.category}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Nom du projet <span className="text-red-500">*</span>
            </label>
            <Input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Nom de votre projet"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              URL du projet <span className="text-red-500">*</span>
            </label>
            <Input
              name="repository_url"
              value={formData.repository_url}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className={errors.repository_url ? 'border-red-500' : ''}
            />
            {errors.repository_url && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.repository_url}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description du projet</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description et crédits de votre projet"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Nom du lieu <span className="text-red-500">*</span>
              </label>
              <LocationAutocomplete
                value={formData.location}
                onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                onLocationSelect={handleLocationSelect}
                placeholder="Rechercher un lieu (ex: Cotonou, Bénin)"
                className={errors.location ? 'border-red-500' : ''}
              />
              <p className="text-xs text-slate-500">
                💡 Tapez au moins 3 caractères pour voir les suggestions
              </p>
              {errors.location && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.location}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Coordonnées GPS <span className="text-red-500">*</span>
              </label>
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                initialLocation={formData.location}
                initialLat={formData.latitude ? parseFloat(formData.latitude) : undefined}
                initialLng={formData.longitude ? parseFloat(formData.longitude) : undefined}
              />
              {errors.coordinates && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.coordinates}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">Date de réalisation</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[9999]">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Informations supplémentaires</label>
            <Textarea
              name="additional_info"
              value={formData.additional_info}
              onChange={handleChange}
              placeholder="Autres informations pertinentes"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Soumission en cours...
              </>
            ) : (
              "Soumettre le projet"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

