import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';

/**
 * KPIStrip - Bande de KPI avec métriques animées
 * @param {Object} props
 * @param {Array} props.kpis - Tableau des KPI [{label, value, icon, color}]
 * @param {string} props.className - Classes CSS additionnelles
 */
const KPIStrip = ({ kpis = [], className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <GlassPanel className={`p-6 ${className}`}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center space-y-2"
          >
            {kpi.icon && (
              <div className={`inline-flex p-3 rounded-xl bg-${kpi.color || 'primary'}/20 text-${kpi.color || 'primary'}`}>
                {kpi.icon}
              </div>
            )}
            <div>
              <motion.div
                className="text-2xl font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
              >
                {kpi.value}
              </motion.div>
              <div className="text-sm text-white/70 line-clamp-1">
                {kpi.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </GlassPanel>
  );
};

export default KPIStrip;
