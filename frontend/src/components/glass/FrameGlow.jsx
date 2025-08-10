import React from 'react';
import { motion } from 'framer-motion';

/**
 * FrameGlow - Cadre décoratif avec effet glow animé
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du cadre
 * @param {string} props.color - Couleur du glow (primary, accent, neon, etc.)
 * @param {string} props.intensity - Intensité du glow (low, medium, high)
 * @param {boolean} props.animated - Active l'animation du glow
 */
const FrameGlow = ({ 
  children, 
  color = 'primary',
  intensity = 'medium',
  animated = true,
  className = '',
  ...props 
}) => {
  const intensityClasses = {
    low: 'shadow-sm',
    medium: 'shadow-glow',
    high: 'shadow-2xl'
  };

  const glowAnimation = animated ? {
    animate: {
      boxShadow: [
        `0 0 20px rgba(96, 165, 250, 0.3)`,
        `0 0 40px rgba(96, 165, 250, 0.5)`,
        `0 0 20px rgba(96, 165, 250, 0.3)`
      ]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  } : {};

  return (
    <motion.div
      className={`
        relative p-1 rounded-2xl bg-gradient-to-r from-${color}/20 via-${color}/10 to-${color}/20
        ${intensityClasses[intensity]} ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...glowAnimation}
      {...props}
    >
      {/* Bordure interne */}
      <div className="relative rounded-xl overflow-hidden">
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse" />
        
        {/* Contenu */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default FrameGlow;
