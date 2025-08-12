import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Star, 
  Heart, 
  Eye, 
  Download, 
  Share2, 
  Play, 
  Pause, 
  Volume2,
  Settings,
  Bell,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  X,
  Check
} from 'lucide-react';

const Showcase = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { 
      scale: 1.05, 
      y: -10,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  // Données de démonstration
  const showcaseItems = [
    {
      id: 1,
      title: "Interface Glassmorphism",
      description: "Design moderne avec effets de transparence et de flou",
      category: "UI Design",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
      likes: 124,
      views: 2340,
      featured: true
    },
    {
      id: 2,
      title: "Animations Fluides",
      description: "Micro-interactions et transitions avec Framer Motion",
      category: "Animation",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      likes: 89,
      views: 1567,
      featured: false
    },
    {
      id: 3,
      title: "Composants Réutilisables",
      description: "Système de design cohérent et modulaire",
      category: "Components",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      likes: 156,
      views: 2890,
      featured: true
    }
  ];

  const stats = [
    { label: "Projets Réalisés", value: "50+", icon: Star },
    { label: "Clients Satisfaits", value: "30+", icon: Heart },
    { label: "Années d'Expérience", value: "5+", icon: Calendar },
    { label: "Technologies Maîtrisées", value: "20+", icon: Settings }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem 0',
      background: 'transparent'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem' 
      }}>
        {/* Header Section */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
            }}
            variants={itemVariants}
          >
            Design Showcase
          </motion.h1>
          
          <motion.p
            style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}
            variants={itemVariants}
          >
            Découvrez tous les éléments de design et composants de cette plateforme moderne
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              variants={cardVariants}
              whileHover="hover"
            >
              <stat.icon 
                size={48} 
                style={{ 
                  color: '#667eea', 
                  margin: '0 auto 1rem',
                  filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.5))'
                }} 
              />
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls Section */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search Bar */}
          <div style={{ position: 'relative', minWidth: '300px' }}>
            <Search 
              size={20} 
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.5)'
              }}
            />
            <input
              type="text"
              placeholder="Rechercher..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* View Controls */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '0.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'grid' ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'list' ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <List size={20} />
            </button>
          </div>
        </motion.div>

        {/* Showcase Grid */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(350px, 1fr))' : '1fr',
            gap: '2rem',
            marginBottom: '4rem'
          }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                {item.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 215, 0, 0.9)',
                    borderRadius: '20px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Star size={12} />
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}>
                      {item.title}
                    </h3>
                    <span style={{
                      background: 'rgba(102, 126, 234, 0.2)',
                      color: '#667eea',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {item.category}
                    </span>
                  </div>
                  <ChevronRight 
                    size={20} 
                    style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      transform: activeCard === item.id ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}>
                  {item.description}
                </p>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem'
                    }}>
                      <Heart size={14} />
                      {item.likes}
                    </span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem'
                    }}>
                      <Eye size={14} />
                      {item.views}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      background: 'rgba(102, 126, 234, 0.2)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      color: '#667eea',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      <Share2 size={16} />
                    </button>
                    <button style={{
                      background: 'rgba(102, 126, 234, 0.2)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      color: '#667eea',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {activeCard === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6'
                    }}>
                      Contenu détaillé sur {item.title}. Cette section peut contenir plus d'informations,
                      des liens vers le projet, des captures d'écran supplémentaires, ou d'autres détails
                      pertinents pour présenter le travail réalisé.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            marginBottom: '2rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Prêt à créer quelque chose d'extraordinaire ?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Transformons ensemble votre vision en réalité digitale avec un design moderne et des fonctionnalités avancées.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0px)';
                e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
              }}
            >
              <Star size={20} />
              Démarrer un projet
            </button>
            <button style={{
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              padding: '1rem 2rem',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}>
              <Github size={20} />
              Voir le code
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal Example */}
      {showModal && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              textAlign: 'center'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                Contactez-moi
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem'
            }}>
              Discutons de votre projet et créons quelque chose d'extraordinaire ensemble !
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem 1.5rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Mail size={16} />
                Email
              </button>
              <button style={{
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '0.75rem 1.5rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Phone size={16} />
                Appel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Showcase;
