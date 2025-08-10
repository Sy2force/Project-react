import express from 'express';
import { writeLimiter } from '../middleware/rateLimit.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation pour la génération PDF
const validatePdfRequest = [
  body('projectType')
    .notEmpty()
    .withMessage('Type de projet requis'),
  body('budget')
    .isNumeric()
    .withMessage('Budget doit être numérique'),
  body('timeline')
    .notEmpty()
    .withMessage('Timeline requis'),
  body('features')
    .isArray()
    .withMessage('Features doit être un tableau')
];

// POST /api/pdf - Générer un PDF pour le simulateur
router.post('/', writeLimiter, validatePdfRequest, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Données invalides',
        errors: errors.array()
      });
    }

    const { projectType, budget, timeline, features, clientInfo } = req.body;

    // Simulation de génération PDF (à remplacer par une vraie génération)
    const pdfData = {
      projectType,
      budget,
      timeline,
      features,
      clientInfo,
      generatedAt: new Date(),
      estimatedCost: budget * 1.2, // Exemple de calcul
      recommendations: [
        'Utiliser React pour une interface moderne',
        'Intégrer Tailwind CSS pour le styling',
        'Prévoir des tests unitaires',
        'Optimiser les performances'
      ]
    };

    // En production, ici on générerait un vrai PDF avec jsPDF ou Puppeteer
    const mockPdfBuffer = Buffer.from(JSON.stringify(pdfData, null, 2));
    const base64Pdf = mockPdfBuffer.toString('base64');

    console.log('PDF généré pour:', { projectType, budget, timeline });

    res.json({
      message: 'PDF généré avec succès',
      pdfData: base64Pdf,
      filename: `simulation-${Date.now()}.pdf`,
      size: mockPdfBuffer.length
    });
  } catch (error) {
    console.error('Erreur génération PDF:', error);
    res.status(500).json({ message: 'Erreur lors de la génération du PDF' });
  }
});

module.exports = router;
