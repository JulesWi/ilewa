"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, Layers, MapPin, Ruler } from "lucide-react"
import { format } from "date-fns"
import SubmitProjectForm from "./submit-project-form"
import { supabase } from "@/lib/supabase-client"

export default function MapInterface() {
  const [date, setDate] = useState<Date>()
  const [baseMap, setBaseMap] = useState("osm")
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*")
    if (error) console.error("Error fetching projects:", error)
    else setProjects(data)
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden rounded-lg border bg-muted/50">
      <MapContainer center={[0, 0]} zoom={3} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url={
            baseMap === "osm"
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }
        />
        {projects.map((project: any) => (
          <Marker key={project.id} position={[project.latitude, project.longitude]}>
            <Popup>{project.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map controls */}
      <div className="absolute left-4 top-4 z-10 w-64 space-y-4">
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Base Maps</h3>
              <Select value={baseMap} onValueChange={setBaseMap}>
                <SelectTrigger>
                  <SelectValue placeholder="Select base map" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="osm">OpenStreetMap</SelectItem>
                  <SelectItem value="satellite">Satellite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Tools</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                  <span className="sr-only">Add marker</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Ruler className="h-4 w-4" />
                  <span className="sr-only">Measure</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Layers className="h-4 w-4" />
                  <span className="sr-only">Layers</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Date</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and filter */}
      <div className="absolute right-4 top-4 z-10 flex w-64 flex-col gap-4">
        <div className="flex gap-2">
          <Input type="search" placeholder="Search projects..." className="flex-1" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        <Button onClick={() => setShowSubmitForm(true)}>Submit Project</Button>
      </div>

      {showSubmitForm && <SubmitProjectForm onClose={() => setShowSubmitForm(false)} onSubmit={fetchProjects} />}
    </div>
  )
}

