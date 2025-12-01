"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Mock data for project distribution by category
const data = [
  { name: "Santé", value: 20, color: "#3b82f6" },
  { name: "Économie", value: 20, color: "#22c55e" },
  { name: "Environnement", value: 20, color: "#10b981" },
  { name: "Épidémie", value: 15, color: "#ef4444" },
  { name: "Tourisme", value: 15, color: "#f59e0b" },
  { name: "Autres", value: 10, color: "#6b7280" },
]

export default function ProjectsDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution des projets</CardTitle>
        <CardDescription>Répartition par catégorie</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

