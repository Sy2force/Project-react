import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Star, 
  Eye, 
  Calendar,
  Tag,
  ExternalLink,
  Github,
  Play,
  Code,
  Palette,
  Smartphone,
  Globe,
  Zap,
  TrendingUp
} from 'lucide-react';

const ProjectsUltraModern = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'all', label: 'Tous', icon: Grid, count: 12 },
    { id: 'web', label: 'Web App', icon: Globe, count: 5 },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, count: 3 },
    { id: 'design', label: 'Design', icon: Palette, count: 2 },
    { id: 'api', label: 'API', icon: Code, count: 2 }
  ];

  const technologies = [
    { id: 'all', label: 'Toutes', color: 'from-gray-500 to-gray-600' },
    { id: 'react', label: 'React', color: 'from-blue-500 to-cyan-500' },
    { id: 'nodejs', label: 'Node.js', color: 'from-green-500 to-emerald-500' },
    { id: 'typescript', label: 'TypeScript', color: 'from-blue-600 to-indigo-600' },
    { id: 'mongodb', label: 'MongoDB', color: 'from-green-600 to-teal-600' },
    { id: 'nextjs', label: 'Next.js', color: 'from-gray-800 to-gray-900' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plateforme e-commerce complète avec panier, paiement et gestion des commandes.',
      category: 'web',
      technologies: ['react', 'nodejs', 'mongodb'],
      image: '/api/placeholder/400/250',
      status: 'completed',
      likes: 124,
      views: 2340,
      date: '2024-01-15',
      featured: true,
      github: 'https://github.com/shayacoca/ecommerce',
      demo: 'https://ecommerce-demo.com',
      progress: 100
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Application de gestion de tâches collaborative avec temps réel.',
      category: 'web',
      technologies: ['react', 'typescript', 'nodejs'],
      image: '/api/placeholder/400/250',
      status: 'in-progress',
      likes: 89,
      views: 1560,
      date: '2024-02-01',
      featured: false,
      github: 'https://github.com/shayacoca/taskmanager',
      demo: 'https://taskmanager-demo.com',
      progress: 75
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      description: 'Application bancaire mobile avec sécurité avancée et UX optimisée.',
      category: 'mobile',
      technologies: ['react', 'typescript'],
      image: '/api/placeholder/400/250',
      status: 'completed',
      likes: 156,
      views: 3200,
      date: '2023-12-10',
      featured: true,
      github: 'https://github.com/shayacoca/banking-app',
      demo: 'https://banking-demo.com',
      progress: 100
    },
    {
      id: 4,
      title: 'API Gateway Service',
      description: 'Service de passerelle API avec authentification et monitoring.',
      category: 'api',
      technologies: ['nodejs', 'mongodb'],
      image: '/api/placeholder/400/250',
      status: 'completed',
      likes: 67,
      views: 890,
      date: '2024-01-20',
      featured: false,
      github: 'https://github.com/shayacoca/api-gateway',
      demo: null,
      progress: 100
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesTech = selectedTech === 'all' || project.technologies.includes(selectedTech);
    
    return matchesSearch && matchesCategory && matchesTech;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'popular':
        return b.likes - a.likes;
      case 'views':
        return b.views - a.views;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const toggleFavorite = (projectId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in-progress':
        return 'from-yellow-500 to-orange-500';
      case 'planned':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'planned':
        return 'Planifié';
      default:
        return 'Inconnu';
    }
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-gray-600 transition-all overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
          <Code size={48} className="text-gray-400" />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <Eye size={20} />
          </motion.button>
          {project.demo && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(project.demo, '_blank')}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <ExternalLink size={20} />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(project.github, '_blank')}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <Github size={20} />
          </motion.button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} text-white text-xs font-medium rounded-full`}>
            {getStatusLabel(project.status)}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
              <Star size={16} className="text-white" />
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleFavorite(project.id)}
          className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <Heart 
            size={16} 
            className={favorites.has(project.id) ? 'fill-red-500 text-red-500' : 'text-white'} 
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          {project.status === 'in-progress' && (
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">{project.progress}%</div>
              <div className="w-16 h-1 bg-gray-700 rounded-full">
                <div 
                  className="h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map(tech => {
            const techInfo = technologies.find(t => t.id === tech);
            return (
              <span
                key={tech}
                className={`px-2 py-1 bg-gradient-to-r ${techInfo?.color || 'from-gray-500 to-gray-600'} text-white text-xs rounded-full`}
              >
                {techInfo?.label || tech}
              </span>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{project.views}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(project.date).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Mes Projets
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Découvrez mes créations, des applications web aux solutions mobiles
            </p>
          </motion.div>

          {/* Filters */}
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent size={16} />
                    {category.label}
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {technologies.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.label}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="recent">Plus récents</option>
                  <option value="popular">Plus populaires</option>
                  <option value="views">Plus vus</option>
                  <option value="name">Nom A-Z</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        {sortedProjects.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            <AnimatePresence>
              {sortedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-400 mb-6">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTech('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsUltraModern;
