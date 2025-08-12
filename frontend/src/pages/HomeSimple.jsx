import React from 'react';
import { Link } from 'react-router-dom';

const HomeSimple = () => {
  return (
    <div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-content">
          <Link to="/" className="navbar-brand">Shay Acoca</Link>
          <ul className="navbar-nav">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/projects">Projets</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Shay Acoca</h1>
          <p>Créateur du Futur Digital</p>
          <p>Développeur Full Stack passionné, je transforme vos idées en expériences digitales extraordinaires avec les technologies les plus avancées.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn">Découvrir mes projets</Link>
            <Link to="/contact" className="btn">Me contacter</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
            Services & Expertise
          </h2>
          <p style={{ textAlign: 'center', fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem' }}>
            Des solutions complètes et innovantes pour transformer vos idées en réalité digitale
          </p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>Développement Web</h3>
              <p>Applications web modernes avec React, Node.js, MongoDB et les dernières technologies</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Design UI/UX</h3>
              <p>Interfaces utilisateur élégantes et expériences utilisateur optimisées pour l'engagement</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Performance & SEO</h3>
              <p>Optimisation avancée des performances et référencement pour une visibilité maximale</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>50+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>Projets Réalisés</div>
            </div>
            
            <div className="glass-card" style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👁️</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>5+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>Années d'Expérience</div>
            </div>
            
            <div className="glass-card" style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>100%</div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>Clients Satisfaits</div>
            </div>
            
            <div className="glass-card" style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>20+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>Technologies Maîtrisées</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="glass-card" style={{ textAlign: 'center', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Prêt à créer quelque chose d'extraordinaire ?
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
              Transformons ensemble votre vision en réalité digitale. Contactez-moi pour discuter de votre prochain projet.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn">Démarrer un projet</Link>
              <Link to="/about" className="btn">En savoir plus</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSimple;
