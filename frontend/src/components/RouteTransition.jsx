import React from 'react'
import { motion } from 'framer-motion'

/**
 * RouteTransition - Transitions Framer Motion PROMPT 1
 * fade+slide, respect prefers-reduced-motion
 */
export default function RouteTransition({ children }) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const variants = {
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export { RouteTransition }
