const express = require('express');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { validateRegister, validateLogin, checkValidation } = require('../utils/validators');
const { authLimiter } = require('../middleware/rateLimit');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', authLimiter, validateRegister, checkValidation, async (req, res) => {
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
router.post('/login', authLimiter, validateLogin, checkValidation, async (req, res) => {
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

module.exports = router;
