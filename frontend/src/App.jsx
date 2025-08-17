import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider } from './contexts/AuthProvider.jsx';

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx';
import PrivateLayout from './layouts/PrivateLayout.jsx';

// Components
import { Loader } from './components/ui/index.js';
// import { useAuth } from './hooks/useAuth.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Lazy load pages for optimal performance
const LandingPage = React.lazy(() => import('./pages/LandingPage.jsx'));
const LoginPage = React.lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage.jsx'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage.jsx'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage.jsx'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage.jsx'));
const SimulatorPage = React.lazy(() => import('./pages/SimulatorPage.jsx'));
const AdminPage = React.lazy(() => import('./pages/AdminPage.jsx'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage.jsx'));
const ContactPage = React.lazy(() => import('./pages/ContactPage.jsx'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.jsx'));

// Loading component with futuristic design
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Loader variant="neon" size="xl" text="Loading..." />
      <motion.div
        className="mt-8 text-neon-cyan text-lg font-display"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Initializing Futuristic Experience...
      </motion.div>
    </motion.div>
  </div>
);

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: 20,
    scale: 0.98,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white">
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <PublicLayout>
                    <motion.div
                      key="landing"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <LandingPage />
                    </motion.div>
                  </PublicLayout>
                } />
                
                <Route path="/login" element={
                  <PublicLayout>
                    <motion.div
                      key="login"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <LoginPage />
                    </motion.div>
                  </PublicLayout>
                } />
                
                <Route path="/register" element={
                  <PublicLayout>
                    <motion.div
                      key="register"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <RegisterPage />
                    </motion.div>
                  </PublicLayout>
                } />
                
                <Route path="/contact" element={
                  <PublicLayout>
                    <motion.div
                      key="contact"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <ContactPage />
                    </motion.div>
                  </PublicLayout>
                } />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <PrivateLayout>
                    <motion.div
                      key="dashboard"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <DashboardPage />
                    </motion.div>
                  </PrivateLayout>
                } />
                
                <Route path="/services" element={
                  <PublicLayout>
                    <motion.div
                      key="services"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <ServicesPage />
                    </motion.div>
                  </PublicLayout>
                } />
                
                <Route path="/projects" element={
                  <PublicLayout>
                    <motion.div
                      key="projects"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <ProjectsPage />
                    </motion.div>
                  </PublicLayout>
                } />

                <Route path="/about" element={
                  <PublicLayout>
                    <motion.div
                      key="about"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <div className="min-h-screen pt-20 px-4">
                        <div className="max-w-4xl mx-auto">
                          <h1 className="text-4xl font-bold text-white mb-8">À Propos</h1>
                          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-neon-cyan mb-4">Shay Acoca</h2>
                            <p className="text-gray-300 mb-6">Développeur Full-Stack passionné basé à San Francisco, CA.</p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                                <div className="space-y-2 text-gray-300">
                                  <p>📧 hello@shayacoca.com</p>
                                  <p>📱 +1 (555) 123-4567</p>
                                  <p>📍 San Francisco, CA</p>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-3">Horaires</h3>
                                <div className="space-y-2 text-gray-300">
                                  <p>🗓️ Dimanche - Vendredi</p>
                                  <p>🕕 Jusqu'à 18h</p>
                                  <p>🌐 Disponible sur WhatsApp, LinkedIn, GitHub</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </PublicLayout>
                } />
                
                <Route path="/simulator" element={
                  <PrivateLayout>
                    <motion.div
                      key="simulator"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <SimulatorPage />
                    </motion.div>
                  </PrivateLayout>
                } />
                
                <Route path="/settings" element={
                  <PrivateLayout>
                    <motion.div
                      key="settings"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <SettingsPage />
                    </motion.div>
                  </PrivateLayout>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <PrivateLayout requiredRole="admin">
                    <motion.div
                      key="admin"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <AdminPage />
                    </motion.div>
                  </PrivateLayout>
                } />

                {/* 404 Route */}
                <Route path="*" element={
                  <motion.div
                    key="404"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <NotFoundPage />
                  </motion.div>
                } />
              </Routes>
            </Suspense>
          </AnimatePresence>

          {/* Toast Notifications with futuristic styling */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#ffffff',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              },
              success: {
                iconTheme: {
                  primary: '#00ffff',
                  secondary: '#0f172a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff0080',
                  secondary: '#0f172a',
                },
              },
            }}
          />
        </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
