"use client"

import { ModernButton } from "@/components/ui/modern-button"
import { ArrowRight, Globe, MapPin, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900">
              ILEWA
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium">
              Interactive Mapping of Innovative Projects
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover, share, and track innovative projects around the world. 
            A collaborative platform to visualize the impact of initiatives in 
            education, environment, health, and economy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/map">
              <ModernButton size="lg" variant="premium" className="px-8 py-6 text-lg">
                <Globe className="mr-2 h-5 w-5" />
                Explore the Map
                <ArrowRight className="ml-2 h-5 w-5" />
              </ModernButton>
            </Link>
            <Link href="/auth">
              <ModernButton size="lg" variant="secondary" className="px-8 py-6 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Sign In
              </ModernButton>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-16">
            <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="text-4xl font-bold text-slate-800">24</div>
              <div className="text-slate-600 text-sm">Active Projects</div>
            </div>
            <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="text-4xl font-bold text-slate-800">12</div>
              <div className="text-slate-600 text-sm">Countries Represented</div>
            </div>
            <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="text-4xl font-bold text-slate-800">156</div>
              <div className="text-slate-600 text-sm">Contributors</div>
            </div>
            <div className="space-y-2 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="text-4xl font-bold text-slate-800">+18%</div>
              </div>
              <div className="text-slate-600 text-sm">Monthly Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
