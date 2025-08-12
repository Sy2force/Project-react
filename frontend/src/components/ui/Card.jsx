import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-white/5 border-white/10',
    primary: 'bg-blue-500/10 border-blue-500/20',
    secondary: 'bg-purple-500/10 border-purple-500/20',
    success: 'bg-green-500/10 border-green-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    danger: 'bg-red-500/10 border-red-500/20',
    glass: 'bg-white/5 border-white/10 backdrop-blur-xl',
  };

  const glowVariants = {
    default: 'shadow-lg',
    primary: 'shadow-lg shadow-blue-500/25',
    secondary: 'shadow-lg shadow-purple-500/25',
    success: 'shadow-lg shadow-green-500/25',
    warning: 'shadow-lg shadow-yellow-500/25',
    danger: 'shadow-lg shadow-red-500/25',
    glass: 'shadow-2xl shadow-white/10',
  };

  const baseClasses = `
    relative rounded-xl border backdrop-blur-md
    ${variants[variant]}
    ${glow ? glowVariants[variant] : ''}
    ${className}
  `;

  const CardComponent = motion.div;

  return (
    <CardComponent
      ref={ref}
      className={baseClasses}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-4 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 pt-4 border-t border-white/10 ${className}`}>
    {children}
  </div>
);

export default Card;
