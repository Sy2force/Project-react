import { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutModern = () => {
  const [activeTab, setActiveTab] = useState('story');

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
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 90, category: 'Backend' },
    { name: 'TypeScript', level: 88, category: 'Language' },
    { name: 'MongoDB', level: 85, category: 'Database' },
    { name: 'Vue.js', level: 82, category: 'Frontend' },
    { name: 'PostgreSQL', level: 80, category: 'Database' },
    { name: 'AWS', level: 75, category: 'Cloud' },
    { name: 'Docker', level: 70, category: 'DevOps' }
  ];

  const experience = [
    {
      year: '2024',
      title: 'Développeur Full-Stack Senior',
      company: 'Freelance',
      description: 'Développement d\'applications web et mobiles pour divers clients internationaux.',
      achievements: ['15+ projets livrés', 'Satisfaction client 98%', 'Technologies modernes']
    },
    {
      year: '2023',
      title: 'Développeur React',
      company: 'Tech Startup',
      description: 'Développement d\'une plateforme SaaS avec React et Node.js.',
      achievements: ['Architecture scalable', 'Performance optimisée', 'Équipe de 5 développeurs']
    },
    {
      year: '2022',
      title: 'Développeur Junior',
      company: 'Agence Web',
      description: 'Création de sites web et applications pour PME.',
      achievements: ['20+ sites web', 'Responsive design', 'SEO optimisé']
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'Je vise toujours la perfection dans chaque ligne de code et chaque pixel de design.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'J\'utilise les dernières technologies pour créer des solutions modernes et performantes.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Je crois en la communication transparente et la collaboration étroite avec mes clients.'
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Chaque application que je développe est optimisée pour la vitesse et l\'efficacité.'
    }
  ];

  const certifications = [
    { name: 'AWS Certified Developer', year: '2024', issuer: 'Amazon' },
    { name: 'React Advanced Patterns', year: '2023', issuer: 'Meta' },
    { name: 'Node.js Certification', year: '2023', issuer: 'OpenJS Foundation' },
    { name: 'MongoDB University', year: '2022', issuer: 'MongoDB Inc.' }
  ];

  const hobbies = [
    { icon: '💻', name: 'Open Source', desc: 'Contribution à des projets communautaires' },
    { icon: '📚', name: 'Veille Tech', desc: 'Apprentissage continu des nouvelles technologies' },
    { icon: '🎮', name: 'Gaming', desc: 'Développement de petits jeux en JavaScript' },
    { icon: '🏃', name: 'Sport', desc: 'Course à pied et fitness pour l\'équilibre' }
  ];

  const tabContent = {
    story: (
      <div>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          Mon Histoire
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div>
            <p style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '24px' }}>
              Passionné par le développement web depuis mes débuts en informatique, j'ai rapidement découvert 
              ma vocation dans la création d'applications modernes et performantes. Mon parcours a commencé 
              par la curiosité de comprendre comment fonctionnent les sites web.
            </p>
            <p style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '24px' }}>
              Aujourd'hui, avec plus de 3 ans d'expérience, je me spécialise dans le développement full-stack 
              avec React, Node.js et les technologies cloud. Chaque projet est une opportunité d'apprendre 
              et de créer quelque chose d'unique.
            </p>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Basé en Israël, je travaille avec des clients du monde entier, apportant une perspective 
              internationale à chaque solution que je développe.
            </p>
          </div>
          <div style={cardStyle}>
            <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Chiffres Clés
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Projets réalisés</span>
                <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>25+</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Clients satisfaits</span>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>20+</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Années d'expérience</span>
                <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>3+</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Technologies maîtrisées</span>
                <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>15+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    skills: (
      <div>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          Compétences Techniques
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {skills.map((skill, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>{skill.name}</span>
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>{skill.category}</span>
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
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  borderRadius: '4px',
                  transition: 'width 1s ease'
                }}></div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '4px', fontSize: '14px', color: '#60a5fa' }}>
                {skill.level}%
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    experience: (
      <div>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          Expérience Professionnelle
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {experience.map((exp, index) => (
            <div key={index} style={{
              ...cardStyle,
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '14px',
                minWidth: '60px',
                textAlign: 'center'
              }}>
                {exp.year}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {exp.title}
                </h4>
                <div style={{ color: '#a78bfa', fontWeight: 'bold', marginBottom: '12px' }}>
                  {exp.company}
                </div>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '16px' }}>
                  {exp.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.achievements.map((achievement, i) => (
                    <span key={i} style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px'
                    }}>
                      ✓ {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    values: (
      <div>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          Mes Valeurs
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {values.map((value, index) => (
            <div key={index} style={{
              ...cardStyle,
              textAlign: 'center',
              padding: '24px'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {value.icon}
              </div>
              <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>
                {value.title}
              </h4>
              <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {/* Certifications */}
          <div style={cardStyle}>
            <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              🏆 Certifications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{cert.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: '14px' }}>{cert.issuer}</div>
                  </div>
                  <div style={{ color: '#60a5fa', fontWeight: 'bold' }}>
                    {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div style={cardStyle}>
            <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              🎯 Centres d'Intérêt
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {hobbies.map((hobby, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '24px' }}>
                    {hobby.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{hobby.name}</div>
                    <div style={{ color: '#d1d5db', fontSize: '14px' }}>{hobby.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            margin: '0 auto 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px'
          }}>
            👨‍💻
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            À propos de <span style={gradientTextStyle}>Shay Acoca</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Développeur Full-Stack passionné, créateur de solutions digitales innovantes et performantes
          </p>
        </div>

        {/* Stats rapides */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
              25+
            </div>
            <div style={{ color: '#d1d5db' }}>Projets réalisés</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              3+
            </div>
            <div style={{ color: '#d1d5db' }}>Années d'expérience</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              98%
            </div>
            <div style={{ color: '#d1d5db' }}>Satisfaction client</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a78bfa', marginBottom: '8px' }}>
              15+
            </div>
            <div style={{ color: '#d1d5db' }}>Technologies</div>
          </div>
        </div>
      </section>

      {/* Navigation par onglets */}
      <section style={{ ...sectionStyle, paddingTop: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { id: 'story', label: 'Mon Histoire', icon: '📖' },
            { id: 'skills', label: 'Compétences', icon: '💻' },
            { id: 'experience', label: 'Expérience', icon: '🚀' },
            { id: 'values', label: 'Valeurs', icon: '⭐' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu des onglets */}
        <div style={cardStyle}>
          {tabContent[activeTab]}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={sectionStyle}>
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
        }}>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Travaillons ensemble
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '32px', fontSize: '18px' }}>
            Vous avez un projet en tête ? Discutons de la façon dont je peux vous aider à le concrétiser
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

export default AboutModern;
