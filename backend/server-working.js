const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3004',
  credentials: true
}));
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend connected successfully!', 
    timestamp: new Date().toISOString(),
    message: 'Frontend et Backend fusionnés avec succès!'
  });
});

// Mock auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({ 
    success: true, 
    token: 'mock-jwt-token-' + Date.now(),
    user: { 
      id: 1, 
      email: email || 'shayacoca20@gmail.com', 
      role: email === 'shayacoca20@gmail.com' ? 'admin' : 'user',
      name: 'Shay Acoca'
    }
  });
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
