// Configuration d'environnement centralisée
export const ENV_CONFIG = {
  // Environnement actuel
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  
  // Mode développement
  isDevelopment: import.meta.env.NODE_ENV === 'development',
  isProduction: import.meta.env.NODE_ENV === 'production',
  isTesting: import.meta.env.NODE_ENV === 'test',
  
  // URLs
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  
  // Application
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Shay Acoca Portfolio',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Portfolio futuriste de Shay Acoca - Créateur du Futur Digital',
  
  // Feature flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_PWA: import.meta.env.VITE_ENABLE_PWA === 'true',
  ENABLE_DARK_MODE: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
  ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
  
  // Services externes
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  
  // Social Media
  SOCIAL_LINKS: {
    GITHUB: import.meta.env.VITE_GITHUB_URL || 'https://github.com/shayacoca',
    LINKEDIN: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/shayacoca',
    TWITTER: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/shayacoca',
    EMAIL: 'contact@shayacoca.com',
    PHONE: '+33 6 12 34 56 78',
    WHATSAPP: 'https://wa.me/33612345678',
  },
  
  // Configuration de développement
  DEV_CONFIG: {
    ENABLE_REDUX_DEVTOOLS: import.meta.env.NODE_ENV === 'development',
    ENABLE_REACT_QUERY_DEVTOOLS: import.meta.env.NODE_ENV === 'development',
    SHOW_PERFORMANCE_MONITOR: import.meta.env.NODE_ENV === 'development',
    ENABLE_HOT_RELOAD: import.meta.env.NODE_ENV === 'development',
  },
  
  // Logging
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || (import.meta.env.NODE_ENV === 'production' ? 'error' : 'debug'),
  ENABLE_CONSOLE_LOGS: import.meta.env.NODE_ENV !== 'production',
  
  // Performance
  PERFORMANCE_CONFIG: {
    LAZY_LOADING_THRESHOLD: 100, // pixels
    IMAGE_LAZY_LOADING: true,
    COMPONENT_LAZY_LOADING: true,
    DEBOUNCE_DELAY: 300, // ms
    THROTTLE_DELAY: 100, // ms
  },
  
  // Cache
  CACHE_CONFIG: {
    ENABLE_SERVICE_WORKER: import.meta.env.VITE_ENABLE_PWA === 'true',
    CACHE_VERSION: 'v1.0.0',
    CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  },
  
  // UI Configuration
  UI_CONFIG: {
    THEME: {
      DEFAULT_THEME: 'dark',
      ENABLE_THEME_PERSISTENCE: true,
      ANIMATION_DURATION: 300, // ms
    },
    NAVBAR: {
      STICKY: true,
      TRANSPARENT_ON_TOP: true,
      HIDE_ON_SCROLL: false,
    },
    PARTICLES: {
      ENABLE: true,
      COUNT: 30,
      SPEED: 1,
    },
    GLASSMORPHISM: {
      ENABLE: true,
      BLUR_INTENSITY: 15,
      OPACITY: 0.1,
    },
  },
  
  // SEO
  SEO_CONFIG: {
    DEFAULT_TITLE: 'Shay Acoca - Créateur du Futur Digital',
    DEFAULT_DESCRIPTION: 'Portfolio futuriste de Shay Acoca, développeur full-stack spécialisé dans les technologies modernes et le design innovant.',
    DEFAULT_KEYWORDS: 'Shay Acoca, portfolio, développeur, React, Node.js, design futuriste, glassmorphism',
    DEFAULT_IMAGE: '/images/og-image.jpg',
    SITE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  },
}

// Validation de la configuration
export const validateConfig = () => {
  const errors = []
  
  if (!ENV_CONFIG.API_URL) {
    errors.push('VITE_API_URL is required')
  }
  
  if (ENV_CONFIG.isProduction && !ENV_CONFIG.GOOGLE_ANALYTICS_ID && ENV_CONFIG.ENABLE_ANALYTICS) {
    errors.push('VITE_GOOGLE_ANALYTICS_ID is required in production when analytics are enabled')
  }
  
  if (ENV_CONFIG.isProduction && !ENV_CONFIG.SENTRY_DSN) {
    console.warn('VITE_SENTRY_DSN is recommended in production for error tracking')
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration errors: ${errors.join(', ')}`)
  }
  
  return true
}

// Logger configuré selon l'environnement
export const logger = {
  debug: (...args) => {
    if (ENV_CONFIG.ENABLE_CONSOLE_LOGS && ENV_CONFIG.LOG_LEVEL === 'debug') {
      console.debug('[DEBUG]', ...args)
    }
  },
  info: (...args) => {
    if (ENV_CONFIG.ENABLE_CONSOLE_LOGS && ['debug', 'info'].includes(ENV_CONFIG.LOG_LEVEL)) {
      console.info('[INFO]', ...args)
    }
  },
  warn: (...args) => {
    if (ENV_CONFIG.ENABLE_CONSOLE_LOGS && ['debug', 'info', 'warn'].includes(ENV_CONFIG.LOG_LEVEL)) {
      console.warn('[WARN]', ...args)
    }
  },
  error: (...args) => {
    if (ENV_CONFIG.ENABLE_CONSOLE_LOGS) {
      console.error('[ERROR]', ...args)
    }
  },
}

export default ENV_CONFIG
