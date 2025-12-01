"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Notification = {
  id: number
  type: "message" | "reaction" | "comment"
  content: string
  from: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "message",
    content: "has sent you a message",
    from: "John Doe",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "reaction",
    content: 'reacted to Daniel Ham\'s comment"Good work..."',
    from: "John Smitj",
    time: "9mn Ago",
    read: false,
  },
  {
    id: 3,
    type: "comment",
    content: 'commented "You did a good job"',
    from: "Haniel Aston",
    time: "19mn Ago",
    read: true,
  },
  {
    id: 4,
    type: "comment",
    content: 'commented "You did a good job"',
    from: "Haniel Aston",
    time: "1h Ago",
    read: true,
  },
  {
    id: 5,
    type: "comment",
    content: 'commented "You did a good job"',
    from: "Haniel Aston",
    time: "A week Ago",
    read: false,
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          <Badge variant="secondary" className="ml-2">
            {unreadCount} unreads
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn("flex items-start gap-3 p-4 border-b last:border-0", !notification.read && "bg-blue-50")}
            >
              {!notification.read && <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />}
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.from}</span> {notification.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

