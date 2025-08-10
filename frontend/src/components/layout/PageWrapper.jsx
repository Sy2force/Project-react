import React from 'react';
import { motion } from 'framer-motion';
import usePageMeta from '../../hooks/usePageMeta';

/**
 * PageWrapper - Wrapper global pour toutes les pages
 * Fournit animations, structure et métadonnées SEO
 */
const PageWrapper = ({ 
  children, 
  title, 
  description, 
  keywords,
  ogImage,
  canonical,
  schema,
  className = '',
  animate = true,
  ...props 
}) => {
  // Gestion automatique des métadonnées SEO
  usePageMeta(title, description, {
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    canonical,
    schema,
    twitterCard: 'summary_large_image'
  });

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const Component = animate ? motion.div : 'div'

  return (
    <Component
      className={`py-8 ${className}`}
      variants={animate ? pageVariants : undefined}
      initial={animate ? "initial" : undefined}
      animate={animate ? "animate" : undefined}
      exit={animate ? "exit" : undefined}
    >
      {/* SEO Meta (si title fourni) */}
      {title && (
        <div className="sr-only">
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      )}
      
      {/* Contenu de la page */}
      <div className="space-y-8">
        {children}
      </div>
    </Component>
  )
}

export default PageWrapper
