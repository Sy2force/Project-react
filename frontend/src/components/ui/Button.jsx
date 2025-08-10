import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Button - Composant bouton unifié avec style footer
 * Hauteur fixe h-11, rounded-2xl, états hover/active/focus AA
 */
const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default',
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "btn-primary",
    secondary: "h-11 px-5 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95 focus:ring-white/30", 
    glass: "btn-glass",
    outline: "h-11 px-5 rounded-2xl border border-glass-border text-white hover:bg-glass-hover hover:scale-105 active:scale-95",
    danger: "h-11 px-5 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 hover:scale-105 active:scale-95 focus:ring-red-500/50"
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm rounded-xl",
    default: "h-11 px-5 rounded-2xl",
    lg: "h-12 px-6 text-lg rounded-2xl"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        size !== 'default' && sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
export { Button };
