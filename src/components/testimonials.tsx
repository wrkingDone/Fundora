"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechFlow",
    content:
      "Fundora helped us raise $500K in just 30 days. The platform is intuitive and the community support is incredible.",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "Marcus Johnson",
    role: "Creator, ArtVision",
    content:
      "The analytics dashboard gave us insights we never had before. We optimized our campaign and exceeded our goal by 200%.",
    rating: 5,
    image: "👨‍🎨",
  },
  {
    name: "Elena Rodriguez",
    role: "Entrepreneur, GreenTech",
    content:
      "The support team was amazing. They helped us every step of the way. Highly recommend for anyone serious about crowdfunding.",
    rating: 5,
    image: "👩‍💻",
  },
]

export default function Testimonials() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleTestimonials((prev) => [...new Set([...prev, index])])
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
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-indigo-50/20 relative overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-1" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loved by Creators
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Join thousands of successful creators who have raised millions through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleTestimonials.includes(index)

            return (
              <div
                key={index}
                className={`p-8 rounded-2xl border-2 border-transparent bg-white/90 backdrop-blur-sm hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform`} style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">&quot;{testimonial.content}&quot;</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

