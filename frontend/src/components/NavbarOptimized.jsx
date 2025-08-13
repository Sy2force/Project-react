// [EXAM] Navbar optimisée avec design moderne, responsive et fonctionnalités complètes
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu,
  X,
  Home,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Star,
  Heart,
  Image,
  DollarSign,
  Award,
  Code,
  Palette,
  Globe,
  Smartphone,
  Shield,
  Edit
} from 'lucide-react';

const NavbarOptimized = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(3);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Simuler un utilisateur connecté
  const user = {
    name: 'Shay Acoca',
    email: 'shay@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin'
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Accueil',
      path: '/',
      icon: Home,
      description: 'Page d\'accueil',
      submenu: [
        { name: 'Accueil Optimisé', path: '/', icon: Home },
        { name: 'Accueil Moderne', path: '/home-modern', icon: Home },
        { name: 'Accueil Complet', path: '/home-complete', icon: Home },
        { name: 'Accueil Simple', path: '/home-simple', icon: Home }
      ]
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
      icon: Briefcase,
      description: 'Mes réalisations',
      submenu: [
        { name: 'Portfolio Optimisé', path: '/projects', icon: Briefcase },
        { name: 'Portfolio Moderne', path: '/projects-modern', icon: Briefcase },
        { name: 'Portfolio Complet', path: '/projects-complete', icon: Briefcase },
        { name: 'Détail Projet', path: '/project-detail', icon: Globe },
        { name: 'Mes Cartes', path: '/my-cards', icon: Heart }
      ]
    },
    {
      name: 'Services',
      path: '/services',
      icon: Code,
      description: 'Mes services',
      submenu: [
        { name: 'Services Optimisés', path: '/services', icon: Code },
        { name: 'Services Modernes', path: '/services-modern', icon: Code },
        { name: 'Services Complets', path: '/services-complete', icon: Code }
      ]
    },
    {
      name: 'À Propos',
      path: '/about',
      icon: User,
      description: 'À propos de moi',
      submenu: [
        { name: 'À Propos Optimisé', path: '/about', icon: User },
        { name: 'À Propos Moderne', path: '/about-modern', icon: User },
        { name: 'À Propos Complet', path: '/about-complete', icon: User }
      ]
    },
    {
      name: 'Blog',
      path: '/blog',
      icon: Edit,
      description: 'Articles & actualités',
      submenu: [
        { name: 'Blog Optimisé', path: '/blog', icon: Edit },
        { name: 'Blog Moderne', path: '/blog-modern', icon: Edit },
        { name: 'Blog Complet', path: '/blog-complete', icon: Edit }
      ]
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: MessageSquare,
      description: 'Me contacter',
      submenu: [
        { name: 'Contact Optimisé', path: '/contact', icon: MessageSquare },
        { name: 'Contact Moderne', path: '/contact-modern', icon: MessageSquare },
        { name: 'Contact Complet', path: '/contact-complete', icon: MessageSquare }
      ]
    },
    {
      name: 'Galerie',
      path: '/gallery',
      icon: Image,
      description: 'Mes créations',
      submenu: [
        { name: 'Galerie Complète', path: '/gallery-complete', icon: Image },
        { name: 'Portfolio Complet', path: '/portfolio-complete', icon: Briefcase },
        { name: 'Showcase', path: '/showcase', icon: Star }
      ]
    },
    {
      name: 'Témoignages',
      path: '/testimonials',
      icon: Star,
      description: 'Avis clients',
      submenu: [
        { name: 'Témoignages Complets', path: '/testimonials-complete', icon: Star },
        { name: 'Avis Clients', path: '/testimonials', icon: Award }
      ]
    },
    {
      name: 'Profil',
      path: '/profile',
      icon: User,
      description: 'Mon profil',
      submenu: [
        { name: 'Mon Profil', path: '/profile', icon: User },
        { name: 'Profil Complet', path: '/profile-complete', icon: User },
        { name: 'Éditer Profil', path: '/profile/edit', icon: Edit },
        { name: 'Favoris', path: '/favorites', icon: Heart },
        { name: 'Favoris Complets', path: '/favorites-complete', icon: Heart }
      ]
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: Award,
      description: 'Tableau de bord',
      submenu: [
        { name: 'Dashboard Principal', path: '/dashboard', icon: Award },
        { name: 'Dashboard Moderne', path: '/dashboard-modern', icon: Award },
        { name: 'Dashboard Complet', path: '/dashboard-complete', icon: Award }
      ]
    },
    {
      name: 'Plus',
      path: '/skills',
      icon: Star,
      description: 'Pages supplémentaires',
      submenu: [
        { name: 'Mes Compétences', path: '/skills', icon: Code },
        { name: 'Tarifs', path: '/pricing', icon: DollarSign },
        { name: 'FAQ', path: '/faq', icon: MessageSquare },
        { name: 'Confidentialité', path: '/privacy', icon: Shield }
      ]
    }
  ];

  const handleLogout = () => {
    // Logique de déconnexion
    navigate('/login');
  };

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Navbar principale */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  S.A
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur-md opacity-50 -z-10" />
              </motion.div>
              <div className="hidden md:block">
                <div className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  Shay Acoca
                </div>
                <div className="text-xs text-gray-400">
                  Développeur Full-Stack
                </div>
              </div>
            </Link>

            {/* Navigation desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                          isActivePath(item.path)
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <item.icon size={18} />
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden"
                          >
                            {item.submenu.map((subItem, index) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 border-b border-white/5 last:border-b-0"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <subItem.icon size={16} className="text-purple-400" />
                                <span>{subItem.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                        isActivePath(item.path)
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Actions desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </motion.button>

              {/* Toggle thème */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Profil utilisateur */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDropdown('profile')}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-purple-500"
                  />
                  <div className="text-left">
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-gray-400 text-xs">{user.role}</div>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-200 ${
                      activeDropdown === 'profile' ? 'rotate-180' : ''
                    }`} 
                  />
                </motion.button>

                {/* Dropdown profil */}
                <AnimatePresence>
                  {activeDropdown === 'profile' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full border-2 border-purple-500"
                          />
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.email}</div>
                            <div className="text-purple-400 text-xs capitalize">{user.role}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <User size={16} />
                          <span>Mon Profil</span>
                        </Link>
                        <Link
                          to="/favorites"
                          className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Heart size={16} />
                          <span>Favoris</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Settings size={16} />
                          <span>Paramètres</span>
                        </Link>
                        <hr className="my-2 border-white/10" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                        >
                          <LogOut size={16} />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Menu burger mobile */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Notifications mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-300 hover:text-white"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </motion.button>

              {/* Avatar mobile */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-purple-500"
              />

              {/* Burger button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-white"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Recherche mobile */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Navigation mobile */}
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActivePath(item.path)
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <item.icon size={20} />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.description}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Actions mobile */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <User size={20} />
                    <span>Mon Profil</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Settings size={20} />
                    <span>Paramètres</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  >
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay pour fermer les dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
};

export default NavbarOptimized;
