const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const User = require('../models/User');
const { body, validationResult, query } = require('express-validator');

// Toutes les routes admin nécessitent l'authentification et les droits admin
router.use(auth);
router.use(requireAdmin);

/**
 * GET /api/admin/users
 * Liste paginée des utilisateurs avec recherche
 */
router.get('/users', [
  query('search').optional().isString().trim().isLength({ max: 100 }),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('role').optional().isIn(['user', 'business', 'admin'])
], async (req, res) => {
  try {
    // Validation des paramètres
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Paramètres invalides',
        errors: errors.array()
      });
    }

    const { search = '', page = 1, limit = 20, role } = req.query;

    // Construction du filtre de recherche
    let filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      filter.role = role;
    }

    // Calcul pagination
    const skip = (page - 1) * limit;

    // Requête avec pagination et tri
    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .select('_id name email role createdAt lastLogin')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(filter)
    ]);

    // Calcul métadonnées pagination
    const totalPages = Math.ceil(totalUsers / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalUsers,
          itemsPerPage: limit,
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Erreur liste users admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des utilisateurs'
    });
  }
});

/**
 * PATCH /api/admin/users/:id/role
 * Changer le rôle d'un utilisateur (user ↔ business uniquement)
 */
router.patch('/users/:id/role', [
  body('role').isIn(['user', 'business']).withMessage('Rôle doit être user ou business')
], async (req, res) => {
  try {
    // Validation des données
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Données invalides',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { role } = req.body;

    // Vérifier que l'utilisateur cible existe
    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Interdire de modifier un admin
    if (targetUser.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Impossible de modifier le rôle d\'un administrateur'
      });
    }

    // Interdire de s'auto-modifier (sécurité)
    if (targetUser._id.toString() === req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de modifier son propre rôle'
      });
    }

    // Mettre à jour le rôle
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('_id name email role createdAt lastLogin');

    res.json({
      success: true,
      message: `Rôle mis à jour vers ${role}`,
      data: { user: updatedUser }
    });

  } catch (error) {
    console.error('Erreur changement rôle admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors du changement de rôle'
    });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Supprimer un utilisateur (interdire si admin)
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier que l'utilisateur cible existe
    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Interdire de supprimer un admin
    if (targetUser.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Impossible de supprimer un administrateur'
      });
    }

    // Interdire de s'auto-supprimer (sécurité)
    if (targetUser._id.toString() === req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Impossible de supprimer son propre compte'
      });
    }

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Utilisateur supprimé avec succès',
      data: { deletedUserId: id }
    });

  } catch (error) {
    console.error('Erreur suppression user admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression'
    });
  }
});

/**
 * GET /api/admin/stats
 * Statistiques générales pour le dashboard admin
 */
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      usersByRole,
      recentUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]),
      User.find()
        .select('name email role createdAt')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
    ]);

    // Formater les stats par rôle
    const roleStats = {
      user: 0,
      business: 0,
      admin: 0
    };

    usersByRole.forEach(item => {
      roleStats[item._id] = item.count;
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        roleStats,
        recentUsers
      }
    });

  } catch (error) {
    console.error('Erreur stats admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des statistiques'
    });
  }
});

module.exports = router;
