import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  CreditCard, 
  Heart, 
  Plus,
  BookOpen, 
  Mail, 
  User,
  Shield,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  // Links based on user role
  const getNavigationLinks = () => {
    const baseLinks = [
      { path: '/home', label: 'Accueil', icon: Home },
      { path: '/cards', label: 'Cartes Business', icon: CreditCard },
      { path: '/blog', label: 'Blog', icon: BookOpen },
      { path: '/contact', label: 'Contact', icon: Mail }
    ];

    if (user) {
      baseLinks.push({ path: '/favorites', label: 'Mes Favoris', icon: Heart });
      
      if (user.role === 'business' || user.role === 'admin') {
        baseLinks.push(
          { path: '/my-cards', label: 'Mes Cartes', icon: CreditCard },
          { path: '/cards/new', label: 'Créer une Carte', icon: Plus }
        );
      }

      if (user.role === 'admin') {
        baseLinks.push({ path: '/dashboard', label: 'Administration', icon: Shield });
      }
    }

    return baseLinks;
  };

  const navigationLinks = getNavigationLinks();

  const legalLinks = [
    { path: '/legal/privacy', label: 'Politique de confidentialité' },
    { path: '/legal/terms', label: 'Conditions d\'utilisation' },
    { path: '/legal/cookies', label: 'Politique des cookies' },
    { path: '/legal/accessibility', label: 'Accessibilité' }
  ];

  const socialLinks = [
    { 
      href: 'https://github.com/shayacoca', 
      label: 'GitHub', 
      icon: Github,
      color: 'hover:text-gray-300'
    },
    { 
      href: 'https://linkedin.com/in/shayacoca', 
      label: 'LinkedIn', 
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    { 
      href: 'https://twitter.com/shayacoca', 
      label: 'Twitter', 
      icon: Twitter,
      color: 'hover:text-blue-300'
    }
  ];

  return (
    <footer 
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px)'
      }}
      role="contentinfo"
      aria-label="Pied de page du site"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px 24px' }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* Brand Section */}
          <div>
            <Link 
              to="/home" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
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
                fontSize: '24px',
                fontWeight: '700',
                color: '#ffffff'
              }}>
                Shay Acoca
              </span>
            </Link>
            
            <p style={{
              color: '#94a3b8',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0,
              marginBottom: '20px'
            }}>
              Plateforme de cartes business numériques pour connecter les professionnels 
              et développer votre réseau d'affaires.
            </p>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: '#667eea' }} />
                <a 
                  href="mailto:contact@shayacoca.com"
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  contact@shayacoca.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ color: '#667eea' }} />
                <a 
                  href="tel:+972-50-123-4567"
                  style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  +972-50-123-4567
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: '#667eea' }} />
                <span style={{
                  color: '#94a3b8',
                  fontSize: '14px'
                }}>
                  Tel Aviv, Israël
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0,
              marginBottom: '16px'
            }}>
              Navigation
            </h3>
            <nav role="navigation" aria-label="Navigation du pied de page">
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#94a3b8',
                          textDecoration: 'none',
                          fontSize: '14px',
                          padding: '4px 0',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                        onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                        aria-label={link.label}
                      >
                        <Icon size={16} />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0,
              marginBottom: '16px'
            }}>
              Informations légales
            </h3>
            <nav role="navigation" aria-label="Liens légaux">
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        color: '#94a3b8',
                        textDecoration: 'none',
                        fontSize: '14px',
                        padding: '4px 0',
                        display: 'block',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links & User Info */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              margin: 0,
              marginBottom: '16px'
            }}>
              Suivez-nous
            </h3>
            
            {/* Social Media */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '20px'
            }}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.color = '#ffffff';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = '#94a3b8';
                      e.target.style.transform = 'translateY(0)';
                    }}
                    aria-label={`Suivre sur ${social.label}`}
                    title={`Suivre sur ${social.label}`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            {/* User Status */}
            {user && (
              <div style={{
                padding: '12px',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <p style={{
                  color: '#667eea',
                  fontSize: '12px',
                  margin: 0,
                  marginBottom: '4px',
                  fontWeight: '500'
                }}>
                  Connecté en tant que
                </p>
                <p style={{
                  color: '#ffffff',
                  fontSize: '14px',
                  margin: 0,
                  fontWeight: '600'
                }}>
                  {user.name} ({user.role})
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            color: '#94a3b8',
            fontSize: '14px',
            margin: 0
          }}>
            © {currentYear} Shay Acoca. Tous droits réservés.
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: '#64748b'
          }}>
            <span>Fait avec ❤️ en Israël</span>
            <span>•</span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
