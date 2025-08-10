import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

/**
 * CardFrame - Cadre de carte avec bordure décorative et coins arrondis
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du cadre
 * @param {string} props.variant - Variante du cadre (default, accent, neon)
 * @param {boolean} props.hover - Active les effets hover
 */
const CardFrame = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  ...props 
}) => {
  const variantClasses = {
    default: 'border-white/20',
    accent: 'border-accent/30',
    neon: 'border-neon/30'
  };

  return (
    <motion.div
      className={`
        relative p-0.5 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5
        ${variantClasses[variant]} ${className}
      `.trim().replace(/\s+/g, ' ')}
      whileHover={hover ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Coins décoratifs */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/30 rounded-tl" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white/30 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white/30 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/30 rounded-br" />
      
      {/* Contenu */}
      <GlassCard className="border-0 shadow-none" hover={false}>
        {children}
      </GlassCard>
    </motion.div>
  );
};

export default CardFrame;
