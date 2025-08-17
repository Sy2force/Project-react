import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 5001;

// Configuration CORS
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

// VIP Codes configuration
const VIP_CODES = {
  ADMIN: '2323',
  BUSINESS: '1234',
  PREMIUM: '5678'
};

// Initialize users array - will be populated with hashed passwords
let users = [];

// Initialize demo users with proper password hashing
const initializeDemoUsers = async () => {
  const demoUsers = [
    {
      id: 1,
      email: 'admin@test.com',
      fullName: 'Admin Test',
      password: 'password123',
      role: 'admin',
      accept: true
    },
    {
      id: 2,
      email: 'user@test.com',
      fullName: 'User Test',
      password: 'password123',
      role: 'user',
      accept: true
    },
    {
      id: 3,
      email: 'shay@test.com',
      fullName: 'Shay Acoca',
      password: 'password123',
      role: 'admin',
      accept: true
    },
    {
      id: 4,
      email: 'shayacoca20@gmail.com',
      fullName: 'Shay Acoca',
      password: 'Qwerty2121@',
      role: 'admin',
      accept: true,
      vipCode: '2323'
    }
  ];

  // Hash passwords and create users
  for (const userData of demoUsers) {
    const { password, ...userInfo } = userData;
    const passwordHash = await bcrypt.hash(password, 12);
    
    users.push({
      ...userInfo,
      passwordHash,
      createdAt: new Date()
    });
  }
  
  console.log('✅ Demo users initialized with proper password hashing');
};

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
    const { fullName, email, password, accept, vipCode } = req.body;

    // Validation des champs requis
    if (!fullName || !email || !password || !accept) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    // Déterminer le rôle basé sur le VIP code
    let userRole = 'user';
    if (vipCode) {
      if (vipCode === VIP_CODES.ADMIN) {
        userRole = 'admin';
      } else if (vipCode === VIP_CODES.BUSINESS) {
        userRole = 'business';
      } else if (vipCode === VIP_CODES.PREMIUM) {
        userRole = 'premium';
      } else {
        return res.status(400).json({ message: 'Invalid VIP code' });
      }
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const newUser = {
      id: nextUserId++,
      email,
      fullName,
      passwordHash,
      role: userRole,
      accept,
      vipCode: vipCode || null,
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
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    // Validation des champs requis
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Rechercher l'utilisateur dans la base de données
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Vérifier le mot de passe avec bcrypt
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Générer le token JWT avec les informations utilisateur
    const token = generateToken(user.id, user.role);

    // Configuration des options de cookie sécurisé
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    // Étendre la durée du cookie si "Remember me" est coché
    if (remember) {
      cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    }

    res.cookie('accessToken', token, cookieOptions);

    // Retourner les données utilisateur (sans le mot de passe)
    const { passwordHash: _, ...userPublic } = user;
    res.json({ ok: true, message: 'Login successful', user: userPublic });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
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
    message: 'Serveur backend opérationnel (mode démo)',
    timestamp: new Date().toISOString(),
    users: users.length,
    mode: 'in-memory-demo'
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

// Démarrage du serveur avec initialisation des utilisateurs
const startServer = async () => {
  try {
    // Initialize demo users with proper password hashing
    await initializeDemoUsers();
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🔧 Mode: ${process.env.NODE_ENV || 'development'} (démo)`);
      console.log(`💾 Base de données: En mémoire`);
      console.log(`👥 Utilisateurs de test disponibles:`);
      console.log(`   - admin@test.com / password123 (admin)`);
      console.log(`   - user@test.com / password123 (user)`);
      console.log(`   - shay@test.com / password123 (admin)`);
      console.log(`   - shayacoca20@gmail.com / Qwerty2121@ (admin avec VIP code 2323)`);
      console.log(`✅ Serveur prêt pour les tests !`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
