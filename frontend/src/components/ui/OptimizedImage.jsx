// [EXAM] Composant d'image optimisée avec support AVIF/WebP et lazy loading
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '100vw',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef(null);

  // [EXAM] Génération des sources optimisées (AVIF, WebP, fallback)
  const generateSources = (originalSrc) => {
    if (!originalSrc) return [];
    
    const baseSrc = originalSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '');
    const extension = originalSrc.match(/\.(jpg|jpeg|png|gif)$/i)?.[1] || 'jpg';
    
    return [
      {
        srcSet: `${baseSrc}.avif`,
        type: 'image/avif'
      },
      {
        srcSet: `${baseSrc}.webp`,
        type: 'image/webp'
      },
      {
        srcSet: originalSrc,
        type: `image/${extension.toLowerCase()}`
      }
    ];
  };

  // [EXAM] Intersection Observer pour lazy loading
  useEffect(() => {
    if (priority) {
      setCurrentSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  // [EXAM] Gestion du chargement
  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  // [EXAM] Gestion des erreurs
  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  // [EXAM] Placeholder pendant le chargement
  const PlaceholderComponent = () => (
    <div
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      style={{ width, height }}
      aria-label="Chargement de l'image..."
    >
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  // [EXAM] Composant d'erreur
  const ErrorComponent = () => (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
      style={{ width, height }}
      role="img"
      aria-label="Erreur de chargement de l'image"
    >
      <div className="text-center text-gray-500">
        <svg
          className="w-8 h-8 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span className="text-sm">Image non disponible</span>
      </div>
    </div>
  );

  // [EXAM] Affichage conditionnel selon l'état
  if (hasError) {
    return <ErrorComponent />;
  }

  if (!currentSrc && !priority) {
    return <PlaceholderComponent />;
  }

  const sources = generateSources(currentSrc);

  return (
    <picture ref={imgRef} className={className}>
      {/* [EXAM] Sources optimisées pour navigateurs modernes */}
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          type={source.type}
          sizes={sizes}
        />
      ))}
      
      {/* [EXAM] Image fallback avec attributs d'optimisation */}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          width: width || 'auto',
          height: height || 'auto'
        }}
        {...props}
      />
      
      {/* [EXAM] Overlay de chargement */}
      {!isLoaded && currentSrc && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}
    </picture>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  sizes: PropTypes.string,
  priority: PropTypes.bool,
  quality: PropTypes.number,
  placeholder: PropTypes.oneOf(['blur', 'empty']),
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default OptimizedImage;
