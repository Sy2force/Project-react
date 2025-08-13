// [EXAM] Footer optimisé avec design moderne et liens complets
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
  ExternalLink,
  ArrowUp,
  Code,
  Palette,
  Globe,
  Smartphone
} from 'lucide-react';

const FooterOptimized = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Accueil', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Services', path: '/services' },
        { name: 'À propos', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Développement Web', path: '/services/web', icon: Globe },
        { name: 'Apps Mobile', path: '/services/mobile', icon: Smartphone },
        { name: 'Design UI/UX', path: '/services/design', icon: Palette },
        { name: 'Consulting', path: '/services/consulting', icon: Code }
      ]
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Galerie', path: '/gallery' },
        { name: 'Témoignages', path: '/testimonials' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Tarifs', path: '/pricing' }
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/shayacoca',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/shayacoca',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/shayacoca',
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/shayacoca',
      icon: Instagram,
      color: 'hover:text-pink-400'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: 'contact@shayacoca.com',
      href: 'mailto:contact@shayacoca.com'
    },
    {
      icon: Phone,
      text: '+33 6 12 34 56 78',
      href: 'tel:+33612345678'
    },
    {
      icon: MapPin,
      text: 'Paris, France',
      href: null
    }
  ];

  return (
    <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-white/10">
      {/* Dégradé décoratif */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section principale */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Colonne À propos */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <Link to="/" className="inline-flex items-center space-x-3 mb-6 group">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white font-bold text-xl">SA</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Shay Acoca</h3>
                    <p className="text-sm text-gray-400">Créateur Digital</p>
                  </div>
                </Link>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Développeur passionné spécialisé dans la création d'expériences digitales 
                  modernes et performantes. Je transforme vos idées en solutions innovantes.
                </p>

                {/* Informations de contact */}
                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <item.icon size={16} className="text-purple-400" />
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gray-300">{item.text}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Colonnes de navigation */}
            {footerSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-6">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={link.name}>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Link
                            to={link.path}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                          >
                            {link.icon && (
                              <link.icon size={14} className="text-purple-400 group-hover:text-purple-300" />
                            )}
                            <span>{link.name}</span>
                          </Link>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Section réseaux sociaux et newsletter */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6"
            >
              <span className="text-gray-400 text-sm">Suivez-moi :</span>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:bg-white/20`}
                    title={social.name}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email..."
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>S'abonner</span>
                  <ExternalLink size={16} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section copyright */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-400 text-sm"
            >
              <span>© {currentYear} Shay Acoca. Tous droits réservés.</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Fait avec</span>
                <Heart size={14} className="text-red-400" />
                <span>à Paris</span>
              </span>
            </motion.div>

            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Confidentialité
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Conditions
              </Link>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-200"
                title="Retour en haut"
              >
                <ArrowUp size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOptimized;
