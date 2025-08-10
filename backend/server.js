const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const dbConnection = require('./config/database');

// Load environment variables
dotenv.config();

// Routes imports
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blog');
const skillRoutes = require('./routes/skills');
const contactRoutes = require('./routes/contact');
const pdfRoutes = require('./routes/pdf');
const cardRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

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
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Cache headers for static content
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/auth')) {
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.set('ETag', `"${Date.now()}"`);
  }
  next();
});

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

// Initialize MongoDB connection with robust retry logic
async function initializeDatabase() {
  try {
    await dbConnection.connect();
    console.log('🎯 Database initialization completed');
  } catch (error) {
    console.error('💥 Database initialization failed:', error.message);
    process.exit(1);
  }
}

// Start database connection
initializeDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/posts', blogRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Shay Acoca Portfolio API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      posts: '/api/posts',
      skills: '/api/skills',
      contact: '/api/contact',
      pdf: '/api/pdf',
      cards: '/api/cards',
      users: '/api/users',
      admin: '/api/admin',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route non trouvée',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.stack);
  
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erreur de validation',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Mongoose cast errors
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID invalide',
      field: err.path
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token invalide'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({ 
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
  mongoose.connection.close(() => {
    console.log('📊 Connexion MongoDB fermée');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});
