// Page d'accueil ultra-simple qui fonctionne sans erreur
import { Link } from 'react-router-dom';

const HomeUltraSimple = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
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

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Créateur du
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Futur Digital
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Développeur Full-Stack passionné, je transforme vos idées en expériences digitales exceptionnelles
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projets"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center"
            >
              Découvrir mes projets
              <span className="ml-2">→</span>
            </a>
            <a
              href="#contact"
              className="border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              Collaborons ensemble
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-gray-400">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5</div>
              <div className="text-gray-400">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mes <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des solutions digitales complètes pour transformer vos idées en réalité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-fit mb-6">
                  <div className="w-8 h-8 bg-blue-400 rounded"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Développement Web</h3>
                <p className="text-gray-300 mb-6">Applications web modernes et performantes avec React, Node.js et les dernières technologies</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    React/Vue.js
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Node.js/Express
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Bases de données
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    API REST
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-fit mb-6">
                  <div className="w-8 h-8 bg-purple-400 rounded"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Design UI/UX</h3>
                <p className="text-gray-300 mb-6">Interfaces utilisateur intuitives et expériences optimisées pour vos utilisateurs</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Figma/Adobe XD
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Prototypage
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Design System
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Tests utilisateur
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 w-fit mb-6">
                  <div className="w-8 h-8 bg-green-400 rounded"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Optimisation</h3>
                <p className="text-gray-300 mb-6">Performance, SEO et accessibilité pour des sites ultra-rapides et bien référencés</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Lighthouse
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Core Web Vitals
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    SEO
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Analytics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à démarrer votre <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">projet</span> ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                  <div className="w-6 h-6 bg-blue-400 rounded"></div>
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
                  <div className="w-6 h-6 bg-green-400 rounded"></div>
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
                  <div className="w-6 h-6 bg-purple-400 rounded"></div>
                </div>
                <div>
                  <div className="text-white font-semibold">Localisation</div>
                  <div className="text-gray-300">Jérusalem • Tel Aviv</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-white/10">
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
            </div>
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

export default HomeUltraSimple;
