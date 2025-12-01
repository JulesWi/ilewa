"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, Filter, MessageSquare, BarChart3, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Map,
    title: "Interactive Map",
    description: "Explore projects on an interactive world map with different base layers and measurement tools.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Filter projects by category, time period, and location to find exactly what you're looking for.",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: MessageSquare,
    title: "Collaboration",
    description: "Comment, discuss, and collaborate with other contributors on projects that interest you.",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: BarChart3,
    title: "Analytics & Statistics",
    description: "Visualize project trends and statistics with detailed interactive charts.",
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: Shield,
    title: "Moderation",
    description: "All projects are validated by our team before publication to ensure content quality.",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: Zap,
    title: "Real-Time",
    description: "Receive instant notifications about new projects and important updates.",
    color: "text-orange-600 dark:text-orange-400",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to discover, share, and manage innovative projects
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
