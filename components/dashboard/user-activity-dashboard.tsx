"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Users, Clock, MousePointerClick, Search, FileText, ArrowUpRight } from "lucide-react"
import dynamic from "next/dynamic"

// Import mock data
import mockData from "@/lib/mock-user-data"

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("./user-activity-map"), {
  ssr: false,
})

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#4CAF50", "#E91E63"]

export default function UserActivityDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("all")
  const [filteredData, setFilteredData] = useState(mockData)

  // Process data for charts
  const pageViewData = processPageViewData(filteredData.sessions)
  const deviceData = processDeviceData(filteredData.sessions)
  const actionData = processActionData(filteredData.sessions)
  const timelineData = processTimelineData(filteredData.sessions)

  // Get top users by activity
  const topUsers = getTopUsers(filteredData.users, filteredData.sessions)

  // Get recent events
  const recentEvents = getRecentEvents(filteredData.sessions)

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">User Activity Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 hours</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Users"
              value={filteredData.metadata.total_users.toString()}
              description="Unique users"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Sessions"
              value={filteredData.metadata.total_sessions.toString()}
              description="User sessions"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Events"
              value={filteredData.metadata.total_events.toString()}
              description="User interactions"
              icon={<MousePointerClick className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Avg. Events/Session"
              value={(filteredData.metadata.total_events / filteredData.metadata.total_sessions).toFixed(1)}
              description="Engagement metric"
              icon={<ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>User events over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="sessions" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actions Distribution</CardTitle>
                <CardDescription>Types of user interactions</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={actionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {actionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pageViewData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="page" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>User devices</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>User locations based on session data</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px] p-0">
              <MapWithNoSSR sessions={filteredData.sessions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Active Users</CardTitle>
              <CardDescription>Users with most sessions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {topUsers.map((user) => (
                    <div key={user.user_id} className="flex items-start space-x-4 rounded-md border p-4">
                      <Avatar>
                        <AvatarFallback>{user.user_id.substring(5, 7).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{user.user_id}</p>
                          <Badge variant={user.user_type === "premium" ? "default" : "outline"}>{user.user_type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Registered: {new Date(user.registration_date).toLocaleDateString()}
                        </p>
                        <div className="flex space-x-4 text-xs">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{user.session_count} sessions</span>
                          </div>
                          <div className="flex items-center">
                            <MousePointerClick className="mr-1 h-3 w-3" />
                            <span>{user.event_count} events</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Latest user interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.event_id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        {event.action === "page_view" && <FileText className="h-4 w-4" />}
                        {event.action === "click" && <MousePointerClick className="h-4 w-4" />}
                        {event.action === "search" && <Search className="h-4 w-4" />}
                        {event.action === "form_submit" && <FileText className="h-4 w-4" />}
                        {!["page_view", "click", "search", "form_submit"].includes(event.action) && (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium capitalize">{event.action.replace("_", " ")}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <p className="text-xs">
                          <span className="font-medium">User:</span> {event.user_id} |
                          <span className="font-medium"> Page:</span> {event.page}
                        </p>
                        {event.action === "click" && (
                          <p className="text-xs">
                            <span className="font-medium">Element:</span> {event.properties.element_id} (
                            {event.properties.element_type})
                          </p>
                        )}
                        {event.action === "search" && (
                          <p className="text-xs">
                            <span className="font-medium">Query:</span> "{event.properties.query}" |
                            <span className="font-medium"> Results:</span> {event.properties.results_count}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper component for stat cards
function StatCard({ title, value, description, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Data processing functions
function processPageViewData(sessions) {
  const pageViews = {}

  sessions.forEach((session) => {
    session.events.forEach((event) => {
      if (event.action === "page_view") {
        pageViews[event.page] = (pageViews[event.page] || 0) + 1
      }
    })
  })

  return Object.entries(pageViews)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8)
}

function processDeviceData(sessions) {
  const devices = {}

  sessions.forEach((session) => {
    devices[session.device.type] = (devices[session.device.type] || 0) + 1
  })

  return Object.entries(devices).map(([name, value]) => ({ name, value }))
}

function processActionData(sessions) {
  const actions = {}

  sessions.forEach((session) => {
    session.events.forEach((event) => {
      actions[event.action] = (actions[event.action] || 0) + 1
    })
  })

  return Object.entries(actions)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

function processTimelineData(sessions) {
  const timeline = {}

  sessions.forEach((session) => {
    const date = new Date(session.start_time).toLocaleDateString()

    if (!timeline[date]) {
      timeline[date] = { date, sessions: 0, events: 0 }
    }

    timeline[date].sessions += 1
    timeline[date].events += session.events.length
  })

  return Object.values(timeline).sort((a, b) => new Date(a.date) - new Date(b.date))
}

function getTopUsers(users, sessions) {
  const userActivity = {}

  users.forEach((user) => {
    userActivity[user.user_id] = {
      ...user,
      session_count: 0,
      event_count: 0,
    }
  })

  sessions.forEach((session) => {
    if (userActivity[session.user_id]) {
      userActivity[session.user_id].session_count += 1
      userActivity[session.user_id].event_count += session.events.length
    }
  })

  return Object.values(userActivity)
    .sort((a, b) => b.event_count - a.event_count)
    .slice(0, 10)
}

function getRecentEvents(sessions) {
  const events = []

  sessions.forEach((session) => {
    session.events.forEach((event) => {
      events.push({
        ...event,
        user_id: session.user_id,
      })
    })
  })

  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 20)
}

