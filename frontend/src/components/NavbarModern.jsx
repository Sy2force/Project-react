import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarModern = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Effet de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: scrolled 
      ? 'rgba(0, 0, 0, 0.8)' 
      : 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(20px)',
    borderBottom: scrolled 
      ? '1px solid rgba(255, 255, 255, 0.2)' 
      : '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, system-ui, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: 'white'
  };

  const logoIconStyle = {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
  };

  const navItems = [
    { name: 'Accueil', path: '/', icon: '🏠' },
    { name: 'À propos', path: '/about', icon: '👨‍💻' },
    { name: 'Services', path: '/services', icon: '⚡' },
    { name: 'Projets', path: '/projects', icon: '🚀' },
    { name: 'Blog', path: '/blog', icon: '📝' },
    { name: 'Contact', path: '/contact', icon: '💬' }
  ];

  // Ajouter des éléments selon le rôle
  const userItems = [];
  if (isAuthenticated) {
    userItems.push({ name: 'Dashboard', path: '/dashboard', icon: '📊' });
    userItems.push({ name: 'Favoris', path: '/favorites', icon: '❤️' });
    
    if (user?.role === 'business' || user?.role === 'admin') {
      userItems.push({ name: 'Mes Cartes', path: '/my-cards', icon: '💼' });
    }
    
    if (user?.role === 'admin') {
      userItems.push({ name: 'Admin', path: '/admin', icon: '👑' });
    }
  }

  const allNavItems = [...navItems, ...userItems];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#ef4444';
      case 'business': return '#a78bfa';
      default: return '#3b82f6';
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'business': return 'Pro';
      default: return 'User';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <Link to="/" style={logoStyle}>
            <div style={logoIconStyle}>
              <span style={{ position: 'relative', zIndex: 2 }}>S.A</span>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                opacity: 0.8,
                borderRadius: '12px'
              }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1' }}>
                Shay Acoca
              </span>
              <span style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1' }}>
                Full-Stack Developer
              </span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div style={{ 
            display: 'none', 
            '@media (min-width: 768px)': { display: 'flex' },
            alignItems: 'center',
            gap: '8px'
          }} className="hidden md:flex">
            {allNavItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    background: isActive 
                      ? 'rgba(59, 130, 246, 0.2)' 
                      : 'transparent',
                    color: isActive 
                      ? '#60a5fa' 
                      : '#d1d5db',
                    border: isActive 
                      ? '1px solid rgba(59, 130, 246, 0.3)' 
                      : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#d1d5db';
                    }
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Actions Desktop */}
          <div style={{ 
            display: 'none',
            '@media (min-width: 768px)': { display: 'flex' },
            alignItems: 'center',
            gap: '12px'
          }} className="hidden md:flex">
            
            {/* Barre de recherche */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                style={{
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#d1d5db',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#d1d5db';
                }}
              >
                🔍
              </button>
              
              {showSearch && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '300px',
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '16px',
                  zIndex: 100
                }}>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#d1d5db',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#d1d5db';
                }}
              >
                🔔
                <div style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  background: '#ef4444',
                  borderRadius: '50%'
                }}></div>
              </button>
              
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '320px',
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '16px',
                  zIndex: 100
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: 'white' }}>
                    Notifications
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{
                      padding: '12px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}>
                      <div style={{ color: 'white', marginBottom: '4px' }}>Nouveau message</div>
                      <div style={{ color: '#9ca3af', fontSize: '12px' }}>Il y a 5 minutes</div>
                    </div>
                    <div style={{
                      padding: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}>
                      <div style={{ color: 'white', marginBottom: '4px' }}>Projet mis à jour</div>
                      <div style={{ color: '#9ca3af', fontSize: '12px' }}>Il y a 1 heure</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profil utilisateur */}
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: `linear-gradient(135deg, ${getRoleColor(user?.role)}, ${getRoleColor(user?.role)}80)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', lineHeight: '1' }}>
                    {user?.name || 'Utilisateur'}
                  </span>
                  <span style={{ 
                    fontSize: '11px', 
                    color: getRoleColor(user?.role), 
                    lineHeight: '1',
                    fontWeight: 'bold'
                  }}>
                    {getRoleBadge(user?.role)}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu utilisateur */}
            <div style={{ position: 'relative' }}>
              <Link
                to="/profile"
                style={{
                  padding: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#d1d5db',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = '#d1d5db';
                }}
              >
                ⚙️
              </Link>
            </div>

            {/* Déconnexion */}
            <button
              onClick={handleLogout}
              style={{
                padding: '10px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                color: '#ef4444',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                e.target.style.color = '#fca5a5';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                e.target.style.color = '#ef4444';
              }}
            >
              🚪
            </button>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'block',
              '@media (min-width: 768px)': { display: 'none' },
              padding: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#d1d5db',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            className="block md:hidden"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu mobile ouvert */}
        {isOpen && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px'
          }}>
            {/* Profil mobile */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `linear-gradient(135deg, ${getRoleColor(user?.role)}, ${getRoleColor(user?.role)}80)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                  {user?.name || 'Utilisateur'}
                </div>
                <div style={{ fontSize: '14px', color: getRoleColor(user?.role), fontWeight: 'bold' }}>
                  {getRoleBadge(user?.role)}
                </div>
              </div>
            </div>

            {/* Navigation mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {allNavItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '500',
                      background: isActive 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isActive 
                        ? '#60a5fa' 
                        : 'white',
                      border: isActive 
                        ? '1px solid rgba(59, 130, 246, 0.3)' 
                        : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Actions mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span style={{ fontSize: '20px' }}>⚙️</span>
                <span>Paramètres</span>
              </Link>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                <span style={{ fontSize: '20px' }}>🚪</span>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer pour éviter que le contenu passe sous la navbar */}
      <div style={{ height: '70px' }}></div>
    </>
  );
};

export default NavbarModern;
