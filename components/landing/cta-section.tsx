"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <div className="p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Prêt à partager votre projet ?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Rejoignez notre communauté de contributeurs et faites découvrir votre projet au monde entier
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/auth">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Soumettre un projet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/map">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Explorer d'abord
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
