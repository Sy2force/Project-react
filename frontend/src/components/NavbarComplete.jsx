// [EXAM] Navbar complète et fonctionnelle avec toutes les fonctionnalités
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Briefcase, 
  MessageSquare, 
  Phone, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Search,
  Bell,
  Moon,
  Sun,
  Shield,
  Crown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NavbarComplete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Nouveau projet ajouté', time: '5 min', type: 'info' },
    { id: 2, message: 'Profil mis à jour', time: '1h', type: 'success' },
    { id: 3, message: 'Message reçu', time: '2h', type: 'message' }
  ]);

  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Ici on pourrait intégrer avec un ThemeContext
  };

  const navItems = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Projets', path: '/projects', icon: Briefcase },
    { name: 'Blog', path: '/blog', icon: MessageSquare },
    { name: 'À propos', path: '/about', icon: User },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  // Ajouter des éléments de navigation selon le rôle
  const roleBasedItems = [];
  if (user?.role === 'business' || user?.role === 'admin') {
    roleBasedItems.push({ name: 'Mes Cartes', path: '/my-cards', icon: Crown });
  }
  if (user?.role === 'admin') {
    roleBasedItems.push({ name: 'Admin', path: '/admin', icon: Shield });
  }

  const allNavItems = [...navItems, ...roleBasedItems];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-red-400';
      case 'business': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'business': return 'Business';
      default: return 'User';
    }
  };

  if (!isAuthenticated) {
    return null; // Ne pas afficher la navbar si non connecté
  }

  return (
    <>
      {/* Navbar Desktop */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg relative">
                  <span className="relative z-10">S.A</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-500/50 rounded-xl blur-lg"></div>
                </div>
                <span className="text-xl font-bold text-white hidden sm:block">
                  Shay Acoca
                </span>
              </Link>
            </motion.div>

            {/* Navigation Desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Actions Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Barre de recherche */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative"
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </motion.button>

                {/* Dropdown notifications */}
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Notifications</h3>
                      <div className="space-y-3">
                        {notifications.map((notif) => (
                          <div key={notif.id} className="p-3 bg-white/5 rounded-lg">
                            <p className="text-sm text-white">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Toggle thème */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Profil utilisateur */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className={`text-xs ${getRoleColor(user?.role)}`}>
                    {getRoleBadge(user?.role)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold relative">
                  {user?.name?.charAt(0)?.toUpperCase()}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-black rounded-full"></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile')}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Settings size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                </motion.button>
              </div>
            </div>

            {/* Menu mobile */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Profil mobile */}
              <div className="flex items-center space-x-3 px-3 py-4 border-b border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className={`text-sm ${getRoleColor(user?.role)}`}>
                    {getRoleBadge(user?.role)}
                  </p>
                </div>
              </div>

              {/* Navigation mobile */}
              {allNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Actions mobile */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Settings size={20} />
                  <span>Paramètres</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Spacer pour éviter que le contenu passe sous la navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default NavbarComplete;
