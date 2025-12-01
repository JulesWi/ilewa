"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModernButton } from "@/components/ui/modern-button"
import { Map, ExternalLink, MapPin } from "lucide-react"
import Link from "next/link"

interface MapPreviewProps {
  projectCount?: number
}

export default function MapPreview({ projectCount = 0 }: MapPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5 text-slate-700" />
            <CardTitle className="text-lg text-slate-800">Carte Interactive</CardTitle>
          </div>
          <Link href="/map">
            <ModernButton variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Ouvrir
            </ModernButton>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 relative">
        <Link href="/map">
          <div 
            className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 cursor-pointer transition-all duration-200 hover:from-slate-200 hover:to-slate-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Simulation d'une carte avec des points */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Grille simulée */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute border-slate-300" style={{
                      left: `${i * 12.5}%`,
                      top: 0,
                      bottom: 0,
                      borderLeftWidth: '1px'
                    }} />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute border-slate-300" style={{
                      top: `${i * 16.67}%`,
                      left: 0,
                      right: 0,
                      borderTopWidth: '1px'
                    }} />
                  ))}
                </div>
                
                {/* Points de projets simulés */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-slate-600 rounded-full shadow-lg animate-pulse" />
                <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-slate-600 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-slate-600 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-slate-600 rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1.5s' }} />
                
                {/* Overlay avec informations */}
                <div className={`absolute inset-0 bg-slate-900/50 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center text-white">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Cliquez pour explorer</p>
                    <p className="text-xs opacity-80">{projectCount} projets géolocalisés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Statistiques en bas */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4" />
              <span>{projectCount} projets</span>
            </div>
            <div className="text-slate-500">
              Dernière mise à jour: maintenant
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
