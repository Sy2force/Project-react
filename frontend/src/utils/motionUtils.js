// Optimized Framer Motion imports and utilities
// Only import what's needed to reduce bundle size

// Common animation variants optimized for performance
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" }
}

// Stagger animations for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Hover effects optimized for performance
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 }
}

export const hoverLift = {
  whileHover: { y: -4 },
  transition: { duration: 0.2 }
}

// Mobile-optimized animations (reduced motion)
export const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export const mobileOptimized = (animation) => {
  if (isMobile) {
    // Reduce animation complexity on mobile
    return {
      ...animation,
      transition: { ...animation.transition, duration: 0.2 }
    }
  }
  return animation
}

// Viewport animation with reduced motion support
export const viewportAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
}
