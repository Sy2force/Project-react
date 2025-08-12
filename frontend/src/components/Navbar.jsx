import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Home, 
  FolderOpen, 
  BookOpen, 
  Mail,
  Search,
  Bell,
  Sparkles,
  Info,
  LogIn,
  UserPlus,
  Heart,
  Shield,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin, canCreateCards } = useAuth();
  const { isDark } = useTheme();

  const publicNavLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Projets', href: '/projects', icon: FolderOpen },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'À propos', href: '/about', icon: Info },
  ];

  const userNavLinks = [
    { name: 'Favoris', href: '/favorites', icon: Heart },
    { name: 'Profil', href: '/profile/edit', icon: User },
  ];

  const businessNavLinks = [
    { name: 'Mes Cartes', href: '/my-cards', icon: CreditCard },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${
          isDark 
            ? 'bg-gray-900/80 border-white/10' 
            : 'bg-white/80 border-gray-200'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  S.A
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Shay Acoca
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Liens publics */}
              {publicNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? isDark 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-blue-100 text-blue-600 border border-blue-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Liens utilisateur connecté */}
              {isAuthenticated && userNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? isDark 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-green-100 text-green-600 border border-green-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Liens business/admin */}
              {canCreateCards() && businessNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? isDark 
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-purple-100 text-purple-600 border border-purple-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Search Button */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Search size={18} />
              </button>

              {/* Notifications */}
              {isAuthenticated && (
                <button
                  className={`p-2 rounded-lg transition-all duration-200 relative ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              )}

              {/* User Menu or Login */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'text-white hover:bg-white/5' 
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium">{user?.name || 'Utilisateur'}</span>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <motion.div
                      className={`absolute right-0 mt-2 w-56 rounded-lg border shadow-xl z-50 ${
                        isDark 
                          ? 'bg-gray-800/95 border-white/10 backdrop-blur-lg' 
                          : 'bg-white/95 border-gray-200 backdrop-blur-lg'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="p-2">
                        <div className={`px-3 py-2 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Connecté en tant que</p>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'Utilisateur'}</p>
                          <p className="text-xs text-blue-400 capitalize">{user?.role || 'user'}</p>
                        </div>
                        
                        <div className="mt-2 space-y-1">
                          <Link
                            to="/profile/edit"
                            onClick={() => setShowUserMenu(false)}
                            className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                              isDark 
                                ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            <Settings size={16} />
                            <span>Paramètres</span>
                          </Link>
                          
                          {isAdmin() && (
                            <Link
                              to="/admin/dashboard"
                              onClick={() => setShowUserMenu(false)}
                              className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                                isDark 
                                  ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                              }`}
                            >
                              <Shield size={16} />
                              <span>Administration</span>
                            </Link>
                          )}
                          
                          <button
                            onClick={handleLogout}
                            className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                              isDark 
                                ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' 
                                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                          >
                            <LogOut size={16} />
                            <span>Déconnexion</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <LogIn size={18} />
                    <span>Connexion</span>
                  </Link>
                  <Link
                    to="/register"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'border border-white/20 text-white hover:bg-white/5' 
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <UserPlus size={18} />
                    <span>S'inscrire</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setIsOpen(!isOpen)}
                icon={isOpen ? <X size={24} /> : <Menu size={24} />}
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <motion.div
            className={`border-t backdrop-blur-lg ${
              isDark 
                ? 'border-white/10 bg-gray-900/90' 
                : 'border-gray-200 bg-white/90'
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <SearchBar 
                onSearch={(query) => {
                  // Navigation vers la page de recherche avec le terme de recherche
                  if (query.trim()) {
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                    setShowSearch(false);
                  }
                }}
                placeholder="Rechercher des projets, articles, services..."
              />
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <motion.div
            className="absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-white/10"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {/* Liens publics */}
              {publicNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? isDark 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-blue-100 text-blue-600 border border-blue-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}

              {/* Liens utilisateur connecté */}
              {isAuthenticated && userNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? isDark 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-green-100 text-green-600 border border-green-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}

              {/* Liens business/admin */}
              {canCreateCards() && businessNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? isDark 
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-purple-100 text-purple-600 border border-purple-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}

              {/* Mobile User Section */}
              <div className={`border-t pt-4 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Connecté en tant que</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'Utilisateur'}</p>
                      <p className="text-xs text-blue-400 capitalize">{user?.role || 'user'}</p>
                    </div>
                    
                    <Link
                      to="/profile/edit"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Settings size={18} />
                      <span>Paramètres</span>
                    </Link>
                    
                    {isAdmin() && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isDark 
                            ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <Shield size={18} />
                        <span>Administration</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full ${
                        isDark 
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' 
                          : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                      }`}
                    >
                      <LogOut size={18} />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full ${
                        isDark 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <LogIn size={18} />
                      <span>Connexion</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full ${
                        isDark 
                          ? 'border border-white/20 text-white hover:bg-white/5' 
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <UserPlus size={18} />
                      <span>S'inscrire</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
