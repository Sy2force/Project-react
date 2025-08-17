import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, TrendingUp, DollarSign, Users, Calendar, 
  BarChart3, PieChart, Target, Award, Clock, 
  ArrowUpRight, ArrowDownRight, Plus, Filter,
  FileText, Download, Mail, Phone, Globe
} from 'lucide-react';
import { Card, Button, Input, Modal } from '../components/ui/index.js';

const BusinessPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock business data
  const mockProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      status: 'in-progress',
      progress: 75,
      budget: '$45,000',
      deadline: '2024-04-15',
      team: 4,
      priority: 'high'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'StartupXYZ',
      status: 'completed',
      progress: 100,
      budget: '$32,000',
      deadline: '2024-03-01',
      team: 3,
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Brand Identity Design',
      client: 'Creative Agency',
      status: 'planning',
      progress: 25,
      budget: '$18,000',
      deadline: '2024-05-20',
      team: 2,
      priority: 'low'
    }
  ];

  const mockAnalytics = {
    totalRevenue: '$245,600',
    monthlyRevenue: '$45,200',
    activeProjects: 8,
    completedProjects: 24,
    clientSatisfaction: '98%',
    teamUtilization: '85%',
    revenueGrowth: '+15.2%',
    projectSuccess: '96%'
  };

  useEffect(() => {
    setProjects(mockProjects);
    setAnalytics(mockAnalytics);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'planning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'clients', label: 'Clients', icon: Users }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="glass" className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-400">{analytics.totalRevenue}</p>
          <p className="text-sm text-green-400 mt-1 flex items-center justify-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            {analytics.revenueGrowth}
          </p>
        </Card>

        <Card variant="glass" className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-blue-400">{analytics.activeProjects}</p>
          <p className="text-sm text-gray-400 mt-1">{analytics.completedProjects} completed</p>
        </Card>

        <Card variant="glass" className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Client Satisfaction</h3>
          <p className="text-3xl font-bold text-purple-400">{analytics.clientSatisfaction}</p>
          <p className="text-sm text-gray-400 mt-1">Average rating</p>
        </Card>

        <Card variant="glass" className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-orange-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-orange-400">{analytics.projectSuccess}</p>
          <p className="text-sm text-gray-400 mt-1">Project completion</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">New project started</p>
                <p className="text-gray-400 text-sm">E-commerce Platform - TechCorp</p>
              </div>
              <span className="text-xs text-gray-500">2h ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Payment received</p>
                <p className="text-gray-400 text-sm">$15,000 from StartupXYZ</p>
              </div>
              <span className="text-xs text-gray-500">1d ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Project completed</p>
                <p className="text-gray-400 text-sm">Mobile App Development</p>
              </div>
              <span className="text-xs text-gray-500">3d ago</span>
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Deadlines
          </h3>
          <div className="space-y-4">
            {projects.filter(p => p.status !== 'completed').map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">{project.name}</p>
                  <p className="text-gray-400 text-sm">{project.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">{project.deadline}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Project Management</h2>
          <p className="text-gray-400">Track and manage all your business projects</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-400">{project.client}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Budget</p>
                  <p className="text-white font-semibold">{project.budget}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Deadline</p>
                  <p className="text-white font-semibold">{project.deadline}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Team Size</p>
                  <p className="text-white font-semibold">{project.team} members</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Progress</p>
                  <p className="text-white font-semibold">{project.progress}%</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-neon-cyan to-neon-blue h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Details
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Client
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Business Analytics</h2>
        <p className="text-gray-400">Detailed insights into your business performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Revenue Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Monthly Revenue</span>
              <span className="text-white font-semibold">{analytics.monthlyRevenue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Growth Rate</span>
              <span className="text-green-400 font-semibold">{analytics.revenueGrowth}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Team Utilization</span>
              <span className="text-blue-400 font-semibold">{analytics.teamUtilization}</span>
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Project Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Web Development</span>
              <span className="text-white font-semibold">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Mobile Apps</span>
              <span className="text-white font-semibold">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Design Services</span>
              <span className="text-white font-semibold">25%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Client Management</h2>
        <p className="text-gray-400">Manage relationships with your business clients</p>
      </div>

      <div className="grid gap-6">
        {['TechCorp Inc.', 'StartupXYZ', 'Creative Agency'].map((client, index) => (
          <motion.div
            key={client}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{client}</h3>
                  <p className="text-gray-400">Active since 2024</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Business <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">Dashboard</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Comprehensive business management and project tracking platform.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card variant="glass" className="p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-semibold'
                      : 'text-gray-300 hover:text-neon-cyan hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'clients' && renderClients()}
      </motion.div>
    </div>
  );
};

export default BusinessPage;
