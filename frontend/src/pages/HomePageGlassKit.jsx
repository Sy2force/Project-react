import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Palette, Zap, Users, Award, Star, Mail, Phone, MapPin } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import {
  GlassCard,
  GlassButton,
  KPIStrip,
  FeatureCard,
  LogoGrid,
  MediaGallery,
  ContactSplit,
  FrameGlow
} from '../components/glass';

/**
 * HomePageGlassKit - Démonstration d'intégration du Kit de blocs GLASS
 * Cette page montre comment remplacer les anciens composants par les nouveaux
 */
const HomePageGlassKit = () => {
  const navigate = useNavigate();

  // SEO: Set page title and meta description
  useEffect(() => {
    document.title = 'Shay Acoca - Glass Kit Demo | Portfolio Moderne';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Démonstration du Kit de blocs GLASS - Design moderne et fluide pour portfolio professionnel.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Démonstration du Kit de blocs GLASS - Design moderne et fluide pour portfolio professionnel.';
      document.head.appendChild(meta);
    }
  }, []);

  // Données pour les composants Glass Kit
  const kpiData = [
    { label: 'Projets Réalisés', value: '150+', icon: <Award size={24} />, color: 'primary' },
    { label: 'Clients Satisfaits', value: '98%', icon: <Users size={24} />, color: 'accent' },
    { label: 'Technologies', value: '25+', icon: <Code size={24} />, color: 'neon' },
    { label: 'Années d\'Expérience', value: '5+', icon: <Star size={24} />, color: 'success' }
  ];

  const logoData = [
    { src: '/api/placeholder/120/60', alt: 'React', name: 'React' },
    { src: '/api/placeholder/120/60', alt: 'Node.js', name: 'Node.js' },
    { src: '/api/placeholder/120/60', alt: 'TypeScript', name: 'TypeScript' },
    { src: '/api/placeholder/120/60', alt: 'MongoDB', name: 'MongoDB' },
    { src: '/api/placeholder/120/60', alt: 'Tailwind', name: 'Tailwind CSS' },
    { src: '/api/placeholder/120/60', alt: 'Figma', name: 'Figma' }
  ];

  const portfolioItems = [
    { src: '/api/placeholder/400/300', alt: 'E-commerce Platform', title: 'E-commerce Platform' },
    { src: '/api/placeholder/400/300', alt: 'Dashboard Analytics', title: 'Dashboard Analytics' },
    { src: '/api/placeholder/400/300', alt: 'Mobile App', title: 'Mobile App Design' },
    { src: '/api/placeholder/400/300', alt: 'SaaS Platform', title: 'SaaS Platform' }
  ];

  const contactInfo = {
    email: 'shayacoca20@gmail.com',
    phone: '053-3700551',
    address: 'Jérusalem • Tel Aviv'
  };

  return (
    <PageWrapper>
      {/* Hero Section avec Glass Kit */}
      <section className="py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sora text-5xl md:text-6xl font-bold text-white mb-6">
              Créateur du{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Futur Digital
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 line-clamp-3 break-words">
              Développeur Full-Stack passionné par l'innovation. Je transforme vos idées 
              en expériences digitales exceptionnelles avec React, Node.js et design moderne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GlassButton 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/contact')}
                className="focus-visible"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Démarrer un Projet
              </GlassButton>
              <GlassButton 
                variant="secondary" 
                size="lg" 
                onClick={() => navigate('/projects')}
                className="focus-visible"
              >
                Voir Portfolio
              </GlassButton>
            </div>
          </motion.div>
          
          {/* Right Visual avec FrameGlow */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <FrameGlow color="primary" intensity="medium" animated={true}>
              <GlassCard className="text-center" size="lg">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        SA
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1">Shay Acoca</h3>
                <p className="text-gray-400">Full-Stack Developer</p>
              </GlassCard>
            </FrameGlow>
          </motion.div>
        </div>
      </section>

      {/* KPI Strip - Nouveau composant Glass Kit */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <KPIStrip kpis={kpiData} className="mb-8" />
        </motion.div>
      </section>

      {/* Technologies avec LogoGrid */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4 line-clamp-1">
            Technologies Maîtrisées
          </h2>
          <p className="text-gray-400 line-clamp-2 break-words">
            Stack technique moderne pour des solutions performantes
          </p>
        </motion.div>
        <LogoGrid logos={logoData} />
      </section>

      {/* Services avec FeatureCard */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 line-clamp-1">
            Mes Services
          </h2>
          <p className="text-xl text-gray-400 line-clamp-2 break-words">
            Solutions complètes pour vos projets digitaux
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Code size={24} />}
            title="Développement Web"
            description="Applications web modernes avec React, Node.js et technologies de pointe"
            features={['React & Next.js', 'API REST & GraphQL', 'Base de données', 'Déploiement']}
            color="primary"
          />
          <FeatureCard
            icon={<Palette size={24} />}
            title="Design UI/UX"
            description="Interfaces utilisateur intuitives et expériences digitales mémorables"
            features={['Design System', 'Prototypage', 'Tests utilisateur', 'Responsive Design']}
            color="accent"
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Optimisation"
            description="Performance, SEO et accessibilité pour un impact maximal"
            features={['Performance Web', 'SEO Technique', 'Accessibilité', 'Analytics']}
            color="neon"
          />
        </div>
      </section>

      {/* Portfolio avec MediaGallery */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 line-clamp-1">
            Portfolio Récent
          </h2>
          <p className="text-xl text-gray-400 line-clamp-2 break-words">
            Découvrez mes dernières réalisations
          </p>
        </motion.div>
        <MediaGallery items={portfolioItems} />
        
        <div className="text-center mt-8">
          <GlassButton 
            variant="secondary" 
            size="lg" 
            onClick={() => navigate('/projects')}
            className="focus-visible"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Voir Tous les Projets
          </GlassButton>
        </div>
      </section>

      {/* Contact avec ContactSplit */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 line-clamp-1">
            Travaillons Ensemble
          </h2>
          <p className="text-xl text-gray-400 line-clamp-2 break-words">
            Prêt à donner vie à votre projet ? Contactez-moi dès maintenant
          </p>
        </motion.div>
        
        <ContactSplit 
          contactInfo={contactInfo}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            // Ici vous pouvez ajouter la logique d'envoi
            alert('Message envoyé ! Je vous répondrai sous 24h.');
          }}
        />
      </section>

      {/* CTA Final */}
      <section className="py-16">
        <FrameGlow color="accent" intensity="high" animated={true}>
          <GlassCard className="text-center" size="lg">
            <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2">
              Prêt à Créer Quelque Chose d'Extraordinaire ?
            </h3>
            <p className="text-xl text-gray-400 mb-8 line-clamp-3 break-words">
              Transformons ensemble vos idées en réalité digitale avec des solutions sur mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/contact')}
                className="focus-visible"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Commencer Maintenant
              </GlassButton>
              <GlassButton 
                variant="ghost" 
                size="lg" 
                onClick={() => navigate('/about')}
                className="focus-visible"
              >
                En Savoir Plus
              </GlassButton>
            </div>
          </GlassCard>
        </FrameGlow>
      </section>
    </PageWrapper>
  );
};

export default HomePageGlassKit;
