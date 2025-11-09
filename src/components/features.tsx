"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, Users, TrendingUp, Lock, Lightbulb, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Launch",
    description: "Get your campaign live in minutes with our intuitive setup wizard. No technical knowledge required.",
  },
  {
    icon: Users,
    title: "Community Powered",
    description: "Build a passionate community around your project. Engage backers and create lasting relationships.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Track your campaign performance with detailed insights and metrics. Make data-driven decisions.",
  },
  {
    icon: Lock,
    title: "Secure & Trusted",
    description: "Bank-level security protects your data and funds. Transparent and compliant with all regulations.",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "AI-powered suggestions to optimize your campaign and reach the right audience.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access backers from 195+ countries. Multi-currency support for seamless transactions.",
  },
]

export default function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger animation
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures((prev) => [...new Set([...prev, index])])
              }, index * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      {/* Colorful background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-cyan-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-pink-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-1" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-200/30 to-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Powerful tools and features designed to help creators raise funds and build their dreams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleFeatures.includes(index)

            return (
              <div
                key={index}
                className={`p-8 rounded-2xl border-2 border-transparent bg-gradient-to-br from-white to-white/90 backdrop-blur-sm hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                  background: isVisible ? `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(${139 + index * 20},${92 + index * 10},${246 - index * 15},0.05) 100%)` : 'white',
                }}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden ${
                  index % 6 === 0 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  index % 6 === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  index % 6 === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                  index % 6 === 3 ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' :
                  index % 6 === 4 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                  'bg-gradient-to-br from-indigo-500 to-indigo-600'
                }`}>
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  <Icon className="w-6 h-6 text-white relative z-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
