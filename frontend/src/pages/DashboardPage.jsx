import React from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Users, Eye, Heart, TrendingUp, Calendar, Star, MapPin } from 'lucide-react'


const DashboardPage = () => {
  // Mock data pour le dashboard
  const stats = [
    { label: 'Mes Cartes', value: '5', change: '+2', icon: <CreditCard size={24} />, color: 'blue' },
    { label: 'Vues Totales', value: '2.3k', change: '+15%', icon: <Eye size={24} />, color: 'green' },
    { label: 'Favoris Reçus', value: '127', change: '+8%', icon: <Heart size={24} />, color: 'red' },
    { label: 'Connexions', value: '89', change: '+12%', icon: <Users size={24} />, color: 'purple' }
  ]

  const recentCards = [
    { name: 'Shay Acoca - Développeur', status: 'Active', views: 245, likes: 18, location: 'Tel Aviv' },
    { name: 'Tech Solutions Ltd', status: 'Active', views: 189, likes: 12, location: 'Haifa' },
    { name: 'Consultant Digital', status: 'Brouillon', views: 0, likes: 0, location: 'Jérusalem' }
  ]

  const recentActivity = [
    { action: 'Nouvelle carte créée', item: 'Tech Solutions Ltd', time: '2h', type: 'create' },
    { action: 'Carte mise à jour', item: 'Shay Acoca - Développeur', time: '4h', type: 'update' },
    { action: 'Nouveau favori reçu', item: 'Consultant Digital', time: '6h', type: 'like' },
    { action: 'Carte consultée', item: 'Tech Solutions Ltd', time: '1j', type: 'view' }
  ]

  return (
    <PageWrapper>

      
      {/* Header */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Bienvenue ! Voici un aperçu de votre activité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${stat.color}-500/20 rounded-xl text-${stat.color}-400`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp size={16} />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Mes Cartes Récentes</h2>
            
            <div className="space-y-4">
              {recentCards.map((card, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{card.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      card.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {card.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{card.views} vues</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        <span>{card.likes} favoris</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin size={14} />
                    {card.location}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Activité Récente</h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    activity.type === 'create' ? 'bg-green-500/20 text-green-400' :
                    activity.type === 'update' ? 'bg-blue-500/20 text-blue-400' :
                    activity.type === 'like' ? 'bg-red-500/20 text-red-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {activity.type === 'create' ? '+' :
                     activity.type === 'update' ? '↑' :
                     activity.type === 'like' ? '♥' : '👁'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white text-sm">{activity.action}</div>
                    <div className="text-gray-400 text-xs">{activity.item}</div>
                  </div>
                  
                  <div className="text-gray-500 text-xs">{activity.time}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Actions Rapides</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Nouvelle Carte', desc: 'Créer une carte business', href: '/cards/create', color: 'blue' },
              { title: 'Mes Cartes', desc: 'Gérer mes cartes', href: '/cards/my-cards', color: 'green' },
              { title: 'Explorer', desc: 'Découvrir des cartes', href: '/cards', color: 'purple' },
              { title: 'Favoris', desc: 'Mes cartes favorites', href: '/favorites', color: 'pink' }
            ].map((action, index) => (
              <motion.button
                key={action.title}
                onClick={() => window.location.href = action.href}
                className={`p-4 bg-${action.color}-500/10 hover:bg-${action.color}-500/20 border border-${action.color}-500/20 rounded-xl text-left transition-all duration-300`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

export default DashboardPage
