import React, { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Palette, Globe, Smartphone, Zap } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'
import LoadingSpinner from '../components/LoadingSpinner'

// Lazy loading des charts lourds
const RadarChart = lazy(() => import('../components/charts/RadarChart'))
const StackedBarChart = lazy(() => import('../components/charts/StackedBarChart'))
const SkillsHeatmap = lazy(() => import('../components/charts/SkillsHeatmap'))

const SkillsPage = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedSkills, setExpandedSkills] = useState(new Set())
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const response = await apiServices.skills.getAll()
        setSkills(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des compétences:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const toggleSkill = (skillKey) => {
    const newExpanded = new Set(expandedSkills)
    if (newExpanded.has(skillKey)) {
      newExpanded.delete(skillKey)
    } else {
      newExpanded.add(skillKey)
    }
    setExpandedSkills(newExpanded)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader 
          title="Compétences" 
          subtitle="Technologies maîtrisées et expertise développée au fil des projets. Une approche moderne et performante du développement web." 
          centered 
          className="mb-8"
        />
      </motion.div>

      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Compétences
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Même identité visuelle, plus de lisibilité : mes compétences, mesurées en pratique.
          </motion.p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Radar Chart */}
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                Profil de Compétences
              </h3>
              <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingSpinner /></div>}>
                <RadarChart skills={skills} />
              </Suspense>
            </motion.div>

            {/* Stacked Bar Chart */}
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                Proficiency vs Usage
              </h3>
              <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingSpinner /></div>}>
                <StackedBarChart skills={skills} />
              </Suspense>
            </motion.div>
          </div>

          {/* Heatmap */}
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Projets ↔ Compétences
            </h3>
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingSpinner /></div>}>
              <SkillsHeatmap 
                skills={skills} 
                onProjectClick={setSelectedProject}
              />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Skills Accordion */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Détail des Compétences
          </motion.h2>
          
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.key}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                {/* Header */}
                <button
                  onClick={() => toggleSkill(skill.key)}
                  className="w-full p-6 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{skill.icon || '🔧'}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{skill.label}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400">{skill.proficiency}%</span>
                        </div>
                        <span className="text-sm text-gray-500">Depuis {skill.since}</span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedSkills.has(skill.key) ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </button>

                {/* Expanded Content */}
                {expandedSkills.has(skill.key) && (
                  <motion.div
                    className="px-6 pb-6 border-t border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-4">
                      <p className="text-gray-300 mb-4">
                        {skill.description || `Expertise avancée en ${skill.label} avec ${skill.usage}% d'utilisation dans mes projets.`}
                      </p>
                      
                      {/* Tools */}
                      {skill.tools && skill.tools.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white font-semibold mb-2">Outils & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {skill.tools.map((tool, toolIndex) => (
                              <span
                                key={toolIndex}
                                className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Usage Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Utilisation:</span>
                          <span className="text-white ml-2">{skill.usage}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Niveau:</span>
                          <span className="text-white ml-2">
                            {skill.proficiency >= 90 ? 'Expert' : 
                             skill.proficiency >= 70 ? 'Avancé' : 
                             skill.proficiency >= 50 ? 'Intermédiaire' : 'Débutant'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Intéressé par mes compétences ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez mes projets ou contactez-moi pour discuter de votre besoin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/projects'}
              >
                Voir mes projets
              </motion.button>
              <motion.button
                className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Me contacter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {selectedProject.name}
            </h3>
            <p className="text-gray-300 mb-4">
              {selectedProject.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {selectedProject.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </PageWrapper>
  )
}

export default SkillsPage
