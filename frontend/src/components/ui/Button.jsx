import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  glow = false,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent hover:from-blue-600 hover:to-purple-600',
    secondary: 'bg-white/5 text-white border-white/20 hover:bg-white/10',
    outline: 'bg-transparent text-blue-400 border-blue-500/50 hover:bg-blue-500/10',
    ghost: 'bg-transparent text-gray-300 border-transparent hover:bg-white/5',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-transparent hover:from-red-600 hover:to-pink-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent hover:from-green-600 hover:to-emerald-600',
    glass: 'bg-white/5 backdrop-blur-xl text-white border-white/10 hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const glowVariants = {
    primary: 'shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
    secondary: 'shadow-lg shadow-white/10 hover:shadow-white/20',
    outline: 'shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
    ghost: '',
    danger: 'shadow-lg shadow-red-500/25 hover:shadow-red-500/40',
    success: 'shadow-lg shadow-green-500/25 hover:shadow-green-500/40',
    glass: 'shadow-lg shadow-white/10 hover:shadow-white/20',
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-lg border transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${glow ? glowVariants[variant] : ''}
    ${disabled ? 'pointer-events-none' : ''}
    ${className}
  `;

  return (
    <motion.button
      ref={ref}
      className={baseClasses}
      disabled={disabled || loading}
      whileHover={!disabled ? { 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
