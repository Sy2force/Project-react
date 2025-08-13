import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogModern = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

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

  const articles = [
    {
      id: 1,
      title: 'Les Tendances du Développement Web en 2024',
      excerpt: 'Découvrez les technologies et frameworks qui dominent le développement web cette année.',
      content: 'Le développement web évolue rapidement en 2024. React reste dominant, mais de nouveaux frameworks comme Astro et SvelteKit gagnent en popularité...',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
      category: 'web',
      tags: ['React', 'JavaScript', 'Tendances', 'Web Development'],
      author: 'Shay Acoca',
      date: '2024-01-15',
      readTime: '5 min',
      views: 1250,
      likes: 89,
      featured: true
    },
    {
      id: 2,
      title: 'Optimisation des Performances React',
      excerpt: 'Techniques avancées pour améliorer les performances de vos applications React.',
      content: 'L\'optimisation des performances est cruciale pour une bonne expérience utilisateur. Voici les meilleures pratiques...',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
      category: 'react',
      tags: ['React', 'Performance', 'Optimisation', 'JavaScript'],
      author: 'Shay Acoca',
      date: '2024-01-10',
      readTime: '8 min',
      views: 980,
      likes: 67,
      featured: true
    },
    {
      id: 3,
      title: 'Introduction à Node.js et Express',
      excerpt: 'Guide complet pour débuter avec Node.js et créer votre première API REST.',
      content: 'Node.js révolutionne le développement backend JavaScript. Dans ce guide, nous allons créer une API complète...',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600',
      category: 'backend',
      tags: ['Node.js', 'Express', 'API', 'Backend'],
      author: 'Shay Acoca',
      date: '2024-01-05',
      readTime: '12 min',
      views: 1450,
      likes: 102,
      featured: false
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox : Quand les utiliser ?',
      excerpt: 'Comparaison détaillée entre CSS Grid et Flexbox avec des exemples pratiques.',
      content: 'CSS Grid et Flexbox sont deux outils puissants pour la mise en page. Voici comment choisir...',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      category: 'css',
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
      author: 'Shay Acoca',
      date: '2023-12-28',
      readTime: '6 min',
      views: 875,
      likes: 54,
      featured: false
    },
    {
      id: 5,
      title: 'Sécurité des Applications Web Modernes',
      excerpt: 'Les meilleures pratiques de sécurité pour protéger vos applications web.',
      content: 'La sécurité web est plus importante que jamais. Découvrez les vulnérabilités courantes et comment les éviter...',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600',
      category: 'security',
      tags: ['Sécurité', 'Web', 'HTTPS', 'Authentication'],
      author: 'Shay Acoca',
      date: '2023-12-20',
      readTime: '10 min',
      views: 1120,
      likes: 78,
      featured: false
    },
    {
      id: 6,
      title: 'MongoDB vs PostgreSQL : Le Guide Complet',
      excerpt: 'Comparaison approfondie entre MongoDB et PostgreSQL pour choisir la bonne base de données.',
      content: 'Le choix de la base de données est crucial pour votre projet. Analysons les avantages et inconvénients...',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600',
      category: 'database',
      tags: ['MongoDB', 'PostgreSQL', 'Database', 'NoSQL'],
      author: 'Shay Acoca',
      date: '2023-12-15',
      readTime: '15 min',
      views: 1680,
      likes: 125,
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous', count: articles.length },
    { id: 'web', name: 'Web Dev', count: articles.filter(a => a.category === 'web').length },
    { id: 'react', name: 'React', count: articles.filter(a => a.category === 'react').length },
    { id: 'backend', name: 'Backend', count: articles.filter(a => a.category === 'backend').length },
    { id: 'css', name: 'CSS', count: articles.filter(a => a.category === 'css').length },
    { id: 'security', name: 'Sécurité', count: articles.filter(a => a.category === 'security').length },
    { id: 'database', name: 'Database', count: articles.filter(a => a.category === 'database').length }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const featuredArticles = articles.filter(article => article.featured);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      web: '#3b82f6',
      react: '#06b6d4',
      backend: '#10b981',
      css: '#f59e0b',
      security: '#ef4444',
      database: '#8b5cf6'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Blog <span style={gradientTextStyle}>Tech</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Découvrez mes articles sur le développement web, les nouvelles technologies et les meilleures pratiques
          </p>
        </div>

        {/* Statistiques du blog */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
              {articles.length}
            </div>
            <div style={{ color: '#d1d5db' }}>Articles publiés</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
            </div>
            <div style={{ color: '#d1d5db' }}>Vues totales</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              {articles.reduce((sum, article) => sum + article.likes, 0)}
            </div>
            <div style={{ color: '#d1d5db' }}>Likes reçus</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', padding: '24px', cursor: 'default' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#a78bfa', marginBottom: '8px' }}>
              {Math.round(articles.reduce((sum, article) => sum + parseInt(article.readTime), 0) / articles.length)}
            </div>
            <div style={{ color: '#d1d5db' }}>Min lecture moy.</div>
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      {featuredArticles.length > 0 && (
        <section style={{ ...sectionStyle, paddingTop: '0' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
            ⭐ Articles en Vedette
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  position: 'relative'
                }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: getCategoryColor(article.category),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {categories.find(c => c.id === article.category)?.name}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(255, 215, 0, 0.9)',
                    color: '#000',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ⭐ Vedette
                  </div>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>
                  {article.title}
                </h3>

                <p style={{ color: '#d1d5db', marginBottom: '16px', lineHeight: '1.6' }}>
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '14px', color: '#9ca3af' }}>
                  <div>📅 {formatDate(article.date)}</div>
                  <div>⏱️ {article.readTime}</div>
                  <div>👁️ {article.views}</div>
                  <div>❤️ {article.likes}</div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {article.tags.slice(0, 3).map((tag, index) => (
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
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/blog/${article.id}`}
                  style={{
                    ...buttonStyle,
                    fontSize: '14px',
                    padding: '10px 20px',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  Lire l'article
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filtres et recherche */}
      <section style={{ ...sectionStyle, paddingTop: '0' }}>
        <div style={{ marginBottom: '40px' }}>
          {/* Barre de recherche */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Rechercher un article..."
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

          {/* Filtres et tri */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            {/* Catégories */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedCategory === category.id 
                      ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {category.name}
                  <span style={{
                    background: selectedCategory === category.id 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    fontSize: '11px'
                  }}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Tri */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="date">Plus récents</option>
              <option value="views">Plus vus</option>
              <option value="likes">Plus aimés</option>
            </select>
          </div>

          {/* Résultats */}
          <div style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '32px' }}>
            {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
            {selectedCategory !== 'all' && ` dans "${categories.find(c => c.id === selectedCategory)?.name}"`}
          </div>
        </div>

        {/* Liste des articles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{
                width: '100%',
                height: '180px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '16px',
                position: 'relative'
              }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: getCategoryColor(article.category),
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {categories.find(c => c.id === article.category)?.name}
                </div>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                {article.title}
              </h3>

              <p style={{ color: '#d1d5db', marginBottom: '12px', lineHeight: '1.5', fontSize: '14px' }}>
                {article.excerpt}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '12px', color: '#9ca3af' }}>
                <div>📅 {formatDate(article.date)}</div>
                <div>⏱️ {article.readTime}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '12px', color: '#9ca3af' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span>👁️ {article.views}</span>
                  <span>❤️ {article.likes}</span>
                </div>
                <div>✍️ {article.author}</div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {article.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: '#60a5fa',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/blog/${article.id}`}
                style={{
                  ...buttonStyle,
                  fontSize: '14px',
                  padding: '8px 16px',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Lire la suite
              </Link>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>📝</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              Aucun article trouvé
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

      {/* Newsletter */}
      <section style={sectionStyle}>
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
          cursor: 'default'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
            📬 Restez informé
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '32px', fontSize: '16px' }}>
            Recevez les derniers articles et conseils tech directement dans votre boîte mail
          </p>
          <div style={{ display: 'flex', gap: '12px', maxWidth: '400px', margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="votre@email.com"
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                minWidth: '200px'
              }}
            />
            <button style={{
              ...buttonStyle,
              padding: '12px 24px',
              fontSize: '14px'
            }}>
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogModern;
