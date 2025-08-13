import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';

const Favorites = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données de test pour les favoris
  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      const mockFavorites = [
        {
          id: 1,
          title: "Café Central",
          category: "Restaurant",
          description: "Un café cosy au cœur de la ville avec une ambiance chaleureuse",
          image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
          owner: "Marie Dubois",
          rating: 4.8,
          addedAt: "2024-01-20",
          location: "Paris, France"
        },
        {
          id: 2,
          title: "Tech Solutions",
          category: "Services",
          description: "Solutions informatiques innovantes pour entreprises",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
          owner: "Jean Martin",
          rating: 4.6,
          addedAt: "2024-02-05",
          location: "Lyon, France"
        },
        {
          id: 3,
          title: "Boutique Mode",
          category: "Commerce",
          description: "Vêtements tendance et accessoires de mode",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
          owner: "Sophie Laurent",
          rating: 4.9,
          addedAt: "2024-02-12",
          location: "Nice, France"
        }
      ];
      setFavorites(mockFavorites);
      setFilteredFavorites(mockFavorites);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = favorites.filter(favorite =>
      favorite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  };

  const handleRemoveFavorite = async (favoriteId) => {
    if (window.confirm('Retirer cette carte de vos favoris ?')) {
      // Optimistic update - retirer immédiatement de l'UI
      const originalFavorites = [...favorites];
      const originalFiltered = [...filteredFavorites];
      
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
      setFilteredFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
      
      try {
        // Appel API pour retirer des favoris en DB
        const response = await fetch(`http://localhost:5001/api/favorites/${favoriteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression');
        }
        
        // Succès - toast de confirmation
        console.log('Favori retiré avec succès');
      } catch (error) {
        // Erreur - restaurer l'état original
        console.error('Erreur lors de la suppression du favori:', error);
        setFavorites(originalFavorites);
        setFilteredFavorites(originalFiltered);
        alert('Erreur lors de la suppression du favori. Veuillez réessayer.');
      }
    }
  };

  const handleVisitCard = (cardId) => {
    // Redirection vers la page détail de la carte
    // Navigation vers le détail de la carte
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-white' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Mes Favoris ❤️
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Retrouvez toutes les cartes que vous avez ajoutées à vos favoris
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Rechercher dans vos favoris..."
          />
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} text-center`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Total Favoris
            </h3>
            <p className="text-3xl font-bold text-red-600">{favorites.length}</p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Cartes sauvegardées dans votre collection
            </p>
          </div>
        </motion.div>

        {/* Liste des favoris */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFavorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} hover:shadow-lg transition-all duration-200 group`}
            >
              <div className="relative">
                <img
                  src={favorite.image}
                  alt={favorite.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {/* Badge favori */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                    title="Retirer des favoris"
                  >
                    ❤️
                  </button>
                </div>
                {/* Note */}
                <div className="absolute top-3 left-3">
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    ⭐ {favorite.rating}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {favorite.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {favorite.category}
                  </p>
                </div>
                
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {favorite.description}
                </p>
                
                {/* Informations propriétaire */}
                <div className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p>👤 Par {favorite.owner}</p>
                  <p>📍 {favorite.location}</p>
                  <p>📅 Ajouté le {new Date(favorite.addedAt).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleVisitCard(favorite.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200"
                  >
                    Visiter
                  </button>
                  <button 
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message si aucun favori */}
        {filteredFavorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💔</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {favorites.length === 0 ? 'Aucun favori' : 'Aucun résultat'}
            </h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {favorites.length === 0 
                ? "Vous n'avez pas encore ajouté de cartes à vos favoris."
                : "Aucune carte ne correspond à votre recherche."
              }
            </p>
            {favorites.length === 0 && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Découvrir des cartes
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
