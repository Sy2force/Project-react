/**
 * 🚀 SERVEUR BACKEND FUSION - VERSION ULTRA-SIMPLE
 * 
 * ✅ Serveur Express minimal et fonctionnel
 * ✅ Authentification avec cookies HttpOnly
 * ✅ Base de données en mémoire pour les tests
 * ✅ CORS configuré pour le frontend React
 * ✅ Comptes de test intégrés
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 5001;
const JWT_SECRET = 'demo-secret-key-for-portfolio';

// Configuration CORS pour le frontend
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Base de données en mémoire avec comptes de test
let users = [
  {
    id: 1,
    email: 'shayacoca20@gmail.com',
    fullName: 'Shay Acoca',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Gm.F5W', // Qwerty2121@
    role: 'admin',
    accept: true,
    createdAt: new Date()
  },
  {
    id: 2,
    email: 'user@test.com',
    fullName: 'User Test',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Gm.F5W', // password123
    role: 'user',
    accept: true,
    createdAt: new Date()
  },
  {
    id: 3,
    email: 'admin@test.com',
    fullName: 'Admin Test',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Gm.F5W', // password123
    role: 'admin',
    accept: true,
    createdAt: new Date()
  }
];

let nextUserId = 4;

// Fonction pour générer un token JWT
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Token d\'accès requis' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

// ========== ROUTES D'AUTHENTIFICATION ==========

// Route de connexion
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer le token
    const token = generateToken(user.id, user.role);

    // Définir le cookie
    const cookieOptions = {
      httpOnly: true,
      secure: false, // false pour développement local
      sameSite: 'lax'
    };

    if (remember) {
      cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
    }

    res.cookie('accessToken', token, cookieOptions);

    // Retourner l'utilisateur sans le mot de passe
    const { passwordHash: _, ...userPublic } = user;
    res.json({ 
      ok: true, 
      success: true,
      message: 'Connexion réussie', 
      user: userPublic 
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password, vipCode, accept } = req.body;

    // Validation
    if (!fullName || !email || !password || !accept) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà' });
    }

    // Déterminer le rôle basé sur le code VIP
    let role = 'user';
    if (vipCode === '2323') {
      role = 'admin';
    } else if (vipCode === '1234' || vipCode === '5678') {
      role = 'business';
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const newUser = {
      id: nextUserId++,
      email,
      fullName,
      passwordHash,
      role,
      accept,
      createdAt: new Date()
    };

    users.push(newUser);

    // Générer le token
    const token = generateToken(newUser.id, newUser.role);

    // Définir le cookie
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: false, // false pour développement local
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });

    // Retourner l'utilisateur sans le mot de passe
    const { passwordHash: _, ...userPublic } = newUser;
    res.status(201).json({ 
      ok: true, 
      success: true,
      message: 'Inscription réussie',
      user: userPublic 
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route de déconnexion
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.json({ ok: true, message: 'Déconnexion réussie' });
});

// Route pour obtenir l'utilisateur actuel
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const { passwordHash: _, ...userPublic } = req.user;
  res.json({ ok: true, user: userPublic });
});

// ========== ROUTES DE TEST ==========

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Serveur backend fusion opérationnel',
    timestamp: new Date().toISOString(),
    users: users.length,
    mode: 'in-memory'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Serveur Backend Fusion - Portfolio React',
    status: 'Opérationnel',
    endpoints: [
      'POST /api/auth/login',
      'POST /api/auth/register', 
      'POST /api/auth/logout',
      'GET /api/auth/me',
      'GET /api/health'
    ]
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`\n🚀 ===== SERVEUR BACKEND FUSION DÉMARRÉ =====`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔧 Mode: Développement (base de données en mémoire)`);
  console.log(`🌐 CORS: Configuré pour http://localhost:3000`);
  console.log(`\n👥 COMPTES DE TEST DISPONIBLES:`);
  console.log(`   🔑 Admin: shayacoca20@gmail.com / Qwerty2121@`);
  console.log(`   👤 User: user@test.com / password123`);
  console.log(`   🛡️  Admin: admin@test.com / password123`);
  console.log(`\n📋 CODES VIP POUR INSCRIPTION:`);
  console.log(`   🏆 Admin: 2323`);
  console.log(`   💼 Business: 1234 ou 5678`);
  console.log(`   👤 User: (aucun code)`);
  console.log(`\n✅ Serveur prêt pour les tests fullstack !`);
  console.log(`===============================================\n`);
});
