// Utilitaires pour les appels API
import { api } from '../api/client'
import { API_CONFIG, ERROR_CODES, ERROR_MESSAGES } from '../config/api'
import { logger } from '../config/env'
import toast from 'react-hot-toast'

// Cache simple en mémoire
const cache = new Map()

// Fonction de retry avec backoff exponentiel
export const retryWithBackoff = async (fn, maxRetries = API_CONFIG.MAX_RETRIES) => {
  let lastError
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      // Ne pas retry sur certaines erreurs
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw error
      }
      
      // Attendre avant le prochain essai
      if (i < maxRetries - 1) {
        const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, i)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError
}

// Wrapper pour les appels API avec gestion d'erreurs
export const apiCall = async (apiFunction, options = {}) => {
  const {
    showLoading = false,
    showSuccess = false,
    showError = true,
    loadingMessage = 'Chargement...',
    successMessage = 'Opération réussie',
    useCache = false,
    cacheKey = null,
    retry = true,
  } = options

  let toastId
  
  try {
    // Afficher le loading si demandé
    if (showLoading) {
      toastId = toast.loading(loadingMessage)
    }

    // Vérifier le cache si activé
    if (useCache && cacheKey && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey)
      if (Date.now() - cachedData.timestamp < API_CONFIG.CACHE_TTL) {
        logger.debug('Cache hit for:', cacheKey)
        if (toastId) toast.dismiss(toastId)
        return cachedData.data
      }
    }

    // Exécuter l'appel API
    const response = retry 
      ? await retryWithBackoff(apiFunction)
      : await apiFunction()

    // Mettre en cache si demandé
    if (useCache && cacheKey) {
      cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      })
      logger.debug('Cached data for:', cacheKey)
    }

    // Afficher le succès si demandé
    if (showSuccess) {
      if (toastId) {
        toast.success(successMessage, { id: toastId })
      } else {
        toast.success(successMessage)
      }
    } else if (toastId) {
      toast.dismiss(toastId)
    }

    logger.debug('API call successful:', response.config?.url)
    return response.data

  } catch (error) {
    if (toastId) toast.dismiss(toastId)
    
    const errorMessage = getErrorMessage(error)
    logger.error('API call failed:', error)

    if (showError) {
      toast.error(errorMessage)
    }

    throw error
  }
}

// Fonction pour obtenir un message d'erreur lisible
export const getErrorMessage = (error) => {
  if (!error.response) {
    return ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR]
  }

  const { status, data } = error.response

  switch (status) {
    case 400:
      return data?.message || ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
    case 401:
      return ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]
    case 403:
      return ERROR_MESSAGES[ERROR_CODES.FORBIDDEN]
    case 404:
      return ERROR_MESSAGES[ERROR_CODES.NOT_FOUND]
    case 413:
      return ERROR_MESSAGES[ERROR_CODES.FILE_TOO_LARGE]
    case 422:
      return data?.message || ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
    case 429:
      return 'Trop de requêtes. Veuillez patienter.'
    case 500:
    case 502:
    case 503:
    case 504:
      return ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR]
    default:
      return data?.message || 'Une erreur inattendue est survenue'
  }
}

// Fonction pour valider les fichiers
export const validateFile = (file) => {
  const errors = []

  // Vérifier la taille
  if (file.size > API_CONFIG.MAX_FILE_SIZE) {
    errors.push(ERROR_MESSAGES[ERROR_CODES.FILE_TOO_LARGE])
  }

  // Vérifier le type
  const fileExtension = file.name.split('.').pop().toLowerCase()
  if (!API_CONFIG.ALLOWED_FILE_TYPES.includes(fileExtension)) {
    errors.push(ERROR_MESSAGES[ERROR_CODES.INVALID_FILE_TYPE])
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Fonction pour créer un FormData avec validation
export const createFormData = (data, fileFields = []) => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (fileFields.includes(key) && value instanceof File) {
      const validation = validateFile(value)
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '))
      }
    }

    if (value !== null && value !== undefined) {
      if (typeof value === 'object' && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    }
  })

  return formData
}

// Fonction pour nettoyer le cache
export const clearCache = (pattern = null) => {
  if (pattern) {
    const regex = new RegExp(pattern)
    for (const key of cache.keys()) {
      if (regex.test(key)) {
        cache.delete(key)
      }
    }
  } else {
    cache.clear()
  }
  logger.debug('Cache cleared', pattern ? `with pattern: ${pattern}` : 'completely')
}

// Hook personnalisé pour les appels API (à utiliser dans les composants)
export const useApiCall = () => {
  return {
    call: apiCall,
    clearCache,
    validateFile,
    createFormData,
  }
}

// Fonctions spécialisées pour les entités principales
export const projectsApi = {
  getAll: (params = {}) => apiCall(
    () => api.projects.getAll(params),
    { 
      useCache: true, 
      cacheKey: `projects_${JSON.stringify(params)}`,
      showError: true 
    }
  ),
  
  getById: (id) => apiCall(
    () => api.projects.getById(id),
    { 
      useCache: true, 
      cacheKey: `project_${id}`,
      showError: true 
    }
  ),
  
  create: (data) => apiCall(
    () => api.projects.create(data),
    { 
      showLoading: true,
      showSuccess: true,
      loadingMessage: 'Création du projet...',
      successMessage: 'Projet créé avec succès'
    }
  ),
  
  update: (id, data) => apiCall(
    () => api.projects.update(id, data),
    { 
      showLoading: true,
      showSuccess: true,
      loadingMessage: 'Mise à jour du projet...',
      successMessage: 'Projet mis à jour avec succès'
    }
  ),
  
  delete: (id) => apiCall(
    () => api.projects.delete(id),
    { 
      showLoading: true,
      showSuccess: true,
      loadingMessage: 'Suppression du projet...',
      successMessage: 'Projet supprimé avec succès'
    }
  ),
  
  like: (id) => apiCall(
    () => api.projects.like(id),
    { 
      showSuccess: true,
      successMessage: 'Merci pour votre like !'
    }
  ),
}

export const authApi = {
  login: (credentials) => apiCall(
    () => api.auth.login(credentials),
    { 
      showLoading: true,
      showSuccess: true,
      loadingMessage: 'Connexion en cours...',
      successMessage: 'Connexion réussie'
    }
  ),
  
  register: (userData) => apiCall(
    () => api.auth.register(userData),
    { 
      showLoading: true,
      showSuccess: true,
      loadingMessage: 'Création du compte...',
      successMessage: 'Compte créé avec succès'
    }
  ),
  
  logout: () => apiCall(
    () => api.auth.logout(),
    { 
      showSuccess: true,
      successMessage: 'Déconnexion réussie'
    }
  ),
  
  me: () => apiCall(
    () => api.auth.me(),
    { 
      useCache: true,
      cacheKey: 'current_user',
      showError: false // Ne pas afficher d'erreur pour la vérification automatique
    }
  ),
}

export const contactApi = {
  send: (data) => apiCall(
    () => api.contact.send(data),
    { 
      showLoading: true,
      showSuccess: true,
      loadingMessage: 'Envoi du message...',
      successMessage: 'Message envoyé avec succès'
    }
  ),
}

export default {
  apiCall,
  retryWithBackoff,
  getErrorMessage,
  validateFile,
  createFormData,
  clearCache,
  projectsApi,
  authApi,
  contactApi,
}
