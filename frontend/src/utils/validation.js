// Utilitaires de validation pour le portfolio Shay Acoca
import { CONSTANTS } from '../config/constants'

// Validation des emails
export const validateEmail = (email) => {
  if (!email) return { isValid: false, message: 'Email requis' }
  if (!CONSTANTS.PATTERNS.EMAIL.test(email)) {
    return { isValid: false, message: 'Format d\'email invalide' }
  }
  return { isValid: true }
}

// Validation des mots de passe
export const validatePassword = (password) => {
  if (!password) return { isValid: false, message: 'Mot de passe requis' }
  if (password.length < CONSTANTS.LIMITS.MIN_PASSWORD_LENGTH) {
    return { 
      isValid: false, 
      message: `Le mot de passe doit contenir au moins ${CONSTANTS.LIMITS.MIN_PASSWORD_LENGTH} caractères` 
    }
  }
  if (password.length > CONSTANTS.LIMITS.MAX_PASSWORD_LENGTH) {
    return { 
      isValid: false, 
      message: `Le mot de passe ne peut pas dépasser ${CONSTANTS.LIMITS.MAX_PASSWORD_LENGTH} caractères` 
    }
  }
  return { isValid: true }
}

// Validation des noms
export const validateName = (name, fieldName = 'Nom') => {
  if (!name) return { isValid: false, message: `${fieldName} requis` }
  if (name.trim().length < 2) {
    return { isValid: false, message: `${fieldName} doit contenir au moins 2 caractères` }
  }
  if (name.length > 50) {
    return { isValid: false, message: `${fieldName} ne peut pas dépasser 50 caractères` }
  }
  return { isValid: true }
}

// Validation des téléphones
export const validatePhone = (phone) => {
  if (!phone) return { isValid: false, message: 'Numéro de téléphone requis' }
  if (!CONSTANTS.PATTERNS.PHONE.test(phone)) {
    return { isValid: false, message: 'Format de téléphone invalide' }
  }
  return { isValid: true }
}

// Validation des URLs
export const validateUrl = (url, required = false) => {
  if (!url && !required) return { isValid: true }
  if (!url && required) return { isValid: false, message: 'URL requise' }
  if (!CONSTANTS.PATTERNS.URL.test(url)) {
    return { isValid: false, message: 'Format d\'URL invalide' }
  }
  return { isValid: true }
}

// Validation des titres
export const validateTitle = (title) => {
  if (!title) return { isValid: false, message: 'Titre requis' }
  if (title.trim().length < 3) {
    return { isValid: false, message: 'Le titre doit contenir au moins 3 caractères' }
  }
  if (title.length > CONSTANTS.LIMITS.MAX_TITLE_LENGTH) {
    return { 
      isValid: false, 
      message: `Le titre ne peut pas dépasser ${CONSTANTS.LIMITS.MAX_TITLE_LENGTH} caractères` 
    }
  }
  return { isValid: true }
}

// Validation des descriptions
export const validateDescription = (description, required = false) => {
  if (!description && !required) return { isValid: true }
  if (!description && required) return { isValid: false, message: 'Description requise' }
  if (description && description.length > CONSTANTS.LIMITS.MAX_DESCRIPTION_LENGTH) {
    return { 
      isValid: false, 
      message: `La description ne peut pas dépasser ${CONSTANTS.LIMITS.MAX_DESCRIPTION_LENGTH} caractères` 
    }
  }
  return { isValid: true }
}

// Validation des commentaires
export const validateComment = (comment) => {
  if (!comment) return { isValid: false, message: 'Commentaire requis' }
  if (comment.trim().length < 3) {
    return { isValid: false, message: 'Le commentaire doit contenir au moins 3 caractères' }
  }
  if (comment.length > CONSTANTS.LIMITS.MAX_COMMENT_LENGTH) {
    return { 
      isValid: false, 
      message: `Le commentaire ne peut pas dépasser ${CONSTANTS.LIMITS.MAX_COMMENT_LENGTH} caractères` 
    }
  }
  return { isValid: true }
}

// Validation des fichiers
export const validateFile = (file, options = {}) => {
  const {
    maxSize = CONSTANTS.LIMITS.MAX_FILE_SIZE,
    allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'webp'],
    required = false
  } = options

  if (!file && !required) return { isValid: true }
  if (!file && required) return { isValid: false, message: 'Fichier requis' }

  // Vérifier la taille
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      message: `Le fichier est trop volumineux (max ${Math.round(maxSize / 1024 / 1024)}MB)` 
    }
  }

  // Vérifier le type
  const fileExtension = file.name.split('.').pop().toLowerCase()
  if (!allowedTypes.includes(fileExtension)) {
    return { 
      isValid: false, 
      message: `Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}` 
    }
  }

  return { isValid: true }
}

// Validation des formulaires complets
export const validateLoginForm = (formData) => {
  const errors = {}

  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message
  }

  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateRegisterForm = (formData) => {
  const errors = {}

  const nameValidation = validateName(formData.name, 'Nom')
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message
  }

  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message
  }

  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message
  }

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateContactForm = (formData) => {
  const errors = {}

  const nameValidation = validateName(formData.name, 'Nom')
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message
  }

  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message
  }

  if (formData.phone) {
    const phoneValidation = validatePhone(formData.phone)
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.message
    }
  }

  const messageValidation = validateComment(formData.message)
  if (!messageValidation.isValid) {
    errors.message = messageValidation.message
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateProjectForm = (formData) => {
  const errors = {}

  const titleValidation = validateTitle(formData.title)
  if (!titleValidation.isValid) {
    errors.title = titleValidation.message
  }

  const descriptionValidation = validateDescription(formData.description, true)
  if (!descriptionValidation.isValid) {
    errors.description = descriptionValidation.message
  }

  if (formData.demoUrl) {
    const urlValidation = validateUrl(formData.demoUrl)
    if (!urlValidation.isValid) {
      errors.demoUrl = urlValidation.message
    }
  }

  if (formData.githubUrl) {
    const urlValidation = validateUrl(formData.githubUrl)
    if (!urlValidation.isValid) {
      errors.githubUrl = urlValidation.message
    }
  }

  if (!formData.technologies || formData.technologies.length === 0) {
    errors.technologies = 'Au moins une technologie est requise'
  }

  if (!formData.category) {
    errors.category = 'Catégorie requise'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validatePostForm = (formData) => {
  const errors = {}

  const titleValidation = validateTitle(formData.title)
  if (!titleValidation.isValid) {
    errors.title = titleValidation.message
  }

  const descriptionValidation = validateDescription(formData.excerpt, true)
  if (!descriptionValidation.isValid) {
    errors.excerpt = descriptionValidation.message
  }

  if (!formData.content || formData.content.trim().length < 50) {
    errors.content = 'Le contenu doit contenir au moins 50 caractères'
  }

  if (!formData.category) {
    errors.category = 'Catégorie requise'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Fonction utilitaire pour nettoyer les données
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input.trim().replace(/\s+/g, ' ')
}

// Fonction pour valider un objet avec des règles personnalisées
export const validateWithRules = (data, rules) => {
  const errors = {}

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field]

    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors[field] = rule.message || `${field} est requis`
      return
    }

    if (value && rule.validator) {
      const validation = rule.validator(value)
      if (!validation.isValid) {
        errors[field] = validation.message
      }
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateUrl,
  validateTitle,
  validateDescription,
  validateComment,
  validateFile,
  validateLoginForm,
  validateRegisterForm,
  validateContactForm,
  validateProjectForm,
  validatePostForm,
  sanitizeInput,
  validateWithRules,
}
