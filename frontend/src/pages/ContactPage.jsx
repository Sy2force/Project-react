import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { apiServices } from '../api'


const ContactPage = () => {
  // SEO: Set page title and meta description
  useEffect(() => {
    document.title = 'Contact | Shay Acoca - Créateur du Futur Digital'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contactez Shay Acoca pour vos projets de développement web et design UI/UX. Collaboration créative et solutions digitales innovantes.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Contactez Shay Acoca pour vos projets de développement web et design UI/UX. Collaboration créative et solutions digitales innovantes.'
      document.head.appendChild(meta)
    }
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      await apiServices.contact.send(formData)
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader 
          title="Contact" 
          subtitle="Un projet en tête ? Parlons-en." 
          centered 
          className="mb-8"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Restons en contact</h2>
            
            <div className="space-y-6 mb-8">
              <motion.div
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Mail className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <a 
                    href="mailto:contact@shayacoca.com" 
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    contact@shayacoca.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Phone className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Téléphone</h3>
                  <a 
                    href="tel:+33123456789" 
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    +33 1 23 45 67 89
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <MapPin className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Localisation</h3>
                  <p className="text-gray-300">Paris, France</p>
                </div>
              </motion.div>
            </div>

            {/* Horaires */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Horaires de disponibilité</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>10h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyez-moi un message</h2>
              
              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-green-300">Message envoyé avec succès ! Je vous répondrai rapidement.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/30 rounded-lg mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="text-red-400" size={20} />
                  <span className="text-red-300">Erreur lors de l'envoi. Veuillez réessayer.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Nom *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="" className="bg-slate-800">Choisir un sujet</option>
                      <option value="projet-web" className="bg-slate-800">Projet web</option>
                      <option value="application" className="bg-slate-800">Application</option>
                      <option value="design" className="bg-slate-800">Design UI/UX</option>
                      <option value="consultation" className="bg-slate-800">Consultation</option>
                      <option value="autre" className="bg-slate-800">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Décrivez votre projet ou votre besoin..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-semibold text-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <SectionHeader title="Questions Fréquentes" centered className="mb-8" />
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "Quel est votre délai de réponse ?",
              answer: "Je réponds généralement sous 24h en semaine, 48h le weekend."
            },
            {
              question: "Proposez-vous des devis gratuits ?",
              answer: "Oui, tous mes devis sont gratuits et sans engagement."
            },
            {
              question: "Travaillez-vous à distance ?",
              answer: "Oui, je travaille principalement à distance avec des clients du monde entier."
            },
            {
              question: "Quels sont vos tarifs ?",
              answer: "Mes tarifs varient selon la complexité du projet. Contactez-moi pour un devis personnalisé."
            }
          ].map((faq, index) => (
            <GlassCard
              key={index}
              className="p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </PageWrapper>
  )
}

export default ContactPage
