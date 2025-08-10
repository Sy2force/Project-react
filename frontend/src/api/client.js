import axios from 'axios'
import toast from 'react-hot-toast'

// Configuration de l'API client selon spécifications monorepo
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

// Gestion d'erreurs centralisée
class ErrorHandler {
  static handle(error) {
    const { response, request, message } = error
    
    // Erreur réseau
    if (!response && request) {
      const networkError = 'Erreur de connexion. Vérifiez votre connexion internet.'
      toast.error(networkError)
      return Promise.reject({ message: networkError, type: 'network' })
    }
    
    // Erreur serveur
    if (response) {
      const { status, data } = response
      const errorMessage = data?.message || this.getStatusMessage(status)
      
      switch (status) {
        case 400:
          // Erreurs de validation - ne pas afficher de toast global
          return Promise.reject({ ...data, type: 'validation' })
        case 401:
          // Non autorisé - géré par l'interceptor
          return Promise.reject({ message: errorMessage, type: 'auth' })
        case 403:
          toast.error('Accès refusé. Permissions insuffisantes.')
          return Promise.reject({ message: errorMessage, type: 'forbidden' })
        case 404:
          toast.error('Ressource non trouvée.')
          return Promise.reject({ message: errorMessage, type: 'not_found' })
        case 429:
          toast.error('Trop de requêtes. Veuillez patienter.')
          return Promise.reject({ message: errorMessage, type: 'rate_limit' })
        case 500:
        case 502:
        case 503:
        case 504:
          toast.error('Erreur serveur. Veuillez réessayer plus tard.')
          return Promise.reject({ message: errorMessage, type: 'server' })
        default:
          toast.error(errorMessage)
          return Promise.reject({ message: errorMessage, type: 'unknown' })
      }
    }
    
    // Erreur inconnue
    toast.error('Une erreur inattendue s\'est produite.')
    return Promise.reject({ message, type: 'unknown' })
  }
  
  static getStatusMessage(status) {
    const messages = {
      400: 'Données invalides',
      401: 'Non autorisé',
      403: 'Accès refusé',
      404: 'Ressource non trouvée',
      429: 'Trop de requêtes',
      500: 'Erreur serveur interne',
      502: 'Passerelle défaillante',
      503: 'Service indisponible',
      504: 'Délai d\'attente dépassé'
    }
    return messages[status] || `Erreur ${status}`
  }
}

// Instance axios avec configuration de base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Pour les cookies JWT
})

// Intercepteur pour ajouter le token JWT et logging
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Logging en développement uniquement
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params
      })
    }
    
    return config
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('❌ API Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les réponses et erreurs
apiClient.interceptors.response.use(
  (response) => {
    // Logging en développement uniquement
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data
      })
    }
    return response
  },
  (error) => {
    // Logging en développement uniquement
    if (import.meta.env.DEV) {
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      })
    }
    
    // Gestion spéciale pour 401 (non autorisé)
    if (error.response?.status === 401) {
      // Token expiré ou invalide - nettoyer UNIQUEMENT le token
      localStorage.removeItem('token')
      
      // Éviter les redirections en boucle
      const currentPath = window.location.pathname
      if (!['/intro', '/auth', '/login', '/register'].includes(currentPath)) {
        toast.error('Session expirée, veuillez vous reconnecter')
        setTimeout(() => {
          window.location.href = '/intro'
        }, 1000)
      }
    }
    
    // Utiliser la gestion d'erreurs centralisée
    return ErrorHandler.handle(error)
  }
)

// API Methods selon spécifications backend
export const api = {
  // Authentication
  auth: {
    register: (userData) => apiClient.post('/auth/register', userData),
    login: (credentials) => apiClient.post('/auth/login', credentials),
    logout: () => apiClient.post('/auth/logout'),
    me: () => apiClient.get('/auth/me'),
    updateProfile: (data) => apiClient.put('/auth/profile', data),
  },

  // Business Cards (modèle principal de la plateforme)
  cards: {
    getAll: (params) => apiClient.get('/cards', { params }),
    getById: (id) => apiClient.get(`/cards/${id}`),
    create: (data) => apiClient.post('/cards', data), // business/admin only
    update: (id, data) => apiClient.put(`/cards/${id}`, data), // owner/admin only
    delete: (id) => apiClient.delete(`/cards/${id}`), // owner/admin only
    like: (id) => apiClient.patch(`/cards/${id}/like`),
    unlike: (id) => apiClient.delete(`/cards/${id}/like`),
    getMyCards: () => apiClient.get('/cards/my-cards'),
  },

  // Users (gestion des utilisateurs)
  users: {
    getAll: (params) => apiClient.get('/users', { params }), // admin only
    getById: (id) => apiClient.get(`/users/${id}`), // admin only
    update: (id, data) => apiClient.put(`/users/${id}`, data), // admin only
    delete: (id) => apiClient.delete(`/users/${id}`), // admin only
    changeStatus: (id, isBusiness) => apiClient.patch(`/users/${id}`, { isBusiness }), // admin only
  },

  // Favorites (cartes favorites)
  favorites: {
    getAll: () => apiClient.get('/favorites'),
    add: (cardId) => apiClient.post('/favorites', { cardId }),
    remove: (cardId) => apiClient.delete(`/favorites/${cardId}`),
  },

  // Blog Posts (articles de la plateforme)
  posts: {
    getAll: (params) => apiClient.get('/posts', { params }),
    getById: (id) => apiClient.get(`/posts/${id}`),
    create: (data) => apiClient.post('/posts', data), // admin only
    update: (id, data) => apiClient.patch(`/posts/${id}`, data), // admin only
    delete: (id) => apiClient.delete(`/posts/${id}`), // admin only
  },

  // Contact
  contact: {
    send: (data) => apiClient.post('/contact', data),
    getMessages: () => apiClient.get('/contact'), // admin only
    markAsRead: (id) => apiClient.patch(`/contact/${id}/read`), // admin only
  },

  // PDF Generation (pour simulateur)
  pdf: {
    generate: (data) => apiClient.post('/pdf/generate', data, {
      responseType: 'blob', // Pour recevoir le PDF
    }),
  },

  // Upload (gestion des images)
  upload: {
    image: (formData) => apiClient.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (filename) => apiClient.delete(`/upload/${filename}`), // owner/admin only
  },

  // Analytics
  analytics: {
    getStats: () => apiClient.get('/analytics/stats'),
    getVisitors: (params) => apiClient.get('/analytics/visitors', { params }),
    trackEvent: (data) => apiClient.post('/analytics/track', data),
  },

  // Search
  search: {
    global: (query, filters) => apiClient.get('/search', { 
      params: { q: query, ...filters } 
    }),
    cards: (query) => apiClient.get('/search/cards', { 
      params: { q: query } 
    }),
    posts: (query) => apiClient.get('/search/posts', { 
      params: { q: query } 
    }),
  },

  // Admin
  admin: {
    getDashboard: () => apiClient.get('/admin/dashboard'),
    getUsers: (params) => apiClient.get('/admin/users', { params }),
    updateUser: (id, data) => apiClient.patch(`/admin/users/${id}`, data),
    deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),
    getSystemStats: () => apiClient.get('/admin/system'),
  },

  // Statistics (statistiques de la plateforme)
  stats: {
    getOverview: () => apiClient.get('/stats/overview'), // admin only
    getCards: () => apiClient.get('/stats/cards'), // admin only
    getUsers: () => apiClient.get('/stats/users'), // admin only
  },

  // Health Check
  health: {
    check: () => apiClient.get('/health'),
    status: () => apiClient.get('/health/status'),
  },
}

export default apiClient
