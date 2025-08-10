import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Camera, Save, Edit3 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'


const ProfilePage = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Shay Acoca',
    email: user?.email || 'contact@shayacoca.com',
    phone: '+33 1 23 45 67 89',
    location: 'Paris, France',
    bio: 'Créateur du futur digital, spécialisé dans le développement React et le design d\'interfaces modernes.',
    avatar: '/api/placeholder/120/120'
  })

  const handleChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = () => {
    // Ici on sauvegarderait via l'API
    console.log('Sauvegarde du profil:', profileData)
    setIsEditing(false)
  }

  const stats = [
    { label: 'Projets Complétés', value: '47' },
    { label: 'Clients Satisfaits', value: '32' },
    { label: 'Années d\'Expérience', value: '5+' },
    { label: 'Technologies Maîtrisées', value: '15+' }
  ]

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader 
          title="Mon Profil" 
          subtitle="Gérez vos informations personnelles et préférences." 
          centered 
        />
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlassCard className="p-6 sm:p-8 mb-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-bold text-white">Informations Personnelles</h2>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 size={16} />
              {isEditing ? 'Annuler' : 'Modifier'}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar */}
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={profileData.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-blue-400 object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white">{profileData.name}</h3>
              <p className="text-gray-400">Développeur Full-Stack</p>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    <User size={16} className="inline mr-2" />
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-300 py-3">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-300 py-3">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-300 py-3">{profileData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Localisation
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-300 py-3">{profileData.location}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                ) : (
                  <p className="text-gray-300 py-3">{profileData.bio}</p>
                )}
              </div>

              {isEditing && (
                <motion.button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} />
                  Sauvegarder
                </motion.button>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GlassCard className="p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Statistiques</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Préférences</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Notifications Email</h3>
                <p className="text-gray-400 text-sm">Recevoir les notifications par email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Mode Sombre</h3>
                <p className="text-gray-400 text-sm">Interface en mode sombre</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Profil Public</h3>
                <p className="text-gray-400 text-sm">Rendre votre profil visible publiquement</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </PageWrapper>
  )
}

export default ProfilePage
