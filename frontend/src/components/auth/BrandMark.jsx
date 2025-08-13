// BrandMark.jsx - Logo néon avec glow pour l'authentification
import { motion } from 'framer-motion';

const BrandMark = ({ initials = 'S.A', size = 'default' }) => {
  const sizeClasses = {
    small: 'w-10 h-10 text-sm',
    default: 'w-12 h-12 text-lg',
    large: 'w-16 h-16 text-xl'
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 110, damping: 14 }}
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg relative overflow-hidden`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 animate-pulse opacity-75 blur-sm"></div>
      
      {/* Brand initials */}
      <span className="relative z-10 font-semibold tracking-wide">{initials}</span>
      
      {/* Inner highlight */}
      <div className="absolute top-1 left-1 w-3 h-3 bg-white/30 rounded-full blur-sm"></div>
    </motion.div>
  );
};

export default BrandMark;
