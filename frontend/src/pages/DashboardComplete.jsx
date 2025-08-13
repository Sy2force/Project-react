// [EXAM] Dashboard complet avec analytics avancées et gestion utilisateur
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { 
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  Award,
  Target,
  Zap,
  Globe,
  Shield,
  Settings,
  Bell,
  Download,
  Upload,
  Edit3,
  Plus,
  Filter,
  Search,
  MoreVertical,
  ArrowUpRight,
  Activity,
  Briefcase,
  BookOpen,
  Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardComplete = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [stats, setStats] = useState({
    views: 0,
    projects: 0,
    likes: 0,
    messages: 0
  });

  // Animation des statistiques
  useEffect(() => {
    const targetStats = { views: 12547, projects: 24, likes: 892, messages: 47 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        views: Math.floor(targetStats.views * progress),
        projects: Math.floor(targetStats.projects * progress),
        likes: Math.floor(targetStats.likes * progress),
        messages: Math.floor(targetStats.messages * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const mainStats = [
    {
      title: 'Vues totales',
      value: stats.views.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Projets actifs',
      value: stats.projects,
      change: '+3',
      changeType: 'positive',
      icon: Briefcase,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Likes reçus',
      value: stats.likes.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Messages',
      value: stats.messages,
      change: '+5',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      status: 'En cours',
      progress: 75,
      client: 'TechStart Inc.',
      deadline: '2024-09-15',
      priority: 'high',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Portfolio Designer',
      status: 'Terminé',
      progress: 100,
      client: 'Creative Studio',
      deadline: '2024-08-30',
      priority: 'medium',
      technologies: ['Vue.js', 'Nuxt', 'Tailwind']
    },
    {
      id: 3,
      title: 'App Mobile Fitness',
      status: 'En révision',
      progress: 90,
      client: 'FitLife Corp.',
      deadline: '2024-09-20',
      priority: 'high',
      technologies: ['React Native', 'Firebase']
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'project',
      title: 'Nouveau projet créé',
      description: 'E-commerce Platform pour TechStart Inc.',
      time: '2 heures',
      icon: Plus,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message reçu',
      description: 'Sarah Johnson a envoyé un message',
      time: '4 heures',
      icon: Mail,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'like',
      title: 'Projet liké',
      description: 'Portfolio Designer a reçu 5 nouveaux likes',
      time: '6 heures',
      icon: Heart,
      color: 'text-red-400'
    },
    {
      id: 4,
      type: 'view',
      title: 'Pic de vues',
      description: 'Votre profil a été vu 150 fois aujourd\'hui',
      time: '8 heures',
      icon: Eye,
      color: 'text-purple-400'
    }
  ];

  const quickActions = [
    {
      title: 'Nouveau Projet',
      description: 'Créer un nouveau projet',
      icon: Plus,
      color: 'from-blue-500 to-cyan-500',
      href: '/projects/new'
    },
    {
      title: 'Écrire un Article',
      description: 'Publier sur le blog',
      icon: Edit3,
      color: 'from-purple-500 to-pink-500',
      href: '/blog/new'
    },
    {
      title: 'Voir Messages',
      description: 'Consulter les messages',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      href: '/messages'
    },
    {
      title: 'Analytics',
      description: 'Voir les statistiques',
      icon: BarChart3,
      color: 'from-yellow-500 to-orange-500',
      href: '/analytics'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours': return 'text-blue-400 bg-blue-400/10';
      case 'Terminé': return 'text-green-400 bg-green-400/10';
      case 'En révision': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Dashboard - Tableau de bord | Shay Acoca</title>
        <meta name="description" content="Tableau de bord personnel avec analytics, projets et activités." />
      </Helmet>

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Bonjour, {user?.name || 'Utilisateur'} 👋
                </h1>
                <p className="text-gray-300 mt-2">
                  Voici un aperçu de votre activité récente
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">3 derniers mois</option>
                  <option value="1y">Cette année</option>
                </select>

                <button className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
                  <Bell size={20} />
                </button>

                <Link
                  to="/profile/edit"
                  className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <Settings size={20} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mainStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp size={16} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.title}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.color} mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors mt-2" />
                </Link>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Projets récents</h2>
                  <Link
                    to="/projects"
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
                  >
                    <span>Voir tout</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-4 bg-white/5 rounded-xl border-l-4 ${getPriorityColor(project.priority)} hover:bg-white/10 transition-colors`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{project.title}</h3>
                          <p className="text-gray-400 text-sm">{project.client}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <button className="text-gray-400 hover:text-white">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">Progression</span>
                          <span className="text-white">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                          <Calendar size={14} />
                          <span>{new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Activité récente</h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-white/10 ${activity.color}`}>
                        <activity.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{activity.title}</p>
                        <p className="text-gray-400 text-sm">{activity.description}</p>
                        <div className="flex items-center space-x-1 text-gray-500 text-xs mt-1">
                          <Clock size={12} />
                          <span>Il y a {activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/activity"
                  className="block w-full mt-6 p-3 text-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                >
                  Voir toute l'activité
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComplete;
