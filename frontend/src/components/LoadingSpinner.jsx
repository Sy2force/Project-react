import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen main-container flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        {/* Logo animé */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-16 h-16 mx-auto glass-card flex items-center justify-center mb-6"
        >
          <span className="text-2xl font-bold gradient-text">S.A</span>
        </motion.div>

        {/* Texte de chargement */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-300 text-lg"
        >
          Chargement...
        </motion.p>

        {/* Barre de progression */}
        <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-4 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
