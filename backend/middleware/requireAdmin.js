const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware pour vérifier que l'utilisateur est admin
 * Doit être utilisé après auth.js
 */
const requireAdmin = async (req, res, next) => {
  try {
    // Vérifier que l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentification requise'
      });
    }

    // Vérifier le rôle admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Droits administrateur requis.'
      });
    }

    // Vérifier que l'utilisateur existe toujours et est toujours admin
    const currentUser = await User.findById(req.user.id).select('role');
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Droits administrateur révoqués ou utilisateur inexistant'
      });
    }

    next();
  } catch (error) {
    console.error('Erreur middleware requireAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la vérification des droits'
    });
  }
};

module.exports = requireAdmin;
