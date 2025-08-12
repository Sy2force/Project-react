import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';

const AuthGuard = ({ children, requiredRole = null, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading, checkAuthStatus } = useAuth();
  const location = useLocation();

  // Vérifier le statut d'authentification au montage
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Affichage du loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Vérification de l'authentification...</p>
        </motion.div>
      </div>
    );
  }

  // Redirection vers login si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérification des rôles si spécifiés
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-4">Accès Refusé</h2>
          <p className="text-gray-300 mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            <br />
            <span className="text-sm text-gray-400 mt-2 block">
              Rôle requis : <span className="font-semibold text-blue-400">{requiredRole}</span>
              <br />
              Votre rôle : <span className="font-semibold text-yellow-400">{user?.role || 'non défini'}</span>
            </span>
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Retour
            </button>
            <button
              onClick={() => window.location.href = '/home'}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Accueil
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Vérification des rôles autorisés (liste)
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-orange-400" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-4">Accès Limité</h2>
          <p className="text-gray-300 mb-6">
            Cette section est réservée aux utilisateurs avec des privilèges spéciaux.
            <br />
            <span className="text-sm text-gray-400 mt-2 block">
              Rôles autorisés : <span className="font-semibold text-blue-400">{allowedRoles.join(', ')}</span>
              <br />
              Votre rôle : <span className="font-semibold text-yellow-400">{user?.role || 'non défini'}</span>
            </span>
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Retour
            </button>
            <button
              onClick={() => window.location.href = '/home'}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Accueil
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Accès autorisé - afficher le contenu
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default AuthGuard;
