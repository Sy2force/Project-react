import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';

const MyCards = () => {
  const { user, canCreateCards } = useAuth();
  const { isDark } = useTheme();
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données de test pour mes cartes
  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      const mockCards = [
        {
          id: 1,
          title: "Mon Restaurant",
          category: "Restaurant",
          description: "Un petit restaurant familial avec une cuisine authentique",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
          status: "active",
          createdAt: "2024-01-15",
          views: 245,
          likes: 18
        },
        {
          id: 2,
          title: "Studio Photo",
          category: "Services",
          description: "Studio professionnel pour vos shootings photo",
          image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
          status: "active",
          createdAt: "2024-02-10",
          views: 156,
          likes: 12
        }
      ];
      setCards(mockCards);
      setFilteredCards(mockCards);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = cards.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      setCards(prev => prev.filter(card => card.id !== cardId));
      setFilteredCards(prev => prev.filter(card => card.id !== cardId));
    }
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
            Mes Cartes
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez vos cartes business et suivez leurs performances
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
            placeholder="Rechercher dans mes cartes..."
          />
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Total Cartes
            </h3>
            <p className="text-3xl font-bold text-blue-600">{cards.length}</p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Total Vues
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {cards.reduce((sum, card) => sum + card.views, 0)}
            </p>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Total Likes
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {cards.reduce((sum, card) => sum + card.likes, 0)}
            </p>
          </div>
        </motion.div>

        {/* Bouton créer une carte (si business/admin) */}
        {canCreateCards() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-center"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              + Créer une nouvelle carte
            </button>
          </motion.div>
        )}

        {/* Liste des cartes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} hover:shadow-lg transition-shadow duration-200`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {card.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    card.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {card.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <p className={`text-sm mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {card.category}
                </p>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {card.description}
                </p>
                
                {/* Statistiques */}
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    👁️ {card.views} vues
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    ❤️ {card.likes} likes
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    📅 {new Date(card.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200">
                    Modifier
                  </button>
                  <button 
                    onClick={() => handleDeleteCard(card.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message si aucune carte */}
        {filteredCards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className={`text-6xl mb-4`}>📋</div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Aucune carte trouvée
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {cards.length === 0 
                ? "Vous n'avez pas encore créé de cartes."
                : "Aucune carte ne correspond à votre recherche."
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCards;
