import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  animate = true,
  ...props 
}) => {
  const variants = {
    default: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    primary: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    secondary: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    glass: 'bg-white/10 text-white border-white/20 backdrop-blur-md',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full border
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  const Component = animate ? motion.span : 'span';

  return (
    <Component
      className={baseClasses}
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      whileHover={animate ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Badge;
