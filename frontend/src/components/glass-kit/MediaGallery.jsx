import React from 'react';

/**
 * MediaGallery - Galerie d'images responsive
 */
export function MediaGallery({ 
  images = [], 
  cols = { base: 2, lg: 3 } 
}) {
  const gridClass = `grid gap-4 grid-cols-${cols.base} lg:grid-cols-${cols.lg}`;
  
  return (
    <div className={gridClass}>
      {images.map((src, i) => (
        <img 
          key={i} 
          src={src} 
          alt="Média" 
          className="rounded-xl object-cover w-full h-40 sm:h-48 lg:h-56 hover:scale-105 transition-transform duration-200" 
          loading="lazy" 
          decoding="async"
        />
      ))}
    </div>
  );
}

export default MediaGallery;
