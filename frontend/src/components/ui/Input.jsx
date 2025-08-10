import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Input - Composant input unifié avec style glass
 * Fond verre (bg-white/5), bordure white/10, focus ring bleu
 */
const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  error,
  label,
  ...props 
}, ref) => {
  const baseClasses = "w-full h-11 px-4 rounded-2xl bg-glass-bg backdrop-blur-md border border-glass-border text-white placeholder-brand-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 focus:border-brand-primary disabled:opacity-50 disabled:cursor-not-allowed";
  
  const errorClasses = error ? "border-status-error focus:ring-status-error" : "";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          baseClasses,
          errorClasses,
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-status-error">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
export { Input };
