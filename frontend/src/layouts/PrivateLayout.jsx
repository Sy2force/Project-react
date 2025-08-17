import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Loader, Button } from '../components/ui/index.js';
import { Home, Settings, LogOut, User, Briefcase, Shield, Menu, X, Code, Zap, BarChart3, Mail } from 'lucide-react';

const PrivateLayout = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 flex items-center justify-center">
        <Loader variant="neon" size="xl" text="Authenticating..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return Shield;
      case 'business': return Briefcase;
      default: return User;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'business': return 'from-blue-500 to-cyan-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  const navigationLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/services', label: 'Services', icon: Briefcase },
    { to: '/projects', label: 'Projets', icon: Code },
    { to: '/simulator', label: 'Simulateur', icon: Zap },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  // Add admin link if user is admin
  if (user?.role === 'admin') {
    navigationLinks.push({ to: '/admin', label: 'Admin Panel', icon: Shield });
  }

  const RoleIcon = getRoleIcon(user?.role);
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-purple rounded-xl flex items-center justify-center shadow-lg shadow-neon-cyan/20"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-white font-bold text-xl">S.A</span>
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-white font-display text-xl font-bold">Portfolio</span>
                <div className="text-neon-cyan text-xs font-medium">Dashboard</div>
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
                        layoutId="activeTabPrivate"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRoleBadgeColor(user?.role)} flex items-center justify-center`}>
                  <RoleIcon size={14} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">{user?.fullName || user?.email?.split('@')[0]}</div>
                  <div className="text-gray-400 text-xs capitalize">{user?.role}</div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => navigate('/settings')}
                className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
                title="Paramètres"
              >
                <Settings size={18} />
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all duration-300"
                title="Déconnexion"
              >
                <LogOut size={18} />
              </Button>
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
                {/* User Info Mobile */}
                <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRoleBadgeColor(user?.role)} flex items-center justify-center`}>
                    <RoleIcon size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white text-sm font-medium">{user?.fullName || user?.email?.split('@')[0]}</div>
                    <div className="text-gray-400 text-xs capitalize">{user?.role}</div>
                    <div className="text-gray-500 text-xs">{user?.email}</div>
                  </div>
                </div>

                {/* Navigation Links Mobile */}
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
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/settings');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Settings size={18} />
                    <span>Paramètres</span>
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
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 pt-16 p-6 overflow-auto"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PrivateLayout;
