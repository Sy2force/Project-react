import React from 'react';
import { cn } from '../../utils/cn';

/**
 * GlassCard - Composant carte avec effet glassmorphisme
 * .glass + rounded-2xl + hover:shadow-2xl
 */
const GlassCard = React.forwardRef(({ 
  className, 
  children,
  hover = true,
  ...props 
}, ref) => {
  const baseClasses = "glass-card";
  const hoverClasses = hover ? "hover:shadow-2xl" : "";

  return (
    <div
      className={cn(
        baseClasses,
        hoverClasses,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = "GlassCard";

export default GlassCard;
export { GlassCard };
