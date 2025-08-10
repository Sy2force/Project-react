import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, hoverLift, mobileOptimized } from '../utils/motionUtils'
import { ChevronLeft, ChevronRight, Download, Send } from 'lucide-react'
import { apiServices } from '../api'
import LoadingSpinner from '../components/LoadingSpinner'


const SimulatorPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pdfGenerating, setPdfGenerating] = useState(false)

  const questions = [
    {
      id: 'sector',
      title: 'Quel est votre secteur d\'activité ?',
      type: 'select',
      options: [
        'E-commerce',
        'SaaS/Tech',
        'Services',
        'Éducation',
        'Santé',
        'Finance',
        'Autre'
      ]
    },
    {
      id: 'budget',
      title: 'Quel est votre budget approximatif ?',
      type: 'select',
      options: [
        'Moins de 5k€',
        '5k€ - 15k€',
        '15k€ - 30k€',
        '30k€ - 50k€',
        'Plus de 50k€'
      ]
    },
    {
      id: 'timeline',
      title: 'Dans quels délais souhaitez-vous livrer ?',
      type: 'select',
      options: [
        'Moins de 1 mois',
        '1-3 mois',
        '3-6 mois',
        '6-12 mois',
        'Plus de 12 mois'
      ]
    },
    {
      id: 'type',
      title: 'Quel type de projet envisagez-vous ?',
      type: 'multiple',
      options: [
        'Site vitrine',
        'E-commerce',
        'Application web',
        'Application mobile',
        'Dashboard/CRM',
        'API/Backend'
      ]
    },
    {
      id: 'features',
      title: 'Quelles fonctionnalités sont prioritaires ?',
      type: 'multiple',
      options: [
        'Authentification utilisateur',
        'Paiement en ligne',
        'Gestion de contenu',
        'Analytics/Reporting',
        'API/Intégrations',
        'Mobile responsive',
        'SEO optimisé'
      ]
    },
    {
      id: 'design',
      title: 'Quel style de design préférez-vous ?',
      type: 'select',
      options: [
        'Moderne/Minimaliste',
        'Corporate/Professionnel',
        'Créatif/Artistique',
        'E-commerce/Commercial',
        'Dashboard/Technique'
      ]
    },
    {
      id: 'target',
      title: 'Qui est votre audience cible ?',
      type: 'select',
      options: [
        'Particuliers (B2C)',
        'Entreprises (B2B)',
        'Les deux (B2B2C)',
        'Interne (employés)',
        'Communauté/Membres'
      ]
    },
    {
      id: 'priority',
      title: 'Quelle est votre priorité principale ?',
      type: 'select',
      options: [
        'Performance/Vitesse',
        'Design/UX',
        'Fonctionnalités',
        'SEO/Référencement',
        'Sécurité',
        'Coût'
      ]
    },
    {
      id: 'maintenance',
      title: 'Souhaitez-vous une maintenance continue ?',
      type: 'select',
      options: [
        'Oui, maintenance complète',
        'Oui, support technique uniquement',
        'Non, formation équipe interne',
        'À définir plus tard'
      ]
    },
    {
      id: 'experience',
      title: 'Votre expérience avec les projets digitaux ?',
      type: 'select',
      options: [
        'Premier projet',
        'Quelques projets',
        'Expérience solide',
        'Expert technique'
      ]
    }
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      generateRecommendations()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateRecommendations = async () => {
    setLoading(true)
    try {
      // Simuler l'analyse des réponses
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Générer des recommandations basées sur les réponses
      const mockRecommendations = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        services: [
          {
            title: 'Développement React',
            description: 'Application web moderne avec React et TypeScript',
            price: '15k€ - 25k€',
            duration: '3-4 mois',
            priority: 'Haute'
          },
          {
            title: 'Design UI/UX',
            description: 'Interface utilisateur moderne et intuitive',
            price: '5k€ - 8k€',
            duration: '2-3 semaines',
            priority: 'Haute'
          },
          {
            title: 'Backend API',
            description: 'API sécurisée avec base de données',
            price: '8k€ - 12k€',
            duration: '2-3 mois',
            priority: 'Moyenne'
          }
        ],
        totalEstimate: '28k€ - 45k€',
        totalDuration: '4-6 mois'
      }
      
      setRecommendations(mockRecommendations)
    } catch (error) {
      console.error('Erreur lors de la génération des recommandations:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePDF = async () => {
    setPdfGenerating(true)
    try {
      const response = await apiServices.pdf.generate({
        answers,
        recommendations,
        timestamp: new Date().toISOString()
      })
      
      // Télécharger le PDF
      const blob = new Blob([atob(response.data.pdf)], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `simulation-projet-${new Date().getTime()}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error)
    } finally {
      setPdfGenerating(false)
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-white mt-4">Analyse de vos réponses en cours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {!recommendations ? (
            <>
              {/* Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Simulateur de Projet
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Répondez à quelques questions et obtenez une proposition claire, sans surprise.
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">
                    Question {currentStep + 1} sur {questions.length}
                  </span>
                  <span className="text-sm text-gray-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Question Card */}
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8"
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {currentQuestion.title}
                </h2>

                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option}
                        onClick={() => handleAnswer(currentQuestion.id, option)}
                        className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                          answers[currentQuestion.id] === option
                            ? 'bg-blue-500/20 border-blue-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'multiple' && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = answers[currentQuestion.id]?.includes(option)
                      return (
                        <motion.button
                          key={option}
                          onClick={() => {
                            const current = answers[currentQuestion.id] || []
                            const updated = isSelected
                              ? current.filter(item => item !== option)
                              : [...current, option]
                            handleAnswer(currentQuestion.id, updated)
                          }}
                          className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                            isSelected
                              ? 'bg-blue-500/20 border-blue-500 text-white'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded border-2 transition-colors ${
                              isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                            }`}>
                              {isSelected && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                            {option}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                )}
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-between">
                <motion.button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={20} />
                  Précédent
                </motion.button>

                <motion.button
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id] || (currentQuestion.type === 'multiple' && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0))}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep === questions.length - 1 ? 'Générer les recommandations' : 'Suivant'}
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </>
          ) : (
            /* Recommendations */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Vos Recommandations
                </h1>
                <p className="text-xl text-gray-300">
                  Basées sur vos réponses, voici notre proposition personnalisée.
                </p>
              </div>

              {/* Score */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8 text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                  {recommendations.score}/100
                </div>
                <p className="text-xl text-gray-300">Score de compatibilité</p>
              </div>

              {/* Services */}
              <div className="grid gap-6 mb-8">
                {recommendations.services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-300">{service.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        service.priority === 'Haute' ? 'bg-red-500/20 text-red-300' :
                        service.priority === 'Moyenne' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {service.priority}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Prix estimé:</span>
                        <span className="text-white ml-2">{service.price}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Durée:</span>
                        <span className="text-white ml-2">{service.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-4">Estimation Totale</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-3xl font-bold text-blue-400 mb-2">{recommendations.totalEstimate}</div>
                      <div className="text-gray-400">Budget total</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-400 mb-2">{recommendations.totalDuration}</div>
                      <div className="text-gray-400">Durée totale</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={generatePDF}
                  disabled={pdfGenerating}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white rounded-full font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  {pdfGenerating ? 'Génération...' : 'Télécharger PDF'}
                </motion.button>
                
                <motion.button
                  onClick={() => window.location.href = '/contact'}
                  className="flex items-center gap-2 px-8 py-4 border border-white/30 hover:bg-white/10 text-white rounded-full font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                  Discuter du projet
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SimulatorPage
