// [EXAM] Page projets complète avec filtrage, recherche, likes, commentaires et modal détail
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  ExternalLink, 
  Github, 
  Eye,
  Calendar,
  Tag,
  Star,
  TrendingUp,
  Code,
  Palette,
  Smartphone,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProjectsComplete = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);

  // Données mockées des projets
  const mockProjects = [
    {
      id: 1,
      title: 'Portfolio React Moderne',
      description: 'Un portfolio moderne et responsive avec React, Tailwind CSS et Framer Motion. Interface élégante avec animations fluides et design glassmorphism.',
      longDescription: 'Ce portfolio présente une approche moderne du développement web avec React 18, utilisant les dernières fonctionnalités comme les hooks personnalisés et le Context API. Le design glassmorphism offre une expérience visuelle immersive.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      category: 'Web Development',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      featured: true,
      likes: 42,
      views: 1250,
      githubUrl: 'https://github.com/shayacoca/portfolio-react',
      liveUrl: 'https://shayacoca-portfolio.netlify.app',
      createdAt: new Date('2024-01-15'),
      status: 'completed',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Dashboard d\'analytics en temps réel avec graphiques interactifs, métriques avancées et visualisations de données.',
      longDescription: 'Tableau de bord complet pour l\'analyse de données avec intégration d\'APIs externes, graphiques D3.js personnalisés et mise à jour en temps réel via WebSocket.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      category: 'Data Visualization',
      technologies: ['Vue.js', 'Chart.js', 'Node.js', 'MongoDB', 'WebSocket'],
      featured: true,
      likes: 38,
      views: 980,
      githubUrl: 'https://github.com/shayacoca/dashboard-analytics',
      liveUrl: 'https://analytics-dashboard-demo.netlify.app',
      createdAt: new Date('2024-02-10'),
      status: 'completed',
      difficulty: 'advanced'
    },
    {
      id: 3,
      title: 'E-commerce Mobile App',
      description: 'Application mobile e-commerce complète avec React Native, gestion du panier, paiements Stripe et notifications push.',
      longDescription: 'Application e-commerce native pour iOS et Android avec authentification biométrique, synchronisation offline et intégration complète des paiements.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      category: 'Mobile Development',
      technologies: ['React Native', 'Redux', 'Firebase', 'Stripe', 'Push Notifications'],
      featured: false,
      likes: 29,
      views: 756,
      githubUrl: 'https://github.com/shayacoca/ecommerce-mobile',
      liveUrl: null,
      createdAt: new Date('2024-03-05'),
      status: 'in-progress',
      difficulty: 'advanced'
    },
    {
      id: 4,
      title: 'API REST Sécurisée',
      description: 'API REST complète avec authentification JWT, rate limiting, validation des données et documentation Swagger.',
      longDescription: 'API backend robuste avec architecture microservices, tests automatisés, monitoring et déploiement containerisé avec Docker.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      category: 'Backend Development',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Docker', 'Swagger'],
      featured: false,
      likes: 35,
      views: 892,
      githubUrl: 'https://github.com/shayacoca/secure-api',
      liveUrl: 'https://api.shayacoca.com/docs',
      createdAt: new Date('2024-01-20'),
      status: 'completed',
      difficulty: 'advanced'
    },
    {
      id: 5,
      title: 'Design System UI',
      description: 'Système de design complet avec composants réutilisables, tokens de design et documentation Storybook.',
      longDescription: 'Design system moderne avec composants React documentés, thèmes personnalisables et guide de style complet pour équipes de développement.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      category: 'UI/UX Design',
      technologies: ['React', 'Storybook', 'Figma', 'Styled Components', 'TypeScript'],
      featured: true,
      likes: 51,
      views: 1340,
      githubUrl: 'https://github.com/shayacoca/design-system',
      liveUrl: 'https://design-system.shayacoca.com',
      createdAt: new Date('2024-02-28'),
      status: 'completed',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: 'PWA Weather App',
      description: 'Application météo Progressive Web App avec géolocalisation, notifications et mode offline.',
      longDescription: 'PWA complète avec service workers, cache intelligent, synchronisation en arrière-plan et interface adaptative.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      category: 'Web Development',
      technologies: ['PWA', 'Service Workers', 'IndexedDB', 'Geolocation API', 'Push API'],
      featured: false,
      likes: 24,
      views: 567,
      githubUrl: 'https://github.com/shayacoca/pwa-weather',
      liveUrl: 'https://weather-pwa.shayacoca.com',
      createdAt: new Date('2024-03-15'),
      status: 'completed',
      difficulty: 'intermediate'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les projets', icon: Globe },
    { id: 'Web Development', name: 'Développement Web', icon: Code },
    { id: 'Mobile Development', name: 'Mobile', icon: Smartphone },
    { id: 'UI/UX Design', name: 'Design UI/UX', icon: Palette },
    { id: 'Data Visualization', name: 'Data Viz', icon: TrendingUp },
    { id: 'Backend Development', name: 'Backend', icon: Code }
  ];

  const technologies = [
    'all', 'React', 'Vue.js', 'Node.js', 'React Native', 'TypeScript', 
    'MongoDB', 'Firebase', 'Tailwind CSS', 'Framer Motion'
  ];

  // Charger les projets
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filtrage et recherche
  useEffect(() => {
    let filtered = projects;

    // Recherche par titre et description
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filtrage par technologie
    if (selectedTech !== 'all') {
      filtered = filtered.filter(project => 
        project.technologies.includes(selectedTech)
      );
    }

    // Tri
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedCategory, selectedTech, sortBy]);

  const handleLike = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, likes: project.likes + 1 }
        : project
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'planned': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      {/* [EXAM] SEO */}
      <Helmet>
        <title>Portfolio — Projects | Projets & Réalisations</title>
        <meta name="description" content="Projets, filtres avancés, recherche en temps réel. Découvrez mes réalisations en développement web, applications mobiles et solutions digitales." />
        <link rel="canonical" href={window.location.origin + "/projects"} />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"CollectionPage",
          name:"Projects",
          url: window.location.origin + "/projects",
          description: "Collection de projets et réalisations en développement web et mobile"
        })}</script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Mes <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projets</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez mes réalisations et explorez les technologies que j'utilise 
            pour créer des expériences digitales exceptionnelles
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            {/* Recherche */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un projet, une technologie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Catégories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm">{category.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Technologie */}
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {technologies.map(tech => (
                  <option key={tech} value={tech} className="bg-gray-800">
                    {tech === 'all' ? 'Toutes les technologies' : tech}
                  </option>
                ))}
              </select>

              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent" className="bg-gray-800">Plus récents</option>
                <option value="popular" className="bg-gray-800">Plus populaires</option>
                <option value="views" className="bg-gray-800">Plus vus</option>
                <option value="alphabetical" className="bg-gray-800">Alphabétique</option>
              </select>

              {/* Mode d'affichage */}
              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{projects.length}</div>
            <div className="text-gray-400 text-sm">Projets totaux</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{filteredProjects.length}</div>
            <div className="text-gray-400 text-sm">Affichés</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{projects.filter(p => p.featured).length}</div>
            <div className="text-gray-400 text-sm">En vedette</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{projects.reduce((sum, p) => sum + p.likes, 0)}</div>
            <div className="text-gray-400 text-sm">Likes totaux</div>
          </div>
        </motion.div>

        {/* Grille/Liste des projets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">Aucun projet trouvé</h3>
              <p className="text-gray-400 mb-8">Essayez de modifier vos critères de recherche</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedTech('all');
                }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
            }>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`group ${
                    viewMode === 'list' ? 'flex items-center space-x-6' : ''
                  }`}
                >
                  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex-1 flex items-center' : ''
                  }`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'
                    }`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {project.featured && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-medium">
                            ⭐ Vedette
                          </span>
                        )}
                        <span className={`px-2 py-1 border rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status === 'completed' ? 'Terminé' : 
                           project.status === 'in-progress' ? 'En cours' : 'Planifié'}
                        </span>
                      </div>

                      {/* Actions rapides */}
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleLike(project.id)}
                          className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-500/50 transition-colors"
                        >
                          <Heart size={16} />
                        </button>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-blue-500/50 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-gray-500/50 transition-colors"
                          >
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty === 'beginner' ? 'Débutant' :
                           project.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                        </span>
                      </div>

                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Métriques */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Heart size={14} />
                            <span>{project.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye size={14} />
                            <span>{project.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{project.createdAt.toLocaleDateString('fr-FR')}</span>
                          </span>
                        </div>
                        
                        <Link
                          to={`/projects/${project.id}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                          Voir détails →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Discutons ensemble de vos idées et créons quelque chose d'extraordinaire. 
              Je suis toujours ouvert à de nouveaux défis passionnants.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Démarrer un projet
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
              >
                En savoir plus sur moi
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsComplete;
