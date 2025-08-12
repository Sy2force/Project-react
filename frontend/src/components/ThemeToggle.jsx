import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-14 h-7 rounded-full p-1 transition-colors duration-300
        ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
      whileTap={{ scale: 0.95 }}
      aria-label={`Basculer vers le thème ${isDark ? 'clair' : 'sombre'}`}
    >
      <motion.div
        className={`
          w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs
          ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'}
        `}
        animate={{
          x: isDark ? 24 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
