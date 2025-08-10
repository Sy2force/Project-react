import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Heart, ExternalLink, Github } from 'lucide-react'

const ProjectGrid = ({ projects, layout = 'grid' }) => {
  const gridClasses = layout === 'highlight' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'

  return (
    <div className={gridClasses}>
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Image de couverture */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.cover || '/api/placeholder/400/300'}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Métriques overlay */}
            <div className="absolute bottom-3 left-3 flex gap-3">
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                <Eye size={14} className="text-white" />
                <span className="text-white text-xs">{project.metrics?.views || 0}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                <Heart size={14} className="text-red-400" />
                <span className="text-white text-xs">{project.metrics?.likes || 0}</span>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
              {project.title}
            </h3>
            
            {project.subtitle && (
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {project.subtitle}
              </p>
            )}

            {/* Technologies */}
            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-gray-400 text-xs px-2 py-1">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                {project.year}
              </div>
              
              <div className="flex gap-2">
                {project.links?.demo && (
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={16} className="text-white" />
                  </motion.a>
                )}
                
                {project.links?.repo && (
                  <motion.a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={16} className="text-white" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ProjectGrid
