// [EXAM] App.jsx optimisé avec structure unifiée et design cohérent
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MainLayoutOptimized from "./layouts/MainLayoutOptimized.jsx";

// Pages d'authentification
import LoginComplete from "./pages/LoginComplete.jsx";
import RegisterComplete from "./pages/RegisterComplete.jsx";
import ForgotPasswordComplete from "./pages/ForgotPasswordComplete.jsx";

// Pages principales optimisées
import HomeOptimized from "./pages/HomeOptimized.jsx";
import ProjectsOptimized from "./pages/ProjectsOptimized.jsx";
import AboutOptimized from "./pages/AboutOptimized.jsx";
import ContactOptimized from "./pages/ContactOptimized.jsx";
import BlogOptimized from "./pages/BlogOptimized.jsx";
import ServicesOptimized from "./pages/ServicesOptimized.jsx";

// Pages modernes
import HomeModern from "./pages/HomeModern.jsx";
import ProjectsModern from "./pages/ProjectsModern.jsx";
import AboutModern from "./pages/AboutModern.jsx";
import ContactModern from "./pages/ContactModern.jsx";
import BlogModern from "./pages/BlogModern.jsx";
import ServicesModern from "./pages/ServicesModern.jsx";

// Pages complètes
import HomeComplete from "./pages/HomeComplete.jsx";
import ProjectsComplete from "./pages/ProjectsComplete.jsx";
import AboutComplete from "./pages/AboutComplete.jsx";
import ContactComplete from "./pages/ContactComplete.jsx";
import BlogComplete from "./pages/BlogComplete.jsx";
import ServicesComplete from "./pages/ServicesComplete.jsx";

// Pages spécialisées
import HomeSimple from "./pages/HomeSimple.jsx";
import GalleryComplete from "./pages/GalleryComplete.jsx";
import PortfolioComplete from "./pages/PortfolioComplete.jsx";
import TestimonialsComplete from "./pages/TestimonialsComplete.jsx";
import ProfileComplete from "./pages/ProfileComplete.jsx";
import FavoritesComplete from "./pages/FavoritesComplete.jsx";
import DashboardComplete from "./pages/DashboardComplete.jsx";
import DashboardModern from "./pages/DashboardModern.jsx";
import Showcase from "./pages/Showcase.jsx";

// Pages nouvelles
import PricingComplete from "./pages/PricingComplete.jsx";
import Skills from "./pages/Skills.jsx";
import FAQ from "./pages/FAQ.jsx";
import Privacy from "./pages/Privacy.jsx";

// Pages utilisateur
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Favorites from "./pages/Favorites.jsx";
import MyCards from "./pages/MyCards.jsx";

// Pages spéciales
import ProjectDetail from "./pages/ProjectDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

