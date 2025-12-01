"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for projects over time
const data = [
  { month: "Jan", projects: 2 },
  { month: "Fév", projects: 3 },
  { month: "Mar", projects: 5 },
  { month: "Avr", projects: 4 },
  { month: "Mai", projects: 7 },
  { month: "Juin", projects: 6 },
  { month: "Juil", projects: 8 },
  { month: "Août", projects: 10 },
  { month: "Sep", projects: 8 },
  { month: "Oct", projects: 12 },
  { month: "Nov", projects: 10 },
  { month: "Déc", projects: 15 },
]

export default function ProjectsTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projets au fil du temps</CardTitle>
        <CardDescription>Nombre de projets soumis par mois</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

