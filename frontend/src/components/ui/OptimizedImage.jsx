import React, { useState } from 'react'
import GlassFallback from './GlassFallback'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "",
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fallbackHeight = "200px"
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <GlassFallback 
        height={fallbackHeight}
        message="Image non disponible"
        className={className}
      />
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <GlassFallback 
            height={fallbackHeight}
            message="Chargement image..."
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        style={{
          width: width || '100%',
          height: height || 'auto',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}

export default OptimizedImage
