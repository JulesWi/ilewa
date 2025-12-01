"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Leaf, Cpu, Droplet, Heart, TrendingUp, Palette, Plane } from "lucide-react"

const categories = [
  { icon: BookOpen, name: "Éducation", color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" },
  { icon: Leaf, name: "Environnement", color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" },
  { icon: Cpu, name: "Technologie", color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" },
  { icon: Droplet, name: "Eau", color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300" },
  { icon: Heart, name: "Santé", color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" },
  { icon: TrendingUp, name: "Économie", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300" },
  { icon: Palette, name: "Culture", color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300" },
  { icon: Plane, name: "Tourisme", color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300" },
]

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Catégories de Projets
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explorez des projets dans différents domaines d'impact
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="hover:scale-105 transition-transform duration-300 cursor-pointer border-2"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg text-center">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
