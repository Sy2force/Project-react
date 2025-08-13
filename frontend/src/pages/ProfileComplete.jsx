// [EXAM] Page Profil complète avec édition avancée et gestion des préférences
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { 
  User, Mail, Phone, MapPin, Edit3, Save, X, Camera, Settings, Shield,
  Star, Award, Briefcase, CheckCircle, Sun, Moon, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileComplete = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const skills = [
    { name: 'React', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', level: 90, color: 'from-green-500 to-emerald-500' },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-blue-800' },
    { name: 'UI/UX Design', level: 88, color: 'from-purple-500 to-pink-500' }
  ];

  const achievements = [
    {
      title: 'Développeur Expert',
      description: '5+ années d\'expérience',
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      earned: true
    },
    {
      title: 'Client Satisfait',
      description: '98% de satisfaction',
      icon: Star,
      color: 'from-blue-500 to-cyan-500',
      earned: true
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'skills', label: 'Compétences', icon: Star },
    { id: 'achievements', label: 'Réussites', icon: Award },
    { id: 'preferences', label: 'Préférences', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Profil - {user?.name || 'Utilisateur'} | Shay Acoca</title>
        <meta name="description" content="Profil utilisateur avec informations personnelles, compétences et préférences." />
      </Helmet>

      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header avec photo de profil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Photo de profil */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user?.name?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>

                {/* Informations principales */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {user?.name || 'Nom d\'utilisateur'}
                      </h1>
                      <p className="text-blue-400 font-medium mb-2">
                        {user?.role === 'admin' ? 'Administrateur' : 
                         user?.role === 'business' ? 'Compte Business' : 'Utilisateur'}
                      </p>
                      <p className="text-gray-300 max-w-2xl">
                        {formData.bio || 'Développeur Full Stack passionné par la création d\'expériences digitales exceptionnelles.'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                      <Edit3 size={16} />
                      <span>{isEditing ? 'Annuler' : 'Modifier le profil'}</span>
                    </button>
                  </div>

                  {/* Statistiques rapides */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1,247</div>
                      <div className="text-gray-400 text-sm">Vues profil</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">24</div>
                      <div className="text-gray-400 text-sm">Projets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">18</div>
                      <div className="text-gray-400 text-sm">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">5+</div>
                      <div className="text-gray-400 text-sm">Années exp.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation par onglets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contenu des onglets */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {activeTab === 'profile' && (
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Informations personnelles</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Nom complet</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.name || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.email || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Téléphone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.phone || 'Non renseigné'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Localisation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                        {formData.location || 'Non renseigné'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-300 mb-2">Biographie</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Parlez-nous de vous..."
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white min-h-[100px]">
                      {formData.bio || 'Aucune biographie renseignée'}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex items-center space-x-4 mt-6">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                    >
                      <Save size={16} />
                      <span>Sauvegarder</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                    >
                      <X size={16} />
                      <span>Annuler</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Compétences techniques</h2>
                
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Badges et réussites</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border ${
                        achievement.earned 
                          ? 'bg-white/5 border-white/20' 
                          : 'bg-gray-800/50 border-gray-700 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} ${
                          !achievement.earned && 'grayscale'
                        }`}>
                          <achievement.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{achievement.title}</h3>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                          {achievement.earned && (
                            <div className="flex items-center space-x-1 text-green-400 text-sm mt-2">
                              <CheckCircle size={14} />
                              <span>Obtenu</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Préférences</h2>
                
                <div className="space-y-8">
                  {/* Thème */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Apparence</h3>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors">
                        <Sun size={18} />
                        <span>Clair</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                        <Moon size={18} />
                        <span>Sombre</span>
                      </button>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div>
                    <h3 className="text-white font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Notifications par email</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Notifications push</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComplete;
