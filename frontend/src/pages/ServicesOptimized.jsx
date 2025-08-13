// [EXAM] Page Services optimisée
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { 
  Code, 
  Palette, 
  Zap, 
  Globe, 
  Smartphone, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ServicesOptimized = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Développement Web",
      description: "Sites web modernes et applications web performantes",
      icon: Code,
      features: ["React/Vue.js", "Node.js/Express", "Base de données", "API REST"],
      duration: "2-6 semaines"
    },
    {
      id: 2,
      title: "Design UI/UX",
      description: "Interfaces utilisateur modernes et expérience optimisée",
      icon: Palette,
      features: ["Figma/Adobe XD", "Prototypage", "Design System", "Tests utilisateur"],
      duration: "1-3 semaines"
    },
    {
      id: 3,
      title: "Applications Mobile",
      description: "Apps natives et cross-platform performantes",
      icon: Smartphone,
      features: ["React Native", "Flutter", "iOS/Android", "App Store"],
      duration: "3-8 semaines"
    },
    {
      id: 4,
      title: "Optimisation Performance",
      description: "Amélioration des performances et SEO",
      icon: Zap,
      features: ["Lighthouse", "Core Web Vitals", "SEO", "Analytics"],
      duration: "1-2 semaines"
    },
    {
      id: 5,
      title: "E-commerce",
      description: "Boutiques en ligne complètes et sécurisées",
      icon: Globe,
      features: ["Stripe/PayPal", "Gestion stock", "Admin panel", "Analytics"],
      duration: "4-10 semaines"
    },
    {
      id: 6,
      title: "Analytics & Data",
      description: "Tableaux de bord et analyse de données",
      icon: BarChart3,
      features: ["Dashboard", "Charts.js", "Data viz", "Reporting"],
      duration: "2-4 semaines"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* [EXAM] SEO */}
      <Helmet>
        <title>Portfolio — Services | Développement Web & Mobile</title>
        <meta name="description" content="Services de développement web, mobile, design UI/UX, e-commerce et optimisation. Solutions digitales modernes et performantes." />
        <link rel="canonical" href={window.location.origin + "/services"} />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Service",
          name:"Services Développement",
          url: window.location.origin + "/services",
          description: "Services de développement web, mobile et design UI/UX"
        })}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Mes <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Solutions digitales complètes pour transformer vos idées en réalité
          </p>
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mr-4">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                      <p className="text-sm text-blue-400">{service.duration}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 group"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons de vos besoins et créons ensemble une solution sur mesure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold">
              Demander un devis
            </button>
            <button className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all duration-300 font-semibold">
              Voir mes projets
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesOptimized;
