import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Code, 
  Award,
  Star,
  Heart,
  Target,
  Users,
  Zap,
  CheckCircle,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Calendar
} from 'lucide-react';

const AboutOptimized = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [skillsProgress, setSkillsProgress] = useState({});

  // Tabs data
  const tabs = [
    { id: 'experience', label: 'Expérience', icon: Award },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'values', label: 'Valeurs', icon: Heart },
    { id: 'timeline', label: 'Parcours', icon: Calendar }
  ];

  // Skills data
  const skills = [
    { name: 'React/Next.js', level: 95, color: '#61dafb' },
    { name: 'Node.js/Express', level: 90, color: '#68a063' },
    { name: 'TypeScript', level: 88, color: '#3178c6' },
    { name: 'Python/Django', level: 85, color: '#306998' },
    { name: 'MongoDB/PostgreSQL', level: 87, color: '#4db33d' },
    { name: 'AWS/Cloud', level: 82, color: '#ff9900' },
    { name: 'UI/UX Design', level: 90, color: '#ff6b6b' },
    { name: 'Mobile (React Native)', level: 85, color: '#61dafb' }
  ];

  // Experience data
  const experiences = [
    {
      title: 'Lead Full-Stack Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Présent',
      description: 'Direction technique d\'équipes de développement, architecture de solutions complexes et mentoring.',
      achievements: [
        'Augmentation de 40% des performances des applications',
        'Réduction de 60% des bugs en production',
        'Formation de 15+ développeurs juniors'
      ]
    },
    {
      title: 'Senior Developer',
      company: 'InnovateLab',
      period: '2020 - 2022',
      description: 'Développement d\'applications web et mobile innovantes pour des startups en croissance.',
      achievements: [
        'Développement de 12+ applications complètes',
        'Mise en place de CI/CD et DevOps',
        'Optimisation des temps de chargement de 70%'
      ]
    }
  ];

  // Values data
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Recherche constante de la perfection technique et de l\'innovation dans chaque projet.',
      color: '#667eea'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Travail d\'équipe efficace et communication transparente avec tous les stakeholders.',
      color: '#764ba2'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimisation continue pour des solutions rapides, scalables et maintenables.',
      color: '#f093fb'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Amour du code propre, des nouvelles technologies et de l\'apprentissage continu.',
      color: '#4facfe'
    }
  ];

  // Animate skills progress on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = {};
      skills.forEach(skill => {
        progress[skill.name] = skill.level;
      });
      setSkillsProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.3})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Hero Section */}
        <motion.section
          style={{
            padding: '4rem 0',
            textAlign: 'center'
          }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            style={{
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              boxShadow: '0 0 50px rgba(102, 126, 234, 0.5)',
              position: 'relative'
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <User size={60} color="white" />
            <motion.div
              style={{
                position: 'absolute',
                inset: '-4px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                opacity: 0.3,
                zIndex: -1
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.h1
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}
            variants={itemVariants}
          >
            À propos de moi
          </motion.h1>

          <motion.p
            style={{
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}
            variants={itemVariants}
          >
            Développeur Full-Stack passionné avec 5+ années d'expérience dans la création 
            de solutions digitales innovantes et performantes.
          </motion.p>

          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
            variants={itemVariants}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <MapPin size={18} color="#667eea" />
              <span style={{ color: 'white', fontSize: '0.95rem' }}>Paris, France</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Mail size={18} color="#667eea" />
              <span style={{ color: 'white', fontSize: '0.95rem' }}>contact@shayacoca.dev</span>
            </div>

            <div style={{
              display: 'flex',
              gap: '0.75rem'
            }}>
              {[Github, Linkedin, Twitter, Instagram].map((Icon, index) => (
                <motion.button
                  key={index}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    color: 'white',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Tabs Navigation */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '0.5rem',
            gap: '0.5rem'
          }}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon size={18} />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ paddingBottom: '4rem' }}
          >
            {activeTab === 'experience' && (
              <div style={{
                display: 'grid',
                gap: '2rem'
              }}>
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      padding: '2.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                    }} />

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: 'white',
                          marginBottom: '0.5rem'
                        }}>
                          {exp.title}
                        </h3>
                        <div style={{
                          fontSize: '1.125rem',
                          color: '#667eea',
                          fontWeight: '600'
                        }}>
                          {exp.company}
                        </div>
                      </div>
                      <div style={{
                        background: 'rgba(102, 126, 234, 0.2)',
                        color: '#667eea',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {exp.period}
                      </div>
                    </div>

                    <p style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      {exp.description}
                    </p>

                    <div>
                      <h4 style={{
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '1rem'
                      }}>
                        Réalisations clés :
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        {exp.achievements.map((achievement, achIndex) => (
                          <div
                            key={achIndex}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem'
                            }}
                          >
                            <CheckCircle size={16} color="#22c55e" />
                            <span style={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.95rem'
                            }}>
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  marginBottom: '3rem'
                }}>
                  Compétences Techniques
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '2rem'
                }}>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}>
                        <span style={{
                          color: 'white',
                          fontSize: '1.125rem',
                          fontWeight: '600'
                        }}>
                          {skill.name}
                        </span>
                        <span style={{
                          color: skill.color,
                          fontSize: '1rem',
                          fontWeight: 'bold'
                        }}>
                          {skillsProgress[skill.name] || 0}%
                        </span>
                      </div>

                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          style={{
                            height: '100%',
                            background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}80 100%)`,
                            borderRadius: '4px',
                            boxShadow: `0 0 10px ${skill.color}50`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skillsProgress[skill.name] || 0}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2rem'
              }}>
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      padding: '2.5rem',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${value.color} 0%, ${value.color}80 100%)`
                    }} />

                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: `${value.color}20`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      boxShadow: `0 0 30px ${value.color}30`
                    }}>
                      <value.icon size={32} color={value.color} />
                    </div>

                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: '1rem'
                    }}>
                      {value.title}
                    </h3>

                    <p style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.6'
                    }}>
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '2rem'
                }}>
                  Mon Parcours
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.125rem'
                }}>
                  Une timeline détaillée de mon parcours professionnel sera bientôt disponible.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutOptimized;
