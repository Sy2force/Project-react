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
  Heart,
  Plus,
  Shield
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { usePreload, preloadRoutes } from '../utils/preload'

/**
 * Navbar 2 lignes PROMPT 1 - Style identique au footer
 * Ligne 1: Logo "SA" (glass) • Recherche centrée • Actions auth
 * Ligne 2: Navigation centrée (Accueil, Projets, BCard, etc.)
 * Style: backdrop-blur-xl bg-white/5 border-white/10 shadow-glass rounded-b-2xl
 */
const Navbar = () => {
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
  const getNavLinks = () => {
    const baseLinks = [
      { path: '/home', label: 'Accueil', icon: Home, preload: preloadRoutes.home },
      { path: '/projects', label: 'Projets', icon: Briefcase, preload: preloadRoutes.projects },
      { path: '/bcard', label: 'BCard', icon: CreditCard, preload: preloadRoutes.cards },
      { path: '/blog', label: 'Blog', icon: BookOpen },
      { path: '/services', label: 'Services', icon: Settings },
      { path: '/skills', label: 'Compétences', icon: Code2 },
      { path: '/contact', label: 'Contact', icon: Mail, preload: preloadRoutes.contact },
      { path: '/projects', label: 'Projets', icon: FolderOpen },
      { path: '/bcard', label: 'BCard', icon: CreditCard },
      { path: '/blog', label: 'Blog', icon: BookOpen },
      { path: '/services', label: 'Services', icon: Briefcase },
      { path: '/skills', label: 'Compétences', icon: Settings },
      { path: '/contact', label: 'Contact', icon: Mail }
    ]

    if (user) {
      baseLinks.push({ path: '/favorites', label: 'Favoris', icon: Heart })
      
      if (user.role === 'business' || user.role === 'admin') {
        baseLinks.push(
          { path: '/my-cards', label: 'Mes cartes', icon: CreditCard },
          { path: '/cards/new', label: 'Créer une carte', icon: Plus }
        )
      }

      if (user.role === 'admin') {
        baseLinks.push({ path: '/dashboard', label: 'Dashboard', icon: Shield })
      }
    }

    return baseLinks
  }

  const navLinks = getNavLinks()

  return (
    <>
      {/* Glass Navbar - Footer styling exact match */}
      <nav 
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)'
        }}
        className="fixed top-0 left-0 right-0 z-40"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          {/* Ligne 1: Logo + Recherche + Actions */}
          <div className="flex items-center justify-between h-16">
            
            {/* Logo capsule S.A + nom */}
            <Link 
              to="/home" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none'
              }}
              aria-label="Retour à l'accueil"
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#ffffff'
                }}>
                  S.A
                </span>
              </div>
              <span style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#ffffff'
              }}>
                Shay Acoca
              </span>
            </Link>

            {/* Champ de recherche centré */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8'
                  }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher…"
                  style={{
                    width: '100%',
                    height: '44px',
                    paddingLeft: '44px',
                    paddingRight: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'
                    e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                  aria-label="Rechercher"
                />
              </div>
            </form>

            {/* Actions droite */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/profile">
                    <button
                      style={{
                        width: '44px',
                        height: '44px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'none'
                      }}
                      aria-label="Profil utilisateur"
                    >
                      <User size={20} />
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none'
                    }}
                    aria-label="Se déconnecter"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/auth">
                    <button
                      style={{
                        height: '44px',
                        padding: '0 20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      Se connecter
                    </button>
                  </Link>
                </div>
              )}
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none'
                }}
                className="md:hidden"
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Ligne 2: Menu centré (desktop only) */}
          <div className="hidden md:flex items-center justify-center py-3 border-t border-white/10">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '44px',
                      padding: '0 20px',
                      background: active ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      boxShadow: active ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.color = '#ffffff'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.target.style.background = 'transparent'
                        e.target.style.color = 'rgba(255, 255, 255, 0.8)'
                      }
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = active 
                        ? '0 4px 12px rgba(102, 126, 234, 0.3), 0 0 0 4px rgba(102, 126, 234, 0.1)'
                        : '0 0 0 4px rgba(102, 126, 234, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = active ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
                    }}
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Fullscreen glass overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              backdropFilter: 'blur(16px)'
            }}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#ffffff'
                    }}>
                      S.A
                    </span>
                  </div>
                  <span 
                    id="mobile-menu-title"
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#ffffff'
                    }}
                  >
                    Menu
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                  aria-label="Fermer le menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search mobile */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <Search 
                    size={20} 
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8'
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher…"
                    style={{
                      width: '100%',
                      height: '44px',
                      paddingLeft: '44px',
                      paddingRight: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'
                      e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                    aria-label="Rechercher"
                  />
                </div>
              </form>

              {/* Navigation mobile */}
              <div className="flex-1 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const active = isActive(link.path)
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        height: '56px',
                        padding: '0 20px',
                        background: active ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                          e.target.style.color = '#ffffff'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.target.style.background = 'transparent'
                          e.target.style.color = 'rgba(255, 255, 255, 0.8)'
                        }
                      }}
                    >
                      <Icon size={24} />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Actions mobile */}
              <div style={{
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        height: '44px',
                        padding: '0 20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <User size={20} />
                      Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        height: '44px',
                        padding: '0 20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <LogOut size={20} />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '44px',
                      padding: '0 20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)'
                      e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    Se connecter
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
