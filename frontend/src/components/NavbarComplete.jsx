import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  Code2, 
  Mail, 
  BookOpen, 
  Settings,
  Calculator,
  Award,
  Zap,
  LogIn,
  LogOut,
  Shield,
  Heart,
  Plus,
  CreditCard
} from 'lucide-react'

const NavbarComplete = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated, hasRole, canCreateCards } = useAuth()

  const isActive = (path) => location.pathname === path

  // Navigation links based on user role (RBAC)
  const getNavLinks = () => {
    const baseLinks = [
      { path: '/', label: 'Accueil', icon: Home },
      { path: '/about', label: 'À Propos', icon: User },
      { path: '/projects', label: 'Projets', icon: Briefcase },
      { path: '/skills', label: 'Compétences', icon: Code2 },
      { path: '/services', label: 'Services', icon: Settings },
      { path: '/blog', label: 'Blog', icon: BookOpen },
      { path: '/contact', label: 'Contact', icon: Mail }
    ]

    // Add authenticated user links
    if (isAuthenticated()) {
      baseLinks.push({ path: '/simulator', label: 'Simulateur', icon: Calculator })
      baseLinks.push({ path: '/favorites', label: 'Favoris', icon: Heart })
      
      // Business and admin can create cards
      if (canCreateCards()) {
        baseLinks.push({ path: '/my-cards', label: 'Mes Cartes', icon: CreditCard })
        baseLinks.push({ path: '/cards/new', label: 'Créer', icon: Plus })
      }

      // Admin only
      if (hasRole('admin')) {
        baseLinks.push({ path: '/dashboard', label: 'Dashboard', icon: Shield })
      }
    }

    return baseLinks
  }

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SA</span>
            </div>
            <span className="font-sora font-bold text-xl hidden sm:block">Shay Acoca</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {getNavLinks().map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated() ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user?.name || 'Utilisateur'}</span>
                  {hasRole('admin') && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold">
                      ADMIN
                    </span>
                  )}
                  {hasRole('business') && (
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">
                      BUSINESS
                    </span>
                  )}
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <LogIn size={18} />
                  <span>Connexion</span>
                </Link>
                
                {/* Contact CTA */}
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Me Contacter
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
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
            className="md:hidden glass-card border-t border-white/10"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" aria-hidden="true" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                aria-label="Rechercher dans le site"
                role="searchbox"
              />
            </div>
            <div className="px-4 py-4 space-y-2">
              {getNavLinks().map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                {isAuthenticated() ? (
                  <>
                    {/* User Info Mobile */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user?.name || 'Utilisateur'}</p>
                        <p className="text-white/60 text-sm">{user?.email}</p>
                      </div>
                    </div>
                    
                    {/* Logout Button Mobile */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-red-500/20 transition-all duration-200 w-full"
                    >
                      <LogOut size={20} />
                      <span>Déconnexion</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Login Button Mobile */}
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <LogIn size={20} />
                      <span>Connexion</span>
                    </Link>
                    
                    {/* Contact CTA Mobile */}
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                    >
                      Me Contacter
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default NavbarComplete
