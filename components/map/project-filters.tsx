"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface ProjectFiltersProps {
  filters: {
    category: string
    dateRange: DateRange
  }
  onFilterChange: (filters: any) => void
  onClose: () => void
}

const categories = [
  { value: "all", label: "Toutes les catégories" },
  { value: "economie", label: "Économie" },
  { value: "sante", label: "Santé" },
  { value: "environnement", label: "Environnement" },
  { value: "epidemie", label: "Épidémie" },
  { value: "education", label: "Éducation" },
  { value: "mine", label: "Mine" },
  { value: "ecosysteme-aquatique", label: "Écosystème aquatique" },
  { value: "technologie", label: "Technologie" },
  { value: "politique", label: "Politique" },
  { value: "crime", label: "Crime" },
  { value: "culture", label: "Culture" },
  { value: "tourisme", label: "Tourisme" },
  { value: "pauvrete", label: "Pauvreté" },
  { value: "incendie", label: "Incendie" },
]

export default function ProjectFilters({ filters, onFilterChange, onClose }: ProjectFiltersProps) {
  const [category, setCategory] = useState(filters.category)
  const [date, setDate] = useState<DateRange | undefined>(filters.dateRange)
  const router = useRouter()
  const pathname = usePathname()

  const handleApplyFilters = () => {
    const newFilters = {
      category,
      dateRange: date || { startDate: null, endDate: null },
    }

    onFilterChange(newFilters)

    // Update URL with filters
    const params = new URLSearchParams()
    if (category && category !== "all") {
      params.set("category", category)
    }
    if (date?.from) {
      params.set("startDate", date.from.toISOString().split("T")[0])
    }
    if (date?.to) {
      params.set("endDate", date.to.toISOString().split("T")[0])
    }

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)

    onClose()
  }

  const handleResetFilters = () => {
    setCategory("all")
    setDate(undefined)

    onFilterChange({
      category: "all",
      dateRange: { startDate: null, endDate: null },
    })

    router.push(pathname)
    onClose()
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Filtres de projets</CardTitle>
          <CardDescription>Filtrer par catégorie et période</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Fermer</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pb-0">
        <div className="space-y-2">
          <label className="text-sm font-medium">Catégorie</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Période</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "P", { locale: fr })} - {format(date.to, "P", { locale: fr })}
                    </>
                  ) : (
                    format(date.from, "P", { locale: fr })
                  )
                ) : (
                  <span>Sélectionner une période</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={fr}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleResetFilters}>
          Réinitialiser
        </Button>
        <Button onClick={handleApplyFilters}>Appliquer</Button>
      </CardFooter>
    </Card>
  )
}

