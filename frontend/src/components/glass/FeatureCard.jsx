import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

/**
 * FeatureCard - Carte de fonctionnalité avec icône, titre et description
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icône de la fonctionnalité
 * @param {string} props.title - Titre de la fonctionnalité
 * @param {string} props.description - Description de la fonctionnalité
 * @param {Array} props.features - Liste des sous-fonctionnalités
 * @param {string} props.color - Couleur d'accent (primary, accent, neon, etc.)
 */
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  features = [],
  color = 'primary',
  className = '',
  ...props 
}) => {
  return (
    <GlassCard 
      className={`space-y-4 ${className}`}
      hover={true}
      {...props}
    >
      {/* Icône */}
      {icon && (
        <motion.div
          className={`inline-flex p-3 rounded-xl bg-${color}/20 text-${color}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Titre */}
      <div>
        <h3 className="text-xl font-semibold text-white line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Description */}
      {description && (
        <p className="text-white/70 line-clamp-3 break-words">
          {description}
        </p>
      )}

      {/* Liste des fonctionnalités */}
      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2 text-sm text-white/80"
            >
              <div className={`w-1.5 h-1.5 rounded-full bg-${color}`} />
              <span className="line-clamp-1">{feature}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
};

export default FeatureCard;
