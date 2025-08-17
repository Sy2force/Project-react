import React, { lazy } from 'react';
import { AdminGuard, BusinessGuard, UserGuard, PublicGuard } from './components/AuthGuard.jsx';

// Lazy loading des pages
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));
// const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
// const BusinessPage = lazy(() => import('./pages/BusinessPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// Configuration des routes avec rôles
export const routes = [
  // Routes publiques
  {
    path: '/',
    element: HomePage,
    guard: PublicGuard,
    roles: [],
    public: true
  },
  {
    path: '/login',
    element: LoginPage,
    guard: PublicGuard,
    roles: [],
    public: true
  },
  {
    path: '/register',
    element: RegisterPage,
    guard: PublicGuard,
    roles: [],
    public: true
  },

  // Routes protégées - User level
  {
    path: '/dashboard',
    element: React.createElement('div', null, 'Dashboard Coming Soon'),
    guard: UserGuard,
    roles: ['user', 'business', 'admin'],
    public: false
  },
  {
    path: '/projects',
    element: ProjectsPage,
    guard: UserGuard,
    roles: ['user', 'business', 'admin'],
    public: false
  },
  {
    path: '/services',
    element: ServicesPage,
    guard: UserGuard,
    roles: ['user', 'business', 'admin'],
    public: false
  },
  {
    path: '/profile',
    element: ProfilePage,
    guard: UserGuard,
    roles: ['user', 'business', 'admin'],
    public: false
  },

  // Routes protégées - Business level
  {
    path: '/business',
    element: React.lazy(() => import('./pages/BusinessPage.jsx')),
    guard: BusinessGuard,
    roles: ['business', 'admin'],
    public: false
  },

  // Routes Admin
  {
    path: '/admin',
    element: AdminPage,
    guard: AdminGuard,
    roles: ['admin'],
    public: false
  },

  // Route 404
  {
    path: '*',
    element: NotFoundPage,
    guard: PublicGuard,
    roles: [],
    public: true
  }
];

// Mapping des rôles vers leurs routes par défaut
export const roleDefaultRoutes = {
  admin: '/admin',
  business: '/business',
  user: '/dashboard'
};

// Fonction pour obtenir les routes accessibles par rôle
export const getAccessibleRoutes = (userRole) => {
  return routes.filter(route => 
    route.public || 
    route.roles.length === 0 || 
    route.roles.includes(userRole)
  );
};

// Fonction pour vérifier si une route est accessible
export const canAccessRoute = (path, userRole) => {
  const route = routes.find(r => r.path === path);
  if (!route) return false;
  
  return route.public || 
         route.roles.length === 0 || 
         route.roles.includes(userRole);
};
