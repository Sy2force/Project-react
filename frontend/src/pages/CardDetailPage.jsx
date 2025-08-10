import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Edit, 
  Trash2,
  AlertCircle,
  ExternalLink,
  Calendar,
  User,
  Hash
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { cardsAPI } from '../api/cards';
const MapView = React.lazy(() => import('../components/map/MapView'));
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const CardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite, loading: favoriteLoading } = useFavorites();
  
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger la carte
  useEffect(() => {
    const fetchCard = async () => {
      if (!id) {
        setError('ID de carte manquant');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await cardsAPI.getCard(id);
        setCard(response.data);
      } catch (err) {
        console.error('Erreur chargement carte:', err);
        setError(err.message || 'Erreur lors du chargement de la carte');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour ajouter aux favoris');
      return;
    }

    try {
      await toggleFavorite(card._id);
    } catch (error) {
      console.error('Erreur toggle favori:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/cards/${card._id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ? Cette action est irréversible.')) {
      return;
    }

    try {
      await cardsAPI.deleteCard(card._id);
      toast.success('Carte supprimée avec succès');
      navigate('/my-cards');
    } catch (error) {
      console.error('Erreur suppression carte:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleContact = (type, value) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`);
        break;
      case 'email':
        window.open(`mailto:${value}`);
        break;
      case 'website':
        window.open(value, '_blank');
        break;
      default:
        break;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '80px 20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(17, 25, 40, 0.8)',
          borderRadius: '16px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          <AlertCircle size={48} style={{ color: '#ef4444', marginBottom: '16px' }} />
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#ffffff',
            margin: 0,
            marginBottom: '16px'
          }}>
            Carte non trouvée
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            margin: 0,
            marginBottom: '24px'
          }}>
            {error}
          </p>
          <button
            onClick={() => navigate('/cards')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'rgba(71, 85, 105, 0.8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} />
            Retour aux cartes
          </button>
        </div>
      </div>
    );
  }

  // Card not found
  if (!card) {
    return null;
  }

  // Vérifier les permissions
  const isOwner = card.userId && (
    card.userId._id === user?.id || 
    card.userId === user?.id
  );
  const isAdmin = user?.role === 'admin';
  const canEdit = isOwner || isAdmin;
  const cardIsFavorite = user ? isFavorite(card._id) : false;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '80px 20px 40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header avec navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: 'rgba(17, 25, 40, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.background = 'rgba(30, 41, 59, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#94a3b8';
              e.target.style.background = 'rgba(17, 25, 40, 0.8)';
            }}
          >
            <ArrowLeft size={20} />
            Retour
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Bouton favori */}
            {user && (
              <button
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: cardIsFavorite 
                    ? 'rgba(239, 68, 68, 0.2)' 
                    : 'rgba(17, 25, 40, 0.8)',
                  border: `1px solid ${cardIsFavorite ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  color: cardIsFavorite ? '#ef4444' : '#94a3b8',
                  cursor: favoriteLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: favoriteLoading ? 0.6 : 1
                }}
                title={cardIsFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart 
                  size={24} 
                  fill={cardIsFavorite ? '#ef4444' : 'none'}
                />
              </button>
            )}

            {/* Actions propriétaire */}
            {canEdit && (
              <>
                <button
                  onClick={handleEdit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '12px',
                    color: '#22c55e',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="Modifier la carte"
                >
                  <Edit size={24} />
                </button>

                <button
                  onClick={handleDelete}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title="Supprimer la carte"
                >
                  <Trash2 size={24} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Contenu principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px'
        }}>
          {/* Informations principales */}
          <div style={{
            background: 'rgba(17, 25, 40, 0.8)',
            borderRadius: '16px',
            padding: '32px',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '24px',
              alignItems: 'start'
            }}>
              {/* Image de la carte */}
              {card.image && (
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}

              {/* Informations textuelles */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: 0
                  }}>
                    {card.title}
                  </h1>
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(102, 126, 234, 0.2)',
                    color: '#667eea',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    #{card.bizNumber}
                  </span>
                </div>

                {card.subtitle && (
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '500',
                    color: '#94a3b8',
                    margin: 0,
                    marginBottom: '16px'
                  }}>
                    {card.subtitle}
                  </h2>
                )}

                <p style={{
                  fontSize: '16px',
                  color: '#e2e8f0',
                  margin: 0,
                  lineHeight: '1.6',
                  maxWidth: '600px'
                }}>
                  {card.description}
                </p>
              </div>
            </div>
          </div>

          {/* Informations de contact et localisation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px'
          }}>
            {/* Contact */}
            <div style={{
              background: 'rgba(17, 25, 40, 0.8)',
              borderRadius: '16px',
              padding: '24px',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0,
                marginBottom: '20px'
              }}>
                Contact
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Téléphone */}
                {card.phone && (
                  <button
                    onClick={() => handleContact('phone', card.phone)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      borderRadius: '8px',
                      color: '#22c55e',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '16px',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <Phone size={20} />
                    <span>{card.phone}</span>
                    <ExternalLink size={16} style={{ marginLeft: 'auto' }} />
                  </button>
                )}

                {/* Email */}
                {card.email && (
                  <button
                    onClick={() => handleContact('email', card.email)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '8px',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '16px',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <Mail size={20} />
                    <span>{card.email}</span>
                    <ExternalLink size={16} style={{ marginLeft: 'auto' }} />
                  </button>
                )}

                {/* Site web */}
                {card.webUrl && (
                  <button
                    onClick={() => handleContact('website', card.webUrl)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                      borderRadius: '8px',
                      color: '#a855f7',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '16px',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <Globe size={20} />
                    <span>{card.webUrl}</span>
                    <ExternalLink size={16} style={{ marginLeft: 'auto' }} />
                  </button>
                )}

                {/* Adresse */}
                {card.address && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: '8px',
                    color: '#f59e0b',
                    fontSize: '16px'
                  }}>
                    <MapPin size={20} />
                    <span>{card.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Carte géographique */}
            {card.location && card.location.lat && card.location.lng && (
              <div style={{
                background: 'rgba(17, 25, 40, 0.8)',
                borderRadius: '16px',
                padding: '24px',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: 0,
                  marginBottom: '20px'
                }}>
                  Localisation
                </h3>

                <Suspense fallback={
                  <div className="glass rounded-2xl p-6 h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-gray-400">Chargement de la carte...</p>
                    </div>
                  </div>
                }>
                  <MapView
                    lat={card.location.lat}
                    lng={card.location.lng}
                    title={card.title}
                    address={card.address}
                    height="300px"
                  />
                </Suspense>
              </div>
            )}
          </div>

          {/* Métadonnées */}
          <div style={{
            background: 'rgba(17, 25, 40, 0.6)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0,
              marginBottom: '16px'
            }}>
              Informations
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Hash size={16} />
                <span><strong>Numéro :</strong> #{card.bizNumber}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} />
                <span><strong>Créée le :</strong> {new Date(card.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              {card.userId?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} />
                  <span><strong>Propriétaire :</strong> {card.userId.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;
