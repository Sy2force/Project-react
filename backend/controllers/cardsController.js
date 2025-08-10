import Card from '../models/Card.js';
import User from '../models/User.js';
import { generateUniqueBizNumber } from '../utils/generateBizNumber.js';

// GET /api/cards - Liste des cartes avec pagination et filtres
export const getCards = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = '-createdAt',
      q,
      owner
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Construction du filtre
    const filter = {};
    
    if (q) {
      filter.$text = { $search: q };
    }
    
    if (owner) {
      filter.userId = owner;
    }

    // Requête avec pagination
    const [cards, total] = await Promise.all([
      Card.find(filter)
        .populate('userId', 'email role')
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Card.countDocuments(filter)
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
      message: 'Erreur lors de la récupération des cartes',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// GET /api/cards/:id - Détail d'une carte
export const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate('userId', 'email role');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la carte',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// POST /api/cards - Créer une nouvelle carte
export const createCard = async (req, res) => {
  try {
    const bizNumber = await generateUniqueBizNumber();
    
    const cardData = {
      ...req.body,
      bizNumber,
      userId: req.user.id
    };

    const card = new Card(cardData);
    await card.save();
    
    await card.populate('userId', 'email role');

    res.status(201).json({
      success: true,
      message: 'Carte créée avec succès',
      data: card
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Erreurs de validation',
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la carte',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// PATCH /api/cards/:id - Modifier une carte
export const updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Vérifier les permissions (propriétaire ou admin)
    if (card.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé'
      });
    }

    // Mise à jour des champs autorisés
    const allowedUpdates = [
      'title', 'subtitle', 'description', 'phone', 
      'email', 'webUrl', 'address', 'location', 'image'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        card[field] = req.body[field];
      }
    });

    await card.save();
    await card.populate('userId', 'email role');

    res.json({
      success: true,
      message: 'Carte mise à jour avec succès',
      data: card
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Erreurs de validation',
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la carte',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// DELETE /api/cards/:id - Supprimer une carte
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    // Vérifier les permissions (propriétaire ou admin)
    if (card.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé'
      });
    }

    await Card.findByIdAndDelete(req.params.id);

    // Supprimer la carte des favoris de tous les utilisateurs
    await User.updateMany(
      { favorites: req.params.id },
      { $pull: { favorites: req.params.id } }
    );

    res.json({
      success: true,
      message: 'Carte supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la carte',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// PATCH /api/cards/:id/toggle-favorite - Toggle favori
export const toggleFavorite = async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user.id;

    // Vérifier que la carte existe
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Carte non trouvée'
      });
    }

    const user = await User.findById(userId);
    const isFavorite = user.favorites.includes(cardId);

    if (isFavorite) {
      // Retirer des favoris
      user.favorites.pull(cardId);
    } else {
      // Ajouter aux favoris
      user.favorites.push(cardId);
    }

    await user.save();

    res.json({
      success: true,
      message: isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris',
      data: {
        isFavorite: !isFavorite,
        favoritesCount: user.favorites.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la gestion des favoris',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
