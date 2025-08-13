import { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutComplete = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #7c3aed 50%, #1e1b4b 75%, #0f0f23 100%)',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: 'white',
    paddingTop: '80px'
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
    padding: '12px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const skills = [
    { name: 'React/Next.js', level: 95, color: '#61dafb' },
    { name: 'Node.js/Express', level: 90, color: '#68a063' },
    { name: 'TypeScript', level: 88, color: '#3178c6' },
    { name: 'MongoDB/PostgreSQL', level: 85, color: '#47a248' },
    { name: 'Docker/AWS', level: 82, color: '#ff9900' },
    { name: 'Design UI/UX', level: 87, color: '#f24e1e' }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Lead Full-Stack Developer',
      company: 'Freelance',
      description: 'Développement d\'applications web modernes pour des clients internationaux'
    },
    {
      year: '2023',
      title: 'Senior Developer',
      company: 'Tech Startup',
      description: 'Architecture et développement de plateformes SaaS scalables'
    },
    {
      year: '2022',
      title: 'Full-Stack Developer',
      company: 'Digital Agency',
      description: 'Création de sites e-commerce et applications métier'
    },
    {
      year: '2021',
      title: 'Junior Developer',
      company: 'Web Studio',
      description: 'Apprentissage et développement de sites vitrines et blogs'
    }
  ];

  const certifications = [
    { name: 'AWS Certified Developer', year: '2024', issuer: 'Amazon Web Services' },
    { name: 'React Professional', year: '2023', issuer: 'Meta' },
    { name: 'Node.js Certified', year: '2023', issuer: 'OpenJS Foundation' },
    { name: 'Google Analytics', year: '2022', issuer: 'Google' }
  ];

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            À Propos de <span style={gradientTextStyle}>Shay Acoca</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Développeur Full-Stack passionné par l'innovation technologique et la création d'expériences digitales exceptionnelles
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          {/* Photo et présentation */}
          <div style={cardStyle}>
            <div style={{
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              SA
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              Shay Acoca
            </h3>
            <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '24px' }}>
              Créateur du Futur Digital
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <span>Jérusalem • Tel Aviv</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>📧</span>
                <a href="mailto:shayacoca20@gmail.com" style={{ color: '#60a5fa', textDecoration: 'none' }}>
                  shayacoca20@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>📞</span>
                <a href="tel:053-3700551" style={{ color: '#60a5fa', textDecoration: 'none' }}>
                  053-3700551
                </a>
              </div>
            </div>
          </div>

          {/* Mission et vision */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              Ma Mission
            </h3>
            <p style={{ color: '#d1d5db', marginBottom: '24px', lineHeight: '1.6' }}>
              Transformer les idées innovantes en solutions digitales performantes qui impactent positivement les utilisateurs et les entreprises.
            </p>
            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
              Mes Valeurs
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#d1d5db' }}>
                <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', marginRight: '12px' }}></div>
                Innovation constante
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#d1d5db' }}>
                <div style={{ width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', marginRight: '12px' }}></div>
                Qualité irréprochable
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#d1d5db' }}>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginRight: '12px' }}></div>
                Collaboration transparente
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#d1d5db' }}>
                <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%', marginRight: '12px' }}></div>
                Apprentissage continu
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onglets de navigation */}
      <section style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '8px', borderRadius: '16px' }}>
            {[
              { id: 'experience', label: 'Expérience' },
              { id: 'skills', label: 'Compétences' },
              { id: 'certifications', label: 'Certifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeTab === tab.id ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'experience' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
              Parcours <span style={gradientTextStyle}>Professionnel</span>
            </h3>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)',
                transform: 'translateX(-50%)'
              }}></div>
              {timeline.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '40px',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                }}>
                  <div style={{ flex: 1, padding: index % 2 === 0 ? '0 40px 0 0' : '0 0 0 40px' }}>
                    <div style={{
                      ...cardStyle,
                      textAlign: index % 2 === 0 ? 'right' : 'left'
                    }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
                        {item.year}
                      </div>
                      <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {item.title}
                      </h4>
                      <div style={{ color: '#a78bfa', marginBottom: '12px' }}>
                        {item.company}
                      </div>
                      <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    borderRadius: '50%',
                    zIndex: 1,
                    position: 'relative'
                  }}></div>
                  <div style={{ flex: 1 }}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
              Compétences <span style={gradientTextStyle}>Techniques</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontWeight: 'bold' }}>{skill.name}</span>
                    <span style={{ color: skill.color }}>{skill.level}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      background: skill.color,
                      borderRadius: '4px',
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
              Certifications <span style={gradientTextStyle}>& Formations</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={cardStyle}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    fontSize: '24px'
                  }}>
                    🏆
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {cert.name}
                  </h4>
                  <div style={{ color: '#a78bfa', marginBottom: '8px' }}>
                    {cert.issuer}
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section style={sectionStyle}>
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
        }}>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Prêt à collaborer ?
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '32px', fontSize: '18px' }}>
            Discutons de votre projet et créons ensemble quelque chose d'exceptionnel
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={buttonStyle}>
              Me contacter
            </Link>
            <Link to="/projects" style={{
              ...buttonStyle,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Voir mes projets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutComplete;
