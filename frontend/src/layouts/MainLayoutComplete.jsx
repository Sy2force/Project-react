// [EXAM] Layout principal complet avec tous les composants intégrés
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavbarModern from '../components/NavbarModern';
import FooterComplete from '../components/FooterComplete';
import SkipLinkExam from '../components/SkipLink.exam';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const MainLayoutComplete = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Effet de chargement de page
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Animation des particules d'arrière-plan
  const backgroundParticles = [...Array(50)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0.2, 0.8, 0.2],
        scale: [0.5, 1.5, 0.5],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ));

  // Loader de page
  if (isLoading || isPageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Arrière-plan animé */}
        <div className="absolute inset-0">
          {backgroundParticles}
        </div>

        {/* Loader */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <motion.div
              className="w-full h-full border-4 border-blue-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-2 left-2 w-16 h-16 border-4 border-purple-500/50 rounded-full border-t-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              S.A
            </motion.div>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white mb-4"
          >
            Shay Acoca Portfolio
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300"
          >
            Chargement de l'expérience...
          </motion.p>

          {/* Barre de progression */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-64 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-8"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* [EXAM] Skip link pour accessibilité */}
      <SkipLinkExam />
      {/* Arrière-plan animé */}
      <div className="fixed inset-0 z-0">
        {backgroundParticles}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" />
        
        {/* Mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Structure principale */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        {isAuthenticated && <NavbarModern />}

        {/* Contenu principal */}
        <main id="main" className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        {isAuthenticated && <FooterComplete />}
      </div>

      {/* Notifications Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
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

      {/* Curseur personnalisé */}
      <style jsx global>{`
        * {
          cursor: none;
        }
        
        body {
          cursor: none;
        }
        
        a, button, input, textarea, select {
          cursor: none;
        }
        
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }
        
        .custom-cursor.hover {
          transform: scale(1.5);
        }
      `}</style>

      {/* Curseur personnalisé */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: typeof window !== 'undefined' ? window.mouseX - 10 : 0,
          y: typeof window !== 'undefined' ? window.mouseY - 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Effet de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{
          scaleX: typeof window !== 'undefined' ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0
        }}
      />
    </div>
  );
};

export default MainLayoutComplete;