// Composants système
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function AppOptimized() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* ========== ROUTES PUBLIQUES (Authentification uniquement) ========== */}
                <Route path="/login" element={<LoginComplete />} />
                <Route path="/register" element={<RegisterComplete />} />
                <Route path="/forgot-password" element={<ForgotPasswordComplete />} />
                
                {/* Pages d'aide publiques */}
                <Route path="/help" element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center text-white max-w-2xl mx-auto px-6">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Centre d'aide
                        </h1>
                        <p className="text-gray-300 mb-8 text-lg">
                          Besoin d'assistance ? Notre équipe est là pour vous aider.
                        </p>
                        <div className="space-y-4">
                          <a 
                            href="/contact" 
                            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            Nous contacter
                          </a>
                          <div className="text-sm text-gray-400">
                            <p>📧 support@shayacoca.com</p>
                            <p>📞 +33 6 12 34 56 78</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                } />
                
                <Route path="/privacy" element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
                    <div className="max-w-4xl mx-auto px-6">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white">
                        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Politique de confidentialité
                        </h1>
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                          <p className="text-lg">
                            Chez Shay Acoca, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles.
                          </p>
                          
                          <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Collecte des données</h2>
                            <p>
                              Nous collectons uniquement les informations nécessaires pour vous fournir nos services : 
                              nom, email, et préférences de communication.
                            </p>
                          </div>
                          
                          <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Utilisation des données</h2>
                            <p>
                              Vos données sont utilisées exclusivement pour améliorer votre expérience utilisateur 
                              et vous tenir informé de nos services.
                            </p>
                          </div>
                          
                          <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Protection</h2>
                            <p>
                              Nous utilisons des mesures de sécurité avancées pour protéger vos informations 
                              contre tout accès non autorisé.
                            </p>
                          </div>
                          
                          <div className="pt-6 border-t border-white/10">
                            <p className="text-sm text-gray-400">
                              Dernière mise à jour : Décembre 2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                } />
                
                <Route path="/terms" element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
                    <div className="max-w-4xl mx-auto px-6">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white">
                        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Conditions d'utilisation
                        </h1>
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                          <p className="text-lg">
                            En utilisant nos services, vous acceptez les conditions suivantes :
                          </p>
                          
                          <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Utilisation du service</h2>
                            <p>
                              Nos services sont destinés à un usage professionnel et personnel dans le respect 
                              des lois en vigueur.
                            </p>
                          </div>
                          
                          <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Propriété intellectuelle</h2>
                            <p>
                              Tous les contenus et créations restent la propriété de leurs auteurs respectifs.
                            </p>
                          </div>
                          
                          <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Responsabilités</h2>
                            <p>
                              Nous nous engageons à fournir des services de qualité tout en déclinant 
                              toute responsabilité en cas d'usage inapproprié.
                            </p>
                          </div>
                          
                          <div className="pt-6 border-t border-white/10">
                            <p className="text-sm text-gray-400">
                              Dernière mise à jour : Décembre 2024
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                } />

                {/* ========== ROUTES PROTÉGÉES (Utilisateurs connectés uniquement) ========== */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <MainLayoutOptimized />
                  </ProtectedRoute>
                }>
                  {/* Page d'accueil */}
                  <Route index element={<HomeOptimized />} />
                  
                  {/* Pages d'accueil alternatives */}
                  <Route path="home-modern" element={<HomeModern />} />
                  <Route path="home-complete" element={<HomeComplete />} />
                  <Route path="home-simple" element={<HomeSimple />} />
                  
                  {/* Pages Portfolio/Projets */}
                  <Route path="portfolio" element={<ProjectsOptimized />} />
                  <Route path="projects" element={<ProjectsOptimized />} />
                  <Route path="projects-modern" element={<ProjectsModern />} />
                  <Route path="projects-complete" element={<ProjectsComplete />} />
                  <Route path="projects/:id" element={<ProjectDetail />} />
                  <Route path="project-detail" element={<ProjectDetail />} />
                  <Route path="portfolio-complete" element={<PortfolioComplete />} />
                  
                  {/* Pages Services */}
                  <Route path="services" element={<ServicesOptimized />} />
                  <Route path="services-modern" element={<ServicesModern />} />
                  <Route path="services-complete" element={<ServicesComplete />} />
                  
                  {/* Pages À Propos */}
                  <Route path="about" element={<AboutOptimized />} />
                  <Route path="about-modern" element={<AboutModern />} />
                  <Route path="about-complete" element={<AboutComplete />} />
                  
                  {/* Pages Blog */}
                  <Route path="blog" element={<BlogOptimized />} />
                  <Route path="blog-modern" element={<BlogModern />} />
                  <Route path="blog-complete" element={<BlogComplete />} />
                  
                  {/* Pages Contact */}
                  <Route path="contact" element={<ContactOptimized />} />
                  <Route path="contact-modern" element={<ContactModern />} />
                  <Route path="contact-complete" element={<ContactComplete />} />
                  
                  {/* Pages Galerie */}
                  <Route path="gallery-complete" element={<GalleryComplete />} />
                  <Route path="showcase" element={<Showcase />} />
                  
                  {/* Pages Témoignages */}
                  <Route path="testimonials-complete" element={<TestimonialsComplete />} />
                  <Route path="testimonials" element={<TestimonialsComplete />} />
                  
                  {/* Pages supplémentaires */}
                  <Route path="pricing" element={<PricingComplete />} />
                  <Route path="pricing-complete" element={<PricingComplete />} />
                  <Route path="skills" element={<Skills />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="privacy" element={<Privacy />} />
                  
                  {/* Dashboard et profil utilisateur */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dashboard-modern" element={<DashboardModern />} />
                  <Route path="dashboard-complete" element={<DashboardComplete />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="profile-complete" element={<ProfileComplete />} />
                  <Route path="profile/edit" element={<EditProfile />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="favorites-complete" element={<FavoritesComplete />} />
                  
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
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                          <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-white mb-4">
                              Administration
                            </h1>
                            <p className="text-xl text-gray-300">
                              Panneau de contrôle administrateur
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-white text-xl">👥</span>
                              </div>
                              <h2 className="text-xl font-semibold text-white mb-4">Gestion des utilisateurs</h2>
                              <p className="text-gray-300 mb-6">Gérer les comptes utilisateurs et leurs permissions</p>
                              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105">
                                Accéder
                              </button>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-white text-xl">📝</span>
                              </div>
                              <h2 className="text-xl font-semibold text-white mb-4">Gestion du contenu</h2>
                              <p className="text-gray-300 mb-6">Modérer les projets, articles et commentaires</p>
                              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105">
                                Accéder
                              </button>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-white text-xl">📊</span>
                              </div>
                              <h2 className="text-xl font-semibold text-white mb-4">Statistiques</h2>
                              <p className="text-gray-300 mb-6">Voir les analytics et métriques du site</p>
                              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105">
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

export default AppOptimized;
