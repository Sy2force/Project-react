import React from 'react';

/**
 * Button - Bouton avec hauteurs uniformes et variantes
 */
export function Button({ 
  as: Comp = 'button', 
  variant = 'primary', 
  className = '', 
  children,
  ...props 
}) {
  const base = 'h-11 inline-flex items-center justify-center rounded-2xl px-5 font-semibold focus-visible:outline-none focus-visible:ring-4 transition-all duration-200';
  
  const variants = {
    primary: 'bg-white text-ink hover:bg-white/90 focus-visible:ring-white/50',
    ghost: 'border border-white/15 text-white hover:bg-white/10 focus-visible:ring-white/30',
    danger: 'bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/50',
    secondary: 'bg-accent text-white hover:bg-accent/90 focus-visible:ring-accent/50'
  };
  
  return (
    <Comp 
      className={`${base} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </Comp>
  );
}

export default Button;
