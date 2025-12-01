"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface MapFiltersProps {
  selectedCategory: string | null
  onCategoryChange: (category: string) => void
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "education", label: "Education", icon: "🎓" },
  { value: "environment", label: "Environment", icon: "🌿" },
  { value: "technology", label: "Technology", icon: "💻" },
  { value: "water", label: "Drinking Water", icon: "💧" },
]

export default function MapFilters({ selectedCategory, onCategoryChange }: MapFiltersProps) {
  const selectedCategoryLabel = categories.find((c) => c.value === selectedCategory)?.label || "Filter by Category"

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardContent className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedCategoryLabel}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {categories.map((category) => (
              <DropdownMenuItem key={category.value} onClick={() => onCategoryChange(category.value)}>
                {category.icon && <span className="mr-2">{category.icon}</span>}
                {category.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

