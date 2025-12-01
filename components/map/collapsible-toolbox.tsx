"use client"

import { useState } from "react"
import { 
  Circle, MapPin, Minus, Plus, Square, Settings, 
  ChevronLeft, ChevronRight, Map, Ruler, Filter,
  Calendar as CalendarIcon, Quote, MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModernButton } from "@/components/ui/modern-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CollapsibleToolboxProps {
  onToolSelect: (tool: string) => void
  activeBaseMap: string
  onBaseMapChange: (baseMap: string) => void
  activeTool: string | null
  selectedCategory: string | null
  onCategoryChange: (category: string) => void
  onToggleCalendar: () => void
  onToggleQuote: () => void
  onToggleComments: () => void
  showCalendar: boolean
  showQuote: boolean
  showComments: boolean
}

const categories = [
  { value: "all", label: "Toutes", icon: "🌍", color: "bg-gray-100" },
  { value: "education", label: "Éducation", icon: "🎓", color: "bg-blue-100" },
  { value: "environment", label: "Environnement", icon: "🌿", color: "bg-green-100" },
  { value: "technology", label: "Technologie", icon: "💻", color: "bg-purple-100" },
  { value: "water", label: "Eau", icon: "💧", color: "bg-cyan-100" },
  { value: "health", label: "Santé", icon: "🏥", color: "bg-red-100" },
  { value: "economy", label: "Économie", icon: "💼", color: "bg-yellow-100" },
  { value: "culture", label: "Culture", icon: "🎨", color: "bg-pink-100" },
  { value: "tourism", label: "Tourisme", icon: "🏖️", color: "bg-orange-100" },
]

const basemaps = [
  { value: "OSM", label: "OpenStreetMap", description: "Carte standard" },
  { value: "TOPO", label: "Topographique", description: "Relief et altitude" },
  { value: "SAT", label: "Satellite", description: "Vue aérienne" },
]

const measureTools = [
  { value: "point", label: "Point", icon: MapPin, description: "Marquer un point" },
  { value: "circle", label: "Cercle", icon: Circle, description: "Mesurer un rayon" },
  { value: "square", label: "Polygone", icon: Square, description: "Mesurer une surface" },
]

export default function CollapsibleToolbox({
  onToolSelect,
  activeBaseMap,
  onBaseMapChange,
  activeTool,
  selectedCategory,
  onCategoryChange,
  onToggleCalendar,
  onToggleQuote,
  onToggleComments,
  showCalendar,
  showQuote,
  showComments
}: CollapsibleToolboxProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="fixed left-4 top-20 flex" style={{ zIndex: 1000 }}>
      {/* Bouton de toggle principal */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border border-slate-200 transition-all duration-300">
        <ModernButton
          variant={isExpanded ? "default" : "secondary"}
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 h-auto"
        >
          <Settings className="h-5 w-5 mr-2" />
          <span className="font-medium">Outils</span>
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4 ml-2" />
          ) : (
            <ChevronRight className="h-4 w-4 ml-2" />
          )}
        </ModernButton>
      </Card>

      {/* Panel dépliable */}
      {isExpanded && (
        <Card className="ml-2 w-80 bg-white/95 backdrop-blur-sm shadow-xl border border-slate-200 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <CardHeader className="pb-3 bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-lg font-bold text-slate-800">
              Boîte à Outils
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 space-y-4">
            {/* Section Fonds de Carte */}
            <Collapsible open={activeSection === 'basemaps'} onOpenChange={() => toggleSection('basemaps')}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-3 h-auto hover:bg-blue-50"
                  style={{ color: '#2b81bf' }}
                >
                  <div className="flex items-center">
                    <Map className="h-4 w-4 mr-2" />
                    <span className="font-medium">Fonds de Carte</span>
                  </div>
                  <Badge variant="secondary" style={{ backgroundColor: '#2b81bf', color: 'white' }}>
                    {activeBaseMap}
                  </Badge>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                {basemaps.map((basemap) => (
                  <Button
                    key={basemap.value}
                    variant={activeBaseMap === basemap.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onBaseMapChange(basemap.value)}
                    className="w-full justify-start"
                    style={activeBaseMap === basemap.value ? { 
                      backgroundColor: '#2b81bf', 
                      borderColor: '#2b81bf' 
                    } : {}}
                  >
                    <div className="text-left">
                      <div className="font-medium">{basemap.label}</div>
                      <div className="text-xs opacity-70">{basemap.description}</div>
                    </div>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Section Outils de Mesure */}
            <Collapsible open={activeSection === 'measure'} onOpenChange={() => toggleSection('measure')}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-3 h-auto hover:bg-blue-50"
                  style={{ color: '#2b81bf' }}
                >
                  <div className="flex items-center">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span className="font-medium">Outils de Mesure</span>
                  </div>
                  {activeTool && (
                    <Badge variant="secondary" style={{ backgroundColor: '#2b81bf', color: 'white' }}>
                      Actif
                    </Badge>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <div className="grid grid-cols-1 gap-2">
                  {measureTools.map((tool) => (
                    <Button
                      key={tool.value}
                      variant={activeTool === tool.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => onToolSelect(tool.value)}
                      className="justify-start"
                      style={activeTool === tool.value ? { 
                        backgroundColor: '#2b81bf', 
                        borderColor: '#2b81bf' 
                      } : {}}
                    >
                      <tool.icon className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">{tool.label}</div>
                        <div className="text-xs opacity-70">{tool.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Section Filtres */}
            <Collapsible open={activeSection === 'filters'} onOpenChange={() => toggleSection('filters')}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-3 h-auto hover:bg-blue-50"
                  style={{ color: '#2b81bf' }}
                >
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="font-medium">Filtres par Catégorie</span>
                  </div>
                  <Badge variant="secondary" style={{ backgroundColor: '#2b81bf', color: 'white' }}>
                    {categories.find(c => c.value === selectedCategory)?.label || 'Toutes'}
                  </Badge>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => onCategoryChange(category.value)}
                      className="justify-start h-auto p-2"
                      style={selectedCategory === category.value ? { 
                        backgroundColor: '#2b81bf', 
                        borderColor: '#2b81bf' 
                      } : {}}
                    >
                      <div className="text-left">
                        <div className="flex items-center">
                          <span className="mr-1 text-sm">{category.icon}</span>
                          <span className="text-xs font-medium">{category.label}</span>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Section Widgets */}
            <div>
              <h4 className="font-medium mb-3 flex items-center" style={{ color: '#2b81bf' }}>
                <Settings className="h-4 w-4 mr-2" />
                Widgets d'Interface
              </h4>
              <div className="space-y-2">
                <Button
                  variant={showCalendar ? "default" : "outline"}
                  size="sm"
                  onClick={onToggleCalendar}
                  className="w-full justify-start"
                  style={showCalendar ? { 
                    backgroundColor: '#2b81bf', 
                    borderColor: '#2b81bf' 
                  } : {}}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Calendrier
                </Button>
                <Button
                  variant={showQuote ? "default" : "outline"}
                  size="sm"
                  onClick={onToggleQuote}
                  className="w-full justify-start"
                  style={showQuote ? { 
                    backgroundColor: '#2b81bf', 
                    borderColor: '#2b81bf' 
                  } : {}}
                >
                  <Quote className="h-4 w-4 mr-2" />
                  Citation du Jour
                </Button>
                <Button
                  variant={showComments ? "default" : "outline"}
                  size="sm"
                  onClick={onToggleComments}
                  className="w-full justify-start"
                  style={showComments ? { 
                    backgroundColor: '#2b81bf', 
                    borderColor: '#2b81bf' 
                  } : {}}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Commentaires
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
