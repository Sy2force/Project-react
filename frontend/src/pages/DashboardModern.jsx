import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardModern = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    projects: 0,
    views: 0,
    likes: 0,
    messages: 0
  });

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #7c3aed 50%, #1e1b4b 75%, #0f0f23 100%)',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: 'white',
    paddingTop: '80px'
  };

  const sectionStyle = {
    padding: '40px 20px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '24px',
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
    display: 'inline-block',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer'
  };

  // Simulation de données
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        projects: 25,
        views: 12450,
        likes: 890,
        messages: 34
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    { title: 'Nouveau Projet', icon: '➕', path: '/projects', color: '#3b82f6' },
    { title: 'Écrire Article', icon: '✍️', path: '/blog', color: '#10b981' },
    { title: 'Voir Messages', icon: '💬', path: '/contact', color: '#f59e0b' },
    { title: 'Modifier Profil', icon: '👤', path: '/profile', color: '#a78bfa' }
  ];

  const recentActivity = [
    { type: 'project', title: 'Nouveau projet E-commerce ajouté', time: '2h', icon: '🌐' },
    { type: 'like', title: '15 nouveaux likes sur le portfolio', time: '4h', icon: '❤️' },
    { type: 'message', title: 'Message de client potentiel', time: '6h', icon: '💬' },
    { type: 'view', title: '250 nouvelles vues cette semaine', time: '1j', icon: '👁️' },
    { type: 'blog', title: 'Article React publié', time: '2j', icon: '📝' }
  ];

  const upcomingTasks = [
    { title: 'Finaliser projet mobile', priority: 'high', due: '2 jours', progress: 85 },
    { title: 'Répondre aux messages clients', priority: 'medium', due: '1 jour', progress: 60 },
    { title: 'Mettre à jour le portfolio', priority: 'low', due: '1 semaine', progress: 30 },
    { title: 'Écrire article Next.js', priority: 'medium', due: '3 jours', progress: 45 }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRoleInfo = (role) => {
    switch (role) {
      case 'admin':
        return { 
          title: 'Administrateur', 
          color: '#ef4444', 
          permissions: ['Gestion complète', 'Tous les accès', 'Modération'] 
        };
      case 'business':
        return { 
          title: 'Business', 
          color: '#a78bfa', 
          permissions: ['Gestion projets', 'Analytics avancées', 'Support prioritaire'] 
        };
      default:
        return { 
          title: 'Utilisateur', 
          color: '#3b82f6', 
          permissions: ['Consultation', 'Favoris', 'Commentaires'] 
        };
    }
  };

  const roleInfo = getRoleInfo(user?.role);

  return (
    <div style={containerStyle}>
      {/* Header */}
      <section style={sectionStyle}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>
                Bonjour <span style={gradientTextStyle}>{user?.name || 'Utilisateur'}</span> 👋
              </h1>
              <p style={{ color: '#d1d5db', fontSize: '18px' }}>
                Voici un aperçu de votre activité récente
              </p>
            </div>
            
            <div style={{
              ...cardStyle,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: roleInfo.color,
                borderRadius: '50%'
              }}></div>
              <span style={{ color: roleInfo.color, fontWeight: 'bold' }}>
                {roleInfo.title}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Projets</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.projects}</p>
              </div>
              <div style={{ fontSize: '32px' }}>🚀</div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#10b981' }}>
              +3 ce mois
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Vues</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{stats.views.toLocaleString()}</p>
              </div>
              <div style={{ fontSize: '32px' }}>👁️</div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#10b981' }}>
              +12% cette semaine
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Likes</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{stats.likes}</p>
              </div>
              <div style={{ fontSize: '32px' }}>❤️</div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#10b981' }}>
              +25 aujourd'hui
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Messages</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#a78bfa' }}>{stats.messages}</p>
              </div>
              <div style={{ fontSize: '32px' }}>💬</div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#f59e0b' }}>
              5 non lus
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          
          {/* Actions Rapides */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Actions Rapides
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  style={{
                    ...cardStyle,
                    textDecoration: 'none',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: `rgba(${action.color === '#3b82f6' ? '59, 130, 246' : 
                                      action.color === '#10b981' ? '16, 185, 129' :
                                      action.color === '#f59e0b' ? '245, 158, 11' :
                                      '167, 139, 250'}, 0.1)`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = action.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {action.icon}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {action.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activité Récente */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Activité Récente
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((activity, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '20px' }}>
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', marginBottom: '2px' }}>
                      {activity.title}
                    </p>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                      il y a {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tâches à Venir */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Tâches à Venir
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {upcomingTasks.map((task, index) => (
                <div key={index} style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  border: `1px solid ${getPriorityColor(task.priority)}20`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {task.title}
                      </p>
                      <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                        Échéance: {task.due}
                      </p>
                    </div>
                    <div style={{
                      background: getPriorityColor(task.priority),
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {task.priority}
                    </div>
                  </div>
                  
                  {/* Barre de progression */}
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${task.progress}%`,
                        height: '100%',
                        background: getPriorityColor(task.priority),
                        borderRadius: '3px',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '12px', color: getPriorityColor(task.priority), fontWeight: 'bold' }}>
                    {task.progress}% complété
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions & Accès */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Vos Permissions
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: `linear-gradient(135deg, ${roleInfo.color}, ${roleInfo.color}80)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {user?.role === 'admin' ? '👑' : user?.role === 'business' ? '💼' : '👤'}
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', color: roleInfo.color }}>
                    {roleInfo.title}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Niveau d'accès
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {roleInfo.permissions.map((permission, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#d1d5db'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#10b981',
                    borderRadius: '50%'
                  }}></div>
                  {permission}
                </div>
              ))}
            </div>

            {user?.role !== 'admin' && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Link to="/contact" style={{
                  ...buttonStyle,
                  fontSize: '12px',
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  Demander une mise à niveau
                </Link>
              </div>
            )}
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
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
            Prêt à créer quelque chose d'incroyable ?
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '24px' }}>
            Explorez toutes les fonctionnalités disponibles
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projects" style={buttonStyle}>
              Voir mes projets
            </Link>
            <Link to="/services" style={{
              ...buttonStyle,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Découvrir les services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardModern;
