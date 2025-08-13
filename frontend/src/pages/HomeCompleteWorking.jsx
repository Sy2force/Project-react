// Page d'accueil complète avec styles inline pour garantir l'affichage
import { Link } from 'react-router-dom';

const HomeCompleteWorking = () => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #7c3aed 50%, #1e1b4b 75%, #0f0f23 100%)',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: 'white'
  };

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const logoStyle = {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    transition: 'all 0.3s ease'
  };

  const heroStyle = {
    paddingTop: '100px',
    paddingBottom: '80px',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '100px 20px 80px'
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 7rem)',
    fontWeight: 'bold',
    lineHeight: '1.1',
    marginBottom: '24px'
  };

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const sectionStyle = {
    padding: '80px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <nav style={navStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={logoStyle}>
                <span>SA</span>
              </div>
              <span style={{ marginLeft: '12px', fontWeight: 'bold', fontSize: '20px' }}>Shay Acoca</span>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <a href="#accueil" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Accueil</a>
              <a href="#services" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Services</a>
              <a href="#projets" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Projets</a>
              <a href="#contact" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}>Contact</a>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Connexion
              </Link>
              <Link to="/register" style={buttonStyle}>
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" style={heroStyle}>
        <h1 style={titleStyle}>
          Créateur du
          <br />
          <span style={gradientTextStyle}>Futur Digital</span>
        </h1>

        <p style={{ fontSize: '24px', color: '#d1d5db', maxWidth: '800px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Développeur Full-Stack passionné, je transforme vos idées en expériences digitales exceptionnelles
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginBottom: '80px' }}>
          <a href="#projets" style={{ ...buttonStyle, fontSize: '18px', padding: '16px 32px' }}>
            Découvrir mes projets →
          </a>
          <a 
            href="#contact" 
            style={{ 
              border: '1px solid rgba(255, 255, 255, 0.2)', 
              color: 'white', 
              padding: '16px 32px', 
              borderRadius: '12px', 
              textDecoration: 'none',
              fontSize: '18px'
            }}
          >
            Collaborons ensemble
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginTop: '80px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>150+</div>
            <div style={{ color: '#9ca3af' }}>Projets réalisés</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>50+</div>
            <div style={{ color: '#9ca3af' }}>Clients satisfaits</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>5</div>
            <div style={{ color: '#9ca3af' }}>Années d'expérience</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>98%</div>
            <div style={{ color: '#9ca3af' }}>Satisfaction client</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Mes <span style={gradientTextStyle}>Services</span>
          </h2>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
            Des solutions digitales complètes pour transformer vos idées en réalité
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          <div style={cardStyle}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
              borderRadius: '16px',
              marginBottom: '24px'
            }}></div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Développement Web</h3>
            <p style={{ color: '#d1d5db', marginBottom: '24px', lineHeight: '1.6' }}>
              Applications web modernes et performantes avec React, Node.js et les dernières technologies
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', marginRight: '12px' }}></div>
                React/Vue.js
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', marginRight: '12px' }}></div>
                Node.js/Express
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', marginRight: '12px' }}></div>
                Bases de données
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', 
              borderRadius: '16px',
              marginBottom: '24px'
            }}></div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Design UI/UX</h3>
            <p style={{ color: '#d1d5db', marginBottom: '24px', lineHeight: '1.6' }}>
              Interfaces utilisateur intuitives et expériences optimisées pour vos utilisateurs
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', marginRight: '12px' }}></div>
                Figma/Adobe XD
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', marginRight: '12px' }}></div>
                Prototypage
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', marginRight: '12px' }}></div>
                Design System
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'linear-gradient(135deg, #10b981, #3b82f6)', 
              borderRadius: '16px',
              marginBottom: '24px'
            }}></div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Optimisation</h3>
            <p style={{ color: '#d1d5db', marginBottom: '24px', lineHeight: '1.6' }}>
              Performance, SEO et accessibilité pour des sites ultra-rapides et bien référencés
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginRight: '12px' }}></div>
                Lighthouse
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginRight: '12px' }}></div>
                Core Web Vitals
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginRight: '12px' }}></div>
                SEO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projets" style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Projets <span style={gradientTextStyle}>Récents</span>
          </h2>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
            Découvrez quelques-unes de mes réalisations les plus marquantes
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          <div style={cardStyle}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              background: 'linear-gradient(135deg, #667eea, #764ba2)', 
              borderRadius: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              E-commerce Moderne
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Plateforme E-commerce</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Plateforme de vente en ligne complète avec paiements sécurisés et gestion des stocks
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>React</span>
              <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>Node.js</span>
              <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>Stripe</span>
            </div>
            <a href="#" style={{ color: '#60a5fa', textDecoration: 'none' }}>Voir le projet →</a>
          </div>

          <div style={cardStyle}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              background: 'linear-gradient(135deg, #f093fb, #f5576c)', 
              borderRadius: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              Dashboard Analytics
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Dashboard Analytics</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Interface d'administration avec visualisation de données en temps réel
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>Vue.js</span>
              <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>Chart.js</span>
              <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>MongoDB</span>
            </div>
            <a href="#" style={{ color: '#a78bfa', textDecoration: 'none' }}>Voir le projet →</a>
          </div>

          <div style={cardStyle}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)', 
              borderRadius: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              App Mobile
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Application Mobile</h3>
            <p style={{ color: '#d1d5db', marginBottom: '20px' }}>
              Application mobile cross-platform avec synchronisation cloud
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>React Native</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>Firebase</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '4px 12px', borderRadius: '20px', fontSize: '14px' }}>Redux</span>
            </div>
            <a href="#" style={{ color: '#34d399', textDecoration: 'none' }}>Voir le projet →</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Prêt à démarrer votre <span style={gradientTextStyle}>projet</span> ?
          </h2>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
            Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {/* Informations de contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📧
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Email</div>
                <a href="mailto:shayacoca20@gmail.com" style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  shayacoca20@gmail.com
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'linear-gradient(135deg, #10b981, #3b82f6)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📞
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Téléphone</div>
                <a href="tel:053-3700551" style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  053-3700551
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📍
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Localisation</div>
                <div style={{ color: '#d1d5db' }}>Jérusalem • Tel Aviv</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Commençons votre projet</h3>
            <p style={{ color: '#d1d5db', marginBottom: '32px' }}>
              Rejoignez-moi pour créer des expériences digitales exceptionnelles
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link to="/register" style={{ ...buttonStyle, width: '100%', textAlign: 'center' }}>
                Créer un compte
              </Link>
              <Link 
                to="/login" 
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.2)', 
                  color: 'white', 
                  padding: '12px 24px', 
                  borderRadius: '12px', 
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center'
                }}
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'rgba(0, 0, 0, 0.2)', 
        backdropFilter: 'blur(20px)', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
        padding: '60px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={logoStyle}>
                  <span>SA</span>
                </div>
                <span style={{ marginLeft: '12px', fontWeight: 'bold', fontSize: '20px' }}>Shay Acoca</span>
              </div>
              <p style={{ color: '#d1d5db', marginBottom: '16px' }}>
                Créateur du futur digital, transformant vos idées en expériences exceptionnelles.
              </p>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                © 2024 Shay Acoca. Tous droits réservés.
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Navigation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#accueil" style={{ color: '#d1d5db', textDecoration: 'none' }}>Accueil</a>
                <a href="#services" style={{ color: '#d1d5db', textDecoration: 'none' }}>Services</a>
                <a href="#projets" style={{ color: '#d1d5db', textDecoration: 'none' }}>Projets</a>
                <a href="#contact" style={{ color: '#d1d5db', textDecoration: 'none' }}>Contact</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <a href="mailto:shayacoca20@gmail.com" style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  shayacoca20@gmail.com
                </a>
                <a href="tel:053-3700551" style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  053-3700551
                </a>
                <div style={{ color: '#d1d5db' }}>Jérusalem • Tel Aviv</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeCompleteWorking;
