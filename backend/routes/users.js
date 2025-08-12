import express from 'express';
import Card from '../models/Card.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateCardQuery, handleValidationErrors } from '../validators/cards.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting pour les routes utilisateur
const userRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requêtes par IP
  message: {
    success: false,
    message: 'Trop de requêtes, réessayez plus tard'
  }
});

// GET /api/users/me/cards - Mes cartes
router.get('/me/cards',
  userRateLimit,
  authenticateToken,
  validateCardQuery,
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 12,
        sort = '-createdAt'
      } = req.query;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      // Récupérer les cartes de l'utilisateur connecté
      const [cards, total] = await Promise.all([
        Card.find({ userId: req.user.id })
          .sort(sort)
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Card.countDocuments({ userId: req.user.id })
      ]);

      const totalPages = Math.ceil(total / limitNum);

      res.json({
        success: true,
        data: {
          cards,
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalItems: total,
            itemsPerPage: limitNum,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de vos cartes',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// GET /api/users/me/favorites - Mes favoris
router.get('/me/favorites',
  userRateLimit,
  authenticateToken,
  validateCardQuery,
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 12,
        sort = '-createdAt'
      } = req.query;

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      // Récupérer l'utilisateur avec ses favoris
      const user = await User.findById(req.user.id).populate({
        path: 'favorites',
        populate: {
          path: 'userId',
          select: 'email role'
        },
        options: {
          sort: sort,
          skip: skip,
          limit: limitNum
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      const total = user.favorites.length;
      const totalPages = Math.ceil(total / limitNum);

      res.json({
        success: true,
        data: {
          cards: user.favorites,
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalItems: total,
            itemsPerPage: limitNum,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de vos favoris',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// DELETE /api/users/me/favorites/:cardId - Supprimer un favori
router.delete('/me/favorites/:cardId',
  userRateLimit,
  authenticateToken,
  async (req, res) => {
    try {
      const { cardId } = req.params;
      const userId = req.user.id;

      // Vérifier que la carte existe
      const card = await Card.findById(cardId);
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'Carte non trouvée'
        });
      }

      // Retirer la carte des favoris
      const user = await User.findById(userId);
      const wasFavorite = user.favorites.includes(cardId);
      
      if (!wasFavorite) {
        return res.status(400).json({
          success: false,
          message: 'Cette carte n\'est pas dans vos favoris'
        });
      }

      user.favorites.pull(cardId);
      await user.save();

      res.json({
        success: true,
        message: 'Carte retirée des favoris',
        data: {
          favoritesCount: user.favorites.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du favori',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

export default router;
