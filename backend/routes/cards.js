import express from 'express';
import {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  toggleFavorite
} from '../controllers/cardsController.js';
import {
  validateCreateCard,
  validateUpdateCard,
  validateToggleFavorite,
  validateCardQuery,
  handleValidationErrors
} from '../validators/cards.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { isOwnerOrAdmin } from '../middleware/ownership.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting pour les cartes
const cardsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par IP
  message: {
    success: false,
    message: 'Trop de requêtes, réessayez plus tard'
  }
});

const createCardRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // 5 créations par heure
  message: {
    success: false,
    message: 'Limite de création de cartes atteinte, réessayez dans une heure'
  }
});

// Routes publiques
router.get('/', 
  cardsRateLimit,
  validateCardQuery,
  handleValidationErrors,
  getCards
);

router.get('/:id',
  cardsRateLimit,
  validateToggleFavorite,
  handleValidationErrors,
  getCardById
);

// Routes protégées - Création (business ou admin)
router.post('/',
  createCardRateLimit,
  authenticateToken,
  requireRole(['business', 'admin']),
  validateCreateCard,
  handleValidationErrors,
  createCard
);

// Routes protégées - Modification (propriétaire ou admin)
router.patch('/:id',
  cardsRateLimit,
  authenticateToken,
  validateUpdateCard,
  handleValidationErrors,
  updateCard
);

// Routes protégées - Suppression (propriétaire ou admin)
router.delete('/:id',
  cardsRateLimit,
  authenticateToken,
  validateToggleFavorite,
  handleValidationErrors,
  deleteCard
);

// Routes protégées - Toggle favori (utilisateur connecté)
router.patch('/:id/toggle-favorite',
  cardsRateLimit,
  authenticateToken,
  validateToggleFavorite,
  handleValidationErrors,
  toggleFavorite
);

export default router;
