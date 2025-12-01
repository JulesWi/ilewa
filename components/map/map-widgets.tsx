"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Calendar as CalendarIcon, Quote, MessageSquare } from "lucide-react"
import QuoteOfTheDay from "@/components/quote-of-the-day"
import CommentsMenu from "@/components/map/comments-menu"

interface MapWidgetsProps {
  showCalendar: boolean
  showQuote: boolean
  showComments: boolean
  selectedDate: Date | undefined
  onDateSelect: (date: Date | undefined) => void
  onCloseCalendar: () => void
  onCloseQuote: () => void
  onCloseComments: () => void
  selectedProject: any
}

export default function MapWidgets({
  showCalendar,
  showQuote,
  showComments,
  selectedDate,
  onDateSelect,
  onCloseCalendar,
  onCloseQuote,
  onCloseComments,
  selectedProject
}: MapWidgetsProps) {
  return (
    <>
      {/* Calendar Widget */}
      {showCalendar && (
        <div className="fixed bottom-6 left-6 z-40">
          <Card 
            className="bg-white/95 backdrop-blur-sm shadow-xl border-2 transition-all duration-300"
            style={{ borderColor: '#2b81bf' }}
          >
            <CardHeader 
              className="pb-2 flex flex-row items-center justify-between"
              style={{ backgroundColor: '#dbe6e1' }}
            >
              <CardTitle className="text-sm font-medium flex items-center" style={{ color: '#2b81bf' }}>
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendrier
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCloseCalendar}
                className="h-6 w-6 p-0 hover:bg-white/50"
              >
                <X className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-3">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={onDateSelect} 
                className="rounded-md border"
                classNames={{
                  day_selected: "bg-[#2b81bf] text-white hover:bg-[#2b81bf] hover:text-white focus:bg-[#2b81bf] focus:text-white",
                  day_today: "bg-[#dbe6e1] text-[#2b81bf] font-semibold"
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quote Widget */}
      {showQuote && (
        <div className="fixed bottom-6 right-24 z-40 w-80">
          <Card 
            className="bg-white/95 backdrop-blur-sm shadow-xl border-2 transition-all duration-300"
            style={{ borderColor: '#2b81bf' }}
          >
            <CardHeader 
              className="pb-2 flex flex-row items-center justify-between"
              style={{ backgroundColor: '#dbe6e1' }}
            >
              <CardTitle className="text-sm font-medium flex items-center" style={{ color: '#2b81bf' }}>
                <Quote className="h-4 w-4 mr-2" />
                Citation du Jour
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCloseQuote}
                className="h-6 w-6 p-0 hover:bg-white/50"
              >
                <X className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <QuoteOfTheDay />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Comments Widget */}
      {showComments && selectedProject && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Card 
            className="bg-white/95 backdrop-blur-sm shadow-2xl border-2 transition-all duration-300"
            style={{ borderColor: '#2b81bf' }}
          >
            <CardHeader 
              className="pb-2 flex flex-row items-center justify-between"
              style={{ backgroundColor: '#dbe6e1' }}
            >
              <CardTitle className="text-sm font-medium flex items-center" style={{ color: '#2b81bf' }}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Commentaires - {selectedProject.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCloseComments}
                className="h-6 w-6 p-0 hover:bg-white/50"
              >
                <X className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <CommentsMenu 
                projectId={selectedProject.id.toString()} 
                onClose={onCloseComments} 
              />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
