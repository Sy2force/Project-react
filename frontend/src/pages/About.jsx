import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'Mon Histoire', icon: '📖' },
    { id: 'skills', label: 'Compétences', icon: '🚀' },
    { id: 'values', label: 'Valeurs', icon: '💎' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  const skills = [
    { name: 'React & Next.js', level: 95, color: 'bg-blue-500' },
    { name: 'Node.js & Express', level: 90, color: 'bg-green-500' },
    { name: 'TypeScript', level: 88, color: 'bg-indigo-500' },
    { name: 'MongoDB & PostgreSQL', level: 85, color: 'bg-purple-500' },
    { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
    { name: 'Design UX/UI', level: 80, color: 'bg-pink-500' }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Toujours à la recherche des dernières technologies et des meilleures pratiques pour créer des solutions modernes.',
      icon: '💡'
    },
    {
      title: 'Qualité',
      description: 'Chaque projet est réalisé avec le plus grand soin, en respectant les standards les plus élevés.',
      icon: '⭐'
    },
    {
      title: 'Collaboration',
      description: 'Je crois en la force du travail d\'équipe et en l\'importance d\'une communication transparente.',
      icon: '🤝'
    },
    {
      title: 'Apprentissage',
      description: 'La technologie évolue rapidement, et je m\'engage à rester à jour avec les dernières tendances.',
      icon: '📚'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Lancement de la plateforme',
      description: 'Création de cette plateforme moderne pour connecter les créateurs et les clients.'
    },
    {
      year: '2023',
      title: 'Spécialisation Full-Stack',
      description: 'Approfondissement des compétences en développement full-stack avec React et Node.js.'
    },
    {
      year: '2022',
      title: 'Premiers projets freelance',
      description: 'Début de l\'aventure entrepreneuriale avec mes premiers clients.'
    },
    {
      year: '2021',
      title: 'Formation développement web',
      description: 'Apprentissage intensif des technologies web modernes.'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Qui suis-je ? 👋
              </h3>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Passionné par le développement web et les nouvelles technologies, je crée des solutions digitales 
                modernes qui allient performance, esthétique et fonctionnalité. Mon objectif est de transformer 
                vos idées en réalité numérique avec une approche créative et technique.
              </p>
            </div>

            {/* Timeline */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Mon Parcours 🛤️
              </h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-fit">
                      {item.year}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Mes Compétences Techniques 🛠️
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Certifications & Formations 🎓
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    React Developer Certification
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Meta - 2023
                  </p>
                </div>
                <div className={`p-4 rounded border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Node.js Application Development
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    IBM - 2023
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'values':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow duration-200`}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Restons en Contact 📬
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        contact@monportfolio.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Téléphone</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        +33 1 23 45 67 89
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Localisation</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Paris, France
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Réseaux Sociaux
                  </h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-2xl">
                      🔗
                    </a>
                    <a href="#" className="text-blue-500 hover:text-blue-600 text-2xl">
                      🐦
                    </a>
                    <a href="#" className="text-purple-600 hover:text-purple-700 text-2xl">
                      📷
                    </a>
                    <a href="#" className="text-gray-800 hover:text-gray-900 text-2xl">
                      🐙
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Disponibilité */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Disponibilité 🕒
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Horaires de travail
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Samedi: 10h00 - 16h00<br />
                    Dimanche: Fermé
                  </p>
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Temps de réponse
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Email: Sous 24h<br />
                    Téléphone: Immédiat (heures ouvrables)<br />
                    Projets urgents: Disponible
                  </p>
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
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            À Propos de Moi
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Découvrez mon parcours, mes compétences et ma vision
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className={`flex flex-wrap justify-center gap-2 p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenu de l'onglet actif */}
        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default About;
