import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'shay-acoca-portfolio-secret-2024';
const FRONTEND_URL = 'http://localhost:5173';

// Middleware de sécurité
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));

// Configuration CORS
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: 'Trop de requêtes, réessayez plus tard.' }
});
app.use(limiter);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Base de données en mémoire avec utilisateurs de test
let users = [
  {
    id: 1,
    email: 'shayacoca20@gmail.com',
    fullName: 'Shay Acoca',
    passwordHash: '$2a$12$46BZvKl6bNdiuv/Qe.kkiu9ONXm.I2Sa8xEmOV06pbH4s1fa2.qni', // Qwerty2121@
    role: 'admin',
    vipCode: '2323',
    accept: true,
    createdAt: new Date()
  },
  {
    id: 2,
    email: 'user@demo.com',
    fullName: 'Utilisateur Demo',
    passwordHash: '$2a$12$E3ssJyPiA7FsAvx3nltrq.unhNmjjV9BSYw5OQknTPr2WLCN0gmxG', // password123
    role: 'user',
    accept: true,
    createdAt: new Date()
  },
  {
    id: 3,
    email: 'business@demo.com',
    fullName: 'Business Demo',
    passwordHash: '$2a$12$E3ssJyPiA7FsAvx3nltrq.unhNmjjV9BSYw5OQknTPr2WLCN0gmxG', // password123
    role: 'business',
    vipCode: '1234',
    accept: true,
    createdAt: new Date()
  },
  {
    id: 4,
    email: 'admin@demo.com',
    fullName: 'Admin Demo',
    passwordHash: '$2a$12$E3ssJyPiA7FsAvx3nltrq.unhNmjjV9BSYw5OQknTPr2WLCN0gmxG', // password123
    role: 'admin',
    vipCode: '9999',
    accept: true,
    createdAt: new Date()
  }
];

// Fonction pour générer un token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      fullName: user.fullName 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Fonction pour hasher un mot de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend Portfolio Shay Acoca fonctionnel',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Route de connexion
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    console.log('🔐 Tentative de connexion:', { email, remember });

    // Validation des données
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    // Rechercher l'utilisateur
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Générer le token
    const token = generateToken(user);

    // Configurer le cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 7 jours ou 1 jour
    };

    res.cookie('auth-token', token, cookieOptions);

    console.log('✅ Connexion réussie:', { email, role: user.role });

    res.json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
});

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password, vipCode, accept } = req.body;

    console.log('📝 Tentative d\'inscription:', { fullName, email, vipCode });

    // Validation des données
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nom, email et mot de passe requis'
      });
    }

    if (!accept) {
      return res.status(400).json({
        success: false,
        message: 'Vous devez accepter les conditions'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Un compte avec cet email existe déjà'
      });
    }

    // Déterminer le rôle basé sur le VIP code
    let role = 'user';
    if (email.toLowerCase() === 'shayacoca20@gmail.com') {
      role = 'admin';
    } else if (vipCode === '2323') {
      role = 'admin';
    } else if (vipCode === '1234') {
      role = 'business';
    }

    // Hasher le mot de passe
    const passwordHash = await hashPassword(password);

    // Créer le nouvel utilisateur
    const newUser = {
      id: users.length + 1,
      email: email.toLowerCase(),
      fullName,
      passwordHash,
      role,
      vipCode: vipCode || null,
      accept,
      createdAt: new Date()
    };

    users.push(newUser);

    // Générer le token
    const token = generateToken(newUser);

    // Configurer le cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 jour
    };

    res.cookie('auth-token', token, cookieOptions);

    console.log('✅ Inscription réussie:', { email, role });

    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
});

// Route pour récupérer le profil utilisateur
app.get('/api/auth/profile', (req, res) => {
  try {
    const token = req.cookies['auth-token'];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification manquant'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors de la récupération du profil:', error);
    res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }
});

// Route de déconnexion
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('auth-token');
  res.json({
    success: true,
    message: 'Déconnexion réussie'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'Backend Portfolio Shay Acoca - API Optimisée',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      login: 'POST /api/auth/login',
      register: 'POST /api/auth/register',
      profile: 'GET /api/auth/profile',
      logout: 'POST /api/auth/logout'
    },
    users: users.length
  });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error('💥 Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Backend Portfolio Shay Acoca démarré sur le port ${PORT}`);
  console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`👥 Utilisateurs en mémoire: ${users.length}`);
  console.log(`🎯 Prêt pour les connexions !`);
});

export default app;
