"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface QuoteOfTheDayProps {
  className?: string
}

export default function QuoteOfTheDay({ className }: QuoteOfTheDayProps) {
  return (
    <Card className={`bg-white/95 backdrop-blur-sm ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium">Did you know?</h3>
          <blockquote className="text-sm">
            "La cartographie est l'art de représenter le monde tel qu'il est, tel qu'il pourrait être, et tel qu'il
            devrait être."
          </blockquote>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <cite>— John Snow</cite>
            <Button variant="link" size="sm" className="h-auto p-0">
              <a
                href="https://en.wikipedia.org/wiki/John_Snow"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <span>Source</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

