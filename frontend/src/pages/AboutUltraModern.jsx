import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Code, Briefcase, Heart, Mail, Star, Download, Play } from 'lucide-react';

const AboutUltraModern = () => {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'Histoire', icon: User },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const skills = [
    { name: 'React & Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js & Express', level: 90, color: 'from-green-500 to-emerald-500' },
    { name: 'TypeScript', level: 88, color: 'from-purple-500 to-pink-500' },
    { name: 'MongoDB & PostgreSQL', level: 85, color: 'from-orange-500 to-red-500' }
  ];

  const experiences = [
    { year: '2024', title: 'Lead Full Stack Developer', company: 'Tech Innovation Corp' },
    { year: '2023', title: 'Senior React Developer', company: 'Digital Solutions Ltd' },
    { year: '2022', title: 'Full Stack Developer', company: 'StartUp Innovante' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <motion.div className="space-y-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <User size={80} className="text-white" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Shay Acoca
                  </span>
                </h1>
                <p className="text-xl text-gray-400 mb-6">
                  Architecte du Futur Digital • Full Stack Developer
                </p>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-transform flex items-center gap-2">
                    <Download size={20} />
                    CV
                  </button>
                  <button className="px-6 py-3 border border-gray-600 rounded-full text-gray-300 hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <Play size={20} />
                    Démo
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-white">Mon Parcours</h3>
              <p className="text-gray-300 leading-relaxed">
                Passionné par la technologie depuis l'enfance, j'ai transformé ma curiosité en expertise technique 
                de pointe. Aujourd'hui, je conçois des solutions digitales qui transforment les idées en réalités tangibles.
              </p>
            </div>
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Compétences Techniques</h2>
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-lg">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Expérience</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-blue-400">{exp.company}</p>
                    </div>
                    <span className="text-2xl font-bold text-gray-400">{exp.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
            <div className="max-w-md mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <div className="text-center space-y-4">
                  <Mail size={48} className="mx-auto text-blue-500" />
                  <h3 className="text-xl font-bold">Restons Connectés</h3>
                  <p className="text-gray-400">Prêt à collaborer ?</p>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                    Démarrer un Projet
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComponent size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUltraModern;
