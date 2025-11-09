"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  {
    label: "Success Rate",
    value: "42%",
    description: "of campaigns reach their funding goals",
  },
  {
    label: "Average Funding",
    value: "$8,150",
    description: "raised per successful campaign",
  },
  {
    label: "Video Impact",
    value: "+105%",
    description: "more funds with campaign videos",
  },
  {
    label: "First 48 Hours",
    value: "30%",
    description: "goal achievement predicts success",
  },
]

export default function Stats() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            // Animate numbers
            const targets = [42, 8150, 105, 30]
            const duration = 2000
            const startTime = Date.now()

            const animate = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)

              setCounts(targets.map((target) => Math.floor(target * progress)))

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            animate()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Colorful animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-1" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Backed by Numbers
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Real data from successful crowdfunding campaigns that prove the power of community-driven funding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const gradientColors = [
              'from-pink-500 to-rose-500',
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-indigo-500',
              'from-orange-500 to-pink-500',
            ]
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className={`text-5xl sm:text-6xl font-extrabold mb-2 bg-gradient-to-r ${gradientColors[index % 4]} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                  {counts[index]}
                  {index === 2 ? "%" : index === 1 ? "" : "%"}
                </div>
                <div className="text-gray-200 text-sm mb-3 font-semibold group-hover:text-white transition-colors">{stat.label}</div>
                <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
