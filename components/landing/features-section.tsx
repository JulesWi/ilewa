"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, Filter, MessageSquare, BarChart3, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Map,
    title: "Carte Interactive",
    description: "Explorez les projets sur une carte mondiale interactive avec différents fonds de carte et outils de mesure.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Filter,
    title: "Filtrage Avancé",
    description: "Filtrez les projets par catégorie, période, et localisation pour trouver exactement ce que vous cherchez.",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: MessageSquare,
    title: "Collaboration",
    description: "Commentez, discutez et collaborez avec d'autres contributeurs sur les projets qui vous intéressent.",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: BarChart3,
    title: "Analyses & Statistiques",
    description: "Visualisez les tendances et statistiques des projets avec des graphiques interactifs détaillés.",
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: Shield,
    title: "Modération",
    description: "Tous les projets sont validés par notre équipe avant publication pour garantir la qualité du contenu.",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: Zap,
    title: "Temps Réel",
    description: "Recevez des notifications instantanées sur les nouveaux projets et les mises à jour importantes.",
    color: "text-orange-600 dark:text-orange-400",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Fonctionnalités Puissantes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour découvrir, partager et gérer des projets innovants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
