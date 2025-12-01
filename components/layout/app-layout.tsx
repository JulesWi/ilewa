"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import NotificationsPanel from "@/components/notifications/notifications-panel"
import ChatList from "@/components/chat/chat-list"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export default function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* User profile header - always visible */}
      <div className="absolute left-4 top-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-md px-3 py-2 hover:bg-white/90"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Harold Cooper" />
                <AvatarFallback>HC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Harold Cooper</span>
                <span className="text-xs text-muted-foreground">GIS Analyst</span>
              </div>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main content */}
      <div className="flex-1 relative">{children}</div>

      {/* Sidebar - conditionally rendered */}
      {showSidebar && (
        <div className="w-80 bg-gray-50 border-l flex flex-col h-screen overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <NotificationsPanel />
            <div className="flex-1 overflow-hidden">
              <ChatList />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NotificationItem({ message, time, unread }: { message: string; time: string; unread?: boolean }) {
  return (
    <div className={cn("flex items-start gap-2 rounded-lg p-2", unread && "bg-sky-50")}>
      {unread && <div className="mt-2 h-2 w-2 rounded-full bg-sky-500" />}
      <div className="flex-1 space-y-1">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

function Select({ placeholder, options }: { placeholder: string; options: { label: string; value: string }[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-between">
          {placeholder}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option.value}>{option.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

