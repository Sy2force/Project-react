import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, hoverLift, viewportAnimation } from '../utils/motionUtils'
import { ArrowRight, Sparkles, Code, Palette, Zap, Users, Award, Star } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'

const HomePage = () => {
  const navigate = useNavigate()

  // SEO: Set page title and meta description
  useEffect(() => {
    document.title = 'Shay Acoca - Créateur du Futur Digital | Portfolio'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Portfolio professionnel de Shay Acoca - Développement Web, Design UI/UX et Innovation Digitale. Découvrez mes projets et services créatifs.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Portfolio professionnel de Shay Acoca - Développement Web, Design UI/UX et Innovation Digitale. Découvrez mes projets et services créatifs.'
      document.head.appendChild(meta)
    }
  }, [])

  return (
    <PageWrapper>

      {/* Hero Split Section */}
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
            <p className="text-xl text-gray-300 mb-8 line-clamp-3">
              Développeur Full-Stack passionné par l'innovation. Je transforme vos idées 
              en expériences digitales exceptionnelles avec React, Node.js et design moderne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                <ArrowRight className="w-5 h-5 mr-2" />
                Démarrer un Projet
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/projects')}>
                Voir Portfolio
              </Button>
            </div>
          </motion.div>
          
          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <GlassCard className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      SA
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Shay Acoca</h3>
              <p className="text-gray-400">Full-Stack Developer</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Logos Strip */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-12"
      >
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm uppercase tracking-wider">Technologies maîtrisées</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {['React', 'Node.js', 'TypeScript', 'Tailwind', 'MongoDB', 'PostgreSQL'].map((tech) => (
            <div key={tech} className="text-gray-500 font-medium">{tech}</div>
          ))}
        </div>
      </motion.section>

      {/* Intro Split */}
      <section className="py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Innovation Technique</h3>
              <p className="text-gray-300 line-clamp-3">
                Expertise approfondie en développement moderne avec les dernières technologies 
                pour créer des solutions performantes et évolutives.
              </p>
            </GlassCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <SectionHeader 
              title="Pourquoi me choisir ?" 
              subtitle="Une approche unique alliant créativité et expertise technique pour transformer vos idées en réalité digitale." 
            />
          </motion.div>
        </div>
      </section>

      {/* KPI Band */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-12"
      >
        <div className="grid grid-cols-3 gap-6">
          {[
            { value: '250+', label: 'Projets réalisés' },
            { value: '25k+', label: 'Lignes de code' },
            { value: '140+', label: 'Clients satisfaits' }
          ].map((kpi, index) => (
            <GlassCard key={index} className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{kpi.value}</div>
              <div className="text-gray-400 text-sm">{kpi.label}</div>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* Cartes 01/02/03 */}
      <section className="py-16">
        <SectionHeader title="Services" subtitle="Solutions complètes pour vos projets digitaux" centered className="mb-12" />
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              number: '01',
              icon: Code,
              title: 'Développement Web',
              description: 'Applications React modernes et performantes avec architecture scalable.'
            },
            {
              number: '02', 
              icon: Palette,
              title: 'Design UI/UX',
              description: 'Interfaces élégantes et intuitives pour une expérience utilisateur optimale.'
            },
            {
              number: '03',
              icon: Zap,
              title: 'Optimisation',
              description: 'Performance maximale, SEO optimisé et accessibilité garantie.'
            }
          ].map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full hover:bg-white/10 transition-colors">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl font-bold text-blue-400 mr-4">{service.number}</span>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{service.title}</h3>
                  <p className="text-gray-300 line-clamp-3">{service.description}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Carousel 3 items */}
      <section className="py-16">
        <SectionHeader title="Projets Récents" subtitle="Découvrez mes dernières réalisations" centered className="mb-12" />
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'E-commerce Platform',
              description: 'Plateforme complète avec paiement sécurisé et gestion des stocks.',
              tech: 'React, Node.js, Stripe'
            },
            {
              title: 'Dashboard Analytics',
              description: 'Interface de visualisation de données en temps réel.',
              tech: 'React, D3.js, WebSocket'
            },
            {
              title: 'Mobile App',
              description: 'Application mobile cross-platform avec React Native.',
              tech: 'React Native, Firebase'
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full hover:bg-white/10 transition-colors">
                <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
                <p className="text-blue-400 text-xs">{project.tech}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <SectionHeader title="Témoignages" subtitle="Ce que disent mes clients" centered className="mb-12" />
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              text: 'Travail exceptionnel, délais respectés et communication parfaite. Je recommande vivement !',
              author: 'Marie Dubois',
              role: 'CEO, TechStart'
            },
            {
              text: 'Une expertise technique remarquable et une créativité qui fait la différence.',
              author: 'Jean Martin',
              role: 'Directeur Marketing'
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 line-clamp-3">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold line-clamp-2">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">{testimonial.role}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Signup */}
      <section className="py-16">
        <GlassCard className="p-8 text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto line-clamp-3">
            Transformons ensemble vos idées en réalité digitale. 
            Consultation gratuite pour tous nouveaux projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              <ArrowRight className="w-5 h-5 mr-2" />
              Consultation Gratuite
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/projects')}>
              Voir Portfolio
            </Button>
          </div>
        </GlassCard>
      </section>

      {/* Services Section - Restructuré */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <SectionHeader
              title="Mes Services"
              subtitle="Solutions digitales innovantes pour votre succès"
            />
          </motion.div>
          
          {/* Services Grid - Amélioré */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1 - Développement Web */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <GlassCard 
                className="cursor-pointer h-full relative overflow-hidden"
                onClick={() => navigate('/services')}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-sora text-white group-hover:text-blue-300 transition-colors">
                      Développement Web
                    </h3>
                  </div>
                  <p className="text-brand-accent text-lg leading-relaxed line-clamp-4 break-words mb-6">
                    Sites web modernes et applications React performantes avec les dernières technologies. Architecture scalable et optimisée.
                  </p>
                  <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Service 2 - Design UI/UX */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <GlassCard 
                className="cursor-pointer h-full relative overflow-hidden"
                onClick={() => navigate('/services')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-sora text-white group-hover:text-purple-300 transition-colors">
                      Design UI/UX
                    </h3>
                  </div>
                  <p className="text-brand-accent text-lg leading-relaxed line-clamp-4 break-words mb-6">
                    Interfaces utilisateur élégantes et intuitives qui captivent vos utilisateurs. Expérience optimisée et accessible.
                  </p>
                  <div className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Service 3 - Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <GlassCard 
                className="cursor-pointer h-full relative overflow-hidden"
                onClick={() => navigate('/services')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-sora text-white group-hover:text-yellow-300 transition-colors">
                      Innovation
                    </h3>
                  </div>
                  <p className="text-brand-accent text-lg leading-relaxed line-clamp-4 break-words mb-6">
                    Solutions créatives et technologies émergentes pour transformer vos idées en réalité digitale innovante.
                  </p>
                  <div className="flex items-center text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* CTA vers Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-16"
          >
            <Button
              variant="primary"
              onClick={() => navigate('/services')}
              className="text-lg px-8 py-4 h-14"
            >
              Voir tous mes services
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Restructuré */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <SectionHeader
              title="Restons en Contact"
              subtitle="Prêt à donner vie à vos projets digitaux ?"
            />
          </motion.div>
          
          {/* Contact Cards - Améliorées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📧</span>
                  </div>
                  <h3 className="text-2xl font-bold font-sora text-white mb-4 group-hover:text-blue-300 transition-colors">
                    Email
                  </h3>
                  <a 
                    href="mailto:shayacoca20@gmail.com" 
                    className="text-lg text-blue-400 hover:text-blue-300 transition-colors break-words font-medium"
                  >
                    shayacoca20@gmail.com
                  </a>
                  <p className="text-brand-accent mt-4 text-sm">
                    Réponse sous 24h garantie
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📞</span>
                  </div>
                  <h3 className="text-2xl font-bold font-sora text-white mb-4 group-hover:text-green-300 transition-colors">
                    Téléphone
                  </h3>
                  <a 
                    href="tel:053-3700551" 
                    className="text-lg text-green-400 hover:text-green-300 transition-colors font-medium"
                  >
                    053-3700551
                  </a>
                  <p className="text-brand-accent mt-4 text-sm">
                    Disponible 9h-18h (GMT+3)
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* CTA Section - Redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-xl text-brand-accent mb-8">
                Transformons ensemble vos idées en <span className="text-white font-semibold">réalité digitale</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                variant="primary"
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto text-lg px-8 py-4 h-14"
              >
                <ArrowRight className="w-6 h-6 mr-3" />
                Démarrer un Projet
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => navigate('/projects')}
                className="w-full sm:w-auto text-lg px-8 py-4 h-14"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Voir mes Réalisations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default HomePage
