import Card from '../models/Card.js';

/**
 * Middleware pour vérifier si l'utilisateur est propriétaire ou admin
 * @param {string} resourceType - Type de ressource ('card', 'post', etc.)
 * @param {string} paramName - Nom du paramètre contenant l'ID (défaut: 'id')
 */
export const isOwnerOrAdmin = (resourceType = 'card', paramName = 'id') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentification requise'
        });
      }

      // Si admin, autoriser l'accès
      if (req.user.role === 'admin') {
        return next();
      }

      const resourceId = req.params[paramName];
      
      if (!resourceId) {
        return res.status(400).json({
          success: false,
          message: 'ID de ressource manquant'
        });
      }

      let resource;
      
      // Récupérer la ressource selon le type
      switch (resourceType) {
        case 'card':
          resource = await Card.findById(resourceId);
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Type de ressource non supporté'
          });
      }

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Ressource non trouvée'
        });
      }

      // Vérifier la propriété
      if (resource.userId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès refusé - Vous n\'êtes pas propriétaire de cette ressource'
        });
      }

      // Ajouter la ressource à la requête pour éviter une nouvelle requête
      req.resource = resource;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la vérification des permissions',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
};

export default { isOwnerOrAdmin };
