"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Smile, ThumbsUp, X } from "lucide-react"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

interface CommentsMenuProps {
  projectId: string
  onClose: () => void
}

export default function CommentsMenu({ projectId, onClose }: CommentsMenuProps) {
  const [comments, setComments] = React.useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Paul J.",
        avatar: "/placeholder.svg",
      },
      content: "Great project! Looking forward to the implementation.",
      timestamp: "2h ago",
      likes: 3,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Ken R.",
          },
          content: "I agree, the methodology is very innovative.",
          timestamp: "1h ago",
          likes: 1,
        },
      ],
    },
    {
      id: "2",
      author: {
        name: "Kelly A.",
      },
      content: "Have you considered adding climate data to your analysis?",
      timestamp: "3h ago",
      likes: 2,
    },
    {
      id: "3",
      author: {
        name: "Oronx D.",
      },
      content: "This is exactly what our region needs. Great work!",
      timestamp: "5h ago",
      likes: 4,
    },
    {
      id: "4",
      author: {
        name: "Mike J.",
      },
      content: "I'd like to collaborate on a similar project. Let's connect!",
      timestamp: "1d ago",
      likes: 0,
    },
  ])
  const [newComment, setNewComment] = React.useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Harold Cooper",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }

        if (comment.replies) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return { ...reply, likes: reply.likes + 1 }
            }
            return reply
          })

          return { ...comment, replies: updatedReplies }
        }

        return comment
      }),
    )
  }

  return (
    <Card className="w-96 bg-white/95 backdrop-blur-sm max-h-[80vh] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Comments for XXXX project</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 px-2"
                        onClick={() => handleLike(comment.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{comment.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                {comment.replies?.map((reply) => (
                  <div key={reply.id} className="ml-8 flex items-start gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{reply.author.name}</span>
                        <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                      </div>
                      <p className="text-sm">{reply.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-1 h-6 gap-1 px-2"
                        onClick={() => handleLike(reply.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{reply.likes}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="icon">
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Add a comment..."
            className="flex-1"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleAddComment()
              }
            }}
          />
          <Button size="icon" onClick={handleAddComment}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

