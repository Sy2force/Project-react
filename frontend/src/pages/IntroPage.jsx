import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, X } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { useAuth } from '../contexts/AuthContext'
import { CheckCircle, FileText, Shield, Users } from 'lucide-react'

const IntroPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [showTermsModal, setShowTermsModal] = useState(false)

  // SEO: Set page title and meta description
  useEffect(() => {
    document.title = 'Bienvenue | Shay Acoca - Portfolio Digital'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez le portfolio de Shay Acoca, créateur du futur digital. Innovation, créativité et excellence en développement web et design UI/UX.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Découvrez le portfolio de Shay Acoca, créateur du futur digital. Innovation, créativité et excellence en développement web et design UI/UX.'
      document.head.appendChild(meta)
    }
  }, [])
  
  const { hasAcceptedTerms, acceptTerms } = useAuth()

  const handleAcceptTerms = () => {
    acceptTerms()
    setShowTermsModal(false)
    navigate('/auth')
  }

  const handleGetStarted = () => {
    if (hasAcceptedTerms) {
      navigate('/auth')
    } else {
      setShowTermsModal(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* Particules flottantes */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 4 + 6}s`
          }}
        />
      ))}

      {/* Contenu principal dans GlassCard */}
      <div className="z-10 max-w-4xl mx-auto px-4">
        <GlassCard className="text-center p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div style={{
                width: '96px',
                height: '96px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}>
                <span className="text-4xl font-bold text-white">S.A</span>
              </div>
            </motion.div>

            {/* Section Header pour le titre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <SectionHeader
                title="Shay Acoca"
                subtitle="Créateur du Futur Digital"
                center
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-brand-accent mb-12 max-w-2xl mx-auto break-words"
            >
              Portfolio professionnel • Développement Web • Design UI/UX • Innovation Digitale
            </motion.p>

            {/* Boutons d'action avec UI Kit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
                className="min-w-[200px]"
              >
                Commencer l'Exploration
              </Button>
              
              <Button
                onClick={() => navigate('/auth')}
                variant="glass"
                size="lg"
                className="min-w-[200px]"
              >
                Accès Direct
              </Button>
            </motion.div>

            {/* Statut des CGU */}
            {hasAcceptedTerms && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex items-center justify-center gap-2 text-green-400"
              >
                <CheckCircle size={20} />
                <span className="text-sm font-medium">Conditions générales acceptées</span>
              </motion.div>
            )}
          </motion.div>
        </GlassCard>
      </div>

      {/* Modal des CGU avec GlassCard */}
      {showTermsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <GlassCard className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8"
            >
              {/* Header avec SectionHeader */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="text-brand-primary" size={24} />
                  <SectionHeader
                    title="Conditions Générales"
                    subtitle="d'Utilisation"
                    className="mb-0"
                  />
                </div>
                <Button
                  onClick={() => setShowTermsModal(false)}
                  variant="glass"
                  className="w-11 h-11 p-0"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Contenu des CGU */}
              <div className="space-y-6 text-brand-accent">
                <div className="flex items-start gap-3">
                  <Shield className="text-green-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">Confidentialité et Sécurité</h3>
                    <p className="break-words">Vos données personnelles sont protégées et utilisées uniquement dans le cadre de ce portfolio. Aucune information n'est partagée avec des tiers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">Utilisation Responsable</h3>
                    <p className="break-words">Ce portfolio est destiné à présenter les compétences et réalisations professionnelles. L'utilisation doit rester dans un cadre respectueux et professionnel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="text-brand-secondary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">Accès aux Fonctionnalités</h3>
                    <p className="break-words">L'acceptation de ces conditions vous donne accès à l'ensemble du portfolio, incluant les projets, services, et fonctionnalités interactives.</p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action avec UI Kit */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={handleAcceptTerms}
                  variant="primary"
                  className="flex-1"
                >
                  J'accepte les conditions
                </Button>
                <Button
                  onClick={() => setShowTermsModal(false)}
                  variant="glass"
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  )
}

export default IntroPage
