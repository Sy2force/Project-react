import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ onSearch, placeholder = "Rechercher des projets..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useTheme();

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.div
      className={`
        relative w-full max-w-md mx-auto
        ${isFocused ? 'scale-105' : 'scale-100'}
        transition-transform duration-200
      `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Icône de recherche */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Champ de recherche */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-10 py-3 rounded-lg border transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isDark 
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50'
            }
            ${isFocused ? 'shadow-lg' : 'shadow-md'}
          `}
        />

        {/* Bouton pour effacer */}
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={clearSearch}
            className={`
              absolute inset-y-0 right-0 pr-3 flex items-center
              ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}
              transition-colors duration-200
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Indicateur de recherche active */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            mt-2 text-sm text-center
            ${isDark ? 'text-gray-400' : 'text-gray-600'}
          `}
        >
          Recherche active : "{searchTerm}"
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
