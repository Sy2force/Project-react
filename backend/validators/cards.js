import { body, param, query, validationResult } from 'express-validator';
import { sanitizeHtml } from '../utils/sanitize.js';

// Validation pour la création d'une carte
export const validateCreateCard = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le titre doit contenir entre 2 et 100 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('subtitle')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le sous-titre ne peut pas dépasser 100 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1024 })
    .withMessage('La description doit contenir entre 10 et 1024 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('phone')
    .matches(/^(\+972-?)?0?5[0-9]-?\d{7}$/)
    .withMessage('Format de téléphone israélien invalide'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Format d\'email invalide'),
  
  body('webUrl')
    .optional()
    .isURL({ protocols: ['https'] })
    .withMessage('L\'URL doit être en HTTPS'),
  
  body('address')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('L\'adresse doit contenir entre 5 et 200 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('location.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude invalide'),
  
  body('location.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude invalide'),
  
  body('image')
    .optional()
    .isURL()
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i)
    .withMessage('Format d\'image invalide')
];

// Validation pour la mise à jour d'une carte
export const validateUpdateCard = [
  param('id')
    .isMongoId()
    .withMessage('ID de carte invalide'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le titre doit contenir entre 2 et 100 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('subtitle')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le sous-titre ne peut pas dépasser 100 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1024 })
    .withMessage('La description doit contenir entre 10 et 1024 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('phone')
    .optional()
    .matches(/^(\+972-?)?0?5[0-9]-?\d{7}$/)
    .withMessage('Format de téléphone israélien invalide'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Format d\'email invalide'),
  
  body('webUrl')
    .optional()
    .isURL({ protocols: ['https'] })
    .withMessage('L\'URL doit être en HTTPS'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('L\'adresse doit contenir entre 5 et 200 caractères')
    .customSanitizer(sanitizeHtml),
  
  body('location.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude invalide'),
  
  body('location.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude invalide'),
  
  body('image')
    .optional()
    .isURL()
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i)
    .withMessage('Format d\'image invalide')
];

// Validation pour toggle favorite
export const validateToggleFavorite = [
  param('id')
    .isMongoId()
    .withMessage('ID de carte invalide')
];

// Validation pour les paramètres de requête
export const validateCardQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Numéro de page invalide'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limite invalide (1-50)'),
  
  query('sort')
    .optional()
    .isIn(['createdAt', '-createdAt', 'title', '-title'])
    .withMessage('Tri invalide'),
  
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Recherche invalide')
    .customSanitizer(sanitizeHtml),
  
  query('owner')
    .optional()
    .isMongoId()
    .withMessage('ID propriétaire invalide')
];

// Middleware pour gérer les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};
