/**
 * Utilitaires de préchargement PROMPT 1
 * export const preload = (imp)=>imp(); + usage onMouseEnter
 */

// Préchargement des imports dynamiques
export const preload = (importFunction) => {
  return importFunction();
}

// Hook pour précharger au survol
export const usePreload = (importFunction) => {
  const handleMouseEnter = () => {
    preload(importFunction);
  }

  return { onMouseEnter: handleMouseEnter };
}

// Préchargement des routes communes
export const preloadRoutes = {
  home: () => import('../pages/HomePageSimple'),
  auth: () => import('../pages/AuthPage'),
  projects: () => import('../pages/ProjectsPage'),
  cards: () => import('../pages/CardsPage'),
  contact: () => import('../pages/ContactPageConnected'),
  dashboard: () => import('../pages/AdminDashboard')
}

export default { preload, usePreload, preloadRoutes }
