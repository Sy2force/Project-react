import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.jsx';

const inputVariants = {
  default: 'bg-white dark:bg-dark-800 border-gray-300 dark:border-dark-600 focus:border-neon-cyan focus:ring-neon-cyan/20',
  glass: 'glass backdrop-blur-xl bg-glass-light dark:bg-glass-dark border-white/20 focus:border-neon-cyan focus:ring-neon-cyan/20',
  neon: 'bg-dark-900/50 border-neon-cyan/50 focus:border-neon-cyan focus:ring-neon-cyan/20 focus:shadow-glow',
};

const Input = forwardRef(({
  label,
  error,
  icon,
  variant = 'default',
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <motion.input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400',
            inputVariants[variant],
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
