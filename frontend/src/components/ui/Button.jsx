import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.jsx';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-semibold shadow-neon hover:shadow-neon-lg transition-all duration-300',
  secondary: 'bg-dark-800 text-white border border-dark-600 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300',
  outline: 'border-2 border-neon-cyan text-neon-cyan bg-transparent hover:bg-neon-cyan hover:text-black transition-all duration-300',
  ghost: 'text-neon-cyan hover:bg-glass-light backdrop-blur-sm transition-all duration-300',
  neon: 'bg-transparent border-2 border-neon-purple text-neon-purple hover:shadow-neon-lg hover:text-white hover:bg-neon-purple/10 transition-all duration-300',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm h-8',
  md: 'px-4 py-2 text-base h-10',
  lg: 'px-6 py-3 text-lg h-12',
  xl: 'px-8 py-4 text-xl h-14',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled = false,
  loading = false,
  onClick,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        buttonVariants[variant],
        sizeVariants[size],
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
