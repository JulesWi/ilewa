"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoryMarkers, getAllCategories } from "@/lib/category-markers"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapLegendProps {
  onClose?: () => void
  compact?: boolean
}

export default function MapLegend({ onClose, compact = false }: MapLegendProps) {
  const categories = getAllCategories()

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-700">Légende</h3>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="space-y-1">
          {categories.map(({ key, info }) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm border-2"
                style={{
                  backgroundColor: info.bgColor,
                  borderColor: info.color,
                }}
              >
                {info.symbol}
              </div>
              <span className="text-xs text-slate-600">{info.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className="w-64">
      <CardHeader className="bg-slate-50 border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-slate-800">Légende de la Carte</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {categories.map(({ key, info }) => (
            <div key={key} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-3 shadow-sm"
                style={{
                  backgroundColor: info.bgColor,
                  borderColor: info.color,
                  borderWidth: '3px',
                  borderStyle: 'solid'
                }}
              >
                {info.symbol}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">{info.name}</p>
                <p className="text-xs text-slate-500">Projets {info.name.toLowerCase()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white bg-slate-600 shadow-sm">
              5+
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700">Cluster</p>
              <p className="text-xs text-slate-500">Groupe de projets</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
