"use client"

import { Badge } from "@/components/ui/badge"

import * as React from "react"
import { ChevronRight, Home, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import QuoteOfTheDay from "./quote-of-the-day"
import MapInterface from "./map-interface"
import Dashboard from "./dashboard"

// Mock notifications data
const notifications = [
  {
    id: 1,
    sender: "John Doe",
    message: "Left a comment on your project",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    sender: "Haniel Aston",
    message: "Added new comments on Project X",
    time: "3h ago",
    unread: true,
  },
]

// Mock chat data
const chats = [
  {
    id: 1,
    name: "Georges O.",
    avatar: "/placeholder.svg",
    message: "I need place my order for...",
    time: "2h ago",
    online: true,
  },
  {
    id: 2,
    name: "Paul J.",
    avatar: "/placeholder.svg",
    message: "Could you check the latest...",
    time: "3h ago",
    online: false,
  },
]

export default function Layout() {
  const [view, setView] = React.useState<"map" | "dashboard">("map")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Harold Cooper" />
                    <AvatarFallback>HC</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">Harold Cooper</span>
                    <span className="text-xs text-muted-foreground">GIS Analyst</span>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            {/* Notifications Group */}
            <SidebarGroup>
              <SidebarGroupLabel>
                Notifications
                <Badge className="ml-auto">{notifications.length}</Badge>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <ScrollArea className="h-[200px]">
                  {notifications.map((notification) => (
                    <Card key={notification.id} className="mb-2 p-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{notification.sender[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.sender}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        {notification.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Chat Room Group */}
            <SidebarGroup>
              <SidebarGroupLabel>
                Chat Room
                <Badge variant="outline" className="ml-auto">
                  {chats.length}
                </Badge>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <ScrollArea className="h-[200px]">
                  {chats.map((chat) => (
                    <Card key={chat.id} className="mb-2 p-3">
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                            <AvatarFallback>{chat.name[0]}</AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{chat.name}</p>
                          <p className="text-xs text-muted-foreground">{chat.message}</p>
                          <p className="text-xs text-muted-foreground">{chat.time}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* View Toggle */}
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setView("map")} isActive={view === "map"}>
                    <Home className="h-4 w-4" />
                    <span>Map View</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setView("dashboard")} isActive={view === "dashboard"}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          {view === "map" ? (
            <div className="relative h-screen">
              <MapInterface />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <QuoteOfTheDay />
              </div>
            </div>
          ) : (
            <Dashboard />
          )}
        </main>
      </div>
    </SidebarProvider>
  )
}

