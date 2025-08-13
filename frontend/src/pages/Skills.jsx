import { motion } from 'framer-motion';
import { Code, Palette, Database, Globe } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: 'React', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', level: 88, color: 'from-green-500 to-emerald-500' },
    { name: 'TypeScript', level: 90, color: 'from-blue-600 to-indigo-600' },
    { name: 'MongoDB', level: 82, color: 'from-green-600 to-green-800' },
    { name: 'Figma', level: 88, color: 'from-purple-500 to-pink-500' },
    { name: 'Tailwind', level: 92, color: 'from-cyan-500 to-blue-500' }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Mes Compétences</h1>
          <p className="text-xl text-gray-300">Expertise technique et créative</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <span className="text-purple-400 font-semibold">{skill.level}%</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                  className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                />
              </div>
              
              <div className="text-sm text-gray-400">
                {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Avancé' : 'Intermédiaire+'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
