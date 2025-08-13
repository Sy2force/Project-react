// [EXAM] Page Galerie complète avec filtres avancés et lightbox
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { 
  Image,
  Search,
  Filter,
  Grid3X3,
  Grid2X2,
  Maximize2,
  Download,
  Heart,
  Share2,
  Eye,
  Calendar,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

const GalleryComplete = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridSize, setGridSize] = useState('medium');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [likedImages, setLikedImages] = useState(new Set());

  const categories = [
    { id: 'all', name: 'Tous', count: 24 },
    { id: 'web-design', name: 'Web Design', count: 8 },
    { id: 'mobile-apps', name: 'Apps Mobile', count: 6 },
    { id: 'branding', name: 'Branding', count: 5 },
    { id: 'ui-ux', name: 'UI/UX', count: 5 }
  ];

  const gallery = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      category: 'web-design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      description: 'Interface moderne pour tableau de bord e-commerce',
      tags: ['Dashboard', 'E-commerce', 'Analytics'],
      date: '2024-08-10',
      views: 1247,
      likes: 89,
      type: 'image'
    },
    {
      id: 2,
      title: 'App Mobile Banking',
      category: 'mobile-apps',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      description: 'Application mobile de banque avec design moderne',
      tags: ['Mobile', 'Banking', 'Finance'],
      date: '2024-08-08',
      views: 892,
      likes: 67,
      type: 'image'
    },
    {
      id: 3,
      title: 'Logo TechStart',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      description: 'Identité visuelle complète pour startup tech',
      tags: ['Logo', 'Branding', 'Startup'],
      date: '2024-08-05',
      views: 654,
      likes: 45,
      type: 'image'
    },
    {
      id: 4,
      title: 'Interface Fitness App',
      category: 'ui-ux',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'Design UX/UI pour application de fitness',
      tags: ['UI/UX', 'Fitness', 'Mobile'],
      date: '2024-08-03',
      views: 432,
      likes: 32,
      type: 'image'
    },
    {
      id: 5,
      title: 'Site Web Restaurant',
      category: 'web-design',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      description: 'Site web élégant pour restaurant gastronomique',
      tags: ['Website', 'Restaurant', 'Elegant'],
      date: '2024-08-01',
      views: 789,
      likes: 56,
      type: 'image'
    },
    {
      id: 6,
      title: 'Charte Graphique',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      description: 'Charte graphique complète pour entreprise',
      tags: ['Branding', 'Guidelines', 'Corporate'],
      date: '2024-07-28',
      views: 345,
      likes: 28,
      type: 'image'
    }
  ];

  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsSlideshow(false);
  };

  const handlePrevImage = () => {
    const currentIndex = filteredGallery.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredGallery.length - 1;
    setSelectedImage(filteredGallery[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = filteredGallery.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < filteredGallery.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredGallery[nextIndex]);
  };

  const toggleLike = (imageId) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const getGridCols = () => {
    switch (gridSize) {
      case 'small': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      case 'medium': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 'large': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Galerie - Mes Créations | Shay Acoca</title>
        <meta name="description" content="Découvrez ma galerie de créations : web design, apps mobiles, branding et UI/UX." />
      </Helmet>

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center space-x-3">
                <Image className="text-purple-500" size={40} />
                <span>Galerie Créative</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explorez ma collection de créations digitales, des interfaces web aux applications mobiles
              </p>
            </div>
          </motion.div>

          {/* Filtres et contrôles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Recherche */}
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher dans la galerie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Taille de grille */}
                <div className="flex items-center space-x-2 p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <button
                    onClick={() => setGridSize('small')}
                    className={`p-2 rounded transition-colors ${
                      gridSize === 'small' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setGridSize('medium')}
                    className={`p-2 rounded transition-colors ${
                      gridSize === 'medium' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Grid2X2 size={18} />
                  </button>
                  <button
                    onClick={() => setGridSize('large')}
                    className={`p-2 rounded transition-colors ${
                      gridSize === 'large' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Image size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Galerie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {filteredGallery.length === 0 ? (
              <div className="text-center py-16">
                <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Aucune image trouvée</h3>
                <p className="text-gray-400">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            ) : (
              <div className={`grid ${getGridCols()} gap-6`}>
                {filteredGallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => handleImageClick(item)}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Actions overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(item.id);
                            }}
                            className={`p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                              likedImages.has(item.id)
                                ? 'bg-red-500/80 text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            <Heart size={20} className={likedImages.has(item.id) ? 'fill-current' : ''} />
                          </button>
                          <button className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300">
                            <Maximize2 size={20} />
                          </button>
                          <button className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300">
                            <Share2 size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Badge catégorie */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-medium">
                        {categories.find(cat => cat.id === item.category)?.name}
                      </div>
                    </div>

                    {/* Informations */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Métadonnées */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Eye size={14} />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart size={14} />
                            <span>{item.likes + (likedImages.has(item.id) ? 1 : 0)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-6xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Navigation */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>

            {/* Fermer */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              
              {/* Informations */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(selectedImage.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        likedImages.has(selectedImage.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart size={18} className={likedImages.has(selectedImage.id) ? 'fill-current' : ''} />
                      <span>{selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300">
                      <Download size={18} />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryComplete;
