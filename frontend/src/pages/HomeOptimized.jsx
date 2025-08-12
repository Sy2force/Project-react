import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Zap, 
  Shield, 
  Heart, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  Users,
  TrendingUp,
  Code,
  Palette,
  Database,
  Smartphone,
  Cloud,
  CheckCircle
} from 'lucide-react';

const HomeOptimized = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });

  // Hero Carousel Data
  const heroSlides = [
    {
      title: "Développeur Full-Stack Expert",
      subtitle: "Créateur d'expériences numériques exceptionnelles",
      description: "Transformez vos idées en solutions digitales innovantes avec des technologies de pointe",
      cta: "Découvrir mes projets",
      ctaLink: "/projects"
    },
    {
      title: "Design & UX/UI Moderne",
      subtitle: "Interface utilisateur intuitive et élégante",
      description: "Conception d'interfaces modernes qui captivent et convertissent vos utilisateurs",
      cta: "Voir le portfolio",
      ctaLink: "/showcase"
    },
    {
      title: "Solutions Personnalisées",
      subtitle: "Développement sur mesure pour votre entreprise",
      description: "Applications web et mobile adaptées à vos besoins spécifiques et objectifs business",
      cta: "Demander un devis",
      ctaLink: "/contact"
    }
  ];

  // Services Data
  const services = [
    {
      icon: Code,
      title: "Développement Web",
      description: "Applications web modernes avec React, Node.js et les dernières technologies",
      features: ["React/Next.js", "Node.js/Express", "MongoDB/PostgreSQL", "API REST/GraphQL"],
      color: "#667eea"
    },
    {
      icon: Smartphone,
      title: "Applications Mobile",
      description: "Apps natives et cross-platform pour iOS et Android",
      features: ["React Native", "Flutter", "iOS/Android", "App Store/Play Store"],
      color: "#764ba2"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Interfaces utilisateur intuitives et expériences exceptionnelles",
      features: ["Figma/Adobe XD", "Prototypage", "Design System", "User Research"],
      color: "#f093fb"
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      description: "Déploiement et infrastructure cloud scalable",
      features: ["AWS/Azure/GCP", "Docker/Kubernetes", "CI/CD", "Monitoring"],
      color: "#4facfe"
    }
  ];

  // Animate stats on mount
  useEffect(() => {
    const animateStats = () => {
      const targets = { projects: 150, clients: 50, experience: 5, satisfaction: 98 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          experience: Math.floor(targets.experience * progress),
          satisfaction: Math.floor(targets.satisfaction * progress)
        });

        if (step >= steps) {
          clearInterval(interval);
          setStats(targets);
        }
      }, stepDuration);
    };

    animateStats();
  }, []);

  // Auto-slide hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
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
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/* Floating particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.7 + 0.3})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section with Carousel */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          width: '100%'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                minHeight: '80vh'
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Content */}
              <div>
                <motion.div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '50px',
                    padding: '0.5rem 1rem',
                    marginBottom: '2rem'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles size={16} color="#667eea" />
                  <span style={{
                    color: '#667eea',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  style={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.5rem',
                    lineHeight: '1.1'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                <motion.p
                  style={{
                    fontSize: '1.25rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '3rem',
                    lineHeight: '1.6'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                <motion.div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to={heroSlides[currentSlide].ctaLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '50px',
                      fontWeight: '600',
                      fontSize: '1.125rem',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {heroSlides[currentSlide].cta}
                    <ArrowRight size={20} />
                  </Link>

                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '1rem 2rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '50px',
                      fontWeight: '600',
                      fontSize: '1.125rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Play size={20} />
                    Voir la démo
                  </button>
                </motion.div>
              </div>

              {/* Right Content - Visual */}
              <motion.div
                style={{
                  position: 'relative',
                  height: '500px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {/* Animated Code Elements */}
                  <div style={{
                    position: 'absolute',
                    inset: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        style={{
                          height: '20px',
                          background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
                          borderRadius: '4px',
                          width: `${Math.random() * 60 + 40}%`
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      />
                    ))}
                  </div>

                  {/* Floating Icons */}
                  {[Code, Palette, Database, Smartphone].map((Icon, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: 'absolute',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        padding: '1rem',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 20}%`
                      }}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Icon size={24} color="white" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
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
            >
              <ChevronLeft size={20} />
            </button>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentSlide 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
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
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '3rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { label: 'Projets Réalisés', value: stats.projects, suffix: '+', icon: Award },
              { label: 'Clients Satisfaits', value: stats.clients, suffix: '+', icon: Users },
              { label: 'Années d\'Expérience', value: stats.experience, suffix: '+', icon: TrendingUp },
              { label: 'Satisfaction Client', value: stats.satisfaction, suffix: '%', icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                style={{
                  textAlign: 'center'
                }}
                variants={itemVariants}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                }}>
                  <stat.icon size={24} color="white" />
                </div>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}{stat.suffix}
                </div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '4rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
              }}
              variants={itemVariants}
            >
              Services & Expertise
            </motion.h2>
            <motion.p
              style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
              variants={itemVariants}
            >
              Solutions complètes pour transformer vos idées en réalité digitale
            </motion.p>
          </motion.div>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${service.color} 0%, ${service.color}80 100%)`
                }} />

                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `${service.color}20`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <service.icon size={28} color={service.color} />
                </div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  {service.title}
                </h3>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {service.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {service.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      style={{
                        background: `${service.color}20`,
                        color: service.color,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <motion.div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              padding: '4rem 3rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem'
              }}
              variants={itemVariants}
            >
              Prêt à démarrer votre projet ?
            </motion.h2>

            <motion.p
              style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '3rem',
                lineHeight: '1.6'
              }}
              variants={itemVariants}
            >
              Transformons ensemble vos idées en solutions digitales exceptionnelles. 
              Contactez-moi pour discuter de votre projet.
            </motion.p>

            <motion.div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              variants={itemVariants}
            >
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.25rem 2.5rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                Démarrer un projet
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/showcase"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.25rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Sparkles size={20} />
                Voir mes réalisations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeOptimized;
