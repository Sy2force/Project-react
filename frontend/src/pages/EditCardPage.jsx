import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCards } from '../hooks/useCards';
import { cardsAPI } from '../api/cards';
import CardForm from '../components/cards/CardForm';
import LoadingSpinner from '../components/LoadingSpinner';
import RequireAuth from '../components/RequireAuth';
import toast from 'react-hot-toast';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateCard, loading: updateLoading } = useCards();
  
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger la carte à modifier
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
        
        // Vérifier les permissions
        const isOwner = response.data.userId && (
          response.data.userId._id === user?.id || 
          response.data.userId === user?.id
        );
        const isAdmin = user?.role === 'admin';
        
        if (!isOwner && !isAdmin) {
          setError('Vous n\'avez pas les permissions pour modifier cette carte');
          return;
        }
        
      } catch (err) {
        console.error('Erreur chargement carte:', err);
        setError(err.message || 'Erreur lors du chargement de la carte');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id, user]);

  const handleSubmit = async (cardData) => {
    try {
      await updateCard(id, cardData);
      toast.success('Carte mise à jour avec succès !');
      navigate('/my-cards');
    } catch (error) {
      console.error('Erreur mise à jour carte:', error);
      // L'erreur est déjà gérée par le hook useCards
    }
  };

  const handleCancel = () => {
    navigate('/my-cards');
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
            Erreur
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
            onClick={() => navigate('/my-cards')}
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
            Retour à mes cartes
          </button>
        </div>
      </div>
    );
  }

  // Card not found
  if (!card) {
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
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
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
            La carte que vous cherchez à modifier n'existe pas ou a été supprimée.
          </p>
          <button
            onClick={() => navigate('/my-cards')}
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
            Retour à mes cartes
          </button>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '80px 20px 40px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <button
              onClick={handleCancel}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                background: 'rgba(17, 25, 40, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(30, 41, 59, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#94a3b8';
                e.target.style.background = 'rgba(17, 25, 40, 0.8)';
              }}
              title="Retour à mes cartes"
            >
              <ArrowLeft size={24} />
            </button>

            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#ffffff',
                margin: 0,
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Edit size={32} style={{ color: '#667eea' }} />
                Modifier la carte
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#94a3b8',
                margin: 0
              }}>
                {card.title} - #{card.bizNumber}
              </p>
            </div>
          </div>

          {/* Informations d'aide */}
          <div style={{
            padding: '20px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#22c55e',
              margin: 0,
              marginBottom: '8px'
            }}>
              ✏️ Modification de carte
            </h3>
            <ul style={{
              color: '#94a3b8',
              fontSize: '14px',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '4px' }}>
                Vous pouvez modifier tous les champs sauf le numéro business (#{card.bizNumber})
              </li>
              <li style={{ marginBottom: '4px' }}>
                Les modifications seront visibles immédiatement après sauvegarde
              </li>
              <li style={{ marginBottom: '4px' }}>
                Assurez-vous que toutes les informations restent exactes et à jour
              </li>
            </ul>
          </div>

          {/* Formulaire */}
          <CardForm
            mode="edit"
            initialData={card}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={updateLoading}
          />

          {/* Informations sur la carte */}
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
              📊 Informations de la carte
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              <div>
                <strong style={{ color: '#e2e8f0' }}>Numéro business :</strong><br />
                #{card.bizNumber}
              </div>
              <div>
                <strong style={{ color: '#e2e8f0' }}>Créée le :</strong><br />
                {new Date(card.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div>
                <strong style={{ color: '#e2e8f0' }}>Propriétaire :</strong><br />
                {card.userId?.email || 'Non spécifié'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default EditCardPage;
