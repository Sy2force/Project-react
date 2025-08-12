import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Tag, Search, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Données de démonstration pour les articles de blog
  const mockPosts = [
    {
      id: 1,
      title: "Les tendances du développement web en 2024",
      excerpt: "Découvrez les technologies et frameworks qui façonnent l'avenir du développement web.",
      content: "Le développement web évolue rapidement. React, Next.js, et les nouvelles approches...",
      author: "Shay Acoca",
      date: "2024-01-15",
      readTime: "5 min",
      category: "Développement",
      tags: ["React", "Next.js", "Tendances"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Guide complet de l'authentification JWT",
      excerpt: "Tout ce que vous devez savoir sur l'implémentation sécurisée de JWT dans vos applications.",
      content: "L'authentification JWT est devenue un standard. Voici comment l'implémenter...",
      author: "Shay Acoca",
      date: "2024-01-10",
      readTime: "8 min",
      category: "Sécurité",
      tags: ["JWT", "Authentification", "Sécurité"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Optimisation des performances React",
      excerpt: "Techniques avancées pour améliorer les performances de vos applications React.",
      content: "Les performances sont cruciales. Découvrez les meilleures pratiques...",
      author: "Shay Acoca",
      date: "2024-01-05",
      readTime: "6 min",
      category: "Performance",
      tags: ["React", "Performance", "Optimisation"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Design System avec Tailwind CSS",
      excerpt: "Comment créer un design system cohérent et maintenable avec Tailwind CSS.",
      content: "Un design system bien conçu est la base d'une interface utilisateur réussie...",
      author: "Shay Acoca",
      date: "2023-12-28",
      readTime: "7 min",
      category: "Design",
      tags: ["Tailwind", "Design System", "CSS"],
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
      featured: true
    }
  ];

  const categories = ['all', 'Développement', 'Sécurité', 'Performance', 'Design'];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filtrage par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Blog & Articles
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Découvrez mes réflexions sur le développement web, les nouvelles technologies et les meilleures pratiques.
          </p>
        </motion.div>

        {/* Filtres et Recherche */}
        <motion.div
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Barre de recherche */}
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} size={20} />
            <input
              type="text"
              placeholder="Rechercher des articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : isDark
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                } border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles en vedette */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Articles en vedette
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {posts.filter(post => post.featured).map((post) => (
                <motion.article
                  key={post.id}
                  className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className={`flex items-center gap-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Calendar size={16} />
                        {formatDate(post.date)}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock size={16} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`mb-4 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-blue-500 hover:text-blue-600 font-medium">
                        Lire la suite →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Liste des articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className={`text-2xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {selectedCategory === 'all' ? 'Tous les articles' : `Articles - ${selectedCategory}`}
            <span className={`ml-2 text-lg font-normal ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              ({filteredPosts.length})
            </span>
          </h2>

          {filteredPosts.length === 0 ? (
            <div className={`text-center py-12 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p className="text-xl mb-2">Aucun article trouvé</p>
              <p>Essayez de modifier vos critères de recherche.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className={`flex items-center gap-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Calendar size={14} />
                        {formatDate(post.date)}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                        {post.category}
                      </span>
                      <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        Lire →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
