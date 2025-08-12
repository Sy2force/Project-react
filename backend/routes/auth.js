import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }), [
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
], async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer le nouvel utilisateur
    const user = new User({ email, passwordHash: password });
    await user.save();

    // Générer le token JWT
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur lors de la création du compte' });
  }
});

// POST /api/auth/login
router.post('/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }), [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors.array()
    });
  }
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = generateToken(user._id, user.role);

    res.json({
      message: 'Connexion réussie',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: req.user.getPublicProfile()
    });
  } catch (error) {
    console.error('Erreur profil:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const token = generateToken(user._id, user.role);
    res.json({ token });
  } catch (error) {
    console.error('Erreur refresh token:', error);
    res.status(500).json({ message: 'Erreur lors du rafraîchissement du token' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      // Ne pas révéler si l'email existe ou non
      return res.json({ message: 'Si cet email existe, un lien de réinitialisation a été envoyé' });
    }

    // TODO: Implémenter l'envoi d'email avec token de réinitialisation
    // Pour l'instant, on simule juste la réponse
    res.json({ message: 'Un lien de réinitialisation a été envoyé à votre email' });
  } catch (error) {
    console.error('Erreur forgot password:', error);
    res.status(500).json({ message: 'Erreur lors de la demande de réinitialisation' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // TODO: Vérifier le token de réinitialisation
    // Pour l'instant, on simule juste la réponse
    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur reset password:', error);
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // TODO: Implémenter une blacklist de tokens si nécessaire
    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur logout:', error);
    res.status(500).json({ message: 'Erreur lors de la déconnexion' });
  }
});

export default router;
