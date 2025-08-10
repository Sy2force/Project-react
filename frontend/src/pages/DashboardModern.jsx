import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, User, Briefcase, Mail, Settings, LogOut, 
  TrendingUp, Users, Award, Clock, ArrowRight,
  Code, Palette, Zap, Star, Eye, Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  GlassCard,
  GlassButton,
  KPIStrip,
  FeatureCard,
  MediaGallery,
  DataTable,
  FrameGlow
} from '../components/glass';

/**
 * DashboardModern - Dashboard principal avec navigation complète
 */
const DashboardModern = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.title = 'Dashboard - Shay Acoca Portfolio';
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Données pour les composants
  const kpiData = [
    { label: 'Projets Actifs', value: '12', icon: <Briefcase size={20} />, color: 'primary' },
    { label: 'Vues ce mois', value: '2.4K', icon: <Eye size={20} />, color: 'accent' },
    { label: 'Likes reçus', value: '847', icon: <Heart size={20} />, color: 'neon' },
    { label: 'Temps passé', value: '156h', icon: <Clock size={20} />, color: 'success' }
  ];

  const recentProjects = [
    { src: '/api/placeholder/300/200', alt: 'E-commerce Platform', title: 'E-commerce Platform' },
    { src: '/api/placeholder/300/200', alt: 'Dashboard Analytics', title: 'Dashboard Analytics' },
    { src: '/api/placeholder/300/200', alt: 'Mobile App', title: 'Mobile App Design' },
    { src: '/api/placeholder/300/200', alt: 'SaaS Platform', title: 'SaaS Platform' }
  ];

  const activityData = [
    { action: 'Nouveau projet créé', project: 'E-commerce Platform', time: '2h', status: 'active' },
    { action: 'Design mis à jour', project: 'Dashboard Analytics', time: '5h', status: 'active' },
    { action: 'Code déployé', project: 'Mobile App', time: '1j', status: 'inactive' },
    { action: 'Client contacté', project: 'SaaS Platform', time: '2j', status: 'active' }
  ];

  const activityColumns = [
    { key: 'action', label: 'Action', sortable: false },
    { key: 'project', label: 'Projet', sortable: true },
    { key: 'time', label: 'Il y a', sortable: false },
    { 
      key: 'status', 
      label: 'Statut', 
      sortable: false, 
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs ${
          value === 'active' ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted'
        }`}>
          {value === 'active' ? 'Actif' : 'Terminé'}
        </span>
      )
    }
  ];

  const navigationItems = [
    { icon: Home, label: 'Accueil', path: '/dashboard', active: true },
    { icon: User, label: 'Profil', path: '/profile' },
    { icon: Briefcase, label: 'Projets', path: '/projects' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: Settings, label: 'Paramètres', path: '/settings' }
  ];

  return (
    <div className="min-h-screen page-bg">
      <div className="flex">
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 min-h-screen p-6 border-r border-white/10"
        >
          <div className="space-y-6">
            {/* Logo & User */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">SA</span>
              </div>
              <h2 className="text-white font-bold text-lg line-clamp-1">
                {user?.name || 'Shay Acoca'}
              </h2>
              <p className="text-white/60 text-sm">Créateur Digital</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 focus-visible ${
                    item.active 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="line-clamp-1">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Logout */}
            <div className="pt-6 border-t border-white/10">
              <GlassButton
                variant="danger"
                size="sm"
                onClick={handleLogout}
                className="w-full focus-visible"
              >
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </GlassButton>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 line-clamp-1">
                  Tableau de Bord
                </h1>
                <p className="text-white/70 line-clamp-1">
                  Bienvenue dans votre espace créatif, {user?.name || 'Shay'} !
                </p>
              </div>
              
              <GlassButton
                variant="primary"
                onClick={() => navigate('/projects/new')}
                className="focus-visible"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Nouveau Projet
              </GlassButton>
            </motion.div>

            {/* KPI Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <KPIStrip kpis={kpiData} />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 line-clamp-1">
                Actions Rapides
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Code size={24} />}
                  title="Nouveau Projet"
                  description="Créer un nouveau projet de développement"
                  features={['React', 'Node.js', 'MongoDB']}
                  color="primary"
                />
                <FeatureCard
                  icon={<Palette size={24} />}
                  title="Design System"
                  description="Gérer votre bibliothèque de composants"
                  features={['Figma', 'Storybook', 'Tokens']}
                  color="accent"
                />
                <FeatureCard
                  icon={<Zap size={24} />}
                  title="Analytics"
                  description="Suivre les performances de vos projets"
                  features={['Métriques', 'Rapports', 'Insights']}
                  color="neon"
                />
              </div>
            </motion.div>

            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white line-clamp-1">
                  Projets Récents
                </h2>
                <GlassButton
                  variant="ghost"
                  onClick={() => navigate('/projects')}
                  className="focus-visible"
                >
                  Voir Tous
                  <ArrowRight className="w-4 h-4 ml-2" />
                </GlassButton>
              </div>
              <MediaGallery items={recentProjects} columns={4} />
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 line-clamp-1">
                Activité Récente
              </h2>
              <DataTable
                columns={activityColumns}
                data={activityData}
                searchable={false}
                sortable={true}
                pageSize={5}
              />
            </motion.div>

            {/* Performance Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 line-clamp-1">
                Aperçu Performance
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FrameGlow color="primary" intensity="medium">
                  <GlassCard size="lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        Croissance
                      </h3>
                      <div className="text-3xl font-bold text-primary mb-2">+45%</div>
                      <p className="text-white/70 line-clamp-2">
                        Augmentation des vues ce mois-ci
                      </p>
                    </div>
                  </GlassCard>
                </FrameGlow>

                <FrameGlow color="accent" intensity="medium">
                  <GlassCard size="lg">
                    <div className="text-center">
                      <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        Satisfaction
                      </h3>
                      <div className="text-3xl font-bold text-accent mb-2">98%</div>
                      <p className="text-white/70 line-clamp-2">
                        Taux de satisfaction client
                      </p>
                    </div>
                  </GlassCard>
                </FrameGlow>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardModern;
