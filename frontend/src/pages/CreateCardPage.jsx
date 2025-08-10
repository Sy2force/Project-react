import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCards } from '../hooks/useCards';
import CardForm from '../components/cards/CardForm';
import RequireAuth from '../components/RequireAuth';
import toast from 'react-hot-toast';

const CreateCardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCard, loading } = useCards();

  // Vérifier les permissions
  const canCreateCards = user && (user.role === 'business' || user.role === 'admin');

  const handleSubmit = async (cardData) => {
    try {
      const newCard = await createCard(cardData);
      toast.success('Carte créée avec succès !');
      navigate('/my-cards');
    } catch (error) {
      console.error('Erreur création carte:', error);
      // L'erreur est déjà gérée par le hook useCards
    }
  };

  const handleCancel = () => {
    navigate('/my-cards');
  };

  // Guard pour les permissions
  if (!canCreateCards) {
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
            Accès restreint
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            margin: 0,
            marginBottom: '24px'
          }}>
            Vous devez avoir un compte professionnel (business) pour créer des cartes.
            Contactez l'administrateur pour plus d'informations.
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
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth roles={['business', 'admin']}>
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
                <Plus size={32} style={{ color: '#667eea' }} />
                Créer une nouvelle carte
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#94a3b8',
                margin: 0
              }}>
                Remplissez les informations de votre entreprise
              </p>
            </div>
          </div>

          {/* Informations d'aide */}
          <div style={{
            padding: '20px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#3b82f6',
              margin: 0,
              marginBottom: '8px'
            }}>
              💡 Conseils pour créer une carte efficace
            </h3>
            <ul style={{
              color: '#94a3b8',
              fontSize: '14px',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '4px' }}>
                Utilisez un titre clair et professionnel pour votre entreprise
              </li>
              <li style={{ marginBottom: '4px' }}>
                Rédigez une description détaillée de vos services (10-1024 caractères)
              </li>
              <li style={{ marginBottom: '4px' }}>
                Vérifiez que votre numéro de téléphone est au format israélien (ex: 054-1234567)
              </li>
              <li style={{ marginBottom: '4px' }}>
                Ajoutez votre site web avec HTTPS pour plus de crédibilité
              </li>
              <li style={{ marginBottom: '4px' }}>
                Les coordonnées GPS sont optionnelles mais recommandées pour la géolocalisation
              </li>
            </ul>
          </div>

          {/* Formulaire */}
          <CardForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />

          {/* Informations supplémentaires */}
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
              📋 Après la création
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              <div>
                <strong style={{ color: '#e2e8f0' }}>Numéro unique :</strong><br />
                Un numéro business unique sera automatiquement généré pour votre carte
              </div>
              <div>
                <strong style={{ color: '#e2e8f0' }}>Visibilité :</strong><br />
                Votre carte sera visible publiquement et pourra être ajoutée aux favoris
              </div>
              <div>
                <strong style={{ color: '#e2e8f0' }}>Modification :</strong><br />
                Vous pourrez modifier ou supprimer votre carte à tout moment
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default CreateCardPage;
