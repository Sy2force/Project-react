import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Edit3,
  Shield,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState({
    name: user?.name || 'Shay Acoca',
    email: user?.email || 'contact@shayacoca.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    bio: 'Développeur Full Stack passionné par les technologies modernes et l\'innovation.',
    website: 'https://shayacoca.com',
    github: 'https://github.com/shayacoca',
    linkedin: 'https://linkedin.com/in/shayacoca',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      // updateUser(formData);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Préférences', icon: Settings }
  ];

  const stats = [
    { label: 'Projets créés', value: '12', icon: '🚀' },
    { label: 'Vues totales', value: '2.4k', icon: '👁️' },
    { label: 'Likes reçus', value: '156', icon: '❤️' },
    { label: 'Connexions', value: '89', icon: '🤝' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Mon Profil
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Gérez vos informations personnelles et préférences
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {/* Profile Card */}
              <Card className="p-6 mb-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      SA
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {formData.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {user?.role === 'admin' ? 'Administrateur' : user?.role === 'business' ? 'Business' : 'Utilisateur'}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Navigation Tabs */}
              <Card className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-indigo-500 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <tab.icon size={20} className="mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <Card className="p-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Informations personnelles
                      </h2>
                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant="outline"
                        className="flex items-center"
                      >
                        <Edit3 size={16} className="mr-2" />
                        {isEditing ? 'Annuler' : 'Modifier'}
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nom complet
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          icon={User}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          icon={Mail}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Téléphone
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          icon={Phone}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Localisation
                        </label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={!isEditing}
                          icon={MapPin}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Site web
                        </label>
                        <Input
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          GitHub
                        </label>
                        <Input
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end mt-8 space-x-4">
                        <Button
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="flex items-center"
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <Save size={16} className="mr-2" />
                          )}
                          Sauvegarder
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Sécurité du compte
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mot de passe actuel
                        </label>
                        <div className="relative">
                          <Input
                            name="currentPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={handleChange}
                            icon={Lock}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nouveau mot de passe
                        </label>
                        <Input
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          icon={Lock}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirmer le nouveau mot de passe
                        </label>
                        <Input
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          icon={Lock}
                        />
                      </div>

                      <Button className="flex items-center">
                        <Save size={16} className="mr-2" />
                        Mettre à jour le mot de passe
                      </Button>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Préférences de notifications
                    </h2>

                    <div className="space-y-6">
                      {[
                        { label: 'Nouveaux commentaires', desc: 'Recevoir des notifications pour les nouveaux commentaires' },
                        { label: 'Nouveaux likes', desc: 'Recevoir des notifications pour les nouveaux likes' },
                        { label: 'Messages privés', desc: 'Recevoir des notifications pour les messages privés' },
                        { label: 'Newsletter', desc: 'Recevoir la newsletter hebdomadaire' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {item.label}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Préférences générales
                    </h2>

                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Langue
                        </h3>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>Français</option>
                          <option>English</option>
                          <option>Español</option>
                        </select>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Fuseau horaire
                        </h3>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>Europe/Paris</option>
                          <option>America/New_York</option>
                          <option>Asia/Tokyo</option>
                        </select>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Visibilité du profil
                        </h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="radio" name="visibility" className="mr-2" defaultChecked />
                            <span className="text-gray-700 dark:text-gray-300">Public</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="visibility" className="mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">Privé</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
