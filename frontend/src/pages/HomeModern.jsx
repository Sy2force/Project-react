import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeModern = () => {
  const [currentService, setCurrentService] = useState(0);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #7c3aed 50%, #1e1b4b 75%, #0f0f23 100%)',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: 'white'
  };

  const sectionStyle = {
    padding: '80px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    transition: 'all 0.3s ease'
  };

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    fontWeight: 'bold'
  };

  const services = [
    {
      icon: '🌐',
      title: 'Développement Web',
      description: 'Applications web modernes avec React, Vue.js et les dernières technologies',
      features: ['React/Vue.js', 'Responsive Design', 'SEO Optimisé', 'Performance']
    },
    {
      icon: '📱',
      title: 'Applications Mobile',
      description: 'Apps natives et cross-platform pour iOS et Android',
      features: ['React Native', 'Flutter', 'iOS/Android', 'Push Notifications']
    },
    {
      icon: '📊',
      title: 'Dashboards',
      description: 'Interfaces d\'administration et tableaux de bord analytiques',
      features: ['Analytics', 'Temps Réel', 'Visualisations', 'Multi-utilisateurs']
    },
    {
      icon: '🎨',
      title: 'Design UI/UX',
      description: 'Conception d\'interfaces utilisateur modernes et intuitives',
      features: ['Figma/Sketch', 'Prototypage', 'User Research', 'Design System']
    }
  ];

  const stats = [
    { number: '25+', label: 'Projets Réalisés', color: '#3b82f6' },
    { number: '20+', label: 'Clients Satisfaits', color: '#10b981' },
    { number: '3+', label: 'Années d\'Expérience', color: '#f59e0b' },
    { number: '98%', label: 'Satisfaction Client', color: '#a78bfa' }
  ];

  const technologies = [
    'React', 'Vue.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 
    'AWS', 'Docker', 'Next.js', 'Express', 'Tailwind CSS', 'Figma'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={{ ...sectionStyle, paddingTop: '120px', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            margin: '0 auto 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>
            👨‍💻
          </div>
          
          <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '24px', lineHeight: '1.1' }}>
            Salut, je suis <span style={gradientTextStyle}>Shay Acoca</span>
          </h1>
          
          <p style={{ fontSize: '24px', color: '#d1d5db', marginBottom: '32px', maxWidth: '800px', margin: '0 auto 32px' }}>
            Développeur Full-Stack passionné qui transforme vos idées en solutions digitales innovantes
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projects" style={buttonStyle}>
              🚀 Voir mes projets
            </Link>
            <Link to="/contact" style={{
              ...buttonStyle,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              💬 Me contacter
            </Link>
          </div>
        </div>

        {/* Technologies */}
        <div style={{ marginTop: '60px' }}>
          <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '16px' }}>
            Technologies que j'utilise
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {technologies.map((tech, index) => (
              <span
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: '#d1d5db'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                ...cardStyle,
                textAlign: 'center',
                padding: '40px 24px'
              }}
            >
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: stat.color,
                marginBottom: '12px'
              }}>
                {stat.number}
              </div>
              <div style={{ color: '#d1d5db', fontSize: '16px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px' }}>
            Mes <span style={gradientTextStyle}>Services</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
            Des solutions complètes pour tous vos besoins digitaux
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                ...cardStyle,
                cursor: 'pointer',
                transform: currentService === index ? 'scale(1.02)' : 'scale(1)',
                borderColor: currentService === index ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {service.icon}
              </div>
              
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                {service.title}
              </h3>
              
              <p style={{ color: '#d1d5db', marginBottom: '24px', lineHeight: '1.6' }}>
                {service.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: '#60a5fa',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section style={sectionStyle}>
        <div style={{
          ...cardStyle,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
              À propos de moi
            </h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.7', marginBottom: '24px' }}>
              Développeur passionné basé en Israël, je crée des solutions digitales innovantes 
              depuis plus de 3 ans. Mon expertise couvre le développement full-stack moderne, 
              de la conception UI/UX à la mise en production.
            </p>
            <p style={{ color: '#d1d5db', lineHeight: '1.7', marginBottom: '32px' }}>
              J'accompagne mes clients dans la réalisation de leurs projets, en privilégiant 
              la qualité, la performance et l'expérience utilisateur.
            </p>
            <Link to="/about" style={buttonStyle}>
              En savoir plus
            </Link>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
                React
              </div>
              <div style={{ color: '#d1d5db', fontSize: '14px' }}>Expert</div>
            </div>
            
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
                Node.js
              </div>
              <div style={{ color: '#d1d5db', fontSize: '14px' }}>Avancé</div>
            </div>
            
            <div style={{
              background: 'rgba(139, 92, 246, 0.1)',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' }}>
                Design
              </div>
              <div style={{ color: '#d1d5db', fontSize: '14px' }}>UI/UX</div>
            </div>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
                Cloud
              </div>
              <div style={{ color: '#d1d5db', fontSize: '14px' }}>AWS</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={sectionStyle}>
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
        }}>
          <h3 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
            Prêt à démarrer votre projet ?
          </h3>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={buttonStyle}>
              Commencer maintenant
            </Link>
            <Link to="/projects" style={{
              ...buttonStyle,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Voir le portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeModern;
