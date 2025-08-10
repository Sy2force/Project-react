import { useState } from 'react';
import { Eye, Edit, Trash2, Heart, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';

const CardItem = ({ 
  card, 
  onView, 
  onEdit, 
  onDelete, 
  showActions = true,
  variant = 'grid' // 'grid' ou 'list'
}) => {
  const { user } = useAuth();
  const { toggleFavorite } = useFavorites();
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const isOwner = user && card.userId && (card.userId._id === user.id || card.userId === user.id);
  const isAdmin = user?.role === 'admin';
  const canEdit = isOwner || isAdmin;

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    if (!user) return;

    setIsFavoriteLoading(true);
    try {
      await toggleFavorite(card._id);
    } catch (error) {
      console.error('Erreur toggle favori:', error);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(card);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(card._id);
  };

  const handleView = () => {
    onView?.(card._id);
  };

  if (variant === 'list') {
    return (
      <div
        onClick={handleView}
        style={{
          display: 'flex',
          padding: '16px',
          background: 'rgba(17, 25, 40, 0.8)',
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          gap: '16px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        {card.image && (
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0
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

        {/* Contenu */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0,
                marginBottom: '4px'
              }}>
                {card.title}
              </h3>
              {card.subtitle && (
                <p style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                  margin: 0
                }}>
                  {card.subtitle}
                </p>
              )}
            </div>
            <span style={{
              fontSize: '12px',
              color: '#64748b',
              background: 'rgba(30, 41, 59, 0.8)',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              #{card.bizNumber}
            </span>
          </div>

          <p style={{
            fontSize: '14px',
            color: '#cbd5e1',
            margin: 0,
            marginBottom: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {card.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={12} />
              {card.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={12} />
              {card.email}
            </span>
            {card.address && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} />
                {card.address.length > 30 ? `${card.address.substring(0, 30)}...` : card.address}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            {user && (
              <button
                onClick={handleToggleFavorite}
                disabled={isFavoriteLoading}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ef4444',
                  padding: '4px'
                }}
                title="Ajouter aux favoris"
              >
                <Heart size={16} fill={isFavoriteLoading ? '#666' : 'none'} />
              </button>
            )}
            
            {canEdit && (
              <>
                <button
                  onClick={handleEdit}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#3b82f6',
                    padding: '4px'
                  }}
                  title="Modifier"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444',
                    padding: '4px'
                  }}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  // Variant grid (par défaut)
  return (
    <div
      onClick={handleView}
      style={{
        background: 'rgba(17, 25, 40, 0.8)',
        borderRadius: '16px',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{
        height: '200px',
        background: card.image 
          ? `url(${card.image})` 
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {/* Badge numéro business */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#ffffff',
          padding: '4px 8px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          #{card.bizNumber}
        </div>

        {/* Actions overlay */}
        {showActions && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            gap: '8px'
          }}>
            {user && (
              <button
                onClick={handleToggleFavorite}
                disabled={isFavoriteLoading}
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ef4444',
                  transition: 'all 0.2s ease'
                }}
                title="Ajouter aux favoris"
              >
                <Heart size={16} fill={isFavoriteLoading ? '#666' : 'none'} />
              </button>
            )}
          </div>
        )}

        {/* Actions propriétaire */}
        {showActions && canEdit && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={handleEdit}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#3b82f6'
              }}
              title="Modifier"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ef4444'
              }}
              title="Supprimer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '12px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            margin: 0,
            marginBottom: '4px'
          }}>
            {card.title}
          </h3>
          {card.subtitle && (
            <p style={{
              fontSize: '14px',
              color: '#94a3b8',
              margin: 0
            }}>
              {card.subtitle}
            </p>
          )}
        </div>

        <p style={{
          fontSize: '14px',
          color: '#cbd5e1',
          margin: 0,
          marginBottom: '16px',
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {card.description}
        </p>

        {/* Informations de contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={14} />
            <span>{card.phone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={14} />
            <span style={{ wordBreak: 'break-all' }}>{card.email}</span>
          </div>
          {card.webUrl && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={14} />
              <span style={{ wordBreak: 'break-all' }}>{card.webUrl}</span>
            </div>
          )}
          {card.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} />
              <span>{card.address}</span>
            </div>
          )}
        </div>

        {/* Bouton d'action principal */}
        <button
          onClick={handleView}
          style={{
            marginTop: '16px',
            padding: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Eye size={16} />
          Voir les détails
        </button>
      </div>
    </div>
  );
};

export default CardItem;
