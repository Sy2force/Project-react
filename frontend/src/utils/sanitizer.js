// [EXAM] Utilitaire de sécurité pour la sanitisation et protection XSS
import DOMPurify from 'dompurify';

/**
 * [EXAM] Configuration de base pour DOMPurify
 */
const defaultConfig = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'i', 'b', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img'
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'alt', 'src', 'width', 'height', 'class', 'id', 'target', 'rel'
  ],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'button'],
  FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur']
};

/**
 * [EXAM] Sanitise le contenu HTML pour éviter les attaques XSS
 * @param {string} html - Contenu HTML à sanitiser
 * @param {Object} [config] - Configuration personnalisée
 * @returns {string} HTML sanitisé
 */
export const sanitizeHtml = (html, config = {}) => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const mergedConfig = { ...defaultConfig, ...config };
  
  try {
    return DOMPurify.sanitize(html, mergedConfig);
  } catch (error) {
    console.error('[EXAM] Erreur lors de la sanitisation HTML:', error);
    return '';
  }
};

/**
 * [EXAM] Sanitise le texte brut en échappant les caractères dangereux
 * @param {string} text - Texte à sanitiser
 * @returns {string} Texte échappé
 */
export const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * [EXAM] Valide et sanitise une URL
 * @param {string} url - URL à valider
 * @param {Array<string>} [allowedProtocols] - Protocoles autorisés
 * @returns {string|null} URL sanitisée ou null si invalide
 */
export const sanitizeUrl = (url, allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const urlObj = new URL(url);
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return null;
    }

    // [EXAM] Vérification anti-phishing basique
    const suspiciousPatterns = [
      /javascript:/i,
      /data:/i,
      /vbscript:/i,
      /onload=/i,
      /onerror=/i
    ];

    if (suspiciousPatterns.some(pattern => pattern.test(url))) {
      return null;
    }

    return urlObj.toString();
  } catch (error) {
    console.error('[EXAM] URL invalide:', error);
    return null;
  }
};

/**
 * [EXAM] Sanitise les données d'un formulaire
 * @param {Object} formData - Données du formulaire
 * @param {Object} [rules] - Règles de sanitisation par champ
 * @returns {Object} Données sanitisées
 */
export const sanitizeFormData = (formData, rules = {}) => {
  if (!formData || typeof formData !== 'object') {
    return {};
  }

  const sanitized = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      sanitized[key] = value;
      return;
    }

    const rule = rules[key] || 'text';

    switch (rule) {
      case 'html':
        sanitized[key] = sanitizeHtml(value);
        break;
      case 'url':
        sanitized[key] = sanitizeUrl(value);
        break;
      case 'email':
        sanitized[key] = sanitizeEmail(value);
        break;
      case 'number':
        sanitized[key] = sanitizeNumber(value);
        break;
      case 'text':
      default:
        sanitized[key] = sanitizeText(value);
        break;
    }
  });

  return sanitized;
};

/**
 * [EXAM] Valide et sanitise une adresse email
 * @param {string} email - Email à valider
 * @returns {string|null} Email sanitisé ou null si invalide
 */
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return null;
  }

  // [EXAM] Regex basique pour validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanEmail = email.trim().toLowerCase();

  if (!emailRegex.test(cleanEmail)) {
    return null;
  }

  // [EXAM] Vérification de longueur
  if (cleanEmail.length > 254) {
    return null;
  }

  return cleanEmail;
};

/**
 * [EXAM] Sanitise et valide un nombre
 * @param {any} value - Valeur à convertir en nombre
 * @param {Object} [options] - Options de validation
 * @returns {number|null} Nombre sanitisé ou null si invalide
 */
export const sanitizeNumber = (value, options = {}) => {
  const { min, max, integer = false } = options;

  if (value === null || value === undefined || value === '') {
    return null;
  }

  const num = Number(value);

  if (isNaN(num) || !isFinite(num)) {
    return null;
  }

  if (integer && !Number.isInteger(num)) {
    return null;
  }

  if (typeof min === 'number' && num < min) {
    return null;
  }

  if (typeof max === 'number' && num > max) {
    return null;
  }

  return num;
};

/**
 * [EXAM] Génère un token CSRF sécurisé
 * @returns {string} Token CSRF
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * [EXAM] Valide un token CSRF
 * @param {string} token - Token à valider
 * @param {string} expectedToken - Token attendu
 * @returns {boolean} True si le token est valide
 */
export const validateCSRFToken = (token, expectedToken) => {
  if (!token || !expectedToken || typeof token !== 'string' || typeof expectedToken !== 'string') {
    return false;
  }

  return token === expectedToken;
};

/**
 * [EXAM] Nettoie les caractères de contrôle d'une chaîne
 * @param {string} str - Chaîne à nettoyer
 * @returns {string} Chaîne nettoyée
 */
export const removeControlCharacters = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  // [EXAM] Supprime les caractères de contrôle sauf \t, \n, \r
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

/**
 * [EXAM] Limite la longueur d'une chaîne de manière sécurisée
 * @param {string} str - Chaîne à limiter
 * @param {number} maxLength - Longueur maximale
 * @param {string} [suffix] - Suffixe à ajouter si tronqué
 * @returns {string} Chaîne limitée
 */
export const limitStringLength = (str, maxLength, suffix = '...') => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength - suffix.length) + suffix;
};

// [EXAM] Export par défaut de tous les utilitaires
export default {
  sanitizeHtml,
  sanitizeText,
  sanitizeUrl,
  sanitizeFormData,
  sanitizeEmail,
  sanitizeNumber,
  generateCSRFToken,
  validateCSRFToken,
  removeControlCharacters,
  limitStringLength
};
