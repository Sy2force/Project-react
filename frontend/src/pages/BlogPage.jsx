import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, User, Eye, Tag } from 'lucide-react'
import { apiServices } from '../api'
import LoadingSpinner from '../components/LoadingSpinner'


const BlogPage = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await apiServices.blog.getAll()
        const postsData = response.data.posts || response.data
        setPosts(postsData)
        setFilteredPosts(postsData)
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Filtrage
  useEffect(() => {
    let filtered = [...posts]

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedTag !== 'all') {
      filtered = filtered.filter(post =>
        post.tags?.includes(selectedTag)
      )
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedTag])

  // Extraire tous les tags uniques
  const allTags = [...new Set(posts.flatMap(p => p.tags || []))]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/api/placeholder/80/80"
              alt="Shay Acoca"
              className="w-20 h-20 rounded-full border-2 border-blue-400"
            />
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Blog
              </h1>
              <p className="text-xl text-gray-300 mt-2">
                Idées, études de cas et process. Bienvenue dans les coulisses.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Recherche */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('all')}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedTag === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Tous
                </button>
                {allTags.slice(0, 5).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles List */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">Aucun article trouvé</div>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3">
                      <img
                        src={post.cover || '/api/placeholder/400/250'}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author?.name || 'Shay Acoca'}
                        </div>
                        {post.metrics?.views && (
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            {post.metrics.views}
                          </div>
                        )}
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt || post.content?.substring(0, 200) + '...'}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-gray-400 text-xs px-2 py-1">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedPost && (
        <ArticleModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  )
}

// Modal d'article détaillé
const ArticleModal = ({ post, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-800 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img
            src={post.cover || '/api/placeholder/800/400'}
            alt={post.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.createdAt).toLocaleDateString('fr-FR')}
            </div>
            <div className="flex items-center gap-1">
              <User size={14} />
              {post.author?.name || 'Shay Acoca'}
            </div>
            {post.metrics?.views && (
              <div className="flex items-center gap-1">
                <Eye size={14} />
                {post.metrics.views} vues
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">À propos de l'auteur</h3>
            <div className="flex items-start gap-4">
              <img
                src={post.author?.avatar || '/api/placeholder/60/60'}
                alt={post.author?.name || 'Shay Acoca'}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-white font-semibold mb-2">
                  {post.author?.name || 'Shay Acoca'}
                </h4>
                <p className="text-gray-300 text-sm">
                  Créateur du futur digital, spécialisé dans le développement React et le design d'interfaces modernes. 
                  Passionné par l'innovation et la performance web.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BlogPage
