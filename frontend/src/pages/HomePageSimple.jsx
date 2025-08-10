import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Palette, Zap, Award, CreditCard } from 'lucide-react'
import { useCards } from '../hooks/useCards'
import BCardPreview from '../components/cards/BCardPreview'
import PageWrapper from '../components/layout/PageWrapper'

const HomePageSimple = () => {
  // Hook pour récupérer les 3 dernières cartes
  const { cards, loading: cardsLoading, fetchCards } = useCards()

  // Récupérer les cartes au chargement
  useEffect(() => {
    fetchCards({ limit: 3, sort: '-createdAt' })
  }, [fetchCards])

  const services = [
    {
      icon: Code,
      title: 'Développement Web',
      description: 'Applications React, Vue.js et Node.js modernes et performantes.'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Interfaces utilisateur élégantes et expériences optimisées.'
    },
    {
      icon: Zap,
      title: 'Optimisation',
      description: 'Performance, SEO et accessibilité de vos projets web.'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Code propre, maintenable et respectant les bonnes pratiques.'
    }
  ]

  return (
    <PageWrapper 
      title="Shay Acoca - Créateur du Futur Digital | Portfolio Professionnel" 
      description="Découvrez le portfolio de Shay Acoca, développeur web full-stack et designer UI/UX. Spécialiste React, Node.js, MongoDB. Créateur d'applications web modernes et performantes."
      keywords="Shay Acoca, développeur web, designer UI/UX, React, Node.js, MongoDB, portfolio, full-stack, applications web"
      canonical="https://shayacoca.com"
      schema={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Shay Acoca",
        "jobTitle": "Développeur Web Full-Stack & Designer UI/UX",
        "url": "https://shayacoca.com",
        "sameAs": [
          "https://github.com/shayacoca",
          "https://linkedin.com/in/shayacoca"
        ],
        "knowsAbout": ["React", "Node.js", "MongoDB", "JavaScript", "UI/UX Design", "Web Development"]
      }}
    >
      {/* Hero Section */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-sora mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Shay Acoca
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Développeur Full-Stack passionné par l'innovation. 
            Je transforme vos idées en expériences digitales exceptionnelles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cards"
              className="inline-flex items-center h-11 px-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/50"
            >
              <CreditCard className="mr-2" size={18} />
              Découvrir les cartes
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center h-11 px-5 border border-white/30 hover:bg-white/10 text-white rounded-2xl font-semibold transition-all duration-200 focus:ring-4 focus:ring-white/20"
            >
              Me contacter
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-sora text-white mb-4">
              Ce que je fais
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Des solutions complètes pour vos projets digitaux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass-card p-6 text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-sora text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Aperçu BCard (3) Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-sora text-white mb-4">
              Cartes Business Récentes
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Découvrez les dernières cartes business créées par notre communauté
            </p>
          </motion.div>

          {/* Grid des cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cardsLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="glass rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-white/10 rounded-xl mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-3/4"></div>
                </div>
              ))
            ) : cards.length > 0 ? (
              cards.slice(0, 3).map((card) => (
                <BCardPreview
                  key={card.id}
                  card={card}
                  onFavorite={(cardId) => {
                    // TODO: Implémenter favoris
                    console.log('Favori:', cardId)
                  }}
                  onDelete={(cardId) => {
                    // TODO: Implémenter suppression
                    console.log('Supprimer:', cardId)
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <CreditCard className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-sora text-white/60 mb-2">
                  Aucune carte disponible
                </h3>
                <p className="text-white/50">
                  Soyez le premier à créer une carte business !
                </p>
              </div>
            )}
          </div>

          {/* CTA Voir toutes les cartes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link
              to="/cards"
              className="inline-flex items-center h-11 px-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/50"
            >
              Voir toutes les cartes
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center glass-card p-12"
        >
          <h2 className="text-3xl font-bold font-sora text-white mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Discutons de vos idées et créons ensemble quelque chose d'exceptionnel.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center h-11 px-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/50"
          >
            Commencer maintenant
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  )
}

export default HomePageSimple
