// [EXAM] App.jsx complètement fonctionnel avec toutes les pages connectées
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayoutComplete from "./layouts/MainLayoutComplete.jsx";

// Pages d'authentification complètes
import LoginComplete from "./pages/LoginComplete.jsx";
import RegisterComplete from "./pages/RegisterComplete.jsx";
import ForgotPasswordComplete from "./pages/ForgotPasswordComplete.jsx";

// Pages principales complètes
import HomeComplete from "./pages/HomeComplete.jsx";
import ProjectsComplete from "./pages/ProjectsComplete.jsx";
import AboutOptimized from "./pages/AboutOptimized.jsx";
import ContactComplete from "./pages/ContactComplete.jsx";
import BlogComplete from "./pages/BlogComplete.jsx";
import ServicesOptimized from "./pages/ServicesOptimized.jsx";

// Pages utilisateur
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Favorites from "./pages/Favorites.jsx";
import MyCards from "./pages/MyCards.jsx";

// Pages spéciales
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Showcase from "./pages/Showcase.jsx";
import NotFound from "./pages/NotFound.jsx";

// Composants système
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Toaster } from 'react-hot-toast';

function AppComplete() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              {/* Toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: '#fff',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />

              <Routes>
                {/* ========== ROUTES PUBLIQUES (Authentification uniquement) ========== */}
                <Route path="/login" element={<LoginComplete />} />
                <Route path="/register" element={<RegisterComplete />} />
                <Route path="/forgot-password" element={<ForgotPasswordComplete />} />
                
                {/* Pages d'aide publiques */}
                <Route path="/help" element={
                  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h1 className="text-4xl font-bold mb-4">Centre d'aide</h1>
                      <p className="text-gray-300 mb-8">Besoin d'assistance ? Contactez-nous.</p>
                      <a href="/contact" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-colors">
                        Nous contacter
                      </a>
                    </div>
                  </div>
                } />
                
                <Route path="/privacy" element={
                  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto p-8 text-white">
                      <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
                      <div className="space-y-6 text-gray-300">
                        <p>Chez Shay Acoca, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles.</p>
                        <h2 className="text-2xl font-semibold text-white">Collecte des données</h2>
                        <p>Nous collectons uniquement les informations nécessaires au fonctionnement de nos services.</p>
                        <h2 className="text-2xl font-semibold text-white">Utilisation des données</h2>
                        <p>Vos données sont utilisées exclusivement pour améliorer votre expérience utilisateur.</p>
                      </div>
                    </div>
                  </div>
                } />
                
                <Route path="/terms" element={
                  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto p-8 text-white">
                      <h1 className="text-4xl font-bold mb-8">Conditions d'utilisation</h1>
                      <div className="space-y-6 text-gray-300">
                        <p>En utilisant nos services, vous acceptez les présentes conditions d'utilisation.</p>
                        <h2 className="text-2xl font-semibold text-white">Utilisation du service</h2>
                        <p>Vous vous engagez à utiliser nos services de manière responsable et légale.</p>
                        <h2 className="text-2xl font-semibold text-white">Propriété intellectuelle</h2>
                        <p>Tous les contenus présents sur cette plateforme sont protégés par les droits d'auteur.</p>
                      </div>
                    </div>
                  </div>
                } />

                {/* ========== TOUTES LES AUTRES ROUTES SONT PROTÉGÉES ========== */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <MainLayoutComplete />
                  </ProtectedRoute>
                }>
                  {/* Page d'accueil */}
                  <Route index element={<HomeComplete />} />
                  
                  {/* Pages principales */}
                  <Route path="projects" element={<ProjectsComplete />} />
                  <Route path="projects/:id" element={<ProjectDetail />} />
                  <Route path="about" element={<AboutOptimized />} />
                  <Route path="contact" element={<ContactComplete />} />
                  <Route path="blog" element={<BlogComplete />} />
                  <Route path="services" element={<ServicesOptimized />} />
                  <Route path="showcase" element={<Showcase />} />
                  
                  {/* Dashboard et profil utilisateur */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="profile/edit" element={<EditProfile />} />
                  <Route path="favorites" element={<Favorites />} />
                  
                  {/* Routes spécifiques business/admin avec protection de rôle */}
                  <Route 
                    path="my-cards" 
                    element={
                      <ProtectedRoute requiredRole="business">
                        <MyCards />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Routes admin uniquement */}
                  <Route 
                    path="admin" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <div className="p-8">
                          <h1 className="text-3xl font-bold text-white mb-6">Administration</h1>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                              <h2 className="text-xl font-semibold text-white mb-4">Gestion des utilisateurs</h2>
                              <p className="text-gray-300 mb-4">Gérer les comptes utilisateurs</p>
                              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors">
                                Accéder
                              </button>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                              <h2 className="text-xl font-semibold text-white mb-4">Gestion du contenu</h2>
                              <p className="text-gray-300 mb-4">Modérer les projets et articles</p>
                              <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-white transition-colors">
                                Accéder
                              </button>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                              <h2 className="text-xl font-semibold text-white mb-4">Statistiques</h2>
                              <p className="text-gray-300 mb-4">Voir les analytics</p>
                              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-colors">
                                Accéder
                              </button>
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Route 404 - doit être en dernier */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default AppComplete;
