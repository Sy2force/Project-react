// Configuration centralisée pour le portfolio Shay Acoca
// Point d'entrée unique pour toutes les configurations

// Configurations principales
export { default as API_CONFIG, ERROR_CODES, ERROR_MESSAGES } from './api'
export { default as ENV_CONFIG, validateConfig, logger } from './env'
export { default as CONSTANTS } from './constants'
export { default as THEME_CONFIG, getThemeColor, createGlassmorphismStyle, generateThemeCSS } from './theme'

// Validation de la configuration au démarrage
import { validateConfig } from './env'

// Initialisation de la configuration
export const initializeConfig = () => {
  try {
    // Valider la configuration d'environnement
    validateConfig()
    
    // Logger la configuration en mode développement
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Configuration initialisée avec succès')
      console.log('📍 API URL:', process.env.VITE_API_URL || 'http://localhost:5001/api')
      console.log('🌐 Base URL:', process.env.VITE_BASE_URL || 'http://localhost:3000')
    }
    
    return true
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la configuration:', error.message)
    return false
  }
}

// Configuration par défaut exportée
export const CONFIG = {
  // URLs
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  
  // Application
  APP_NAME: 'Shay Acoca Portfolio',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Portfolio futuriste de Shay Acoca - Créateur du Futur Digital',
  
  // Environnement
  IS_DEVELOPMENT: import.meta.env.NODE_ENV === 'development',
  IS_PRODUCTION: import.meta.env.NODE_ENV === 'production',
  
  // Features
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_PWA: import.meta.env.VITE_ENABLE_PWA === 'true',
  ENABLE_DARK_MODE: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
  
  // Performance
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  REQUEST_TIMEOUT: 10000, // 10 secondes
  
  // UI
  DEFAULT_THEME: 'dark',
  ANIMATION_DURATION: 300,
  PARTICLES_COUNT: 30,
  
  // Limites
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_UPLOAD_FILES: 10,
  
  // Social
  SOCIAL_LINKS: {
    GITHUB: 'https://github.com/shayacoca',
    LINKEDIN: 'https://linkedin.com/in/shayacoca',
    TWITTER: 'https://twitter.com/shayacoca',
    EMAIL: 'contact@shayacoca.com',
    PHONE: '+33 6 12 34 56 78',
    WHATSAPP: 'https://wa.me/33612345678',
  },
}

export default CONFIG
