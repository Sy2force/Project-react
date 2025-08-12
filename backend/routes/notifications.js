import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Modèle temporaire pour les notifications (en mémoire)
let notifications = [
  {
    id: '1',
    userId: 'user1',
    title: 'Nouveau projet créé',
    message: 'Votre projet "Portfolio React" a été créé avec succès',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2h ago
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Message reçu',
    message: 'Vous avez reçu un nouveau message de contact',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30min ago
  }
];

// GET /api/notifications - Récupérer les notifications de l'utilisateur
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const userId = req.user.id;

    let userNotifications = notifications.filter(n => n.userId === userId);

    if (unreadOnly === 'true') {
      userNotifications = userNotifications.filter(n => !n.read);
    }

    // Pagination
    const skip = (page - 1) * parseInt(limit);
    const paginatedNotifications = userNotifications
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skip, skip + parseInt(limit));

    res.json({
      success: true,
      data: paginatedNotifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: userNotifications.length,
        unreadCount: userNotifications.filter(n => !n.read).length
      }
    });

  } catch (error) {
    console.error('Erreur récupération notifications:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des notifications' });
  }
});

// PATCH /api/notifications/:id/read - Marquer une notification comme lue
router.patch('/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = notifications.find(n => n.id === id && n.userId === userId);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }

    notification.read = true;

    res.json({
      success: true,
      data: notification
    });

  } catch (error) {
    console.error('Erreur marquage notification:', error);
    res.status(500).json({ message: 'Erreur lors du marquage de la notification' });
  }
});

// PATCH /api/notifications/read-all - Marquer toutes les notifications comme lues
router.patch('/read-all', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedCount = notifications
      .filter(n => n.userId === userId && !n.read)
      .map(n => n.read = true).length;

    res.json({
      success: true,
      message: `${updatedCount} notifications marquées comme lues`,
      updatedCount
    });

  } catch (error) {
    console.error('Erreur marquage toutes notifications:', error);
    res.status(500).json({ message: 'Erreur lors du marquage de toutes les notifications' });
  }
});

// POST /api/notifications - Créer une nouvelle notification (admin seulement)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const { userId, title, message, type = 'info' } = req.body;

    if (!userId || !title || !message) {
      return res.status(400).json({ message: 'userId, title et message sont requis' });
    }

    const newNotification = {
      id: Date.now().toString(),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date()
    };

    notifications.push(newNotification);

    res.status(201).json({
      success: true,
      data: newNotification
    });

  } catch (error) {
    console.error('Erreur création notification:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la notification' });
  }
});

// DELETE /api/notifications/:id - Supprimer une notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notificationIndex = notifications.findIndex(n => n.id === id && n.userId === userId);
    
    if (notificationIndex === -1) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }

    notifications.splice(notificationIndex, 1);

    res.json({
      success: true,
      message: 'Notification supprimée avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression notification:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la notification' });
  }
});

export default router;
