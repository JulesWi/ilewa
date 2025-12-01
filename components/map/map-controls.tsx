"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, ZoomIn, ZoomOut, Home, Filter, PlusCircle, Ruler, Pencil, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface MapControlsProps {
  activeBaseMap: string
  onBaseMapChange: (baseMap: string) => void
  onToggleFilters: () => void
  onToggleSubmitForm: () => void
}

export default function MapControls({
  activeBaseMap,
  onBaseMapChange,
  onToggleFilters,
  onToggleSubmitForm,
}: MapControlsProps) {
  const router = useRouter()

  return (
    <Card className="w-64 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Contrôles de carte</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-3">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Fonds de carte</h3>
          <Tabs defaultValue={activeBaseMap} onValueChange={onBaseMapChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="osm">OSM</TabsTrigger>
              <TabsTrigger value="topo">Topo</TabsTrigger>
              <TabsTrigger value="esri">Sat</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Zoom</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom in</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Zoom out</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Home className="h-4 w-4" />
              <span className="sr-only">Reset view</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Outils</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MapPin className="h-4 w-4" />
              <span className="sr-only">Add marker</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Mesures</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Ruler className="h-4 w-4" />
              <span className="sr-only">Measure</span>
            </Button>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button variant="default" className="flex-1" onClick={onToggleFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button variant="default" className="flex-1" onClick={onToggleSubmitForm}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Projet
          </Button>
          <Button variant="default" className="flex-1" onClick={() => router.push("/dashboard")}>
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

