"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Share2, ExternalLink, X, ThumbsUp, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Project {
  id: number
  name: string
  category: string
  author: string
  description: string
  date: string
  repository_url: string
  latitude: number
  longitude: number
}

interface Comment {
  id: number
  author: string
  content: string
  date: string
  likes: number
  replies?: Comment[]
}

interface ProjectPopupProps {
  project: Project
  onClose: () => void
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 1,
    author: "Jean Dupont",
    content: "Projet très intéressant ! J'aimerais en savoir plus sur la méthodologie utilisée.",
    date: "2023-05-15",
    likes: 5,
    replies: [
      {
        id: 3,
        author: "Marie Curie",
        content: "Je suis d'accord, la méthodologie est très innovante.",
        date: "2023-05-16",
        likes: 2,
      },
    ],
  },
  {
    id: 2,
    author: "Sophie Martin",
    content: "Avez-vous pensé à intégrer des données climatiques dans votre analyse ?",
    date: "2023-05-14",
    likes: 3,
  },
]

export default function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  const [activeTab, setActiveTab] = useState("info")
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [showIframe, setShowIframe] = useState(false)

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: "Utilisateur actuel",
      content: newComment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
  }

  const handleAddReply = (commentId: number) => {
    if (!replyContent.trim()) return

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: "Utilisateur actuel",
              content: replyContent,
              date: new Date().toISOString().split("T")[0],
              likes: 0,
            },
          ],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyTo(null)
    setReplyContent("")
  }

  const handleLike = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
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
    })

    setComments(updatedComments)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      economie: "bg-green-100 text-green-800",
      sante: "bg-blue-100 text-blue-800",
      environnement: "bg-emerald-100 text-emerald-800",
      epidemie: "bg-red-100 text-red-800",
      education: "bg-purple-100 text-purple-800",
      default: "bg-gray-100 text-gray-800",
    }

    return colors[category] || colors.default
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card 
        className="max-h-[90vh] w-full max-w-2xl overflow-hidden shadow-2xl border-2 animate-in fade-in-0 zoom-in-95 duration-300"
        style={{ borderColor: '#2b81bf' }}
      >
        <CardHeader 
          className="flex flex-row items-start justify-between pb-2 border-b-2"
          style={{ backgroundColor: '#dbe6e1', borderBottomColor: '#2b81bf' }}
        >
          <div>
            <CardTitle className="text-xl font-bold" style={{ color: '#2b81bf' }}>{project.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span>Par {project.author}</span>
              <span>•</span>
              <span>{new Date(project.date).toLocaleDateString()}</span>
              <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </Button>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="comments">Commentaires ({comments.length})</TabsTrigger>
            </TabsList>
          </div>
          <CardContent className="max-h-[60vh] overflow-y-auto p-0">
            <TabsContent value="info" className="p-6">
              <div className="space-y-4">
                <p>{project.description}</p>

                <div className="flex items-center justify-between">
                  <Button variant="outline" className="gap-2" onClick={() => setShowIframe(!showIframe)}>
                    <ExternalLink className="h-4 w-4" />
                    {showIframe ? "Masquer le dépôt" : "Voir le dépôt"}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Partager
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(`Découvrez ce projet: ${project.name} - ${window.location.href}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center"
                        >
                          WhatsApp
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center"
                        >
                          Facebook
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center"
                        >
                          LinkedIn
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Découvrez ce projet: ${project.name}`)}&url=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center"
                        >
                          Twitter
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {showIframe && (
                  <div className="mt-4 h-96 w-full overflow-hidden rounded border">
                    <iframe src={project.repository_url} className="h-full w-full" title={`Dépôt de ${project.name}`} />
                  </div>
                )}

                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Contacter l'auteur</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contacter {project.author}</DialogTitle>
                        <DialogDescription>Envoyez un message à l'auteur du projet.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Textarea placeholder="Votre message..." />
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Ou contactez via:</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                              </svg>
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                              </svg>
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                              </svg>
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button type="submit">Envoyer</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="space-y-4 p-6">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2"
                          onClick={() => handleLike(comment.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2"
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Répondre</span>
                        </Button>
                      </div>
                    </div>

                    {replyTo === comment.id && (
                      <div className="ml-8 flex gap-2">
                        <Input
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Écrire une réponse..."
                          className="flex-1"
                        />
                        <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                          Répondre
                        </Button>
                      </div>
                    )}

                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-8 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="rounded-lg bg-muted p-4">
                            <div className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(reply.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 gap-1 px-2 text-xs"
                                onClick={() => handleLike(reply.id)}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                <span>{reply.likes}</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  className="flex-1"
                />
                <Button className="self-end" onClick={handleAddComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}

