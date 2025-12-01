"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Search } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts"

const projectsData = [
  { name: "Project 1", category: "Education", status: "approved", date: "2024-03-01" },
  { name: "Project 2", category: "Environment", status: "pending", date: "2024-03-02" },
  // ... more projects
]

const timelineData = [
  { week: "Week 1", value: 20 },
  { week: "Week 2", value: 25 },
  { week: "Week 3", value: 22 },
  { week: "Week 4", value: 35 },
  { week: "Week 5", value: 5 },
]

const categoryData = [
  { category: "Education", value: 30 },
  { category: "Environment", value: 45 },
  { category: "Technology", value: 25 },
  { category: "Water", value: 35 },
  { category: "Health", value: 40 },
]

export default function DashboardView() {
  const [selectedCategory, setSelectedCategory] = useState<string>()

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add project
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search projects..." className="w-[300px] pl-9" />
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {projectsData.slice(0, 4).map((project, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Category: {project.category}</p>
                <p className="text-sm text-muted-foreground">Status: {project.status}</p>
                <p className="text-sm text-muted-foreground">Date: {project.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stats by Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={categoryData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <Radar name="Value" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploaded Projects Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="flex-1">
                <p className="font-medium">Project "School Proximity" approved</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            {/* More activity items... */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

