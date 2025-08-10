import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassButton - Bouton glassmorphique avec variantes et états
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {string} props.variant - Variante (primary, secondary, danger, ghost)
 * @param {string} props.size - Taille (sm, md, lg)
 * @param {boolean} props.disabled - État désactivé
 * @param {Function} props.onClick - Gestionnaire de clic
 */
const GlassButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'glass-button font-medium transition-all duration-200 focus-visible inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary/20 text-white border-primary/30 hover:bg-primary/30 hover:border-primary/50',
    secondary: 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30',
    danger: 'bg-danger/20 text-white border-danger/30 hover:bg-danger/30 hover:border-danger/50',
    ghost: 'bg-transparent text-white border-transparent hover:bg-white/5'
  };

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm rounded-lg',
    md: 'h-11 px-5 text-base rounded-xl',
    lg: 'h-12 px-6 text-lg rounded-xl'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer active-press';

  const combinedClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${disabledClasses} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.button
      className={combinedClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;
