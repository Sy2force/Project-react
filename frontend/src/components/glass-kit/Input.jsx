import React from 'react';

/**
 * Input - Input glass avec hauteur uniforme
 */
export function Input({ className = '', ...props }) {
  return (
    <input 
      className={`h-11 bg-white/5 border border-white/10 rounded-2xl px-4 text-white/90 placeholder-white/40 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 ${className}`} 
      {...props}
    />
  );
}

/**
 * Textarea - Textarea glass
 */
export function Textarea({ className = '', ...props }) {
  return (
    <textarea 
      className={`min-h-[120px] bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white/90 placeholder-white/40 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 resize-none ${className}`} 
      {...props}
    />
  );
}

export default Input;
