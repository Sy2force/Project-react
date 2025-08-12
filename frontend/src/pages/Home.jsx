import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Zap, Users, Star, Award, Sparkles, Rocket, Globe, ExternalLink, Github } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  const stats = [
    { label: 'Projets Réalisés', value: '50+', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { label: 'Clients Satisfaits', value: '98%', icon: Users, color: 'from-green-500 to-emerald-500' },
    { label: 'Note Moyenne', value: '4.9/5', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Années d\'Expérience', value: '5+', icon: Award, color: 'from-purple-500 to-pink-500' }
  ];

  const services = [
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Applications web modernes avec React, Node.js et les dernières technologies',
      features: ['React & Next.js', 'API REST', 'Base de données', 'Déploiement'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur élégantes et expériences utilisateur optimales',
      features: ['Design System', 'Prototypage', 'Responsive', 'Accessibilité'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Optimisation',
      description: 'Performance, SEO et optimisation pour une expérience ultra-rapide',
      features: ['Performance', 'SEO', 'Analytics', 'Monitoring'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Avatar */}
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-4xl shadow-2xl">
                  S.A
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Shay <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Acoca</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl md:text-3xl text-gray-300 mb-4"
              variants={itemVariants}
            >
              Créateur du Futur Digital
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
              variants={itemVariants}
            >
              Développeur passionné spécialisé dans la création d'expériences web modernes, 
              innovantes et performantes. De l'idée à la réalisation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ExternalLink size={20} />}
              >
                Voir mes projets
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={<Github size={20} />}
              >
                GitHub
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredStat(index)}
                  onHoverEnd={() => setHoveredStat(null)}
                >
                  <Card 
                    variant="glass" 
                    glow={hoveredStat === index}
                    className="p-6 text-center"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Mes <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Des solutions complètes pour donner vie à vos projets digitaux
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="glass" glow className="p-8 h-full">
                    <CardHeader className="pb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                        <Icon size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </CardHeader>
                    
                    <CardBody>
                      <div className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
          >
            <Card variant="glass" glow className="p-12 text-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Prêt à démarrer votre projet ?
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ExternalLink size={20} />}
                  >
                    Voir mes projets
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<Github size={20} />}
                  >
                    GitHub
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="text-center"
                    >
                      <Card variant="glass" glow className="p-6">
                        <CardBody>
                          <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                            <IconComponent size={24} className="text-white" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                          <div className="text-gray-300">{stat.label}</div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Prêt à créer quelque chose d'
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    extraordinaire
                  </span> ?
                </h2>
                <p className="text-xl mb-12 text-white/70 max-w-3xl mx-auto">
                  Collaborons ensemble pour transformer vos idées en expériences digitales inoubliables
                </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center gap-3">
                <Rocket size={28} />
                Commencer un projet
                <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity -z-10"></div>
            </Link>
            
            {!isAuthenticated && (
              <Link
                to="/login"
                className="group px-10 py-5 glass rounded-2xl text-white font-bold text-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <Star size={28} />
                  Rejoindre la communauté
                </span>
              </Link>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
