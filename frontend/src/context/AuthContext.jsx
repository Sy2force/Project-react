import { createContext, useContext, useState, useMemo, useEffect } from "react";

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
  // Je récupère l'utilisateur depuis le localStorage au démarrage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Je sauvegarde l'utilisateur dans le localStorage quand il change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    // userData peut être un string (role) ou un objet complet
    if (typeof userData === 'string') {
      setUser({ 
        name: "Shay Acoca", 
        email: "shay@example.com",
        role: userData,
        id: Date.now() // ID temporaire pour les tests
      });
    } else {
      setUser(userData);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
