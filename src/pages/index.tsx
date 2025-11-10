"use client"

import { useState, useEffect } from "react"
import Headers from "../components/headers"
import Hero from "../components/hero"
import Features from "../components/features"
import HowItWorks from "../components/how-it-works"
import Stats from "../components/stats"
import Testimonials from "../components/testimonials"
import CTA from "../components/cta"
import Footer from "../components/footer"
import AnimatedBackground from "../components/animated-background"

export const metadata = {
  title: "Home",
  description: "testing"
}

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-blue-50/20 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content with relative z-index */}
      <div className="relative z-10">
        <Headers isScrolled={isScrolled} />
        <title>Home | Fundora</title>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
