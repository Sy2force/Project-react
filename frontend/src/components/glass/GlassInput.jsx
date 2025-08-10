import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassInput - Input glassmorphique avec états focus et validation
 * @param {Object} props
 * @param {string} props.type - Type d'input (text, email, password, etc.)
 * @param {string} props.placeholder - Texte placeholder
 * @param {string} props.value - Valeur contrôlée
 * @param {Function} props.onChange - Gestionnaire de changement
 * @param {boolean} props.error - État d'erreur
 * @param {string} props.errorMessage - Message d'erreur
 * @param {string} props.label - Label de l'input
 */
const GlassInput = ({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = false,
  errorMessage = '',
  label = '',
  className = '',
  ...props 
}) => {
  const baseClasses = 'glass-input w-full text-white placeholder-white/50';
  const errorClasses = error 
    ? 'border-danger/50 focus:border-danger/70 focus:ring-danger/30' 
    : 'focus:border-primary/50 focus:ring-primary/30';
  
  const combinedClasses = `${baseClasses} ${errorClasses} ${className}`.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <motion.input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={combinedClasses}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      {error && errorMessage && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-danger/80"
        >
          {errorMessage}
        </motion.p>
      )}
    </div>
  );
};

export default GlassInput;
