import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  Calendar,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalProjects: 12,
    totalViews: 2847,
    totalLikes: 156,
    totalComments: 89
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données de démonstration pour l'activité récente
  const mockActivity = [
    {
      id: 1,
      type: 'project_view',
      message: 'Nouveau visiteur sur le projet "E-commerce React"',
      time: '2 minutes',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 2,
      type: 'like',
      message: 'Votre projet "Dashboard Analytics" a reçu un like',
      time: '15 minutes',
      icon: Heart,
      color: 'red'
    },
    {
      id: 3,
      type: 'comment',
      message: 'Nouveau commentaire sur "API REST Node.js"',
      time: '1 heure',
      icon: MessageCircle,
      color: 'green'
    },
    {
      id: 4,
      type: 'project_create',
      message: 'Nouveau projet "Portfolio React" créé',
      time: '2 heures',
      icon: Plus,
      color: 'purple'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setRecentActivity(mockActivity);
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <motion.div
      className={`p-6 rounded-xl shadow-lg ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
          {change && (
            <p className={`text-sm flex items-center gap-1 mt-1 ${
              change > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              <TrendingUp size={14} />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/20`}>
          <Icon className={`text-${color}-500`} size={24} />
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => {
    const Icon = activity.icon;
    return (
      <motion.div
        className={`flex items-center gap-4 p-4 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className={`p-2 rounded-lg bg-${activity.color}-500/20`}>
          <Icon className={`text-${activity.color}-500`} size={16} />
        </div>
        <div className="flex-1">
          <p className={`text-sm ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {activity.message}
          </p>
          <p className={`text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Il y a {activity.time}
          </p>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Tableau de bord
          </h1>
          <p className={`mt-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Bonjour {user?.name || 'Utilisateur'}, voici un aperçu de votre activité.
          </p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatCard
            title="Projets totaux"
            value={stats.totalProjects}
            icon={FileText}
            color="blue"
            change={12}
          />
          <StatCard
            title="Vues totales"
            value={stats.totalViews.toLocaleString()}
            icon={Eye}
            color="green"
            change={8}
          />
          <StatCard
            title="Likes reçus"
            value={stats.totalLikes}
            icon={Heart}
            color="red"
            change={15}
          />
          <StatCard
            title="Commentaires"
            value={stats.totalComments}
            icon={MessageCircle}
            color="purple"
            change={-3}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activité récente */}
          <motion.div
            className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Activité récente
              </h2>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </motion.div>

          {/* Actions rapides */}
          <motion.div
            className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className={`text-xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Actions rapides
            </h2>
            <div className="space-y-3">
              <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}>
                <Plus size={18} />
                Nouveau projet
              </button>
              <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}>
                <Edit size={18} />
                Modifier profil
              </button>
              <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}>
                <BarChart3 size={18} />
                Voir statistiques
              </button>
              <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}>
                <Settings size={18} />
                Paramètres
              </button>
            </div>
          </motion.div>
        </div>

        {/* Section admin */}
        {isAdmin() && (
          <motion.div
            className={`mt-8 p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className={`text-xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Administration
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}>
                <Users size={20} />
                Gérer utilisateurs
              </button>
              <button className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}>
                <FileText size={20} />
                Gérer contenu
              </button>
              <button className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}>
                <BarChart3 size={20} />
                Analytics
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
