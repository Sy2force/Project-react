// SocialButton.jsx - Bouton social OAuth avec style glassmorphism
import { motion } from 'framer-motion';

const SocialButton = ({ icon: Icon, label, onClick, disabled = false }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white py-3 px-4 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium group overflow-hidden"
      aria-label={`Continuer avec ${label}`}
    >
      {/* Effet de glow au hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Contenu */}
      <div className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        <span className="hidden sm:inline">{label}</span>
      </div>
      
      {/* Highlight subtil */}
      <div className="absolute top-1 left-1 w-6 h-6 bg-white/10 rounded-full blur-sm opacity-60" />
    </motion.button>
  );
};

export default SocialButton;
