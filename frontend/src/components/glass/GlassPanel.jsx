import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassPanel - Composant de base pour tous les panneaux glassmorphiques
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du panneau
 * @param {string} props.className - Classes CSS additionnelles
 * @param {boolean} props.hover - Active les effets hover
 * @param {boolean} props.glow - Active l'effet glow
 * @param {Object} props.animation - Configuration animation Framer Motion
 */
const GlassPanel = ({ 
  children, 
  className = '', 
  hover = false,
  glow = false,
  animation = {},
  ...props 
}) => {
  const baseClasses = 'glass-panel';
  const hoverClasses = hover ? 'hover-lift cursor-pointer' : '';
  const glowClasses = glow ? 'focus-glow' : '';
  
  const combinedClasses = `${baseClasses} ${hoverClasses} ${glowClasses} ${className}`.trim();

  const defaultAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  };

  const finalAnimation = { ...defaultAnimation, ...animation };

  return (
    <motion.div
      className={combinedClasses}
      {...finalAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;
