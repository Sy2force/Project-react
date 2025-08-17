import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '../../utils/cn.jsx';

const sizeVariants = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const variantStyles = {
  default: 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300',
  neon: 'bg-dark-900/50 border-2 border-neon-cyan text-neon-cyan shadow-glow',
  glass: 'glass backdrop-blur-xl bg-glass-light dark:bg-glass-dark border-white/20 text-white',
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

const Avatar = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  variant = 'default',
  status,
  className,
  fallback,
  onClick,
}) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const MotionComponent = onClick ? motion.button : motion.div;

  return (
    <div className="relative inline-block">
      <MotionComponent
        className={cn(
          'relative inline-flex items-center justify-center rounded-full overflow-hidden font-medium text-white',
          sizeVariants[size],
          variantStyles[variant],
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        whileHover={onClick ? { scale: 1.05 } : undefined}
        whileTap={onClick ? { scale: 0.95 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : name ? (
          <span className="font-semibold">
            {getInitials(name)}
          </span>
        ) : (
          <User className="w-1/2 h-1/2" />
        )}
        
        {variant === 'neon' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </MotionComponent>
      
      {status && (
        <motion.div
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-dark-900',
            statusColors[status],
            size === 'xs' && 'w-2 h-2',
            size === 'sm' && 'w-2.5 h-2.5',
            (size === 'xl' || size === '2xl') && 'w-4 h-4'
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </div>
  );
};

export default Avatar;
