"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system
    class Particle {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      opacity: number
      color: string

      constructor() {
        const width = canvas?.width ?? 0
        const height = canvas?.height ?? 0
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.radius = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.8
        this.speedY = (Math.random() - 0.5) * 0.8
        this.opacity = Math.random() * 0.6 + 0.3
        // Colorful particles
        const colors = [
          `rgba(139, 92, 246, ${this.opacity})`, // purple
          `rgba(59, 130, 246, ${this.opacity})`, // blue
          `rgba(236, 72, 153, ${this.opacity})`, // pink
          `rgba(251, 146, 60, ${this.opacity})`, // orange
          `rgba(34, 197, 94, ${this.opacity})`, // green
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
        }
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        // Removed particle.draw() call, since update() already performs drawing
      })

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            // Colorful connections
            const colors = [
              `rgba(139, 92, 246, ${0.2 * (1 - distance / 150)})`, // purple
              `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`, // blue
              `rgba(236, 72, 153, ${0.2 * (1 - distance / 150)})`, // pink
            ]
            ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)]
            ctx.lineWidth = 0.8
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.3 }}
      />

      {/* Colorful animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-1" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-2" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-orange-400 via-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-3" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      {/* Colorful animated mesh gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/30 to-pink-100/30 animate-gradient-mesh" />
      </div>

      {/* Colorful geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-64 h-64 border-4 border-purple-300/30 rounded-full animate-spin-slow" />
        <div className="absolute bottom-32 left-32 w-48 h-48 border-4 border-blue-300/30 rotate-45 animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-pink-300/30 rounded-lg animate-rotate-slow" />
        <div className="absolute top-1/3 right-1/3 w-40 h-40 border-4 border-orange-300/30 rounded-full animate-float-3" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 border-4 border-cyan-300/30 rotate-12 animate-float-4" />
      </div>
    </>
  )
}

