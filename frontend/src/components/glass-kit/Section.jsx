import React from 'react';

/**
 * Section - Section glass avec padding standard
 */
export default function Section({ children, className = '' }) {
  return (
    <section className={`glass rounded-2xl p-8 mb-10 ${className}`}>
      {children}
    </section>
  );
}

/**
 * SectionHeader - En-tête de section avec titre et sous-titre
 */
export function SectionHeader({ title, subtitle, align = 'left' }) {
  return (
    <header className={`mb-6 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className="font-display text-2xl sm:text-3xl text-white line-clamp-2">
        {title}
      </h2>
      {subtitle && (
        <p className="opacity-80 mt-1 text-white/70 line-clamp-3">
          {subtitle}
        </p>
      )}
    </header>
  );
}
