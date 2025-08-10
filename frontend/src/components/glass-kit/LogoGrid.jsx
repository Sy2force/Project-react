import React from 'react';

/**
 * LogoGrid - Grille de logos / partenaires
 */
export function LogoGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 items-center opacity-80">
      {items.map((src, i) => (
        <img 
          key={i} 
          src={src} 
          alt="Logo partenaire" 
          className="h-12 mx-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" 
          loading="lazy" 
          decoding="async"
        />
      ))}
    </div>
  );
}

/**
 * LogoMarquee - Bandeau logos avec défilement
 */
export function LogoMarquee({ items = [], speed = '40s' }) {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex gap-10 animate-[scroll_linear_infinite]" 
        style={{ animationDuration: speed }}
      >
        {items.concat(items).map((src, i) => (
          <img 
            key={i} 
            src={src} 
            alt="Logo" 
            className="h-10 object-contain opacity-80 flex-shrink-0" 
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

export default LogoGrid;
