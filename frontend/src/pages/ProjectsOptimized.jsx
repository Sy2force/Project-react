import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Search, 
  Heart, 
  Eye, 
  Star,
  Code,
  Award,
  Zap,
  Filter,
  X
} from 'lucide-react';

const projects = [
  { 
    id: 1,
    title: "BCard • Cartes pro", 
    category: "Web App",
    technologies: ["React", "Material-UI", "Node.js", "MongoDB"],
    description: "Système complet de gestion de cartes de visite avec authentification, CRUD, likes et mode sombre/clair.",
    status: "Terminé",
    year: "2024",
    likes: 42,
    views: 1250,
    featured: true,
    color: "#3b82f6"
  },
  { 
    id: 2,
    title: "MarketFlow • SaaS", 
    category: "SaaS Platform",
    technologies: ["React", "Tailwind CSS", "Express", "PostgreSQL"],
    description: "Plateforme marketplace style Fiverr avec animations avancées et système de paiement.",
    status: "En cours",
    year: "2024",
    likes: 38,
    views: 890,
    featured: true,
    color: "#8b5cf6"
  },
  { 
    id: 3,
    title: "Pronotic • IA Sport", 
    category: "AI Platform",
    technologies: ["FastAPI", "Machine Learning", "Python", "TensorFlow"],
    description: "Intelligence artificielle pour prédictions sportives avec algorithmes de value betting.",
    status: "Terminé",
    year: "2023",
    likes: 56,
    views: 2100,
    featured: false,
    color: "#10b981"
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    category: "Dashboard",
    technologies: ["React", "D3.js", "Chart.js", "WebSocket"],
    description: "Tableau de bord interactif avec visualisations de données en temps réel.",
    status: "Terminé",
    year: "2023",
    likes: 67,
    views: 1890,
    featured: true,
    color: "#06b6d4"
  }
];

const categories = ["Tous", "Web App", "SaaS Platform", "AI Platform", "Dashboard"];
const statuses = ["Tous", "Terminé", "En cours"];

export default function ProjectsOptimized() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'Tous' || project.status === selectedStatus;
      const matchesFeatured = !showFeaturedOnly || project.featured;

      return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
    });

    return filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, [searchQuery, selectedCategory, selectedStatus, showFeaturedOnly]);

  const stats = useMemo(() => ({
    total: projects.length,
    completed: projects.filter(p => p.status === 'Terminé').length,
    inProgress: projects.filter(p => p.status === 'En cours').length,
    totalLikes: projects.reduce((sum, p) => sum + p.likes, 0)
  }), []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tous');
    setSelectedStatus('Tous');
    setShowFeaturedOnly(false);
  };

  const hasActiveFilters = selectedCategory !== 'Tous' || selectedStatus !== 'Tous' || showFeaturedOnly;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #533483 50%, #0f0f23 100%)',
      position: 'relative'
    }}>
      {/* Floating Particles Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 6 + 4,
              height: Math.random() * 6 + 4,
              background: `linear-gradient(45deg, 
                rgba(59, 130, 246, ${Math.random() * 0.8 + 0.2}), 
                rgba(147, 51, 234, ${Math.random() * 0.8 + 0.2})
              )`,
              borderRadius: '50%',
              filter: 'blur(1px)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 0' }}>
        {/* Hero Section */}
        <section style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <motion.div
              style={{ textAlign: 'center', marginBottom: '4rem' }}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1
                variants={itemVariants}
                style={{ 
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1.5rem',
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
                }}
              >
                Mes Projets & Réalisations
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                style={{ 
                  fontSize: '1.25rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '600px',
                  margin: '0 auto 3rem',
                  lineHeight: 1.6
                }}
              >
                Découvrez mes créations, des applications web modernes aux plateformes SaaS innovantes
              </motion.p>

              {/* Stats Cards */}
              <motion.div
                variants={itemVariants}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}
              >
                {[
                  { icon: Code, label: 'Projets Total', value: stats.total, color: '#3b82f6' },
                  { icon: Award, label: 'Terminés', value: stats.completed, color: '#10b981' },
                  { icon: Zap, label: 'En Cours', value: stats.inProgress, color: '#f59e0b' },
                  { icon: Heart, label: 'Total Likes', value: stats.totalLikes, color: '#ec4899' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(15px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: stat.color,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}>
                      <stat.icon size={24} style={{ color: 'white' }} />
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '3rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Search Bar */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
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
                  placeholder="Rechercher par nom, description ou technologie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              {/* Quick Filters */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    outline: 'none'
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category} style={{ background: '#1f2937', color: 'white' }}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    outline: 'none'
                  }}
                >
                  {statuses.map(status => (
                    <option key={status} value={status} style={{ background: '#1f2937', color: 'white' }}>
                      {status}
                    </option>
                  ))}
                </select>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#3b82f6' }}
                  />
                  Vedettes uniquement
                </label>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    <X size={14} />
                    Effacer
                  </button>
                )}
              </div>
            </motion.div>

            {/* Results Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              <span>
                {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
              </span>
            </motion.div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 && (
                <motion.div
                  key="projects-grid"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                  }}
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={cardVariants}
                      whileHover="hover"
                      layout
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        cursor: 'pointer'
                      }}
                    >
                      {/* Project Header */}
                      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Code size={48} style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                        </div>
                        
                        {/* Status Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          background: project.status === 'Terminé' 
                            ? 'rgba(34, 197, 94, 0.9)' 
                            : 'rgba(251, 191, 36, 0.9)',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {project.status}
                        </div>

                        {project.featured && (
                          <div style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            background: 'rgba(255, 215, 0, 0.9)',
                            color: '#1f2937',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <Star size={12} />
                            Vedette
                          </div>
                        )}
                      </div>

                      {/* Project Content */}
                      <div style={{ padding: '1.5rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <h3 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: 'bold', 
                            color: 'white', 
                            marginBottom: '0.5rem' 
                          }}>
                            {project.title}
                          </h3>
                          <p style={{ 
                            fontSize: '0.875rem', 
                            color: 'rgba(255, 255, 255, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <Calendar size={14} />
                            {project.category} • {project.year}
                          </p>
                        </div>

                        <p style={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          fontSize: '0.875rem', 
                          lineHeight: 1.6,
                          marginBottom: '1rem'
                        }}>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                background: 'rgba(59, 130, 246, 0.2)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '0.75rem'
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              color: 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.75rem'
                            }}>
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Stats and Actions */}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          paddingTop: '1rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Heart size={14} />
                              {project.likes}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Eye size={14} />
                              {project.views}
                            </span>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              style={{
                                padding: '0.5rem',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <ExternalLink size={16} />
                            </button>
                            <button
                              style={{
                                padding: '0.5rem',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Github size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ textAlign: 'center', marginTop: '4rem' }}
            >
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '3rem',
                maxWidth: '600px',
                margin: '0 auto',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: 'white', 
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Intéressé par une collaboration ?
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: '1.125rem',
                  marginBottom: '2rem',
                  lineHeight: 1.6
                }}>
                  Discutons de votre prochain projet ensemble et créons quelque chose d'extraordinaire.
                </p>
                
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  <Star size={20} />
                  Démarrer un projet
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
