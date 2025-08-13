// [EXAM] Page Portfolio complète avec filtres avancés et détails projets
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { 
  Briefcase,
  ExternalLink,
  Github,
  Calendar,
  Filter,
  Search,
  Grid3X3,
  List,
  Eye,
  Heart,
  Share2,
  ArrowRight,
  Code,
  Users,
  Award,
  Zap,
  Target
} from 'lucide-react';

const PortfolioComplete = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [likedProjects, setLikedProjects] = useState(new Set());

  const categories = [
    { id: 'all', name: 'Tous les projets', count: 12 },
    { id: 'web', name: 'Applications Web', count: 5 },
    { id: 'mobile', name: 'Apps Mobile', count: 3 },
    { id: 'ecommerce', name: 'E-commerce', count: 2 },
    { id: 'saas', name: 'SaaS', count: 2 }
  ];

  const technologies = [
    { id: 'all', name: 'Toutes', count: 12 },
    { id: 'react', name: 'React', count: 8 },
    { id: 'nodejs', name: 'Node.js', count: 6 },
    { id: 'nextjs', name: 'Next.js', count: 4 },
    { id: 'typescript', name: 'TypeScript', count: 5 }
  ];

  const projects = [
    {
      id: 1,
      title: 'EcoShop - E-commerce Écologique',
      category: 'ecommerce',
      description: 'Plateforme e-commerce complète dédiée aux produits écologiques avec système de recommandation IA.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      metrics: { users: '10K+', conversion: '4.2%' },
      date: '2024-08-15',
      status: 'Terminé',
      liveUrl: 'https://ecoshop-demo.com',
      githubUrl: 'https://github.com/shayacoca/ecoshop',
      views: 2847,
      likes: 156,
      tags: ['E-commerce', 'IA', 'Écologie', 'React']
    },
    {
      id: 2,
      title: 'MindFlow - App de Méditation',
      category: 'mobile',
      description: 'Application mobile de méditation guidée avec suivi des progrès et communauté intégrée.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      technologies: ['React Native', 'Node.js', 'PostgreSQL'],
      metrics: { users: '25K+', retention: '68%' },
      date: '2024-07-20',
      status: 'En production',
      liveUrl: 'https://mindflow-app.com',
      githubUrl: 'https://github.com/shayacoca/mindflow',
      views: 1923,
      likes: 89,
      tags: ['Mobile', 'Bien-être', 'IA', 'React Native']
    },
    {
      id: 3,
      title: 'DataViz Pro - Dashboard Analytics',
      category: 'saas',
      description: 'Plateforme SaaS de visualisation de données avec tableaux de bord interactifs.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL'],
      metrics: { clients: '500+', uptime: '99.9%' },
      date: '2024-06-10',
      status: 'En développement',
      liveUrl: 'https://dataviz-pro.com',
      githubUrl: 'https://github.com/shayacoca/dataviz-pro',
      views: 3156,
      likes: 203,
      tags: ['SaaS', 'Analytics', 'D3.js', 'Next.js']
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesTech = selectedTech === 'all' || 
                       project.technologies.some(tech => tech.toLowerCase().includes(selectedTech.toLowerCase()));
    return matchesSearch && matchesCategory && matchesTech;
  });

  const toggleLike = (projectId) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const stats = [
    { label: 'Projets Réalisés', value: '50+', icon: Briefcase },
    { label: 'Clients Satisfaits', value: '40+', icon: Users },
    { label: 'Technologies Maîtrisées', value: '20+', icon: Code },
    { label: 'Années d\'Expérience', value: '5+', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Portfolio - Mes Réalisations | Shay Acoca</title>
        <meta name="description" content="Découvrez mes projets de développement web et mobile : applications SaaS, e-commerce, et solutions sur mesure." />
      </Helmet>

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white flex items-center justify-center space-x-4">
                <Briefcase className="text-purple-500" size={48} />
                <span>Mon Portfolio</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Découvrez mes réalisations les plus récentes : des applications web innovantes aux solutions mobiles.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center"
                  >
                    <stat.icon className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="space-y-6">
                {/* Recherche */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher un projet..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="recent">Plus récents</option>
                      <option value="popular">Plus populaires</option>
                      <option value="views">Plus vus</option>
                    </select>

                    <div className="flex items-center space-x-2 p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded transition-colors ${
                          viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <Grid3X3 size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded transition-colors ${
                          viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <List size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Catégories */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold flex items-center space-x-2">
                    <Filter size={18} />
                    <span>Catégories</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Terminé' 
                        ? 'bg-green-500/80 text-white' 
                        : project.status === 'En production'
                        ? 'bg-blue-500/80 text-white'
                        : 'bg-orange-500/80 text-white'
                    }`}>
                      {project.status}
                    </div>

                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleLike(project.id)}
                        className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                          likedProjects.has(project.id)
                            ? 'bg-red-500/80 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <Heart size={16} className={likedProjects.has(project.id) ? 'fill-current' : ''} />
                      </button>
                      <button className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300">
                        <Share2 size={16} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-800/80 rounded-full text-white hover:bg-gray-700/80 transition-all duration-300"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Métriques */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                        <div key={metricIndex} className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-lg font-bold text-white">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={14} />
                          <span>{project.likes + (likedProjects.has(project.id) ? 1 : 0)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(project.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 group">
                        <span>Voir détails</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Prêt à créer quelque chose d'extraordinaire ?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Chaque projet est une opportunité de repousser les limites. 
                Discutons de votre vision et transformons-la en réalité digitale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Zap size={20} />
                  <span>Démarrer un projet</span>
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Target size={20} />
                  <span>Consultation gratuite</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioComplete;
