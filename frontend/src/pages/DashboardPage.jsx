import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, Plus, ArrowUpRight } from 'lucide-react';
import { Button, Card } from '../components/ui/index.js';
import { useAuth } from '../hooks/useAuth.jsx';

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/20',
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      icon: Users,
      color: 'text-neon-cyan',
      bgColor: 'from-neon-cyan/20 to-neon-blue/20',
    },
    {
      title: 'Growth Rate',
      value: '23.1%',
      change: '+2.4%',
      icon: TrendingUp,
      color: 'text-neon-purple',
      bgColor: 'from-neon-purple/20 to-neon-pink/20',
    },
    {
      title: 'Engagement',
      value: '94.2%',
      change: '+5.7%',
      icon: Activity,
      color: 'text-neon-blue',
      bgColor: 'from-neon-blue/20 to-neon-cyan/20',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'service_purchase',
      title: 'New service purchased',
      description: 'Premium Analytics Package',
      time: '2 minutes ago',
      amount: '$299',
    },
    {
      id: 2,
      type: 'user_signup',
      title: 'New user registered',
      description: 'john.doe@example.com',
      time: '15 minutes ago',
    },
    {
      id: 3,
      type: 'project_completed',
      title: 'Project completed',
      description: 'E-commerce Dashboard',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'payment_received',
      title: 'Payment received',
      description: 'Monthly subscription',
      time: '2 hours ago',
      amount: '$99',
    },
  ];

  const quickActions = [
    { title: 'Create Project', icon: Plus, href: '/projects/new', color: 'neon-cyan' },
    { title: 'Add Service', icon: Plus, href: '/services/new', color: 'neon-blue' },
    { title: 'Run Simulator', icon: Activity, href: '/simulator', color: 'neon-purple' },
    { title: 'View Analytics', icon: TrendingUp, href: '/analytics', color: 'neon-pink' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your business today.
          </p>
        </div>
        <Button variant="primary" className="mt-4 md:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card variant="glass" hover className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-4 rounded-lg glass-light hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                    <div>
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-gray-400 text-sm">{activity.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="text-green-400 font-semibold">{activity.amount}</p>
                    )}
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-full p-4 rounded-lg glass-light hover:bg-white/10 transition-all duration-200 flex items-center space-x-3 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg bg-${action.color}/20`}>
                    <action.icon className={`w-5 h-5 text-${action.color}`} />
                  </div>
                  <span className="text-white group-hover:text-neon-cyan transition-colors">
                    {action.title}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-neon-cyan transition-colors ml-auto" />
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Token Balance */}
          <Card variant="neon" className="p-6 mt-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Available Tokens</p>
              <p className="text-3xl font-bold text-white mb-4">
                {user?.tokens?.toLocaleString() || '1,250'}
              </p>
              <Button variant="primary" size="sm" className="w-full">
                Buy More Tokens
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">7D</Button>
              <Button variant="outline" size="sm">30D</Button>
              <Button variant="ghost" size="sm">90D</Button>
            </div>
          </div>
          <div className="h-64 glass-light rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
              <p className="text-gray-400">Chart component will be implemented here</p>
              <p className="text-gray-500 text-sm">Using Recharts or Chart.js</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
