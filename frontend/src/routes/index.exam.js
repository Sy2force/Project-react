// [EXAM] Configuration des routes avec code-splitting et lazy loading
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/ui/Loading';

// [EXAM] Lazy loading des pages pour optimisation des performances
const HomeUltraModern = lazy(() => import('../pages/HomeUltraModern'));
const AboutUltraModern = lazy(() => import('../pages/AboutUltraModern'));
const ProjectsUltraModern = lazy(() => import('../pages/ProjectsUltraModern'));
const BlogUltraModern = lazy(() => import('../pages/BlogUltraModern'));
const ContactUltraModern = lazy(() => import('../pages/ContactUltraModern'));

// [EXAM] Pages d'authentification
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));

// [EXAM] Pages utilisateur
const Favorites = lazy(() => import('../pages/Favorites'));
const Profile = lazy(() => import('../pages/Profile'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

// [EXAM] Pages spécifiques
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * [EXAM] Composant wrapper pour Suspense avec fallback de chargement
 */
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
);

/**
 * [EXAM] Configuration des routes avec protection et optimisation
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* [EXAM] Routes publiques d'authentification */}
      <Route 
        path="/login" 
        element={
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        } 
      />
      <Route 
        path="/register" 
        element={
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <SuspenseWrapper>
            <ForgotPassword />
          </SuspenseWrapper>
        } 
      />

      {/* [EXAM] Routes protégées principales */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <HomeUltraModern />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/about" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <AboutUltraModern />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/projects" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <ProjectsUltraModern />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/projects/:id" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <ProjectDetail />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/blog" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <BlogUltraModern />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/blog/:id" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <BlogPost />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/contact" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <ContactUltraModern />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />

      {/* [EXAM] Routes utilisateur protégées */}
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <Favorites />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <SuspenseWrapper>
              <Profile />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />

      {/* [EXAM] Routes admin/business */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole={['admin', 'business']}>
            <SuspenseWrapper>
              <Dashboard />
            </SuspenseWrapper>
          </ProtectedRoute>
        } 
      />

      {/* [EXAM] Redirections et gestion 404 */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route 
        path="*" 
        element={
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        } 
      />
    </Routes>
  );
};

/**
 * [EXAM] Configuration des préchargements pour les routes critiques
 */
export const preloadCriticalRoutes = () => {
  // [EXAM] Préchargement des pages les plus visitées
  const criticalRoutes = [
    () => import('../pages/HomeUltraModern'),
    () => import('../pages/ProjectsUltraModern'),
    () => import('../pages/AboutUltraModern')
  ];

  // [EXAM] Préchargement après un délai pour éviter de bloquer le rendu initial
  setTimeout(() => {
    criticalRoutes.forEach(importFn => {
      importFn().catch(error => {
        console.warn('[EXAM] Erreur lors du préchargement:', error);
      });
    });
  }, 2000);
};

/**
 * [EXAM] Métadonnées des routes pour le SEO et la navigation
 */
export const routeMetadata = {
  '/': {
    title: 'Accueil',
    description: 'Portfolio de Shay Acoca - Développeur Full Stack passionné',
    keywords: 'développeur, react, nodejs, portfolio, shay acoca',
    priority: 1.0,
    changefreq: 'weekly'
  },
  '/about': {
    title: 'À Propos',
    description: 'Découvrez mon parcours, mes compétences et ma passion pour le développement',
    keywords: 'à propos, compétences, expérience, développeur',
    priority: 0.8,
    changefreq: 'monthly'
  },
  '/projects': {
    title: 'Mes Projets',
    description: 'Découvrez mes réalisations et projets de développement web et mobile',
    keywords: 'projets, réalisations, développement, applications',
    priority: 0.9,
    changefreq: 'weekly'
  },
  '/blog': {
    title: 'Blog',
    description: 'Articles et tutoriels sur le développement web moderne',
    keywords: 'blog, articles, tutoriels, développement, tech',
    priority: 0.7,
    changefreq: 'daily'
  },
  '/contact': {
    title: 'Contact',
    description: 'Contactez-moi pour vos projets de développement web',
    keywords: 'contact, devis, projet, développement',
    priority: 0.8,
    changefreq: 'monthly'
  },
  '/favorites': {
    title: 'Mes Favoris',
    description: 'Mes projets et articles favoris',
    keywords: 'favoris, projets, articles',
    priority: 0.5,
    changefreq: 'weekly',
    noIndex: true
  },
  '/profile': {
    title: 'Mon Profil',
    description: 'Gestion de mon profil utilisateur',
    keywords: 'profil, compte, paramètres',
    priority: 0.3,
    changefreq: 'monthly',
    noIndex: true
  },
  '/dashboard': {
    title: 'Tableau de Bord',
    description: 'Tableau de bord administrateur',
    keywords: 'dashboard, admin, gestion',
    priority: 0.3,
    changefreq: 'weekly',
    noIndex: true
  }
};

/**
 * [EXAM] Génération du sitemap basé sur les métadonnées
 */
export const generateSitemap = () => {
  const baseUrl = 'https://shayacoca.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  Object.entries(routeMetadata).forEach(([path, meta]) => {
    if (!meta.noIndex) {
      sitemap += `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
    }
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export default AppRoutes;
