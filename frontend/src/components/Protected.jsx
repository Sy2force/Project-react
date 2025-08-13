import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const LoadingSpinner = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #7c3aed 50%, #1e1b4b 75%, #0f0f23 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, sans-serif'
  }}>
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '40px',
      textAlign: 'center',
      color: 'white'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid rgba(59, 130, 246, 0.3)',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>Chargement...</p>
    </div>
  </div>
);

const AccessDenied = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #7c3aed 50%, #1e1b4b 75%, #0f0f23 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '20px'
  }}>
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '40px',
      textAlign: 'center',
      color: 'white',
      maxWidth: '500px'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
        fontSize: '32px'
      }}>
        🚫
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Accès Refusé
      </h2>
      <p style={{ color: '#d1d5db', marginBottom: '24px', lineHeight: '1.6' }}>
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <a 
        href="/"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'all 0.3s ease'
        }}
      >
        Retour à l'accueil
      </a>
    </div>
  </div>
);

export default function Protected({ roles, children }) {
  const { user, loading } = useAuth();

  // Affichage du spinner pendant le chargement
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirection vers login si non connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Vérification des rôles si spécifiés
  if (roles?.length && !roles.includes(user.role)) {
    return <AccessDenied />;
  }

  // Affichage du contenu protégé
  return children;
}
