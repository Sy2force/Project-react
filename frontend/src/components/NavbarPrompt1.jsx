import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  LogOut,
  Search,
  CreditCard,
  Shield
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { preloadRoutes } from '../utils/preload'

/**
 * Navbar 2 lignes PROMPT 1 - Style identique au footer
 * Ligne 1: Logo "SA" (glass) • Recherche centrée (onSubmit → /bcard?q=) • Actions auth
 * Ligne 2: Navigation centrée (Accueil, Projets, BCard, Blog, Services, Compétences, Contact)
 * Style: backdrop-blur-xl bg-white/5 border-white/10 shadow-glass rounded-b-2xl
 */
const NavbarPrompt1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/bcard?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsMobileMenuOpen(false)
    }
  }

  // Navigation links PROMPT 1 avec préchargement
  const navLinks = [
    { path: '/home', label: 'Accueil', icon: Home, preload: preloadRoutes.home },
    { path: '/projects', label: 'Projets', icon: Briefcase, preload: preloadRoutes.projects },
    { path: '/bcard', label: 'BCard', icon: CreditCard, preload: preloadRoutes.cards },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/services', label: 'Services', icon: Settings },
    { path: '/skills', label: 'Compétences', icon: Code2 },
    { path: '/contact', label: 'Contact', icon: Mail, preload: preloadRoutes.contact },
  ]

  // Liens de rôle (admin, etc.)
  const roleLinks = user?.role === 'admin' ? [
    { path: '/dashboard', label: 'Dashboard', icon: Shield, preload: preloadRoutes.dashboard }
  ] : []

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-glass rounded-b-2xl">
      {/* Ligne 1: Logo • Recherche • Actions */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo "SA" (glass) */}
          <Link 
            to="/home" 
            className="flex-shrink-0"
            onMouseEnter={() => preloadRoutes.home?.()}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
              <span className="text-lg font-bold text-white">SA</span>
            </div>
          </Link>

          {/* Recherche centrée */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des cartes..."
                className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </form>
          </div>

          {/* Actions auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
                >
                  <User size={18} />
                  <span className="hidden sm:block text-sm">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onMouseEnter={() => preloadRoutes.auth?.()}
                className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-xl text-white font-medium transition-colors duration-200"
              >
                Connexion
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Ligne 2: Navigation centrée */}
      <div className="hidden md:block border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-12 space-x-8">
            {[...navLinks, ...roleLinks].map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => link.preload?.()}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile menu fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 backdrop-blur-xl bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-white/10 border border-white/20 rounded-b-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Recherche mobile */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher des cartes..."
                    className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                </div>
              </form>

              {/* Navigation mobile */}
              <div className="space-y-2">
                {[...navLinks, ...roleLinks].map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={() => link.preload?.()}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                        isActive(link.path)
                          ? 'bg-primary text-white'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon size={20} />
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              {/* Actions auth mobile */}
              <div className="mt-6 pt-6 border-t border-white/20">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
                    >
                      <User size={20} />
                      Profil ({user.name})
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200 w-full text-left"
                    >
                      <LogOut size={20} />
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => preloadRoutes.auth?.()}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/80 rounded-xl text-white font-medium transition-colors duration-200"
                  >
                    Connexion
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default NavbarPrompt1
