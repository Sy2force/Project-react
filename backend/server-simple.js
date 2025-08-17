import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Sécurité
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Compression
app.use(compression());

// Configuration CORS
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5184', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// Limite de taux
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Analyse du corps de la requête
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Journalisation des requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Base de données en mémoire pour les tests
let users = [
  {
    id: 1,
    email: 'admin@test.com',
    fullName: 'Admin Test',
    passwordHash: '$2a$12$6A2z.ajmnxCFm63esE6kxOztNknfjJ7b6LY9axxCQ0skKqrY6Cnau', // password123
    role: 'admin',
    accept: true,
    createdAt: new Date()
  },
  {
    id: 2,
    email: 'user@test.com',
    fullName: 'User Test',
    passwordHash: '$2a$12$6A2z.ajmnxCFm63esE6kxOztNknfjJ7b6LY9axxCQ0skKqrY6Cnau', // password123
    role: 'user',
    accept: true,
    createdAt: new Date()
  },
  {
    id: 3,
    email: 'shay@test.com',
    fullName: 'Shay Acoca',
    passwordHash: '$2a$12$6A2z.ajmnxCFm63esE6kxOztNknfjJ7b6LY9axxCQ0skKqrY6Cnau', // password123
    role: 'admin',
    accept: true,
    createdAt: new Date()
  }
];

let nextUserId = 4;

// Fonction pour générer un token JWT
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'fallback-secret-key-for-demo',
    { expiresIn: '7d' }
  );
};

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Token d\'accès requis' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-demo');
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

// Routes d'authentification
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password, accept } = req.body;

    // Validation
    if (!fullName || !email || !password || !accept) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà' });
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const newUser = {
      id: nextUserId++,
      email,
      fullName,
      passwordHash,
      role: 'user',
      accept,
      createdAt: new Date()
    };

    users.push(newUser);

    // Générer le token
    const token = generateToken(newUser.id, newUser.role);

    // Définir le cookie
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });

    // Retourner l'utilisateur sans le mot de passe
    const { passwordHash: _, ...userPublic } = newUser;
    res.status(201).json({ ok: true, user: userPublic });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    // Validation
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    if (remember) {
      cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
    }

    res.cookie('accessToken', token, cookieOptions);

    // Retourner l'utilisateur sans le mot de passe
    const { passwordHash: _, ...userPublic } = user;
    res.json({ ok: true, message: 'Connexion réussie', user: userPublic });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.json({ ok: true, message: 'Déconnexion réussie' });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const { passwordHash: _, ...userPublic } = req.user;
  res.json({ ok: true, user: userPublic });
});

// Routes de test
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Serveur backend opérationnel (mode simplifié)',
    timestamp: new Date().toISOString(),
    users: users.length,
    mode: 'in-memory'
  });
});

// Route pour obtenir des données de test
app.get('/api/projects', authenticateToken, (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'Site E-commerce Moderne',
      description: 'Développement d\'une plateforme e-commerce avec React et Node.js',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Terminé',
      client: 'TechCorp',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Application Mobile Cross-Platform',
      description: 'Application mobile pour la gestion de tâches avec React Native',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      technologies: ['React Native', 'Firebase', 'Redux'],
      status: 'En cours',
      client: 'StartupXYZ',
      date: '2024-02-01'
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Interface d\'administration avec graphiques et statistiques',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      technologies: ['Vue.js', 'D3.js', 'Express'],
      status: 'Terminé',
      client: 'DataCorp',
      date: '2023-12-20'
    }
  ];
  
  res.json({ ok: true, projects });
});

app.get('/api/services', authenticateToken, (req, res) => {
  const services = [
    {
      id: 1,
      title: 'Développement Web',
      description: 'Sites web modernes et responsives',
      price: '1500€',
      features: ['Design responsive', 'SEO optimisé', 'Performance élevée']
    },
    {
      id: 2,
      title: 'Applications Mobile',
      description: 'Apps iOS et Android natives',
      price: '3000€',
      features: ['Cross-platform', 'UI/UX moderne', 'Intégrations API']
    },
    {
      id: 3,
      title: 'Consultation UX/UI',
      description: 'Audit et amélioration d\'interface',
      price: '800€',
      features: ['Audit complet', 'Recommandations', 'Prototypage']
    }
  ];
  
  res.json({ ok: true, services });
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
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔧 Mode: ${process.env.NODE_ENV || 'development'} (simplifié)`);
  console.log(`💾 Base de données: En mémoire`);
  console.log(`👥 Utilisateurs de test disponibles:`);
  console.log(`   - admin@test.com / password123 (admin)`);
  console.log(`   - user@test.com / password123 (user)`);
  console.log(`   - shay@test.com / password123 (admin)`);
  console.log(`✅ Serveur prêt pour les tests !`);
});
