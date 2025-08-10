import React from 'react';
import { cn } from '../../utils/cn';

/**
 * SectionHeader - Composant titre de section avec font Sora
 * Titre + sous-titre avec typographie unifiée
 */
const SectionHeader = ({ 
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  centered = false,
  ...props 
}) => {
  const containerClasses = centered ? "text-center" : "";
  
  return (
    <div className={cn(containerClasses, className)}>
      {title && (
        <h2 className={cn(
          "font-sora text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4",
          "bg-gradient-to-r from-white via-brand-accent to-white bg-clip-text text-transparent",
          titleClassName
        )}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={cn(
          "text-lg md:text-xl text-brand-accent leading-relaxed max-w-2xl",
          centered && "mx-auto",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
export { SectionHeader };
