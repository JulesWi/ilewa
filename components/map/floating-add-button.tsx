"use client"

import { useState } from "react"
import { Plus, Upload } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import Link from "next/link"

export default function FloatingAddButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6" style={{ zIndex: 1000 }}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <Link href="/submit-project">
          <ModernButton 
            variant="premium"
            size="lg"
            className="h-16 w-16 rounded-full p-0 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <Plus className="h-6 w-6 text-white" />
              {isHovered && (
                <span className="text-xs text-white mt-1 font-medium">
                  Projet
                </span>
              )}
            </div>
          </ModernButton>
        </Link>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-20 right-0 px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-white whitespace-nowrap transition-all duration-200 bg-slate-800">
            <div className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Soumettre un nouveau projet
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
          </div>
        )}
      </div>
    </div>
  )
}
