import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCards } from '../hooks/useCards';
import CardGrid from '../components/cards/CardGrid';
import toast from 'react-hot-toast';

const MyCardsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cards,
    loading,
    error,
    pagination,
    fetchMyCards,
    deleteCard,
    searchCards,
    sortCards,
    changePage
  } = useCards();

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  const handleCreateCard = () => {
    navigate('/cards/new');
  };

  const handleViewCard = (cardId) => {
    navigate(`/cards/${cardId}`);
  };

  const handleEditCard = (card) => {
    navigate(`/cards/${card._id}/edit`);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(cardId);
      // La liste sera automatiquement mise à jour par le hook
    } catch (error) {
      console.error('Erreur suppression carte:', error);
    }
  };

  const handleSearch = (query) => {
    searchCards(query);
  };

  const handleSort = (sort) => {
    sortCards(sort);
  };

  const handlePageChange = (page) => {
    changePage(page);
  };

  // Vérifier les permissions
  const canCreateCards = user && (user.role === 'business' || user.role === 'admin');

  return (
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
              <CreditCard size={32} style={{ color: '#667eea' }} />
              Mes Cartes Business
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#94a3b8',
              margin: 0
            }}>
              Gérez vos cartes de visite numériques
            </p>
          </div>

          {canCreateCards && (
            <button
              onClick={handleCreateCard}
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
              <Plus size={20} />
              Créer une carte
            </button>
          )}
        </div>

        {/* Message d'information pour les utilisateurs non-business */}
        {!canCreateCards && (
          <div style={{
            padding: '20px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#3b82f6',
              margin: 0,
              fontSize: '16px'
            }}>
              Pour créer des cartes business, vous devez avoir un compte professionnel.
              Contactez l'administrateur pour plus d'informations.
            </p>
          </div>
        )}

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
                color: '#667eea',
                marginBottom: '4px'
              }}>
                {pagination.totalItems}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#94a3b8'
              }}>
                Carte{pagination.totalItems > 1 ? 's' : ''} créée{pagination.totalItems > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        )}

        {/* Grille des cartes */}
        <CardGrid
          cards={cards}
          loading={loading}
          error={error}
          pagination={pagination}
          onSearch={handleSearch}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onView={handleViewCard}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
          showActions={true}
          emptyMessage={
            canCreateCards 
              ? "Vous n'avez pas encore créé de carte. Cliquez sur 'Créer une carte' pour commencer !"
              : "Aucune carte trouvée."
          }
        />

        {/* Message d'encouragement pour les nouveaux utilisateurs */}
        {canCreateCards && cards.length === 0 && !loading && (
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
              <CreditCard size={64} style={{ color: '#667eea', marginBottom: '16px' }} />
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0,
                marginBottom: '12px'
              }}>
                Créez votre première carte business !
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
                Les cartes business vous permettent de présenter votre entreprise de manière professionnelle
                et d'être facilement trouvé par vos clients potentiels.
              </p>
              <button
                onClick={handleCreateCard}
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
                <Plus size={24} />
                Créer ma première carte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCardsPage;
