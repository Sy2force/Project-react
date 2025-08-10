import React from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Smartphone, Globe, Zap, Shield } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'

const ServicesPage = () => {
  const services = [
    {
      id: 'react-dev',
      title: 'Développement React',
      description: 'Applications web modernes et performantes avec React, TypeScript et les dernières technologies.',
      icon: <Code size={32} />,
      features: [
        'Applications React 18 avec hooks',
        'TypeScript pour la robustesse',
        'State management (Redux, Zustand)',
        'Tests unitaires et d\'intégration',
        'Performance optimisée',
        'SEO et accessibilité'
      ],
      price: 'À partir de 15k€',
      duration: '3-6 mois',
      color: 'blue'
    },
    {
      id: 'ui-ux',
      title: 'Design UI/UX',
      description: 'Interfaces utilisateur modernes, intuitives et esthétiques pour une expérience optimale.',
      icon: <Palette size={32} />,
      features: [
        'Recherche utilisateur et personas',
        'Wireframes et prototypes',
        'Design system cohérent',
        'Interface responsive',
        'Tests d\'utilisabilité',
        'Animations et micro-interactions'
      ],
      price: 'À partir de 8k€',
      duration: '2-4 semaines',
      color: 'purple'
    },
    {
      id: 'optimization',
      title: 'Optimisation & Performance',
      description: 'Amélioration des performances, du référencement et de l\'expérience utilisateur.',
      icon: <Zap size={32} />,
      features: [
        'Audit de performance complet',
        'Optimisation du code et des assets',
        'SEO technique et contenu',
        'Core Web Vitals',
        'Monitoring et analytics',
        'Migration et modernisation'
      ],
      price: 'À partir de 5k€',
      duration: '2-6 semaines',
      color: 'green'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Découverte',
      description: 'Analyse de vos besoins, objectifs et contraintes pour définir la stratégie optimale.'
    },
    {
      step: '02',
      title: 'Conception',
      description: 'Design et architecture technique avec validation à chaque étape.'
    },
    {
      step: '03',
      title: 'Développement',
      description: 'Implémentation avec méthodologie agile et livraisons régulières.'
    },
    {
      step: '04',
      title: 'Livraison',
      description: 'Tests, déploiement et formation pour une mise en production réussie.'
    }
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "CEO, TechStart",
      content: "Travail exceptionnel sur notre plateforme React. Performance et design au rendez-vous.",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "CTO, InnovCorp",
      content: "Expertise technique impressionnante. Livraison dans les délais avec une qualité irréprochable.",
      rating: 5
    }
  ]

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader 
          title="Mes Services" 
          subtitle="Solutions complètes de développement web, du concept à la mise en production. Expertise technique et créativité au service de vos projets." 
          centered 
          className="mb-8"
        />
      </motion.div>
      <motion.p 
        className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Solutions digitales sur mesure pour transformer vos idées en réalité.
      </motion.p>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <GlassCard
                key={service.title}
                className="p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-${service.color}-500/20 text-${service.color}-400 mb-6`}>
                  {IconComponent}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-white font-semibold">{service.price}</div>
                      <div className="text-gray-400 text-sm">{service.duration}</div>
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/contact'}
                  >
                    Discuter du projet
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </GlassCard>
            )
          })}
        </motion.div>
      </section>

      {/* Process */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mon Processus
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Témoignages
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">★</div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard className="p-6 sm:p-8 text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel.
              Consultation gratuite pour tous nouveaux projets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Consultation Gratuite
              </Button>
              <Button variant="secondary" size="lg">
                Voir Portfolio
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    </PageWrapper>
  )
}

export default ServicesPage
