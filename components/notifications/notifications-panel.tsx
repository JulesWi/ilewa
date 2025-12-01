"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
    content: 'reacted to Daniel Ham\'s comment "Good work..."',
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

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="border-b">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Notifications</h3>
          <Badge>{unreadCount} unreads</Badge>
        </div>
        <ScrollArea className="h-48">
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn("flex items-start gap-3 p-3 rounded-md", !notification.read && "bg-blue-50")}
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
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

