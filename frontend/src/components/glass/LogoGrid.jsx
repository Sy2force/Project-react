import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';

/**
 * LogoGrid - Grille de logos avec effets hover et marquee optionnel
 * @param {Object} props
 * @param {Array} props.logos - Tableau des logos [{src, alt, name, url}]
 * @param {boolean} props.marquee - Active l'effet marquee
 * @param {string} props.className - Classes CSS additionnelles
 */
const LogoGrid = ({ logos = [], marquee = false, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const LogoItem = ({ logo, index }) => (
    <motion.div
      variants={itemVariants}
      className="group relative"
    >
      <motion.div
        className="glass-panel p-4 h-20 flex items-center justify-center hover-lift"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={logo.src}
          alt={logo.alt || logo.name}
          className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
      </motion.div>
      {logo.name && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {logo.name}
          </div>
        </div>
      )}
    </motion.div>
  );

  if (marquee) {
    return (
      <GlassPanel className={`overflow-hidden ${className}`}>
        <div className="flex animate-marquee space-x-8">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <LogoItem logo={logo} index={index} />
            </div>
          ))}
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className={`p-6 ${className}`}>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {logos.map((logo, index) => (
          <LogoItem key={index} logo={logo} index={index} />
        ))}
      </motion.div>
    </GlassPanel>
  );
};

export default LogoGrid;
