"use client"

import { Circle, MapPin, Minus, Plus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MapToolboxProps {
  onToolSelect: (tool: string) => void
  activeBaseMap: string
  onBaseMapChange: (baseMap: string) => void
}

export default function MapToolbox({ onToolSelect, activeBaseMap, onBaseMapChange }: MapToolboxProps) {
  return (
    <Card className="w-64 bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Basemaps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={activeBaseMap === "OSM" ? "default" : "outline"}
            size="sm"
            onClick={() => onBaseMapChange("OSM")}
          >
            OSM
          </Button>
          <Button
            variant={activeBaseMap === "TOPO" ? "default" : "outline"}
            size="sm"
            onClick={() => onBaseMapChange("TOPO")}
          >
            TOPO
          </Button>
          <Button
            variant={activeBaseMap === "SAT" ? "default" : "outline"}
            size="sm"
            onClick={() => onBaseMapChange("SAT")}
          >
            SAT
          </Button>
        </div>

        <CardTitle className="text-lg mt-4">Measures Tools</CardTitle>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="icon" onClick={() => onToolSelect("circle")}>
            <Circle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onToolSelect("square")}>
            <Square className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onToolSelect("line")}>
            <div className="h-4 w-4 rotate-45">Σ</div>
          </Button>
        </div>

        <CardTitle className="text-lg mt-4">Tools</CardTitle>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" size="icon" onClick={() => onToolSelect("marker")}>
            <MapPin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onToolSelect("zoomIn")}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onToolSelect("zoomOut")}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onToolSelect("pan")}>
            <span className="text-lg">↖</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

