import express from 'express';
import Ping from '../models/Ping.js';

const router = express.Router();

// GET /api/ping - Récupérer tous les pings + créer un nouveau ping de test
router.get('/', async (req, res) => {
  try {
    // Créer un nouveau ping de test à chaque requête GET
    const newPing = await Ping.create({
      message: `Ping de test - ${new Date().toLocaleString('fr-FR')}`,
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown'
    });

    console.log('✅ Nouveau ping créé:', newPing.message);

    // Récupérer tous les pings (les plus récents en premier)
    const allPings = await Ping.find()
      .sort({ timestamp: -1 })
      .limit(50); // Limiter à 50 pour éviter la surcharge

    res.status(200).json({
      success: true,
      message: 'Ping API fonctionnelle !',
      data: {
        newPing: newPing,
        totalPings: allPings.length,
        allPings: allPings
      },
      timestamp: new Date().toISOString(),
      mongoStatus: 'connected'
    });

  } catch (error) {
    console.error('❌ Erreur ping API:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création/récupération des pings',
      error: error.message,
      timestamp: new Date().toISOString(),
      mongoStatus: 'error'
    });
  }
});

// POST /api/ping - Créer un ping personnalisé
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Le champ "message" est requis'
      });
    }

    const newPing = await Ping.create({
      message: message,
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown'
    });

    console.log('✅ Ping personnalisé créé:', newPing.message);

    res.status(201).json({
      success: true,
      message: 'Ping créé avec succès',
      data: newPing,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur création ping:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du ping',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// DELETE /api/ping - Supprimer tous les pings (utile pour les tests)
router.delete('/', async (req, res) => {
  try {
    const result = await Ping.deleteMany({});
    
    console.log(`🗑️ ${result.deletedCount} pings supprimés`);

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} pings supprimés avec succès`,
      deletedCount: result.deletedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur suppression pings:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression des pings',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/ping/stats - Statistiques des pings
router.get('/stats', async (req, res) => {
  try {
    const totalPings = await Ping.countDocuments();
    const recentPings = await Ping.countDocuments({
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Dernières 24h
    });

    const oldestPing = await Ping.findOne().sort({ timestamp: 1 });
    const newestPing = await Ping.findOne().sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      message: 'Statistiques des pings',
      data: {
        totalPings,
        recentPings,
        oldestPing: oldestPing ? oldestPing.timestamp : null,
        newestPing: newestPing ? newestPing.timestamp : null
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur stats pings:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
