import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Mail, Phone, MapPin, Code, Palette, Zap } from 'lucide-react';
import {
  GlassCard,
  GlassButton,
  FeatureCard,
  FrameGlow,
  KPIStrip
} from '../components/glass';

/**
 * IntroPageModern - Page d'introduction avec design Glass Kit moderne
 */
const IntroPageModern = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Shay Acoca - Créateur du Futur Digital';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio professionnel de Shay Acoca - Développement Web, Design UI/UX et Innovation Digitale.');
    }
  }, []);

  const kpiData = [
    { label: 'Projets Réalisés', value: '150+', icon: <Code size={20} />, color: 'primary' },
    { label: 'Clients Satisfaits', value: '98%', icon: <Sparkles size={20} />, color: 'accent' },
    { label: 'Années d\'Expérience', value: '5+', icon: <Zap size={20} />, color: 'neon' }
  ];

  return (
    <div className="min-h-screen page-bg overflow-hidden">
      {/* Particules de fond */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl line-clamp-1">Shay Acoca</h1>
                <p className="text-white/60 text-sm">Créateur Digital</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <GlassButton 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="focus-visible"
              >
                Connexion
              </GlassButton>
              <GlassButton 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/auth?mode=register')}
                className="focus-visible"
              >
                Inscription
              </GlassButton>
            </div>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white">Créateur du </span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Futur Digital
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-white/80 mb-8 line-clamp-3 break-words"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Développeur Full-Stack passionné par l&apos;innovation. Je transforme vos idées 
                  en expériences digitales exceptionnelles avec des technologies modernes.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <GlassButton 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="focus-visible"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Commencer l&apos;Aventure
                  </GlassButton>
                  <GlassButton 
                    variant="secondary" 
                    size="lg"
                    onClick={() => navigate('/projects')}
                    className="focus-visible"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Découvrir Portfolio
                  </GlassButton>
                </motion.div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <FrameGlow color="primary" intensity="high" animated={true}>
                  <GlassCard size="lg" className="text-center">
                    <div className="relative">
                      {/* Avatar */}
                      <div className="w-32 h-32 mx-auto mb-6 relative">
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-1">
                          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                            <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                              SA
                            </span>
                          </div>
                        </div>
                        {/* Status indicator */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1">Shay Acoca</h3>
                      <p className="text-primary mb-4">Full-Stack Developer</p>
                      
                      {/* Quick stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-white">150+</div>
                          <div className="text-xs text-white/60">Projets</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">5+</div>
                          <div className="text-xs text-white/60">Années</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">98%</div>
                          <div className="text-xs text-white/60">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </FrameGlow>
              </motion.div>
            </div>

            {/* KPI Strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-16"
            >
              <KPIStrip kpis={kpiData} />
            </motion.div>

            {/* Services Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 line-clamp-1">
                  Mes Spécialités
                </h2>
                <p className="text-white/70 line-clamp-2 break-words">
                  Solutions complètes pour vos projets digitaux
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Code size={24} />}
                  title="Développement Web"
                  description="Applications modernes avec React, Node.js et technologies de pointe"
                  features={['React & Next.js', 'API REST', 'MongoDB']}
                  color="primary"
                />
                <FeatureCard
                  icon={<Palette size={24} />}
                  title="Design UI/UX"
                  description="Interfaces intuitives et expériences utilisateur mémorables"
                  features={['Design System', 'Prototypage', 'Responsive']}
                  color="accent"
                />
                <FeatureCard
                  icon={<Zap size={24} />}
                  title="Optimisation"
                  description="Performance, SEO et accessibilité pour un impact maximal"
                  features={['Performance', 'SEO', 'Analytics']}
                  color="neon"
                />
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer Contact */}
        <footer className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <GlassCard className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <a 
                  href="mailto:shayacoca20@gmail.com"
                  className="flex items-center space-x-2 text-white/80 hover:text-primary transition-colors"
                >
                  <Mail size={20} />
                  <span className="line-clamp-1">shayacoca20@gmail.com</span>
                </a>
                <a 
                  href="tel:053-3700551"
                  className="flex items-center space-x-2 text-white/80 hover:text-accent transition-colors"
                >
                  <Phone size={20} />
                  <span>053-3700551</span>
                </a>
                <div className="flex items-center space-x-2 text-white/60">
                  <MapPin size={20} />
                  <span>Jérusalem • Tel Aviv</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default IntroPageModern;
