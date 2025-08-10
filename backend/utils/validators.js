import { body, validationResult } from 'express-validator';

// Validation pour l'inscription
export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email valide requis'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Mot de passe minimum 8 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 4 chiffres et 1 caractère spécial (@$!%*?&)'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nom doit contenir entre 2 et 50 caractères'),
  body('role')
    .optional()
    .isIn(['user', 'business', 'admin'])
    .withMessage('Rôle invalide')
];

// Validation pour la connexion
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email valide requis'),
  body('password')
    .notEmpty()
    .withMessage('Mot de passe requis')
];

// Validation pour les projets
export const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Titre minimum 3 caractères'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description minimum 10 caractères'),
  body('tech')
    .isArray()
    .withMessage('Technologies doit être un tableau'),
  body('cover')
    .notEmpty()
    .withMessage('Image de couverture requise'),
  body('year')
    .optional()
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage('Année invalide')
];

// Validation pour les articles de blog
export const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Titre minimum 5 caractères'),
  body('content')
    .trim()
    .isLength({ min: 50 })
    .withMessage('Contenu minimum 50 caractères'),
  body('excerpt')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Extrait minimum 20 caractères'),
  body('cover')
    .notEmpty()
    .withMessage('Image de couverture requise'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags doit être un tableau')
];

// Validation pour les messages de contact
export const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Nom minimum 2 caractères'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email valide requis'),
  body('subject')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Sujet minimum 5 caractères'),
  body('message')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Message minimum 20 caractères')
];

// Middleware pour vérifier les erreurs de validation
export const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Données invalides',
      errors: errors.array()
    });
  }
  next();
};
