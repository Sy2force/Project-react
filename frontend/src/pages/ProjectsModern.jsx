import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectsModern = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

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
    padding: '12px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const projects = [
    {
      id: 1,
      title: 'E-commerce Moderne',
      description: 'Plateforme de vente en ligne complète avec paiements sécurisés, gestion des stocks et tableau de bord administrateur.',
      longDescription: 'Une plateforme e-commerce complète développée avec React et Node.js, intégrant Stripe pour les paiements, un système de gestion des stocks en temps réel, et un tableau de bord administrateur avancé avec analytics.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      status: 'completed',
      year: '2024',
      client: 'TechStore Inc.',
      duration: '3 mois',
      features: ['Paiements sécurisés', 'Gestion stocks', 'Dashboard admin', 'Analytics'],
      link: 'https://demo-ecommerce.com',
      github: 'https://github.com/shayacoca/ecommerce-modern'
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Interface d\'administration avec visualisation de données en temps réel et rapports personnalisés.',
      longDescription: 'Dashboard analytique avancé avec visualisations interactives, rapports personnalisables, et intégration d\'APIs multiples pour une vue d\'ensemble complète des métriques business.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      category: 'dashboard',
      technologies: ['Vue.js', 'Chart.js', 'PostgreSQL', 'Express', 'Socket.io'],
      status: 'completed',
      year: '2024',
      client: 'DataViz Corp.',
      duration: '2 mois',
      features: ['Temps réel', 'Rapports PDF', 'Multi-utilisateurs', 'API REST'],
      link: 'https://demo-dashboard.com',
      github: 'https://github.com/shayacoca/dashboard-analytics'
    },
    {
      id: 3,
      title: 'Application Mobile',
      description: 'App mobile cross-platform avec synchronisation cloud et notifications push.',
      longDescription: 'Application mobile développée avec React Native, offrant une expérience utilisateur fluide avec synchronisation cloud, notifications push, et fonctionnalités offline.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
      status: 'in-progress',
      year: '2024',
      client: 'MobileFirst Ltd.',
      duration: '4 mois',
      features: ['Cross-platform', 'Push notifications', 'Offline mode', 'Cloud sync'],
      link: 'https://demo-mobile.com',
      github: 'https://github.com/shayacoca/mobile-app'
    },
    {
      id: 4,
      title: 'Portfolio Créatif',
      description: 'Site portfolio avec animations avancées et galerie interactive.',
      longDescription: 'Portfolio créatif avec animations CSS avancées, galerie interactive, et optimisations SEO pour une présence web professionnelle.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600',
      category: 'web',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
      status: 'completed',
      year: '2023',
      client: 'Creative Studio',
      duration: '1 mois',
      features: ['Animations CSS', 'SEO optimisé', 'Responsive', 'Performance'],
      link: 'https://demo-portfolio.com',
      github: 'https://github.com/shayacoca/portfolio-creative'
    },
    {
      id: 5,
      title: 'Système CRM',
      description: 'CRM complet avec gestion clients, leads et pipeline de ventes.',
      longDescription: 'Système CRM sur mesure avec gestion complète des clients, suivi des leads, pipeline de ventes automatisé, et rapports détaillés.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      category: 'dashboard',
      technologies: ['Angular', 'NestJS', 'MySQL', 'TypeScript'],
      status: 'completed',
      year: '2023',
      client: 'Sales Pro Inc.',
      duration: '5 mois',
      features: ['Gestion clients', 'Pipeline ventes', 'Rapports', 'Automatisation'],
      link: 'https://demo-crm.com',
      github: 'https://github.com/shayacoca/crm-system'
    },
    {
      id: 6,
      title: 'Blog Tech',
      description: 'Blog technique avec système de commentaires et newsletter.',
      longDescription: 'Plateforme de blog technique avec éditeur Markdown, système de commentaires, newsletter automatisée, et optimisations SEO avancées.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600',
      category: 'web',
      technologies: ['Gatsby', 'GraphQL', 'Contentful', 'Netlify'],
      status: 'completed',
      year: '2023',
      client: 'Tech Blog Corp.',
      duration: '2 mois',
      features: ['Markdown', 'SEO avancé', 'Newsletter', 'Commentaires'],
      link: 'https://demo-blog.com',
      github: 'https://github.com/shayacoca/tech-blog'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous', count: projects.length },
    { id: 'web', name: 'Web', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', name: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'dashboard', name: 'Dashboard', count: projects.filter(p => p.category === 'dashboard').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'planned': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in-progress': return 'En cours';
      case 'planned': return 'Planifié';
      default: return 'Inconnu';
    }
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Mes <span style={gradientTextStyle}>Projets</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Découvrez une sélection de mes réalisations les plus marquantes, des applications web aux solutions mobiles
          </p>
        </div>

        {/* Statistiques */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
              {projects.length}+
            </div>
            <div style={{ color: '#d1d5db' }}>Projets réalisés</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' }}>
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div style={{ color: '#d1d5db' }}>Projets terminés</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              {new Set(projects.flatMap(p => p.technologies)).size}
            </div>
            <div style={{ color: '#d1d5db' }}>Technologies maîtrisées</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              98%
            </div>
            <div style={{ color: '#d1d5db' }}>Satisfaction client</div>
          </div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section style={{ ...sectionStyle, paddingTop: '0' }}>
        <div style={{ marginBottom: '40px' }}>
          {/* Barre de recherche */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 50px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                🔍
              </div>
            </div>
          </div>

          {/* Filtres par catégorie */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: selectedCategory === category.id 
                    ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {category.name}
                <span style={{
                  background: selectedCategory === category.id 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Mode d'affichage */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: viewMode === 'grid' 
                  ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📱 Grille
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: viewMode === 'list' 
                  ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              📋 Liste
            </button>
          </div>
        </div>

        {/* Résultats */}
        <div style={{ marginBottom: '40px', textAlign: 'center', color: '#9ca3af' }}>
          {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
          {searchTerm && ` pour "${searchTerm}"`}
          {selectedCategory !== 'all' && ` dans la catégorie "${categories.find(c => c.id === selectedCategory)?.name}"`}
        </div>

        {/* Grille de projets */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? 'repeat(auto-fit, minmax(350px, 1fr))' 
            : '1fr',
          gap: '32px'
        }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                ...cardStyle,
                display: viewMode === 'list' ? 'flex' : 'block',
                gap: viewMode === 'list' ? '32px' : '0',
                alignItems: viewMode === 'list' ? 'center' : 'stretch'
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
              {/* Image du projet */}
              <div style={{
                width: viewMode === 'list' ? '300px' : '100%',
                height: viewMode === 'list' ? '200px' : '250px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: viewMode === 'grid' ? '24px' : '0',
                flexShrink: 0
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>

              {/* Contenu du projet */}
              <div style={{ flex: 1 }}>
                {/* Header avec statut */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                    {project.title}
                  </h3>
                  <div style={{
                    background: getStatusColor(project.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {getStatusText(project.status)}
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: '#d1d5db', marginBottom: '20px', lineHeight: '1.6' }}>
                  {project.description}
                </p>

                {/* Métadonnées */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '14px', color: '#9ca3af' }}>
                  <div>📅 {project.year}</div>
                  <div>👤 {project.client}</div>
                  <div>⏱️ {project.duration}</div>
                </div>

                {/* Technologies */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: '#60a5fa',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#a78bfa' }}>
                    Fonctionnalités clés :
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.features.map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', color: '#d1d5db', fontSize: '14px' }}>
                        <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', marginRight: '8px' }}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...buttonStyle,
                      fontSize: '14px',
                      padding: '10px 20px'
                    }}
                  >
                    🔗 Voir le projet
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...buttonStyle,
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontSize: '14px',
                      padding: '10px 20px'
                    }}
                  >
                    📂 Code source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '24px'
            }}>
              🔍
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              Aucun projet trouvé
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
              Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              style={buttonStyle}
            >
              Réinitialiser les filtres
            </button>
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
            Un projet en tête ?
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '32px', fontSize: '18px' }}>
            Discutons de vos besoins et créons ensemble votre prochaine solution digitale
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={buttonStyle}>
              Démarrer un projet
            </Link>
            <Link to="/about" style={{
              ...buttonStyle,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsModern;
