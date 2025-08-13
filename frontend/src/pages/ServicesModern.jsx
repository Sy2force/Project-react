import { useState } from 'react';
import { Link } from 'react-router-dom';

const ServicesModern = () => {
  const [selectedService, setSelectedService] = useState(null);

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
    transition: 'all 0.3s ease',
    cursor: 'pointer'
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
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer'
  };

  const services = [
    {
      id: 1,
      icon: '🌐',
      title: 'Développement Web',
      subtitle: 'Sites web modernes et performants',
      description: 'Création d\'applications web sur mesure avec les dernières technologies. De la conception à la mise en ligne, je vous accompagne dans votre projet digital.',
      features: [
        'React, Vue.js, Angular',
        'Responsive Design',
        'SEO Optimisé',
        'Performance maximale',
        'Sécurité renforcée',
        'Maintenance incluse'
      ],
      technologies: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      pricing: {
        basic: { price: '1500€', features: ['Site vitrine', '5 pages', 'Responsive', 'SEO de base'] },
        pro: { price: '3500€', features: ['Site dynamique', '10 pages', 'CMS', 'SEO avancé', 'Analytics'] },
        premium: { price: '6000€', features: ['Application web', 'Illimité', 'Dashboard', 'API', 'Support 24/7'] }
      },
      timeline: '2-6 semaines',
      examples: [
        { name: 'E-commerce Fashion', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300' },
        { name: 'Portfolio Créatif', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300' }
      ]
    },
    {
      id: 2,
      icon: '📱',
      title: 'Applications Mobile',
      subtitle: 'Apps iOS et Android natives',
      description: 'Développement d\'applications mobiles cross-platform avec React Native. Une seule base de code pour iOS et Android.',
      features: [
        'React Native',
        'iOS & Android',
        'Push Notifications',
        'Offline Mode',
        'App Store Ready',
        'Maintenance incluse'
      ],
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'AsyncStorage'],
      pricing: {
        basic: { price: '3000€', features: ['App simple', '5 écrans', 'Design de base', 'Store deployment'] },
        pro: { price: '6000€', features: ['App avancée', '15 écrans', 'API intégration', 'Push notifications'] },
        premium: { price: '10000€', features: ['App complexe', 'Illimité', 'Backend complet', 'Analytics avancées'] }
      },
      timeline: '3-8 semaines',
      examples: [
        { name: 'App E-commerce', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300' },
        { name: 'App Fitness', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300' }
      ]
    },
    {
      id: 3,
      icon: '📊',
      title: 'Dashboards & Analytics',
      subtitle: 'Interfaces d\'administration',
      description: 'Création de tableaux de bord personnalisés avec visualisations de données en temps réel et rapports détaillés.',
      features: [
        'Visualisations interactives',
        'Temps réel',
        'Rapports PDF',
        'Multi-utilisateurs',
        'Permissions avancées',
        'Export de données'
      ],
      technologies: ['React', 'Chart.js', 'D3.js', 'Node.js', 'PostgreSQL'],
      pricing: {
        basic: { price: '2000€', features: ['Dashboard simple', '5 graphiques', 'Export CSV', 'Support email'] },
        pro: { price: '4500€', features: ['Dashboard avancé', '15 graphiques', 'Temps réel', 'Multi-users'] },
        premium: { price: '8000€', features: ['Solution complète', 'Illimité', 'API complète', 'Support prioritaire'] }
      },
      timeline: '2-5 semaines',
      examples: [
        { name: 'Analytics E-commerce', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300' },
        { name: 'CRM Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300' }
      ]
    },
    {
      id: 4,
      icon: '🎨',
      title: 'Design UI/UX',
      subtitle: 'Conception d\'interfaces',
      description: 'Conception d\'interfaces utilisateur modernes et intuitives. De l\'idée au prototype interactif.',
      features: [
        'Recherche utilisateur',
        'Wireframes',
        'Prototypes interactifs',
        'Design System',
        'Tests utilisateurs',
        'Handoff développeur'
      ],
      technologies: ['Figma', 'Sketch', 'Adobe XD', 'Principle', 'InVision'],
      pricing: {
        basic: { price: '800€', features: ['5 écrans', 'Wireframes', 'Design mobile', 'Style guide'] },
        pro: { price: '1800€', features: ['15 écrans', 'Prototype', 'Design system', 'Tests utilisateurs'] },
        premium: { price: '3500€', features: ['Projet complet', 'Illimité', 'Animation', 'Support continu'] }
      },
      timeline: '1-4 semaines',
      examples: [
        { name: 'App Banking', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300' },
        { name: 'Dashboard SaaS', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300' }
      ]
    },
    {
      id: 5,
      icon: '🚀',
      title: 'Consulting & Formation',
      subtitle: 'Accompagnement technique',
      description: 'Conseil technique, audit de code, formation d\'équipes et accompagnement dans vos projets digitaux.',
      features: [
        'Audit technique',
        'Architecture logicielle',
        'Formation équipes',
        'Code review',
        'Optimisation performance',
        'Stratégie technique'
      ],
      technologies: ['Méthodologies', 'Best Practices', 'Architecture', 'Performance', 'Sécurité'],
      pricing: {
        basic: { price: '150€/h', features: ['Consultation', '1h minimum', 'Rapport écrit', 'Suivi email'] },
        pro: { price: '1200€/j', features: ['Journée complète', 'Audit détaillé', 'Plan d\'action', 'Formation'] },
        premium: { price: '5000€/sem', features: ['Semaine complète', 'Accompagnement', 'Formation équipe', 'Support continu'] }
      },
      timeline: '1 jour - 1 mois',
      examples: [
        { name: 'Audit E-commerce', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300' },
        { name: 'Formation React', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300' }
      ]
    },
    {
      id: 6,
      icon: '⚡',
      title: 'Maintenance & Support',
      subtitle: 'Support technique continu',
      description: 'Maintenance, mises à jour, corrections de bugs et support technique pour vos applications existantes.',
      features: [
        'Mises à jour régulières',
        'Corrections de bugs',
        'Monitoring 24/7',
        'Sauvegardes automatiques',
        'Support prioritaire',
        'Rapports mensuels'
      ],
      technologies: ['Monitoring', 'CI/CD', 'Docker', 'AWS', 'Sentry'],
      pricing: {
        basic: { price: '200€/mois', features: ['5h support', 'Mises à jour', 'Monitoring', 'Email support'] },
        pro: { price: '500€/mois', features: ['15h support', 'Corrections bugs', 'Optimisations', 'Phone support'] },
        premium: { price: '1000€/mois', features: ['Support illimité', 'Développement', 'Priorité max', 'Dédiée'] }
      },
      timeline: 'Continu',
      examples: [
        { name: 'Maintenance E-commerce', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300' },
        { name: 'Support SaaS', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300' }
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Découverte',
      description: 'Analyse de vos besoins et définition du projet',
      icon: '🔍',
      duration: '1-2 jours'
    },
    {
      step: '02',
      title: 'Conception',
      description: 'Wireframes, maquettes et architecture technique',
      icon: '🎨',
      duration: '3-5 jours'
    },
    {
      step: '03',
      title: 'Développement',
      description: 'Codage, tests et intégrations',
      icon: '⚡',
      duration: '1-6 semaines'
    },
    {
      step: '04',
      title: 'Livraison',
      description: 'Tests finaux, déploiement et formation',
      icon: '🚀',
      duration: '2-3 jours'
    }
  ];

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Mes <span style={gradientTextStyle}>Services</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Des solutions digitales complètes pour transformer vos idées en réalité. 
            De la conception à la maintenance, je vous accompagne à chaque étape.
          </p>
        </div>

        {/* Stats rapides */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
              25+
            </div>
            <div style={{ color: '#d1d5db' }}>Projets livrés</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              98%
            </div>
            <div style={{ color: '#d1d5db' }}>Satisfaction client</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              24/7
            </div>
            <div style={{ color: '#d1d5db' }}>Support disponible</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a78bfa', marginBottom: '8px' }}>
              3+
            </div>
            <div style={{ color: '#d1d5db' }}>Années d'expérience</div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                ...cardStyle,
                transform: selectedService === service.id ? 'scale(1.02)' : 'scale(1)',
                borderColor: selectedService === service.id ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
              }}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              onMouseEnter={(e) => {
                if (selectedService !== service.id) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedService !== service.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {service.icon}
              </div>
              
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                {service.title}
              </h3>
              
              <p style={{ color: '#a78bfa', marginBottom: '16px', fontWeight: 'bold' }}>
                {service.subtitle}
              </p>
              
              <p style={{ color: '#d1d5db', marginBottom: '24px', lineHeight: '1.6' }}>
                {service.description}
              </p>

              {/* Features principales */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '24px' }}>
                {service.features.slice(0, 4).map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', color: '#d1d5db', fontSize: '14px' }}>
                    <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', marginRight: '8px' }}></div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Prix de base */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>À partir de</span>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#60a5fa' }}>
                    {service.pricing.basic.price}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>Délai</span>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>
                    {service.timeline}
                  </div>
                </div>
              </div>

              <button
                style={{
                  ...buttonStyle,
                  width: '100%',
                  fontSize: '14px',
                  padding: '12px 24px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Scroll vers le formulaire de contact ou ouvrir modal
                }}
              >
                {selectedService === service.id ? 'Voir les détails ↓' : 'En savoir plus'}
              </button>

              {/* Détails étendus */}
              {selectedService === service.id && (
                <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  {/* Technologies */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#a78bfa' }}>
                      Technologies utilisées
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {service.technologies.map((tech, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#60a5fa',
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '12px'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tarifs détaillés */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#a78bfa' }}>
                      Tarifs détaillés
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                      {Object.entries(service.pricing).map(([plan, details]) => (
                        <div key={plan} style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px' }}>
                            {details.price}
                          </div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px', textTransform: 'capitalize' }}>
                            {plan}
                          </div>
                          <div style={{ fontSize: '11px', color: '#d1d5db' }}>
                            {details.features.slice(0, 2).join(' • ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exemples */}
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#a78bfa' }}>
                      Exemples de réalisations
                    </h4>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {service.examples.map((example, index) => (
                        <div key={index} style={{
                          flex: 1,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          background: 'rgba(255, 255, 255, 0.03)'
                        }}>
                          <img
                            src={example.image}
                            alt={example.name}
                            style={{
                              width: '100%',
                              height: '80px',
                              objectFit: 'cover'
                            }}
                          />
                          <div style={{ padding: '8px', fontSize: '12px', color: '#d1d5db' }}>
                            {example.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Processus */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
            Mon <span style={gradientTextStyle}>Processus</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
            Une méthodologie éprouvée pour garantir le succès de votre projet
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          {processSteps.map((step, index) => (
            <div key={index} style={{
              ...cardStyle,
              textAlign: 'center',
              cursor: 'default',
              position: 'relative'
            }}>
              {/* Numéro d'étape */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {step.step}
              </div>

              <div style={{ fontSize: '32px', marginBottom: '16px', marginTop: '16px' }}>
                {step.icon}
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>
                {step.title}
              </h3>

              <p style={{ color: '#d1d5db', marginBottom: '16px', lineHeight: '1.6' }}>
                {step.description}
              </p>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#60a5fa',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {step.duration}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={sectionStyle}>
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
          cursor: 'default'
        }}>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Prêt à démarrer votre projet ?
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '32px', fontSize: '18px' }}>
            Discutons de vos besoins et trouvons la solution parfaite pour votre entreprise
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={buttonStyle}>
              Demander un devis
            </Link>
            <Link to="/projects" style={{
              ...buttonStyle,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Voir mes réalisations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesModern;
