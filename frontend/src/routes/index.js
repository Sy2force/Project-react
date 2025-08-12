// Configuration des routes de l'application
export const routes = {
  // Routes publiques
  home: '/',
  projects: '/projects',
  projectDetail: '/projects/:id',
  blog: '/blog',
  about: '/about',
  contact: '/contact',
  login: '/login',
  register: '/register',
  
  // Routes protégées (utilisateurs connectés)
  dashboard: '/dashboard',
  profile: '/profile',
  profileEdit: '/profile/edit',
  favorites: '/favorites',
  
  // Routes protégées (business/admin)
  myCards: '/my-cards',
  
  // Routes d'administration
  admin: '/admin',
  adminUsers: '/admin/users',
  adminProjects: '/admin/projects',
  adminSettings: '/admin/settings'
};

// Utilitaire pour générer des URLs avec paramètres
export const generatePath = (route, params = {}) => {
  let path = route;
  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key]);
  });
  return path;
};

// Vérification des permissions pour les routes
export const routePermissions = {
  [routes.dashboard]: { requireAuth: true },
  [routes.profile]: { requireAuth: true },
  [routes.profileEdit]: { requireAuth: true },
  [routes.favorites]: { requireAuth: true },
  [routes.myCards]: { requireAuth: true, requiredRole: 'business' },
  [routes.admin]: { requireAuth: true, requiredRole: 'admin' },
  [routes.adminUsers]: { requireAuth: true, requiredRole: 'admin' },
  [routes.adminProjects]: { requireAuth: true, requiredRole: 'admin' },
  [routes.adminSettings]: { requireAuth: true, requiredRole: 'admin' }
};

export default routes;
