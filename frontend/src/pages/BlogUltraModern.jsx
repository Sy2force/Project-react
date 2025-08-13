import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Heart, MessageCircle, BookOpen, Tag } from 'lucide-react';

const BlogUltraModern = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous', count: 15 },
    { id: 'tech', label: 'Tech', count: 8 },
    { id: 'design', label: 'Design', count: 4 },
    { id: 'career', label: 'Carrière', count: 3 }
  ];

  const articles = [
    {
      id: 1,
      title: 'Les Tendances React en 2024',
      excerpt: 'Découvrez les nouvelles fonctionnalités React qui révolutionnent le développement.',
      category: 'tech',
      date: '2024-01-15',
      readTime: 8,
      likes: 124,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: 'Guide API REST avec Node.js',
      excerpt: 'Tutoriel complet pour construire une API robuste avec Node.js.',
      category: 'tech',
      date: '2024-01-10',
      readTime: 12,
      likes: 89,
      comments: 15,
      featured: false
    },
    {
      id: 3,
      title: 'Design System Efficace',
      excerpt: 'Comment créer et maintenir un design system cohérent.',
      category: 'design',
      date: '2024-01-05',
      readTime: 6,
      likes: 156,
      comments: 31,
      featured: true
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                Mon Blog
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Partage de connaissances et tutoriels
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-gray-600 transition-all overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center relative">
                <BookOpen size={48} className="text-gray-400" />
                {article.featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold">
                    Vedette
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{article.readTime} min</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                  {article.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart size={14} />
                      <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{article.comments}</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                    {article.category}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Aucun article trouvé</h3>
            <p className="text-gray-400">Modifiez vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogUltraModern;
