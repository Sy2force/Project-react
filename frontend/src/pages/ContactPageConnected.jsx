import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import apiService from '../services/api'
import { GlassCard } from '../components/ui/GlassCard'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const ContactPageConnected = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await apiService.submitContact(formData)
      
      if (response.success) {
        setIsSubmitted(true)
        toast.success('Message envoyé avec succès ! Je vous recontacterai sous 24-48h.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          projectType: '',
          budget: '',
          timeline: ''
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const projectTypes = [
    { value: 'web-development', label: 'Développement Web' },
    { value: 'mobile-app', label: 'Application Mobile' },
    { value: 'ui-ux-design', label: 'Design UI/UX' },
    { value: 'branding', label: 'Branding & Identité' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'other', label: 'Autre' }
  ]

  const budgets = [
    '< 1000€',
    '1000€ - 5000€',
    '5000€ - 15000€',
    '15000€ - 50000€',
    '> 50000€',
    'À discuter'
  ]

  const timelines = [
    'Urgent (< 1 mois)',
    'Court terme (1-3 mois)',
    'Moyen terme (3-6 mois)',
    'Long terme (> 6 mois)',
    'Flexible'
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <GlassCard className="p-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <SectionHeader
                title="Message envoyé avec succès !"
                subtitle="Je vous recontacterai sous 24-48h pour discuter de votre projet."
              />
              <div className="mt-8">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="mr-4"
                >
                  Envoyer un autre message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                >
                  Retour à l'accueil
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <SectionHeader
            title="Contactez-moi"
            subtitle="Discutons de votre projet et créons quelque chose d'extraordinaire ensemble"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Démarrons votre projet</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+33 6 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Type de projet
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    >
                      <option value="">Sélectionnez un type</option>
                      {projectTypes.map(type => (
                        <option key={type.value} value={type.value} className="bg-gray-800">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Budget estimé
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    >
                      <option value="">Sélectionnez un budget</option>
                      {budgets.map(budget => (
                        <option key={budget} value={budget} className="bg-gray-800">
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Timeline souhaitée
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    >
                      <option value="">Sélectionnez une timeline</option>
                      {timelines.map(timeline => (
                        <option key={timeline} value={timeline} className="bg-gray-800">
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Sujet *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Sujet de votre message"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez votre projet en détail..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Restons en contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:contact@shayacoca.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                      contact@shayacoca.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">WhatsApp</p>
                    <a href="https://wa.me/972XXXXXXXX" className="text-green-400 hover:text-green-300 transition-colors">
                      +972 XX XXX XXXX
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Localisation</p>
                    <p className="text-white/60">Jérusalem, Israël</p>
                    <p className="text-white/60">Nantes, France</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Quick Response */}
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Réponse rapide</h3>
              <p className="text-white/80 mb-6">
                Je réponds généralement sous 24h. Pour une réponse immédiate, contactez-moi directement via WhatsApp.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle size={16} />
                  <span className="text-sm">Consultation gratuite de 30 minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle size={16} />
                  <span className="text-sm">Devis détaillé sous 48h</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle size={16} />
                  <span className="text-sm">Suivi personnalisé du projet</span>
                </div>
              </div>
            </GlassCard>

            {/* Availability */}
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Disponibilité</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Lun - Ven</span>
                  <span className="text-white">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Samedi</span>
                  <span className="text-white">10h00 - 16h00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Dimanche</span>
                  <span className="text-white/60">Fermé</span>
                </div>
                <div className="flex items-center space-x-2 mt-4 p-3 bg-green-500/10 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Actuellement disponible</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPageConnected
