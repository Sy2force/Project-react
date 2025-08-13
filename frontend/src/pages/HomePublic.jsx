// Page d'accueil publique avec design complet moderne
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePublic = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });

  // Animation des statistiques
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        projects: prev.projects < 150 ? prev.projects + 3 : 150,
        clients: prev.clients < 50 ? prev.clients + 1 : 50,
        experience: prev.experience < 5 ? prev.experience + 0.1 : 5,
        satisfaction: prev.satisfaction < 98 ? prev.satisfaction + 2 : 98
      }));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Rotation des témoignages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "Développement Web",
      description: "Applications web modernes et performantes avec React, Node.js et les dernières technologies",
      features: ["React/Vue.js", "Node.js/Express", "Bases de données", "API REST"]
    },
    {
      title: "Design UI/UX",
      description: "Interfaces utilisateur intuitives et expériences optimisées pour vos utilisateurs",
      features: ["Figma/Adobe XD", "Prototypage", "Design System", "Tests utilisateur"]
    },
    {
      title: "Optimisation",
      description: "Performance, SEO et accessibilité pour des sites ultra-rapides et bien référencés",
      features: ["Lighthouse", "Core Web Vitals", "SEO", "Analytics"]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Moderne",
      description: "Plateforme de vente en ligne avec paiements sécurisés",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      tech: ["React", "Node.js", "Stripe"],
      link: "#"
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Interface d'administration avec visualisation de données",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      tech: ["Vue.js", "Chart.js", "MongoDB"],
      link: "#"
    },
    {
      id: 3,
      title: "App Mobile",
      description: "Application mobile cross-platform avec React Native",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
      tech: ["React Native", "Firebase", "Redux"],
      link: "#"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Martin",
      role: "CEO, TechStart",
      content: "Shay a transformé notre vision en une application web exceptionnelle. Son expertise technique et sa créativité sont remarquables.",
      rating: 5
    },
    {
      name: "David Cohen",
      role: "Directeur Marketing, InnovCorp",
      content: "Un développeur passionné qui comprend parfaitement les enjeux business. Résultats au-delà de nos attentes.",
      rating: 5
    },
    {
      name: "Marie Dubois",
      role: "Fondatrice, DesignStudio",
      content: "Collaboration fluide et résultats impressionnants. Je recommande vivement pour tout projet web ambitieux.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* SEO */}
      <Helmet>
        <title>Shay Acoca - Créateur du Futur Digital | Portfolio</title>
        <meta name="description" content="Développeur Full-Stack passionné, créateur d'expériences digitales exceptionnelles. Portfolio moderne avec projets innovants." />
        <link rel="canonical" href={window.location.origin + "/"} />
      </Helmet>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <span className="ml-3 text-white font-bold text-xl">Shay Acoca</span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-white hover:text-blue-400 transition-colors">Accueil</a>
              <a href="#services" className="text-white hover:text-blue-400 transition-colors">Services</a>
              <a href="#projets" className="text-white hover:text-blue-400 transition-colors">Projets</a>
              <a href="#temoignages" className="text-white hover:text-blue-400 transition-colors">Témoignages</a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
            </div>

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="text-white hover:text-blue-400 transition-colors"
              >
                Connexion
              </Link>
              <Link 
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Particules d'arrière-plan */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Créateur du
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Futur Digital
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Développeur Full-Stack passionné, je transforme vos idées en expériences digitales exceptionnelles
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#projets"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center"
            >
              Découvrir mes projets
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Collaborons ensemble
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {Math.round(stats.projects)}+
              </div>
              <div className="text-gray-400">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {Math.round(stats.clients)}+
              </div>
              <div className="text-gray-400">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stats.experience.toFixed(1)}
              </div>
              <div className="text-gray-400">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {Math.round(stats.satisfaction)}%
              </div>
              <div className="text-gray-400">Satisfaction client</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mes <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des solutions digitales complètes pour transformer vos idées en réalité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-fit mb-6">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projets" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Projets <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Récents</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez quelques-unes de mes réalisations les plus marquantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Voir le projet
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ce que disent mes <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">clients</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div>
                  <div className="font-bold text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à démarrer votre <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">projet</span> ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Email</div>
                  <a href="mailto:shayacoca20@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                    shayacoca20@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Téléphone</div>
                  <a href="tel:053-3700551" className="text-gray-300 hover:text-blue-400 transition-colors">
                    053-3700551
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">Localisation</div>
                  <div className="text-gray-300">Jérusalem • Tel Aviv</div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Commençons votre projet</h3>
              <p className="text-gray-300 mb-6">
                Rejoignez-moi pour créer des expériences digitales exceptionnelles
              </p>
              <div className="space-y-4">
                <Link 
                  to="/register"
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Créer un compte
                </Link>
                <Link 
                  to="/login"
                  className="block w-full border border-white/20 text-white text-center px-6 py-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  Se connecter
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SA</span>
                </div>
                <span className="ml-3 text-white font-bold text-xl">Shay Acoca</span>
              </div>
              <p className="text-gray-300 mb-4">
                Créateur du futur digital, transformant vos idées en expériences exceptionnelles.
              </p>
              <div className="text-sm text-gray-400">
                © 2024 Shay Acoca. Tous droits réservés.
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <a href="#accueil" className="block text-gray-300 hover:text-blue-400 transition-colors">Accueil</a>
                <a href="#services" className="block text-gray-300 hover:text-blue-400 transition-colors">Services</a>
                <a href="#projets" className="block text-gray-300 hover:text-blue-400 transition-colors">Projets</a>
                <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <a href="mailto:shayacoca20@gmail.com" className="block text-gray-300 hover:text-blue-400 transition-colors">
                  shayacoca20@gmail.com
                </a>
                <a href="tel:053-3700551" className="block text-gray-300 hover:text-blue-400 transition-colors">
                  053-3700551
                </a>
                <div className="text-gray-300">Jérusalem • Tel Aviv</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePublic;
