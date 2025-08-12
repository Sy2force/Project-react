import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({ 
  className = '', 
  type = 'text',
  label,
  error,
  icon,
  iconPosition = 'left',
  variant = 'default',
  size = 'md',
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const variants = {
    default: 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/25',
    glass: 'bg-white/5 backdrop-blur-xl border-white/10 focus:border-blue-500/50 focus:ring-blue-500/25',
    outline: 'bg-transparent border-gray-600 focus:border-blue-500 focus:ring-blue-500/25',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-5 py-4 text-lg',
  };

  const baseClasses = `
    w-full rounded-lg border transition-all duration-300
    text-white placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/25' : ''}
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${type === 'password' ? 'pr-10' : ''}
    ${className}
  `;

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      {label && (
        <motion.label 
          className={`block text-sm font-medium transition-colors duration-300 ${
            isFocused ? 'text-blue-400' : 'text-gray-300'
          }`}
          animate={{ color: isFocused ? '#60a5fa' : '#d1d5db' }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={inputType}
          className={baseClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <motion.p 
          className="text-red-400 text-sm"
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
