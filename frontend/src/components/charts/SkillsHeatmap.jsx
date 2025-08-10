import React from 'react'
import { motion } from 'framer-motion'

const SkillsHeatmap = ({ skills, onProjectClick }) => {
  // Projets mockés avec leurs compétences associées
  const projects = [
    {
      id: 1,
      name: "E-commerce React",
      description: "Plateforme e-commerce moderne avec React et Node.js",
      skills: ["React", "Node.js", "MongoDB", "Tailwind"]
    },
    {
      id: 2,
      name: "Dashboard Analytics",
      description: "Dashboard d'analytics avec visualisations avancées",
      skills: ["React", "D3.js", "Express", "PostgreSQL"]
    },
    {
      id: 3,
      name: "App Mobile AR",
      description: "Application mobile avec réalité augmentée",
      skills: ["React Native", "Three.js", "WebGL", "Firebase"]
    }
  ]

  // Calculer l'intensité de chaque cellule
  const getIntensity = (project, skill) => {
    if (project.skills.includes(skill.label)) {
      return skill.proficiency / 100
    }
    return 0
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        {/* Header avec les compétences */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <div className="w-40 flex-shrink-0"></div>
            {skills.slice(0, 8).map((skill) => (
              <div
                key={skill.key}
                className="w-20 flex-shrink-0 text-center"
              >
                <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                  {skill.label.length > 8 ? skill.label.substring(0, 8) + '...' : skill.label}
                </div>
              </div>
            ))}
          </div>

          {/* Grille des projets */}
          {projects.map((project, projectIndex) => (
            <motion.div
              key={project.id}
              className="flex gap-2 items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: projectIndex * 0.1 }}
            >
              {/* Nom du projet */}
              <div className="w-40 flex-shrink-0">
                <motion.button
                  className="text-left p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors w-full"
                  onClick={() => onProjectClick(project)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-white text-sm font-medium truncate">
                    {project.name}
                  </div>
                  <div className="text-gray-400 text-xs truncate">
                    {project.description}
                  </div>
                </motion.button>
              </div>

              {/* Cellules d'intensité */}
              {skills.slice(0, 8).map((skill) => {
                const intensity = getIntensity(project, skill)
                return (
                  <motion.div
                    key={`${project.id}-${skill.key}`}
                    className="w-20 h-12 flex-shrink-0 rounded-lg flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: intensity > 0 
                        ? `rgba(59, 130, 246, ${intensity * 0.8})` 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: intensity > 0 
                        ? '1px solid rgba(59, 130, 246, 0.3)' 
                        : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: intensity > 0 
                        ? `rgba(59, 130, 246, ${Math.min(intensity * 1.2, 1)})` 
                        : 'rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => intensity > 0 && onProjectClick(project)}
                  >
                    {intensity > 0 && (
                      <div className="text-white text-xs font-medium">
                        {Math.round(intensity * 100)}%
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          ))}
        </div>

        {/* Légende */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="text-gray-400 text-sm">Intensité d'utilisation:</div>
          <div className="flex items-center gap-2">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity) => (
              <div
                key={intensity}
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${intensity * 0.8})`
                }}
              />
            ))}
          </div>
          <div className="text-gray-400 text-sm">0% → 100%</div>
        </div>
      </div>
    </div>
  )
}

export default SkillsHeatmap
