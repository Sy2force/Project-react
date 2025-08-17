import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.jsx';

const cardVariants = {
  default: 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600',
  glass: 'glass backdrop-blur-xl bg-glass-light dark:bg-glass-dark border-white/20',
  neon: 'bg-dark-900/50 border-2 border-neon-cyan shadow-glow backdrop-blur-sm',
  gradient: 'bg-gradient-to-br from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 border border-white/10 backdrop-blur-xl',
};

const paddingVariants = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className,
  onClick,
  hover = true,
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const MotionComponent = onClick ? motion.button : motion.div;
  
  return (
    <MotionComponent
      className={cn(
        baseClasses,
        cardVariants[variant],
        paddingVariants[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={hover ? { 
        scale: 1.02,
        y: -4,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {variant === 'glass' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      )}
      
      {variant === 'neon' && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/5 to-neon-cyan/0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </MotionComponent>
  );
};

export default Card;
