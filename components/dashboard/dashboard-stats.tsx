"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

export default function DashboardStats() {
  // Mock data
  const stats = [
    {
      title: "Projets totaux",
      value: "5",
      change: "+12%",
      changeType: "increase",
      description: "Depuis le mois dernier",
    },
    {
      title: "Utilisateurs actifs",
      value: "156",
      change: "+8%",
      changeType: "increase",
      description: "+24 ce mois-ci",
    },
    {
      title: "Commentaires",
      value: "89",
      change: "+3%",
      changeType: "increase",
      description: "Interactions ce mois-ci",
    },
    {
      title: "Likes totaux",
      value: "330",
      change: "0%",
      changeType: "neutral",
      description: "Aucun changement",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div
              className={`flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ${
                stat.changeType === "increase"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : stat.changeType === "decrease"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {stat.changeType === "increase" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : stat.changeType === "decrease" ? (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              ) : null}
              {stat.change}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

