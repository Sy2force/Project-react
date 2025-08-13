// [EXAM] Footer complet et fonctionnel avec toutes les fonctionnalités
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Heart,
  ArrowUp,
  ExternalLink,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FooterComplete = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/shayacoca', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/shayacoca', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/shayacoca', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/shayacoca', color: 'hover:text-pink-400' }
  ];

  const quickLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Projets', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const legalLinks = [
    { name: 'Mentions légales', path: '/legal' },
    { name: 'Politique de confidentialité', path: '/privacy' },
    { name: 'Conditions d\'utilisation', path: '/terms' },
    { name: 'Cookies', path: '/cookies' }
  ];

  const services = [
    { name: 'Développement Web', path: '/services/web-development' },
    { name: 'Design UI/UX', path: '/services/ui-ux-design' },
    { name: 'Marketing Digital', path: '/services/digital-marketing' },
    { name: 'Consultation', path: '/services/consultation' }
  ];

  // Liens spécifiques selon le rôle
  const getRoleSpecificLinks = () => {
    if (!user) return [];
    
    const links = [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Profil', path: '/profile' },
      { name: 'Favoris', path: '/favorites' }
    ];

    if (user.role === 'business' || user.role === 'admin') {
      links.push({ name: 'Mes Cartes', path: '/my-cards' });
    }

    if (user.role === 'admin') {
      links.push({ name: 'Administration', path: '/admin' });
    }

    return links;
  };

  return (
    <footer className="relative bg-gradient-to-t from-black/50 to-transparent backdrop-blur-xl border-t border-white/10 mt-20">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg relative">
                <span className="relative z-10">S.A</span>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-500/50 rounded-xl blur-lg"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Shay Acoca</h3>
                <p className="text-sm text-blue-400">Créateur du Futur Digital</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Développeur passionné spécialisé dans la création d'expériences digitales 
              innovantes et modernes. De l'idée à la réalisation, je transforme vos 
              projets en solutions technologiques performantes.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 ${social.color} transition-all duration-200`}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Liens spécifiques au rôle */}
            {user && getRoleSpecificLinks().length > 0 && (
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-400 mb-2">Mon Espace</h5>
                <ul className="space-y-2">
                  {getRoleSpecificLinks().map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm flex items-center space-x-2 group"
                      >
                        <span className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            
            <div className="space-y-3">
              <a
                href="mailto:shayacoca20@gmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
              >
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={16} />
                </div>
                <span className="text-sm">shayacoca20@gmail.com</span>
              </a>

              <a
                href="tel:+33533700551"
                className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
              >
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Phone size={16} />
                </div>
                <span className="text-sm">+33 5 33 70 05 51</span>
              </a>

              <div className="flex items-center space-x-3 text-gray-300">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <MapPin size={16} />
                </div>
                <span className="text-sm">Jérusalem • Tel Aviv</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-300">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Clock size={16} />
                </div>
                <span className="text-sm">Disponible 7j/7</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-medium text-white mb-2">Newsletter</h5>
              <p className="text-xs text-gray-400 mb-3">
                Restez informé des dernières actualités et projets
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-l-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Section inférieure */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-sm text-gray-400"
          >
            <span>© {currentYear} Shay Acoca. Tous droits réservés.</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Fait avec</span>
              <Heart size={14} className="text-red-400 animate-pulse" />
              <span>à Jérusalem</span>
            </span>
          </motion.div>

          {/* Liens légaux */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            {legalLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* Bouton retour en haut */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        {/* Informations techniques */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-white/5 text-center"
        >
          <div className="flex flex-wrap items-center justify-center space-x-4 text-xs text-gray-500">
            <span>React 18</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>Node.js</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterComplete;
