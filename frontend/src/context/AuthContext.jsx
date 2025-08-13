import { createContext, useContext, useState, useMemo, useEffect } from "react";
import authService from '../services/authService';

const AuthContext = createContext(null);

// Définition des rôles et leurs permissions
export const ROLES = {
  USER: 'user',
  BUSINESS: 'business', 
  ADMIN: 'admin'
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  // État utilisateur (ne pas stocker en localStorage)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // [EXAM] Vérifier le token JWT au démarrage avec authService
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = authService.getUserFromToken();
          if (userData) {
            setUser(userData);
          } else {
            // Essayer de récupérer le profil depuis l'API
            const result = await authService.getCurrentUser();
            if (result.success) {
              setUser(result.user);
            }
          }
        }
      } catch (error) {
        console.error('Erreur initialisation auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // [EXAM] Login avec authService complet
  const login = async (email, password, userData = null) => {
    try {
      let result;
      
      if (userData && userData.token && userData.user) {
        // Authentification déjà effectuée, juste stocker les données
        setUser(userData.user);
        return true;
      } else {
        // Appel au service d'authentification
        result = await authService.login(email, password);
        
        if (result.success && result.user) {
          setUser(result.user);
          return true;
        } else {
          console.error('Échec de la connexion:', result.message);
          return false;
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    }
  };

  // [EXAM] Logout avec authService
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      setUser(null);
    }
  };

  // Fonctions utilitaires pour vérifier les permissions
  const hasRole = (requiredRole) => {
    if (!user) return false;
    
    // Hiérarchie des rôles : admin > business > user
    const roleHierarchy = {
      [ROLES.USER]: 1,
      [ROLES.BUSINESS]: 2,
      [ROLES.ADMIN]: 3
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const canCreateCards = () => hasRole(ROLES.BUSINESS);
  const canManageUsers = () => hasRole(ROLES.ADMIN);
  const canEditCard = (cardOwnerId) => {
    if (!user) return false;
    return user.role === ROLES.ADMIN || user.id === cardOwnerId;
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === ROLES.ADMIN,
    isBusiness: user?.role === ROLES.BUSINESS || user?.role === ROLES.ADMIN,
    isVIP: user?.role === ROLES.BUSINESS || user?.role === ROLES.ADMIN,
    isUser: !!user,
    hasRole,
    canCreateCards,
    canManageUsers,
    canEditCard,
    ROLES
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
