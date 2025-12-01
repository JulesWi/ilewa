"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface LoadingFallbackProps {
  message?: string
  className?: string
}

export function LoadingFallback({ message = "Chargement...", className = "" }: LoadingFallbackProps) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function LoadingSpinner({ size = "default", className = "" }: { size?: "sm" | "default" | "lg", className?: string }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

export function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Chargement de l'application</h2>
          <p className="text-sm text-muted-foreground">Veuillez patienter...</p>
        </div>
      </div>
    </div>
  )
}

export function MapLoading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="shadow-xl border-2">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="absolute inset-0 h-12 w-12 animate-ping text-primary/20">
              <Loader2 className="h-12 w-12" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-base font-medium">Chargement de la carte interactive</p>
            <p className="text-xs text-muted-foreground">Initialisation de Leaflet et des marqueurs...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
