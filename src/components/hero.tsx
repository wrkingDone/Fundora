"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
// import Link from "next/link";


export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-blue-50/30">
      {/* Colorful animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Colorful gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-300/40 via-pink-300/40 to-purple-400/40 rounded-full mix-blend-multiply filter blur-3xl animate-float-1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-300/40 via-cyan-300/40 to-blue-400/40 rounded-full mix-blend-multiply filter blur-3xl animate-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" />
        
        {/* Colorful animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 animate-grid-shift" />
        
        {/* Colorful floating geometric shapes */}
        <div className="absolute top-32 right-32 w-32 h-32 border-2 border-purple-300/20 rounded-lg rotate-45 animate-rotate-slow" />
        <div className="absolute bottom-40 left-40 w-24 h-24 border-2 border-blue-300/20 rounded-full animate-float-3" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-pink-300/20 rotate-12 animate-float-4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badge */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100/90 via-pink-100/90 to-blue-100/90 backdrop-blur-md rounded-full border border-purple-200/50 hover:border-purple-400/50 transition-all cursor-pointer group shadow-lg hover:shadow-xl hover:shadow-purple-200/50 hover:scale-105">
            <Sparkles className="w-4 h-4 text-purple-600 group-hover:animate-spin group-hover:text-pink-600 transition-colors" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:via-pink-700 group-hover:to-blue-700 transition-all">Join 50,000+ creators raising funds</span>
          </div>
        </div>

        {/* Main Heading */}
        <div
          className={`text-center mb-8 transition-all duration-700 delay-100 `}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-balance">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-text">
              Building Africa&apos;s Future,
            </span>
            <br />
            <span className="relative z-10">
                <TypeAnimation
                sequence={[
                    "With Next-Gen Crowdfunding",
                    1500,
                    "On Hedera 🚀",
                    1500,
                    "With Next-Gen Crowdfunding On Hedera 🌍",
                    2000,
                ]}
                wrapper="span"
                speed={60}
                deletionSpeed={50}
                repeat={Infinity}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-text"
                />
            </span>
            <span className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 -z-10 rounded opacity-50" />
            </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empower creators and innovators to raise capital, validate ideas, and build communities. The modern
            crowdfunding platform for ambitious projects.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-200 `}
        >
            <Link href="/connect">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-full font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 flex items-center gap-2 group cursor-pointer relative overflow-hidden">
                    <span className="relative z-10">Start a Campaign</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                </button>
            </Link>
            <Link href="/connect">
                <button className="px-8 py-4 border-2 border-purple-500 bg-white/80 backdrop-blur-sm text-purple-600 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 hover:text-white hover:border-transparent transition-all cursor-pointer hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 relative overflow-hidden group">
                    <span className="relative z-10">Explore Campaigns</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                </button>
            </Link>
        </div>

        {/* Stats Preview */}
        <div
          className={`grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto transition-all duration-700 delay-300 `}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-black mb-2">1M HBAR</div>
            <div className="text-sm text-gray-600">Expected Funds Raised</div>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="text-3xl sm:text-4xl font-bold text-black mb-2">50K+</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-black mb-2">1M+</div>
            <div className="text-sm text-gray-600">Backers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
