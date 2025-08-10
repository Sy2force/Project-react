import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import CardGrid from '../components/cards/CardGrid';
import RequireAuth from '../components/RequireAuth';
import toast from 'react-hot-toast';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    favorites,
    loading,
    error,
    pagination,
    fetchFavorites,
    removeFavorite,
    changePage
  } = useFavorites();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleViewCard = (cardId) => {
    navigate(`/cards/${cardId}`);
  };

  const handleRemoveFavorite = async (cardId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir retirer cette carte de vos favoris ?')) {
      return;
    }

    try {
      await removeFavorite(cardId);
      // La liste sera automatiquement mise à jour par le hook
    } catch (error) {
      console.error('Erreur suppression favori:', error);
    }
  };

  const handlePageChange = (page) => {
    changePage(page);
  };

  // Fonction personnalisée pour gérer les actions sur les cartes favorites
  const handleCardAction = (action, cardId) => {
    switch (action) {
      case 'view':
        handleViewCard(cardId);
        break;
      case 'removeFavorite':
        handleRemoveFavorite(cardId);
        break;
      default:
        break;
    }
  };

  return (
    <RequireAuth>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '80px 20px 40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#ffffff',
                margin: 0,
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Heart size={32} style={{ color: '#ef4444', fill: '#ef4444' }} />
                Mes Favoris
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#94a3b8',
                margin: 0
              }}>
                Vos cartes business préférées
              </p>
            </div>

            {/* Bouton pour explorer plus de cartes */}
            <button
              onClick={() => navigate('/cards')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.3)';
              }}
            >
              Explorer les cartes
            </button>
          </div>

          {/* Statistiques rapides */}
          {pagination.totalItems > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <div style={{
                padding: '20px',
                background: 'rgba(17, 25, 40, 0.8)',
                borderRadius: '12px',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ef4444',
                  marginBottom: '4px'
                }}>
                  {pagination.totalItems}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#94a3b8'
                }}>
                  Favori{pagination.totalItems > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {/* Grille des favoris */}
          <CardGrid
            cards={favorites}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handlePageChange}
            onView={handleViewCard}
            onDelete={handleRemoveFavorite} // Utiliser la suppression de favori
            showActions={true}
            showSearch={false} // Pas de recherche sur les favoris
            showSort={false} // Pas de tri sur les favoris
            emptyMessage="Vous n'avez pas encore de favoris. Explorez les cartes et ajoutez-en à vos favoris !"
          />

          {/* Message d'encouragement pour les nouveaux utilisateurs */}
          {favorites.length === 0 && !loading && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              marginTop: '32px'
            }}>
              <div style={{
                background: 'rgba(17, 25, 40, 0.8)',
                borderRadius: '16px',
                padding: '40px',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Heart size={64} style={{ color: '#ef4444', marginBottom: '16px', opacity: 0.6 }} />
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: 0,
                  marginBottom: '12px'
                }}>
                  Aucun favori pour le moment
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#94a3b8',
                  margin: 0,
                  marginBottom: '24px',
                  maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  Découvrez des cartes business intéressantes et ajoutez-les à vos favoris 
                  en cliquant sur l'icône cœur. Vous pourrez ainsi les retrouver facilement ici.
                </p>
                <button
                  onClick={() => navigate('/cards')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Heart size={24} />
                  Découvrir des cartes
                </button>
              </div>
            </div>
          )}

          {/* Conseils d'utilisation */}
          {favorites.length > 0 && (
            <div style={{
              marginTop: '32px',
              padding: '20px',
              background: 'rgba(17, 25, 40, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0,
                marginBottom: '12px'
              }}>
                💡 Conseils d'utilisation
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                fontSize: '14px',
                color: '#94a3b8'
              }}>
                <div>
                  <strong style={{ color: '#e2e8f0' }}>Gestion des favoris :</strong><br />
                  Cliquez sur l'icône poubelle pour retirer une carte de vos favoris
                </div>
                <div>
                  <strong style={{ color: '#e2e8f0' }}>Accès rapide :</strong><br />
                  Vos favoris sont synchronisés et accessibles depuis n'importe où
                </div>
                <div>
                  <strong style={{ color: '#e2e8f0' }}>Organisation :</strong><br />
                  Utilisez les favoris pour garder un accès rapide aux cartes importantes
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
};

export default FavoritesPage;
