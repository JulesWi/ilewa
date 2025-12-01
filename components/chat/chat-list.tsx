"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Friend {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline"
  lastMessage?: string
  unreadCount?: number
}

const mockFriends: Friend[] = [
  { id: "1", name: "Georges O.", status: "online", lastMessage: "Hello, I'd like to place an order", unreadCount: 1 },
  { id: "2", name: "Paul J.", status: "offline", lastMessage: "Great project!" },
  { id: "3", name: "Ken R.", status: "online" },
  { id: "4", name: "Kelly A.", status: "offline" },
  { id: "5", name: "Oronx D.", status: "online" },
  { id: "6", name: "Mike J.", status: "online", unreadCount: 3 },
]

export default function ChatList() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-medium mb-2">Chat Room</h3>
        <p className="text-sm text-muted-foreground">You got some messages</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {mockFriends.map((friend) => (
            <Button
              key={friend.id}
              variant="ghost"
              className="w-full justify-start px-2 py-6 relative"
              onClick={() => setSelectedFriend(friend)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {friend.status === "online" && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{friend.name}</p>
                  {friend.lastMessage && <p className="text-xs text-muted-foreground truncate">{friend.lastMessage}</p>}
                </div>
                {friend.unreadCount && (
                  <Badge variant="destructive" className="ml-auto">
                    {friend.unreadCount}
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {selectedFriend && (
        <Card className="absolute bottom-4 right-4 w-80">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{selectedFriend.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedFriend.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFriend.status === "online" ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedFriend(null)}>
                <span className="sr-only">Close chat</span>×
              </Button>
            </div>
            {/* Chat messages would go here */}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

