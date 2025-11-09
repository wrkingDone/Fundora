"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
// import Link from "next/lia
export default function CTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden">
      {/* Colorful animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full mix-blend-screen filter blur-3xl animate-float-1" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full mix-blend-screen filter blur-3xl animate-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 animate-grid-shift" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
            Ready to Launch Your Dream Project?
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
            Join thousands of creators who are turning their ideas into reality. Start your campaign today and reach
            your funding goal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/connect">
                <button className="cursor-pointer px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 flex items-center gap-2 group">
                Start Your Campaign
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
            <button className="px-8 py-4 border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-900 transition-all hover:scale-105 hover:shadow-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
