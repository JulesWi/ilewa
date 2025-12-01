import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import CategoriesSection from "@/components/landing/categories-section"
import CTASection from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <CTASection />
    </main>
  )
}

