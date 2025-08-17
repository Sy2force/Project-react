import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/index.js';
import { Menu, X, Home, Mail, User, UserPlus, Briefcase, Code, Star, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navigationLinks = [
    { to: '/', label: 'Accueil', icon: Home },
    { to: '/services', label: 'Services', icon: Briefcase },
    { to: '/projects', label: 'Projets', icon: Code },
    { to: '/about', label: 'À Propos', icon: Star },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActiveLink = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-purple rounded-xl flex items-center justify-center shadow-lg shadow-neon-cyan/20"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-white font-bold text-xl">S.A</span>
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-white font-display text-xl font-bold">Shay Acoca</span>
                <div className="text-neon-cyan text-xs font-medium">Portfolio Developer</div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                const active = isActiveLink(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 group ${
                      active 
                        ? 'text-neon-cyan bg-neon-cyan/10 shadow-lg shadow-neon-cyan/20' 
                        : 'text-gray-300 hover:text-neon-cyan hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} className={active ? 'text-neon-cyan' : 'text-gray-400 group-hover:text-neon-cyan'} />
                    <span className="font-medium">{link.label}</span>
                    {active && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                    <User size={16} className="text-neon-cyan" />
                    <span className="text-white text-sm">{user?.email?.split('@')[0]}</span>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Déconnexion</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <User size={16} />
                    <span>Connexion</span>
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/register')}
                    className="bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-cyan/80 hover:to-neon-blue/80 px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-neon-cyan/25"
                  >
                    <UserPlus size={16} />
                    <span>S'inscrire</span>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-dark-950/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActiveLink(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        active 
                          ? 'text-neon-cyan bg-neon-cyan/10 shadow-lg shadow-neon-cyan/20' 
                          : 'text-gray-300 hover:text-neon-cyan hover:bg-white/5'
                      }`}
                    >
                      <Icon size={20} className={active ? 'text-neon-cyan' : 'text-gray-400'} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                        <User size={18} className="text-neon-cyan" />
                        <div className="text-left">
                          <div className="text-white text-sm font-medium">{user?.email?.split('@')[0]}</div>
                          <div className="text-gray-400 text-xs">{user?.email}</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate('/dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Home size={18} />
                        <span>Dashboard</span>
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-gray-300 hover:text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <LogOut size={18} />
                        <span>Déconnexion</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate('/login');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <User size={18} />
                        <span>Connexion</span>
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate('/register');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-neon-cyan/25"
                      >
                        <UserPlus size={18} />
                        <span>S'inscrire</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 pt-16"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PublicLayout;
