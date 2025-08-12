import React from 'react';

// VERSION SAFE - toujours rendre quelque chose
export default function RoleGuard({ roles = [], userRole = "guest", fallback = null, children }) {
  if (roles.length && !roles.includes(userRole)) return fallback; // n'affiche pas null total
  return children;
}
