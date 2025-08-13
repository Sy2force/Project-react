// [EXAM] Page Blog optimisée avec design moderne et articles complets
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  TrendingUp,
  Filter
} from 'lucide-react';

const BlogOptimized = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedPosts, setLikedPosts] = useState(new Set());

  const categories = [
    { id: 'all', name: 'Tous les articles', count: 24 },
    { id: 'web-dev', name: 'Développement Web', count: 8 },
    { id: 'design', name: 'Design UI/UX', count: 6 },
    { id: 'tech', name: 'Technologies', count: 5 },
    { id: 'tips', name: 'Conseils', count: 3 },
    { id: 'career', name: 'Carrière', count: 2 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Les tendances du développement web en 2024",
      excerpt: "Découvrez les technologies et frameworks qui domineront le développement web cette année.",
      content: "React 18, Next.js 14, et l'essor de l'IA dans le développement...",
      author: "Shay Acoca",
      date: "2024-01-15",
      readTime: "8 min",
      category: "web-dev",
      tags: ["React", "Next.js", "Tendances", "2024"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      likes: 42,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: "Guide complet du design system moderne",
      excerpt: "Comment créer et maintenir un design system efficace pour vos projets.",
      content: "Un design system bien conçu est la clé d'une interface cohérente...",
      author: "Shay Acoca",
      date: "2024-01-10",
      readTime: "12 min",
      category: "design",
      tags: ["Design System", "UI/UX", "Figma", "Components"],
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
      likes: 38,
      comments: 8,
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: "Optimisation des performances React",
      excerpt: "Techniques avancées pour améliorer les performances de vos applications React.",
      author: "Shay Acoca",
      date: "2024-01-08",
      readTime: "6 min",
      category: "web-dev",
      tags: ["React", "Performance", "Optimisation"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      likes: 28,
      comments: 5
    },
    {
      id: 4,
      title: "L'art de l'animation web avec Framer Motion",
      excerpt: "Créez des animations fluides et engageantes pour vos interfaces web.",
      author: "Shay Acoca",
      date: "2024-01-05",
      readTime: "10 min",
      category: "design",
      tags: ["Animation", "Framer Motion", "UX"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      likes: 35,
      comments: 9
    },
    {
      id: 5,
      title: "TypeScript : bonnes pratiques 2024",
      excerpt: "Les meilleures pratiques pour écrire du TypeScript maintenable et robuste.",
      author: "Shay Acoca",
      date: "2024-01-03",
      readTime: "7 min",
      category: "tech",
      tags: ["TypeScript", "Best Practices", "Development"],
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
      likes: 31,
      comments: 6
    },
    {
      id: 6,
      title: "Construire une API REST avec Node.js",
      excerpt: "Guide étape par étape pour créer une API robuste et sécurisée.",
      author: "Shay Acoca",
      date: "2024-01-01",
      readTime: "15 min",
      category: "web-dev",
      tags: ["Node.js", "API", "Backend"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      likes: 44,
      comments: 11
    }
  ];

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const filteredPosts = recentPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Blog & Actualités
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes derniers articles sur le développement web, le design, 
            et les tendances technologiques.
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Articles en vedette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <TrendingUp className="mr-3 text-purple-400" size={28} />
            Articles en vedette
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Vedette
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(post.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-200">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs flex items-center"
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 transition-colors duration-200 ${
                          likedPosts.has(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart size={16} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                        <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </button>
                      
                      <span className="flex items-center space-x-1 text-gray-400">
                        <MessageCircle size={16} />
                        <span className="text-sm">{post.comments}</span>
                      </span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">Lire la suite</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Articles récents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <BookOpen className="mr-3 text-purple-400" size={28} />
            Articles récents
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(post.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-white/10 text-gray-300 px-2 py-1 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-gray-400 text-xs px-2 py-1">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 transition-colors duration-200 ${
                          likedPosts.has(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <Heart size={14} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                        <span className="text-xs">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </button>
                      
                      <span className="flex items-center space-x-1 text-gray-400">
                        <MessageCircle size={14} />
                        <span className="text-xs">{post.comments}</span>
                      </span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Restez informé
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Recevez mes derniers articles et conseils directement dans votre boîte mail. 
            Pas de spam, juste du contenu de qualité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              S'abonner
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogOptimized;
