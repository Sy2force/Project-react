// Mes données de test pour le portfolio
export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Plateforme e-commerce moderne avec React, Node.js et Stripe",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    category: "web",
    status: "completed",
    github: "https://github.com/shayacoca/ecommerce-platform",
    demo: "https://ecommerce-demo.shayacoca.dev",
    featured: true,
    date: "2024-01-15",
    stats: {
      views: 1250,
      likes: 89,
      stars: 45
    }
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Application de gestion de tâches collaborative avec temps réel",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
    category: "web",
    status: "completed",
    github: "https://github.com/shayacoca/task-manager",
    demo: "https://tasks.shayacoca.dev",
    featured: true,
    date: "2023-11-20",
    stats: {
      views: 980,
      likes: 67,
      stars: 32
    }
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "Application mobile de fitness avec suivi d'activités",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    technologies: ["React Native", "Expo", "Firebase", "Redux"],
    category: "mobile",
    status: "in-progress",
    github: "https://github.com/shayacoca/fitness-app",
    featured: false,
    date: "2024-02-01",
    stats: {
      views: 756,
      likes: 43,
      stars: 28
    }
  },
  {
    id: 4,
    title: "AI Chat Interface",
    description: "Interface de chat avec IA intégrée et reconnaissance vocale",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    technologies: ["React", "OpenAI API", "WebRTC", "TypeScript"],
    category: "ai",
    status: "completed",
    github: "https://github.com/shayacoca/ai-chat",
    demo: "https://chat.shayacoca.dev",
    featured: true,
    date: "2024-03-10",
    stats: {
      views: 2100,
      likes: 156,
      stars: 78
    }
  },
  {
    id: 5,
    title: "Portfolio Dashboard",
    description: "Dashboard administratif pour gestion de portfolio",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    category: "web",
    status: "completed",
    github: "https://github.com/shayacoca/portfolio-dashboard",
    featured: false,
    date: "2023-09-15",
    stats: {
      views: 634,
      likes: 41,
      stars: 19
    }
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Les Tendances du Développement Web en 2024",
    excerpt: "Découvrez les technologies et frameworks qui domineront le développement web cette année.",
    content: "Le développement web évolue rapidement...",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
    author: "Shay Acoca",
    date: "2024-01-20",
    readTime: "8 min",
    category: "Tech",
    tags: ["React", "Next.js", "AI", "Web Development"],
    featured: true,
    views: 1850,
    likes: 124
  },
  {
    id: 2,
    title: "Optimisation des Performances React",
    excerpt: "Techniques avancées pour améliorer les performances de vos applications React.",
    content: "L'optimisation des performances...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    author: "Shay Acoca",
    date: "2024-01-15",
    readTime: "12 min",
    category: "Tutorial",
    tags: ["React", "Performance", "Optimization"],
    featured: false,
    views: 1420,
    likes: 89
  },
  {
    id: 3,
    title: "Introduction à l'Intelligence Artificielle",
    excerpt: "Guide complet pour débuter avec l'IA et l'apprentissage automatique.",
    content: "L'intelligence artificielle...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    author: "Shay Acoca",
    date: "2024-01-10",
    readTime: "15 min",
    category: "AI",
    tags: ["AI", "Machine Learning", "Python"],
    featured: true,
    views: 2340,
    likes: 178
  }
];

export const forumTopics = [
  {
    id: 1,
    title: "Meilleures pratiques React 2024",
    author: "DevMaster",
    category: "React",
    replies: 23,
    views: 456,
    lastActivity: "2024-01-20T10:30:00Z",
    pinned: true,
    solved: false,
    tags: ["React", "Best Practices", "2024"]
  },
  {
    id: 2,
    title: "Problème avec l'authentification JWT",
    author: "CodeNewbie",
    category: "Backend",
    replies: 8,
    views: 134,
    lastActivity: "2024-01-19T15:45:00Z",
    pinned: false,
    solved: true,
    tags: ["JWT", "Authentication", "Node.js"]
  },
  {
    id: 3,
    title: "Optimisation des performances mobile",
    author: "MobileDev",
    category: "Mobile",
    replies: 15,
    views: 289,
    lastActivity: "2024-01-19T09:20:00Z",
    pinned: false,
    solved: false,
    tags: ["Mobile", "Performance", "React Native"]
  }
];

export const skills = [
  {
    name: "JavaScript",
    level: 95,
    category: "frontend",
    icon: "🟨",
    experience: "5+ ans"
  },
  {
    name: "React",
    level: 92,
    category: "frontend",
    icon: "⚛️",
    experience: "4+ ans"
  },
  {
    name: "Node.js",
    level: 88,
    category: "backend",
    icon: "🟢",
    experience: "4+ ans"
  },
  {
    name: "TypeScript",
    level: 85,
    category: "frontend",
    icon: "🔷",
    experience: "3+ ans"
  },
  {
    name: "MongoDB",
    level: 82,
    category: "backend",
    icon: "🍃",
    experience: "3+ ans"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "CEO, TechStart",
    content: "Shay a transformé notre vision en une application web exceptionnelle. Son expertise technique et sa créativité ont dépassé nos attentes.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    project: "E-commerce Platform"
  },
  {
    id: 2,
    name: "Pierre Martin",
    role: "CTO, InnovateLab",
    content: "Un développeur passionné avec une approche moderne. La qualité du code et l'attention aux détails sont remarquables.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    project: "Task Management App"
  },
  {
    id: 3,
    name: "Sophie Laurent",
    role: "Product Manager, DigitalFlow",
    content: "Collaboration fluide et résultats exceptionnels. Shay comprend parfaitement les besoins business et les traduit en solutions techniques.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    project: "AI Chat Interface"
  }
];

export const services = [
  {
    id: 1,
    title: "Développement Web",
    description: "Applications web modernes avec React, Vue.js et technologies full-stack",
    icon: "🌐",
    features: ["React/Vue.js", "Node.js/Express", "Base de données", "API REST/GraphQL"],
    price: "À partir de 5k€"
  },
  {
    id: 2,
    title: "Applications Mobile",
    description: "Apps natives et cross-platform pour iOS et Android",
    icon: "📱",
    features: ["React Native", "Flutter", "Expo", "App Store/Play Store"],
    price: "À partir de 8k€"
  },
  {
    id: 3,
    title: "Consultation & Audit",
    description: "Analyse technique, optimisation et conseils stratégiques",
    icon: "🔍",
    features: ["Audit de code", "Optimisation", "Architecture", "Formation équipe"],
    price: "500€/jour"
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Design d'interfaces utilisateur modernes et intuitives",
    icon: "🎨",
    features: ["Figma/Adobe XD", "Prototypage", "Design System", "Tests utilisateur"],
    price: "À partir de 3k€"
  }
];

export const stats = {
  projects: 50,
  clients: 25,
  experience: 5,
  satisfaction: 100
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/shayacoca",
    icon: "🐙",
    followers: "1.2k"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/shayacoca",
    icon: "💼",
    followers: "2.5k"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/shayacoca",
    icon: "🐦",
    followers: "890"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/shayacoca",
    icon: "📸",
    followers: "1.8k"
  }
];

export const contactInfo = {
  email: "shay.acoca@example.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  availability: "Disponible pour nouveaux projets",
  responseTime: "< 24h"
};
