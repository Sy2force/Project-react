// [EXAM] Page Favoris complète avec gestion avancée et filtres
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { 
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Tag,
  ExternalLink,
  Trash2,
  Share2,
  Download,
  Eye,
  Star,
  Clock,
  Folder,
  Plus,
  X,
  ChevronDown,
  SortAsc,
  SortDesc
} from 'lucide-react';

const FavoritesComplete = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous', count: 24 },
    { id: 'projects', name: 'Projets', count: 12 },
    { id: 'articles', name: 'Articles', count: 8 },
    { id: 'resources', name: 'Ressources', count: 4 }
  ];

  const favorites = [
    {
      id: 1,
      title: 'E-commerce Platform React',
      description: 'Plateforme e-commerce moderne avec React et Node.js',
      category: 'projects',
      type: 'Projet',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop',
      tags: ['React', 'Node.js', 'E-commerce'],
      addedDate: '2024-08-10',
      views: 245,
      rating: 4.8,
      url: '/projects/1'
    },
    {
      id: 2,
      title: 'Guide complet React Hooks',
      description: 'Article détaillé sur l\'utilisation avancée des React Hooks',
      category: 'articles',
      type: 'Article',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
      tags: ['React', 'Hooks', 'JavaScript'],
      addedDate: '2024-08-08',
      views: 892,
      rating: 4.9,
      url: '/blog/react-hooks-guide'
    },
    {
      id: 3,
      title: 'Portfolio Designer Créatif',
      description: 'Portfolio moderne avec animations et design créatif',
      category: 'projects',
      type: 'Projet',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop',
      tags: ['Design', 'Portfolio', 'Animation'],
      addedDate: '2024-08-05',
      views: 156,
      rating: 4.7,
      url: '/projects/3'
    },
    {
      id: 4,
      title: 'Outils de développement 2024',
      description: 'Liste des meilleurs outils pour développeurs en 2024',
      category: 'resources',
      type: 'Ressource',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
      tags: ['Outils', 'Développement', '2024'],
      addedDate: '2024-08-03',
      views: 432,
      rating: 4.6,
      url: '/resources/dev-tools-2024'
    },
    {
      id: 5,
      title: 'App Mobile Fitness',
      description: 'Application mobile de fitness avec React Native',
      category: 'projects',
      type: 'Projet',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
      tags: ['React Native', 'Mobile', 'Fitness'],
      addedDate: '2024-08-01',
      views: 324,
      rating: 4.5,
      url: '/projects/5'
    },
    {
      id: 6,
      title: 'Optimisation Performance Web',
      description: 'Techniques avancées pour optimiser les performances web',
      category: 'articles',
      type: 'Article',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      tags: ['Performance', 'Optimisation', 'Web'],
      addedDate: '2024-07-28',
      views: 678,
      rating: 4.8,
      url: '/blog/web-performance'
    }
  ];

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.addedDate) - new Date(a.addedDate);
      case 'oldest':
        return new Date(a.addedDate) - new Date(b.addedDate);
      case 'rating':
        return b.rating - a.rating;
      case 'views':
        return b.views - a.views;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRemoveFromFavorites = (itemId) => {
    // Logique pour supprimer des favoris
    console.log('Supprimer des favoris:', itemId);
  };

  const handleBulkAction = (action) => {
    console.log(`Action en lot: ${action} sur`, selectedItems);
    setSelectedItems([]);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'projects': return 'from-blue-500 to-cyan-500';
      case 'articles': return 'from-purple-500 to-pink-500';
      case 'resources': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Favoris - Ma Collection | Shay Acoca</title>
        <meta name="description" content="Gérez votre collection de projets, articles et ressources favoris." />
      </Helmet>

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center space-x-3">
                  <Heart className="text-red-500" size={32} />
                  <span>Mes Favoris</span>
                </h1>
                <p className="text-gray-300 mt-2">
                  {sortedFavorites.length} éléments dans votre collection
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Actions en lot */}
                {selectedItems.length > 0 && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <span className="text-blue-300 text-sm">
                      {selectedItems.length} sélectionné{selectedItems.length > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={() => handleBulkAction('remove')}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => handleBulkAction('share')}
                      className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                )}

                {/* Mode d'affichage */}
                <div className="flex items-center space-x-2 p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filtres et recherche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Barre de recherche */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher dans vos favoris..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Catégories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Tri */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                  >
                    <option value="recent">Plus récents</option>
                    <option value="oldest">Plus anciens</option>
                    <option value="rating">Mieux notés</option>
                    <option value="views">Plus vus</option>
                    <option value="alphabetical">Alphabétique</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grille/Liste des favoris */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sortedFavorites.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Aucun favori trouvé</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery || selectedCategory !== 'all' 
                    ? 'Essayez de modifier vos filtres de recherche'
                    : 'Commencez à ajouter des éléments à vos favoris'
                  }
                </p>
                <Link
                  to="/projects"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <Plus size={20} />
                  <span>Découvrir des projets</span>
                </Link>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
              }>
                {sortedFavorites.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative ${
                      viewMode === 'grid' 
                        ? 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300'
                        : 'flex items-center space-x-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300'
                    }`}
                  >
                    {/* Checkbox de sélection */}
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>

                    {viewMode === 'grid' ? (
                      <>
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          
                          {/* Badge catégorie */}
                          <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${getCategoryColor(item.category)} rounded-full text-white text-sm font-medium`}>
                            {item.type}
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleRemoveFromFavorites(item.id)}
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Heart size={18} className="fill-current" />
                              </button>
                            </div>
                          </div>

                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                            {item.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Métadonnées */}
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star size={14} className="text-yellow-400" />
                                <span>{item.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{new Date(item.addedDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            <Link
                              to={item.url}
                              className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                            >
                              <ExternalLink size={16} />
                              <span>Voir</span>
                            </Link>
                            <button className="p-2 bg-white/10 text-gray-300 hover:text-white rounded-lg transition-colors">
                              <Share2 size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Mode liste */}
                        <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-white truncate">
                              {item.title}
                            </h3>
                            <div className={`px-2 py-1 bg-gradient-to-r ${getCategoryColor(item.category)} rounded text-white text-xs font-medium`}>
                              {item.type}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-2 line-clamp-1">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Eye size={14} />
                                <span>{item.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star size={14} className="text-yellow-400" />
                                <span>{item.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar size={14} />
                                <span>{new Date(item.addedDate).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Link
                                to={item.url}
                                className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                              >
                                <ExternalLink size={14} />
                                <span>Voir</span>
                              </Link>
                              <button
                                onClick={() => handleRemoveFromFavorites(item.id)}
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Heart size={16} className="fill-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesComplete;
