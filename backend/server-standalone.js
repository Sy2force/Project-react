// [EXAM] Serveur backend standalone sans MongoDB pour tests complets
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3002';

// In-memory database pour les tests
const users = new Map();
const projects = new Map();
const posts = new Map();

// Utilisateurs de démonstration
const demoUsers = [
  {
    id: '1',
    name: 'Shay Acoca',
    email: 'admin@shayacoca.com',
    passwordHash: await bcrypt.hash('admin123', 10),
    role: 'admin',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Business User',
    email: 'business@shayacoca.com',
    passwordHash: await bcrypt.hash('business123', 10),
    role: 'business',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@shayacoca.com',
    passwordHash: await bcrypt.hash('user123', 10),
    role: 'user',
    createdAt: new Date()
  }
];

// Initialiser les utilisateurs de démo
demoUsers.forEach(user => users.set(user.email, user));

// Helper function to generate JWT tokens
const generateToken = (userId, role = 'user', name = 'User', email = 'user@example.com') => {
  return jwt.sign(
    { 
      userId, 
      role,
      name,
      email
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token d\'accès requis' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Security middleware
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

// Compression middleware
app.use(compression());

// CORS configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: 'Trop de requêtes depuis cette IP, réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// ========== ROUTES D'AUTHENTIFICATION ==========

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe requis' 
      });
    }

    // Trouver l'utilisateur
    const user = users.get(email);
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

    // Générer le token JWT
    const token = generateToken(user.id, user.role, user.name, user.email);

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la connexion' 
    });
  }
});

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, company, vipCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Nom, email et mot de passe requis' 
      });
    }

    // Vérifier si l'utilisateur existe déjà
    if (users.has(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Cet email est déjà utilisé' 
      });
    }

    // Déterminer le rôle basé sur le code VIP
    let role = 'user';
    if (vipCode === 'BUSINESS2024') {
      role = 'business';
    } else if (vipCode === 'ADMIN2024') {
      role = 'admin';
    }

    // Créer le nouvel utilisateur
    const userId = Date.now().toString();
    const passwordHash = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: userId,
      name,
      email,
      passwordHash,
      role,
      phone: phone || null,
      company: company || null,
      createdAt: new Date()
    };

    users.set(email, newUser);

    // Générer le token JWT
    const token = generateToken(userId, role, name, email);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      user: {
        id: userId,
        name,
        email,
        role
      }
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la création du compte' 
    });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const user = users.get(req.user.email);
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
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur profil:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération du profil' 
    });
  }
});

// POST /api/auth/forgot-password
app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    
    // Simulation d'envoi d'email
    console.log(`Email de réinitialisation envoyé à: ${email}`);
    
    res.json({ 
      success: true,
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé' 
    });
  } catch (error) {
    console.error('Erreur forgot password:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la demande de réinitialisation' 
    });
  }
});

// POST /api/auth/logout
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  try {
    res.json({ 
      success: true,
      message: 'Déconnexion réussie' 
    });
  } catch (error) {
    console.error('Erreur logout:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la déconnexion' 
    });
  }
});

// ========== ROUTES PROJETS ==========

// GET /api/projects
app.get('/api/projects', (req, res) => {
  try {
    const mockProjects = [
      {
        id: '1',
        title: 'Portfolio React Moderne',
        description: 'Un portfolio moderne avec React, Tailwind et Framer Motion',
        image: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Portfolio+React',
        technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
        category: 'Web Development',
        featured: true,
        likes: 42,
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Dashboard Analytics',
        description: 'Dashboard d\'analytics avec graphiques interactifs',
        image: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Dashboard+Analytics',
        technologies: ['Vue.js', 'Chart.js', 'Node.js', 'MongoDB'],
        category: 'Data Visualization',
        featured: true,
        likes: 38,
        createdAt: new Date('2024-02-10')
      },
      {
        id: '3',
        title: 'E-commerce Mobile App',
        description: 'Application mobile e-commerce avec React Native',
        image: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=E-commerce+App',
        technologies: ['React Native', 'Redux', 'Firebase', 'Stripe'],
        category: 'Mobile Development',
        featured: false,
        likes: 29,
        createdAt: new Date('2024-03-05')
      }
    ];

    res.json({
      success: true,
      projects: mockProjects,
      total: mockProjects.length
    });
  } catch (error) {
    console.error('Erreur projets:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des projets' 
    });
  }
});

// ========== ROUTES BLOG ==========

// GET /api/blog
app.get('/api/blog', (req, res) => {
  try {
    const mockPosts = [
      {
        id: '1',
        title: 'Les Tendances Web Design 2024',
        excerpt: 'Découvrez les dernières tendances en matière de design web pour cette année',
        content: 'Le design web évolue constamment...',
        author: 'Shay Acoca',
        category: 'Design',
        tags: ['Design', 'Tendances', '2024'],
        image: 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Web+Design+2024',
        readTime: 5,
        likes: 24,
        views: 156,
        featured: true,
        publishedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        title: 'Introduction à React 18',
        excerpt: 'Tout ce que vous devez savoir sur les nouvelles fonctionnalités de React 18',
        content: 'React 18 apporte de nombreuses améliorations...',
        author: 'Shay Acoca',
        category: 'Development',
        tags: ['React', 'JavaScript', 'Frontend'],
        image: 'https://via.placeholder.com/600x400/61DAFB/000000?text=React+18',
        readTime: 8,
        likes: 31,
        views: 203,
        featured: true,
        publishedAt: new Date('2024-02-15')
      }
    ];

    res.json({
      success: true,
      posts: mockPosts,
      total: mockPosts.length
    });
  } catch (error) {
    console.error('Erreur blog:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des articles' 
    });
  }
});

// ========== ROUTES CONTACT ==========

// POST /api/contact
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'Nom, email et message requis' 
      });
    }

    // Simulation d'envoi d'email
    console.log('Message de contact reçu:', { name, email, subject, message });

    res.json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
    });
  } catch (error) {
    console.error('Erreur contact:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de l\'envoi du message' 
    });
  }
});

// ========== ROUTES HEALTH ==========

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Shay Acoca Portfolio API - Standalone Version',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      blog: '/api/blog',
      contact: '/api/contact',
      health: '/api/health'
    },
    demo_accounts: {
      admin: 'admin@shayacoca.com / admin123',
      business: 'business@shayacoca.com / business123',
      user: 'user@shayacoca.com / user123'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.stack);
  
  res.status(err.status || 500).json({ 
    success: false,
    message: err.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err 
    })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log('🚀 SERVEUR BACKEND STANDALONE DÉMARRÉ');
  console.log('🚀 ========================================');
  console.log(`🚀 Port: ${PORT}`);
  console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log('✅ Base de données: In-Memory (pour tests)');
  console.log('👥 Comptes de démo disponibles:');
  console.log('   - Admin: admin@shayacoca.com / admin123');
  console.log('   - Business: business@shayacoca.com / business123');
  console.log('   - User: user@shayacoca.com / user123');
  console.log('🚀 ========================================');
});
