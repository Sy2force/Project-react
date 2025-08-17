import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { hasPermission, getRoleRedirect } from '../utils/roles.js';

const AuthGuard = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Affichage de chargement pendant la vérification auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white/70">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  // Redirection vers login si non authentifié et auth requise
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si authentifié mais pas de rôles spécifiés, autoriser l'accès
  if (isAuthenticated && allowedRoles.length === 0) {
    return children;
  }

  // Vérification des permissions par rôle
  if (isAuthenticated && allowedRoles.length > 0) {
    const userRole = user?.role;
    const hasAccess = allowedRoles.some(role => hasPermission(userRole, role));

    if (!hasAccess) {
      // Rediriger vers la page par défaut du rôle utilisateur
      const defaultRoute = getRoleRedirect(userRole);
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return children;
};

// Composant pour pages publiques (pas d'auth requise)
export const PublicGuard = ({ children }) => {
  return <AuthGuard requireAuth={false}>{children}</AuthGuard>;
};

// Composants spécialisés pour chaque rôle
export const AdminGuard = ({ children }) => {
  return <AuthGuard allowedRoles={['admin']}>{children}</AuthGuard>;
};

export const BusinessGuard = ({ children }) => {
  return <AuthGuard allowedRoles={['admin', 'business']}>{children}</AuthGuard>;
};

export const UserGuard = ({ children }) => {
  return <AuthGuard allowedRoles={['admin', 'business', 'user']}>{children}</AuthGuard>;
};

export default AuthGuard;
