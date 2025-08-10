import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';

/**
 * GlassCard - Carte glassmorphique avec padding et effets hover
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de la carte
 * @param {string} props.className - Classes CSS additionnelles
 * @param {boolean} props.hover - Active les effets hover (défaut: true)
 * @param {boolean} props.glow - Active l'effet glow
 * @param {string} props.size - Taille du padding (sm, md, lg)
 */
const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  size = 'md',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const cardClasses = `glass-card ${sizeClasses[size]} ${className}`.trim();

  return (
    <GlassPanel
      className={cardClasses}
      hover={hover}
      glow={glow}
      {...props}
    >
      {children}
    </GlassPanel>
  );
};

export default GlassCard;
