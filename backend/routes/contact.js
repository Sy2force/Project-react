import express from 'express';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// POST /api/contact - Envoyer un message de contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Créer le message de contact
    const contactMessage = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contactMessage.save();

    // Envoyer un email de notification (optionnel)
    if (process.env.SMTP_USER && process.env.ADMIN_EMAIL) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `Nouveau message de contact: ${subject}`,
          html: `
            <h3>Nouveau message de contact</h3>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>IP: ${req.ip} | User-Agent: ${req.get('User-Agent')}</small></p>
          `
        });
      } catch (emailError) {
        console.error('Erreur envoi email:', emailError);
        // Ne pas faire échouer la requête si l'email échoue
      }
    }
    
    res.status(201).json({ 
      success: true,
      message: 'Message envoyé avec succès',
      data: {
        id: contactMessage._id,
        createdAt: contactMessage.createdAt
      }
    });
  } catch (error) {
    console.error('Erreur envoi message:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
  }
});

// GET /api/contact - Récupérer tous les messages (admin seulement)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * parseInt(limit);
    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Erreur récupération messages:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
  }
});

// GET /api/contact/:id - Récupérer un message spécifique (admin seulement)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Erreur récupération message:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du message' });
  }
});

// PATCH /api/contact/:id/read - Marquer un message comme lu (admin seulement)
router.patch('/:id/read', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'read',
        readAt: new Date(),
        readBy: req.user.id
      },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Erreur marquage message:', error);
    res.status(500).json({ message: 'Erreur lors du marquage du message' });
  }
});

// DELETE /api/contact/:id - Supprimer un message (admin seulement)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    res.json({
      success: true,
      message: 'Message supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression message:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du message' });
  }
});

// GET /api/contact/stats - Statistiques des messages (admin seulement)
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Contact.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Contact.countDocuments({ createdAt: { $gte: today } });

    const formattedStats = {
      total,
      today: todayCount,
      byStatus: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    };

    res.json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Erreur statistiques messages:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
  }
});

export default router;
