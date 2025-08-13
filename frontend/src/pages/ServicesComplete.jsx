// [EXAM] Page Services complète avec design immersif et interactif
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { 
  Code2, 
  Palette, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone,
  Database,
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';

const ServicesComplete = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('development');

  const services = [
    {
      id: 'development',
      icon: Code2,
      title: 'Développement Web',
      subtitle: 'Applications modernes et performantes',
      description: 'Création d\'applications web sur mesure avec les dernières technologies',
      price: 'À partir de 2500€',
      duration: '4-8 semaines',
      features: [
        'React/Vue.js/Angular',
        'Node.js/Express/NestJS',
        'MongoDB/PostgreSQL/MySQL',
        'API REST/GraphQL',
        'Tests automatisés',
        'Déploiement CI/CD'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgPattern: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
    },
    {
      id: 'design',
      icon: Palette,
      title: 'Design UI/UX',
      subtitle: 'Expériences utilisateur exceptionnelles',
      description: 'Conception d\'interfaces élégantes et intuitives centrées sur l\'utilisateur',
      price: 'À partir de 1500€',
      duration: '2-4 semaines',
      features: [
        'Recherche utilisateur',
        'Wireframes & Prototypes',
        'Design System',
        'Tests d\'utilisabilité',
        'Design responsive',
        'Accessibilité WCAG'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision'],
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      bgPattern: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      title: 'Applications Mobile',
      subtitle: 'Native et cross-platform',
      description: 'Développement d\'applications mobiles performantes pour iOS et Android',
      price: 'À partir de 3500€',
      duration: '6-12 semaines',
      features: [
        'React Native/Flutter',
        'iOS & Android natif',
        'Intégrations API',
        'Push notifications',
        'App Store deployment',
        'Maintenance & support'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgPattern: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
    },
    {
      id: 'optimization',
      icon: Zap,
      title: 'Optimisation & SEO',
      subtitle: 'Performance et visibilité maximales',
      description: 'Amélioration des performances et du référencement pour un impact optimal',
      price: 'À partir de 800€',
      duration: '1-3 semaines',
      features: [
        'Audit de performance',
        'Core Web Vitals',
        'SEO technique',
        'Optimisation images',
        'Mise en cache',
        'Monitoring continu'
      ],
      technologies: ['Lighthouse', 'GTMetrix', 'Google Analytics', 'Search Console'],
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      bgPattern: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10'
    },
    {
      id: 'ecommerce',
      icon: Globe,
      title: 'E-commerce',
      subtitle: 'Boutiques en ligne performantes',
      description: 'Solutions e-commerce complètes avec gestion des paiements et inventaire',
      price: 'À partir de 4000€',
      duration: '8-16 semaines',
      features: [
        'Catalogue produits',
        'Panier & checkout',
        'Paiements sécurisés',
        'Gestion commandes',
        'Analytics avancées',
        'Multi-devises'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Magento'],
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10'
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Sécurité & Conformité',
      subtitle: 'Protection et conformité garanties',
      description: 'Sécurisation des applications et mise en conformité RGPD',
      price: 'À partir de 1200€',
      duration: '2-4 semaines',
      features: [
        'Audit sécurité',
        'Authentification JWT',
        'Chiffrement données',
        'Conformité RGPD',
        'Tests pénétration',
        'Monitoring sécurité'
      ],
      technologies: ['OAuth', 'JWT', 'SSL/TLS', 'Helmet.js', 'OWASP'],
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
      bgPattern: 'bg-gradient-to-br from-emerald-500/10 to-green-500/10'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Découverte',
      description: 'Analyse de vos besoins et définition des objectifs',
      icon: Target,
      duration: '1-2 jours'
    },
    {
      step: '02',
      title: 'Planification',
      description: 'Architecture technique et planning détaillé',
      icon: Clock,
      duration: '2-3 jours'
    },
    {
      step: '03',
      title: 'Développement',
      description: 'Création avec feedback continu et itérations',
      icon: Code2,
      duration: 'Variable'
    },
    {
      step: '04',
      title: 'Tests & Déploiement',
      description: 'Tests complets et mise en production',
      icon: Rocket,
      duration: '3-5 jours'
    }
  ];

  const stats = [
    { number: '150+', label: 'Projets réalisés', icon: Award },
    { number: '98%', label: 'Satisfaction client', icon: Star },
    { number: '24h', label: 'Temps de réponse', icon: Clock },
    { number: '5+', label: 'Années d\'expérience', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Services - Développement Web & Design | Shay Acoca</title>
        <meta name="description" content="Services de développement web, design UI/UX, applications mobiles et optimisation. Solutions sur mesure pour votre réussite digitale." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Services Premium</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transformez vos
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                idées en réalité
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Des solutions digitales sur mesure qui propulsent votre business vers de nouveaux sommets. 
              Expertise technique, créativité et résultats garantis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Rocket size={20} />
                <span className="font-semibold">Démarrer un projet</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <span className="font-semibold">Découvrir les services</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Services d'excellence
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une gamme complète de services pour répondre à tous vos besoins digitaux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative p-8 rounded-3xl ${service.bgPattern} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer`}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.gradient}`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{service.price}</div>
                      <div className="text-sm text-gray-400">{service.duration}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-blue-400 font-medium mb-4">{service.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed">{service.description}</p>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: selectedService === service.id ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-white/10 space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-3">Fonctionnalités incluses :</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-3 text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-3">Technologies :</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                      >
                        <span>Demander un devis</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock size={16} />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      {selectedService === service.id ? 'Réduire' : 'En savoir plus'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Processus de travail
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une méthode éprouvée pour garantir le succès de votre projet
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center space-y-6"
              >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                )}

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{step.step}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 mb-2">{step.description}</p>
                  <div className="text-sm text-blue-400 font-medium">{step.duration}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Prêt à transformer votre vision ?
            </h2>
            <p className="text-xl text-gray-300">
              Discutons de votre projet et créons ensemble quelque chose d'extraordinaire
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Rocket size={20} />
                <span className="font-semibold">Commencer maintenant</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/projects"
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <span className="font-semibold">Voir mes réalisations</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesComplete;
