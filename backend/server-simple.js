const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const dbConnection = require('./config/database');

// Je charge mes variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware de sécurité
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false // Désactivé pour le dev
}));

app.use(compression());

// Configuration CORS pour autoriser les requêtes frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3005'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Limitation du nombre de requêtes pour éviter le spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: 'Trop de requêtes, réessayez plus tard.' }
});
app.use(limiter);

// Parsing du body des requêtes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Je log toutes les requêtes pour le debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialisation de MongoDB
async function initializeDatabase() {
  try {
    await dbConnection.connect();
    console.log('🎯 Database initialization completed');
  } catch (error) {
    console.log('⚠️ Database connection failed, continuing without DB');
  }
}

initializeDatabase();

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = dbConnection.getStatus();
  res.json({
    status: 'healthy',
    service: 'Shay Acoca Portfolio API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: dbStatus.isConnected ? 'connected' : 'disconnected',
      readyState: dbStatus.readyState
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
    }
  });
});

// Simple contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('📬 New contact message:', { name, email, subject });
    
    res.json({ 
      success: true, 
      message: 'Message reçu avec succès' 
    });
  } catch (error) {
    console.error('Erreur contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi du message' 
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Utilisateur créé avec succès',
    user: { id: 2, email: req.body.email, role: 'user', name: req.body.name }
  });
});

// Mock projects routes
app.get('/api/projects', (req, res) => {
  res.json([
    { 
      id: 1, 
      title: 'Portfolio React Complet', 
      description: 'Site portfolio moderne avec authentification avancée et design glassmorphism', 
      tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
      image: '/api/placeholder/400/300',
      likes: 42,
      status: 'completed'
    },
    { 
      id: 2, 
      title: 'App Mobile Innovante', 
      description: 'Application mobile avec fonctionnalités avancées et UX moderne', 
      tech: ['React Native', 'MongoDB', 'Express'],
      image: '/api/placeholder/400/300',
      likes: 28,
      status: 'in-progress'
    },
    { 
      id: 3, 
      title: 'Système E-commerce', 
      description: 'Plateforme e-commerce complète avec paiements sécurisés', 
      tech: ['Next.js', 'Stripe', 'PostgreSQL'],
      image: '/api/placeholder/400/300',
      likes: 35,
      status: 'completed'
    }
  ]);
});

// Mock blog routes
app.get('/api/blog', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'L\'avenir du développement web',
      excerpt: 'Découvrez les tendances qui façonnent le web de demain',
      content: 'Le développement web évolue rapidement...',
      author: 'Shay Acoca',
      date: new Date().toISOString(),
      category: 'Tech',
      image: '/api/placeholder/600/400'
    },
    {
      id: 2,
      title: 'Design System et Glassmorphism',
      excerpt: 'Comment créer des interfaces modernes et élégantes',
      content: 'Le glassmorphism est une tendance design...',
      author: 'Shay Acoca',
      date: new Date().toISOString(),
      category: 'Design',
      image: '/api/placeholder/600/400'
    }
  ]);
});

// Mock analytics routes
app.get('/api/analytics/stats', (req, res) => {
  res.json({
    totalProjects: 15,
    totalViews: 2847,
    totalLikes: 156,
    totalUsers: 89
  });
});

// Mock contact route
app.post('/api/contact', (req, res) => {
  res.json({
    success: true,
    message: 'Message envoyé avec succès! Nous vous répondrons rapidement.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`✨ Frontend et Backend fusionnés avec succès!`);
});
