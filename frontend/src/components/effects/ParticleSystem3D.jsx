import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ParticleSystem3D = ({ 
  count = 50, 
  speed = 0.5, 
  interactive = true,
  colors = ['#60a5fa', '#8b5cf6', '#10b981', '#f59e0b'],
  size = { min: 1, max: 4 }
}) => {
  const containerRef = useRef(null)
  const [particles, setParticles] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Initialiser les particules
  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      vz: (Math.random() - 0.5) * speed,
      size: Math.random() * (size.max - size.min) + size.min,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2
    }))
    setParticles(newParticles)
  }, [count, speed, colors, size.min, size.max])

  // Animation des particules
  useEffect(() => {
    if (!interactive) return

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, z, vx, vy, vz, rotation, rotationSpeed } = particle

          // Mouvement de base
          x += vx
          y += vy
          z += vz

          // Rebond sur les bords
          if (x <= 0 || x >= 100) vx *= -1
          if (y <= 0 || y >= 100) vy *= -1
          if (z <= 0 || z >= 100) vz *= -1

          // Interaction avec la souris
          if (interactive && mousePosition.x && mousePosition.y) {
            const mouseInfluence = 0.02
            const dx = (mousePosition.x / window.innerWidth * 100) - x
            const dy = (mousePosition.y / window.innerHeight * 100) - y
            
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
              vx += dx * mouseInfluence
              vy += dy * mouseInfluence
            }
          }

          // Rotation
          rotation += rotationSpeed

          return {
            ...particle,
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
            z: Math.max(0, Math.min(100, z)),
            vx, vy, vz, rotation
          }
        })
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [interactive, mousePosition, speed])

  // Suivi de la souris
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            opacity: particle.opacity,
            transform: `translateZ(${particle.z}px) rotate(${particle.rotation}deg)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            filter: 'blur(0.5px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default ParticleSystem3D
