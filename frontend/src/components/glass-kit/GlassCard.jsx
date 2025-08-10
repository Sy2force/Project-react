import React from 'react';

/**
 * GlassCard - Carte glass générique avec effet hover
 */
export function GlassCard({ children, className = '' }) {
  return (
    <div className={`glass rounded-2xl p-6 transition duration-200 hover:shadow-hover hover:-translate-y-0.5 ${className}`}>
      {children}
    </div>
  );
}

export default GlassCard;
