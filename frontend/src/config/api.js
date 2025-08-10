// Configuration API centralisée pour le portfolio Shay Acoca
export const API_CONFIG = {
  // URLs de base
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  FRONTEND_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  
  // Timeouts
  REQUEST_TIMEOUT: 10000, // 10 secondes
  UPLOAD_TIMEOUT: 30000,  // 30 secondes pour uploads
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 seconde
  
  // Cache configuration
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  
  // File upload limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'webp'],
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Rate limiting
  RATE_LIMIT_DELAY: 100, // 100ms entre requêtes
  
  // Headers par défaut
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  
  // Endpoints
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      ME: '/auth/me',
      REFRESH: '/auth/refresh',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    PROJECTS: {
      BASE: '/projects',
      LIKE: (id) => `/projects/${id}/like`,
      COMMENTS: (id) => `/projects/${id}/comments`,
    },
    POSTS: {
      BASE: '/posts',
      PUBLISH: (id) => `/posts/${id}/publish`,
      DRAFT: (id) => `/posts/${id}/draft`,
    },
    SKILLS: {
      BASE: '/skills',
      CATEGORIES: '/skills/categories',
    },
    GALLERY: {
      BASE: '/gallery',
      UPLOAD: '/gallery/upload',
      BULK_DELETE: '/gallery/bulk-delete',
    },
    CONTACT: {
      BASE: '/contact',
      MARK_READ: (id) => `/contact/${id}/read`,
    },
    ADMIN: {
      DASHBOARD: '/admin/dashboard',
      USERS: '/admin/users',
      SYSTEM: '/admin/system',
      LOGS: '/admin/logs',
    },
    ANALYTICS: {
      STATS: '/analytics/stats',
      VISITORS: '/analytics/visitors',
      TRACK: '/analytics/track',
    },
    SEARCH: {
      GLOBAL: '/search',
      PROJECTS: '/search/projects',
      POSTS: '/search/posts',
    },
    HEALTH: {
      CHECK: '/health',
      STATUS: '/health/status',
    },
  },
}

// Configuration des erreurs
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
}

// Messages d'erreur localisés
export const ERROR_MESSAGES = {
  [ERROR_CODES.NETWORK_ERROR]: 'Erreur de connexion. Vérifiez votre connexion internet.',
  [ERROR_CODES.TIMEOUT]: 'La requête a pris trop de temps. Veuillez réessayer.',
  [ERROR_CODES.UNAUTHORIZED]: 'Vous devez vous connecter pour accéder à cette ressource.',
  [ERROR_CODES.FORBIDDEN]: 'Vous n\'avez pas les permissions nécessaires.',
  [ERROR_CODES.NOT_FOUND]: 'La ressource demandée n\'existe pas.',
  [ERROR_CODES.VALIDATION_ERROR]: 'Les données fournies ne sont pas valides.',
  [ERROR_CODES.SERVER_ERROR]: 'Erreur serveur. Veuillez réessayer plus tard.',
  [ERROR_CODES.FILE_TOO_LARGE]: `Le fichier est trop volumineux (max ${API_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB).`,
  [ERROR_CODES.INVALID_FILE_TYPE]: `Type de fichier non autorisé. Types acceptés: ${API_CONFIG.ALLOWED_FILE_TYPES.join(', ')}.`,
}

export default API_CONFIG
