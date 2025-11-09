"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description: "Securely link your Hedera-compatible wallet to get started. This step lets you interact seamlessly with the Fundora.",
  },
  {
    number: "02",
    title: "Enter Your Campaign Info",
    description: "Launch your vision on-chain in minutes. Define your project goals, funding target, and duration — all securely stored and verifiable on the Hedera network.",
  },
  {
    number: "03",
    title: "Create Your Campaign",
    description:
      "Deploy your campaign on the Hedera network with a single click.",
  },
  {
    number: "04",
    title: "Sign Transaction on Hedera",
    description: "Securely authorize your campaign or contribution using Hedera’s fast and low-cost consensus network.",
  },
]

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, index])])
              }, index * 150)
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-1" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Four simple steps to launch your campaign and start raising funds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index)

            return (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[calc(100%-60%)] h-0.5 bg-gradient-to-r from-black to-transparent" />
                )}

                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-transparent hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/20 transition-all h-full group hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform ${
                      index === 0 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      index === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      index === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                      'bg-gradient-to-br from-indigo-500 to-indigo-600'
                    }`}>
                      {step.number}
                    </div>
                    <CheckCircle2 className={`w-6 h-6 mt-1 flex-shrink-0 transition-colors ${
                      index === 0 ? 'text-purple-600' :
                      index === 1 ? 'text-blue-600' :
                      index === 2 ? 'text-pink-600' :
                      'text-indigo-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
