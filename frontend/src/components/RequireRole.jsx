import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, Shield, ArrowLeft } from 'lucide-react';

/**
 * Composant RBAC strict pour vérifier les rôles utilisateur
 * Selon les exigences PDF strictes
 */
const RequireRole = ({ 
  children, 
  roles = [], 
  requireAuth = true,
  fallbackPath = '/intro',
  showErrorPage = true 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#ffffff',
          fontSize: '18px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Vérification des permissions...
        </div>
      </div>
    );
  }

  // Check authentication first
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check roles if specified
  if (roles.length > 0 && user) {
    const hasRequiredRole = roles.includes(user.role);
    
    if (!hasRequiredRole) {
      if (showErrorPage) {
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
              maxWidth: '600px',
              textAlign: 'center',
              padding: '40px',
              background: 'rgba(17, 25, 40, 0.8)',
              borderRadius: '16px',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <AlertCircle size={64} style={{ color: '#ef4444', marginBottom: '24px' }} />
              
              <h1 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#ffffff',
                margin: 0,
                marginBottom: '16px'
              }}>
                Accès Restreint
              </h1>
              
              <p style={{
                fontSize: '18px',
                color: '#94a3b8',
                margin: 0,
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>

              {/* Role information */}
              <div style={{
                padding: '20px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Shield size={20} style={{ color: '#ef4444' }} />
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ef4444'
                  }}>
                    Permissions Requises
                  </span>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px',
                  fontSize: '14px'
                }}>
                  <div>
                    <strong style={{ color: '#e2e8f0' }}>Votre rôle :</strong><br />
                    <span style={{ 
                      color: '#94a3b8',
                      padding: '2px 8px',
                      background: 'rgba(71, 85, 105, 0.3)',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {user?.role || 'Non défini'}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#e2e8f0' }}>Rôles requis :</strong><br />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {roles.map((role) => (
                        <span 
                          key={role}
                          style={{ 
                            color: '#22c55e',
                            padding: '2px 8px',
                            background: 'rgba(34, 197, 94, 0.2)',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Help text */}
              <div style={{
                padding: '16px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#3b82f6',
                  margin: 0,
                  marginBottom: '8px'
                }}>
                  💡 Comment obtenir l'accès ?
                </h3>
                <ul style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  margin: 0,
                  paddingLeft: '16px',
                  lineHeight: '1.5'
                }}>
                  {roles.includes('business') && (
                    <li>Pour un compte <strong>business</strong> : contactez l'administrateur pour une mise à niveau</li>
                  )}
                  {roles.includes('admin') && (
                    <li>Pour un accès <strong>admin</strong> : seuls les administrateurs système peuvent accéder</li>
                  )}
                  <li>Vérifiez que vous êtes connecté avec le bon compte</li>
                  <li>Contactez le support si vous pensez qu'il y a une erreur</li>
                </ul>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => window.history.back()}
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
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(71, 85, 105, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(71, 85, 105, 0.8)';
                  }}
                >
                  <ArrowLeft size={20} />
                  Retour
                </button>

                <button
                  onClick={() => window.location.href = '/contact'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Contacter le Support
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      // Redirect fallback
      return <Navigate to={fallbackPath} state={{ from: location, reason: 'insufficient_role' }} replace />;
    }
  }

  // All checks passed, render children
  return children;
};

/**
 * Hook pour vérifier les rôles dans les composants
 */
export const useRoleCheck = () => {
  const { user, hasRole, canCreateCards } = useAuth();
  
  return {
    hasRole,
    canCreateCards,
    isUser: () => hasRole('user'),
    isBusiness: () => hasRole('business'),
    isAdmin: () => hasRole('admin'),
    hasAnyRole: (roles) => roles.some(role => hasRole(role)),
    getCurrentRole: () => user?.role || null
  };
};

export default RequireRole;
