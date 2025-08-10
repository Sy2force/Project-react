import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import GlassPanel from './GlassPanel';

/**
 * MediaGallery - Galerie média avec lightbox et navigation
 * @param {Object} props
 * @param {Array} props.items - Tableau des médias [{src, alt, title, type}]
 * @param {number} props.columns - Nombre de colonnes (défaut: responsive)
 * @param {boolean} props.lightbox - Active le lightbox (défaut: true)
 */
const MediaGallery = ({ 
  items = [], 
  columns = null,
  lightbox = true,
  className = '' 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const gridClasses = columns 
    ? `grid-cols-${columns}` 
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  const openLightbox = (index) => {
    if (lightbox) setSelectedIndex(index);
  };

  const closeLightbox = () => setSelectedIndex(null);

  const navigateLightbox = (direction) => {
    if (selectedIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedIndex + 1) % items.length
      : (selectedIndex - 1 + items.length) % items.length;
    
    setSelectedIndex(newIndex);
  };

  return (
    <>
      <GlassPanel className={`p-6 ${className}`}>
        <div className={`grid ${gridClasses} gap-4`}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.src}
                alt={item.alt || item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Titre */}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {item.title}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Contrôles */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[selectedIndex]?.src}
                alt={items[selectedIndex]?.alt}
                className="w-full h-full object-contain rounded-lg"
              />
              
              {items[selectedIndex]?.title && (
                <div className="mt-4 text-center">
                  <p className="text-white text-lg font-medium">
                    {items[selectedIndex].title}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediaGallery;
