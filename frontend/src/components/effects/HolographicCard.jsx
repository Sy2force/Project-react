import React, { useState } from 'react'
import { motion } from 'framer-motion'

const HolographicCard = ({ 
  children, 
  className = '', 
  intensity = 0.3,
  glowColor = '#60a5fa',
  perspective = true,
  particles = true
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  const holographicVariants = {
    initial: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      z: 0
    },
    hover: {
      rotateX: perspective ? (mousePosition.y - 0.5) * 20 : 0,
      rotateY: perspective ? (mousePosition.x - 0.5) * 20 : 0,
      scale: 1.05,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: intensity,
      transition: { duration: 0.3 }
    }
  }

  const borderVariants = {
    initial: { 
      backgroundPosition: "0% 50%" 
    },
    hover: { 
      backgroundPosition: "100% 50%",
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity
      }
    }
  }

  return (
    <motion.div
      className={`relative group ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      variants={holographicVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Holographic border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${glowColor}40 25%, 
            ${glowColor}80 50%, 
            ${glowColor}40 75%, 
            transparent 100%)`,
          backgroundSize: '200% 100%'
        }}
        variants={borderVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl"
        style={{
          background: glowColor,
          filter: 'blur(20px)'
        }}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />

      {/* Holographic overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20"
        style={{
          background: `linear-gradient(45deg, 
            transparent 30%, 
            rgba(255,255,255,0.1) 50%, 
            transparent 70%)`,
          backgroundSize: '200% 200%'
        }}
        animate={isHovered ? {
          backgroundPosition: ["0% 0%", "100% 100%"],
          transition: { duration: 1.5, ease: "easeInOut" }
        } : {}}
      />

      {/* Particules intégrées */}
      {particles && isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: glowColor,
                boxShadow: `0 0 6px ${glowColor}`
              }}
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0
              }}
              animate={{
                x: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%'
                ],
                y: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%'
                ],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Contenu principal */}
      <div className="relative z-10 glass rounded-2xl p-6 h-full">
        {children}
      </div>

      {/* Reflection effect */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl opacity-0 group-hover:opacity-10"
        style={{
          background: `linear-gradient(to top, ${glowColor}40, transparent)`,
          transform: 'scaleY(-1)',
          filter: 'blur(1px)'
        }}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
    </motion.div>
  )
}

export default HolographicCard
