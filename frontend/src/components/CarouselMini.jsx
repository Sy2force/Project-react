import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Palette, 
  Code, 
  Zap, 
  TrendingUp,
  Play,
  Pause
} from 'lucide-react';

const CarouselMini = ({ 
  title, 
  category, 
  icon, 
  items = [], 
  className = '',
  onItemClick = null 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  // Icon mapping
  const iconMap = {
    uiux: Palette,
    react: Code,
    brand: Zap,
    growth: TrendingUp
  };

  const IconComponent = iconMap[icon] || Code;

  // Category colors
  const categoryColors = {
    design: {
      primary: 'from-purple-500 to-pink-500',
      secondary: 'bg-purple-500/20',
      border: 'border-purple-500/30',
      text: 'text-purple-300',
      glow: 'shadow-purple-500/25'
    },
    dev: {
      primary: 'from-blue-500 to-cyan-500',
      secondary: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-300',
      glow: 'shadow-blue-500/25'
    },
    branding: {
      primary: 'from-orange-500 to-red-500',
      secondary: 'bg-orange-500/20',
      border: 'border-orange-500/30',
      text: 'text-orange-300',
      glow: 'shadow-orange-500/25'
    },
    marketing: {
      primary: 'from-green-500 to-emerald-500',
      secondary: 'bg-green-500/20',
      border: 'border-green-500/30',
      text: 'text-green-300',
      glow: 'shadow-green-500/25'
    }
  };

  const colors = categoryColors[category] || categoryColors.dev;

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused && !isHovered && items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, isHovered, items.length]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case ' ':
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'Escape':
          event.preventDefault();
          carouselRef.current?.blur();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, isPlaying]);

  // Handle item click
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  // Focus handlers
  const handleFocus = () => {
    setIsPaused(true);
  };

  const handleBlur = () => {
    setIsPaused(false);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={carouselRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="region"
      aria-label={`${title} carousel`}
    >
      {/* Glass container */}
      <div className={`
        relative overflow-hidden rounded-2xl
        bg-white/6 backdrop-blur-[12px]
        border border-white/12
        shadow-lg ${colors.glow}
        transition-all duration-300
        ${isHovered ? 'scale-[1.02] shadow-xl' : ''}
      `}>
        {/* Header */}
        <div className={`
          flex items-center justify-between p-4 pb-2
          border-b border-white/10
        `}>
          <div className="flex items-center space-x-3">
            <div className={`
              p-2 rounded-lg ${colors.secondary} ${colors.border}
            `}>
              <IconComponent className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <p className={`text-xs ${colors.text} capitalize`}>{category}</p>
            </div>
          </div>

          {/* Play/Pause button */}
          {items.length > 1 && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`
                p-2 rounded-lg ${colors.secondary} ${colors.border}
                hover:bg-white/10 transition-colors
                focus:outline-none focus:ring-2 focus:ring-white/20
              `}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>

        {/* Carousel content */}
        <div className="relative h-48 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div
                className="w-full h-full bg-cover bg-center cursor-pointer relative group/item"
                style={{
                  backgroundImage: `url(${items[currentIndex]?.media || '/api/placeholder/300/200'})`,
                }}
                onClick={() => handleItemClick(items[currentIndex])}
                role="button"
                tabIndex={0}
                aria-label={`View ${items[currentIndex]?.label || 'item'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleItemClick(items[currentIndex]);
                  }
                }}
              >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover/item:bg-white/10 transition-colors duration-300" />

                {/* Label */}
                {items[currentIndex]?.label && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2"
                    >
                      <p className="text-white text-sm font-medium">
                        {items[currentIndex].label}
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Zoom indicator on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className={`
                  absolute left-2 top-1/2 -translate-y-1/2
                  p-2 rounded-full bg-black/40 backdrop-blur-sm
                  text-white hover:bg-black/60 transition-colors
                  opacity-0 group-hover:opacity-100
                  focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20
                `}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={goToNext}
                className={`
                  absolute right-2 top-1/2 -translate-y-1/2
                  p-2 rounded-full bg-black/40 backdrop-blur-sm
                  text-white hover:bg-black/60 transition-colors
                  opacity-0 group-hover:opacity-100
                  focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/20
                `}
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Pagination dots */}
        {items.length > 1 && (
          <div className="flex items-center justify-center space-x-2 p-4 pt-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent
                  ${index === currentIndex 
                    ? `bg-gradient-to-r ${colors.primary} scale-125` 
                    : 'bg-white/30 hover:bg-white/50'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}

        {/* Live region for screen readers */}
        <div
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Slide {currentIndex + 1} of {items.length}: {items[currentIndex]?.label || 'Untitled'}
        </div>
      </div>

      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-r ${colors.primary} blur-xl -z-10 scale-105
      `} />
    </motion.div>
  );
};

export default CarouselMini;
