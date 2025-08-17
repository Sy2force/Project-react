// Système de rôles et redirections
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  BUSINESS: 'business'
};

export const roleRedirect = {
  admin: '/admin',
  user: '/dashboard',
  business: '/business'
};

export const rolePermissions = {
  admin: ['admin', 'business', 'user'], // Admin peut accéder à tout
  business: ['business', 'user'], // Business peut accéder à business et user
  user: ['user'] // User ne peut accéder qu'aux pages user
};

export const getRoleRedirect = (role) => {
  return roleRedirect[role] || '/dashboard';
};

export const hasPermission = (userRole, requiredRole) => {
  if (!userRole || !requiredRole) return false;
  return rolePermissions[userRole]?.includes(requiredRole) || false;
};

export const getDefaultRoute = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return '/admin';
    case ROLES.BUSINESS:
      return '/business';
    case ROLES.USER:
    default:
      return '/dashboard';
  }
};
