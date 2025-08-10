import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem, hoverLift, viewportAnimation } from '../utils/motionUtils'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import { apiServices } from '../api'
import LoadingSpinner from '../components/LoadingSpinner'

import ProjectGrid from '../components/ProjectGrid'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTech, setSelectedTech] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProject, setSelectedProject] = useState(null)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalViews: 0,
    totalLikes: 0,
    avgRating: 4.8
  })

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await apiServices.projects.getAll()
        const projectsData = response.data.projects || response.data
        setProjects(projectsData)
        setFilteredProjects(projectsData)
        
        // Calculer les stats
        const totalViews = projectsData.reduce((sum, p) => sum + (p.metrics?.views || 0), 0)
        const totalLikes = projectsData.reduce((sum, p) => sum + (p.metrics?.likes || 0), 0)
        
        setStats({
          totalProjects: projectsData.length,
          totalViews,
          totalLikes,
          avgRating: 4.8
        })
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filtrage et tri
  useEffect(() => {
    let filtered = [...projects]

    // Recherche
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filtre par technologie
    if (selectedTech !== 'all') {
      filtered = filtered.filter(project =>
        project.tech?.includes(selectedTech)
      )
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'popular':
          return (b.metrics?.likes || 0) - (a.metrics?.likes || 0)
        case 'views':
          return (b.metrics?.views || 0) - (a.metrics?.views || 0)
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedTech, sortBy])

  const handleLike = async (projectId) => {
    try {
      await apiServices.projects.like(projectId)
      setProjects(prev => prev.map(project =>
        project._id === projectId
          ? { ...project, metrics: { ...project.metrics, likes: (project.metrics?.likes || 0) + 1 } }
          : project
      ))
    } catch (error) {
      console.error('Erreur lors du like:', error)
    }
  }

  // Extraire toutes les technologies uniques
  const allTechnologies = [...new Set(projects.flatMap(p => p.tech || []))]

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
          title="Mes Projets" 
          subtitle="Découvrez mes réalisations et projets qui reflètent ma passion pour le développement web et l'innovation technologique." 
          centered 
          className="mb-8"
        />
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Projets', value: stats.totalProjects },
          { label: 'Vues', value: stats.totalViews },
          { label: 'Likes', value: stats.totalLikes },
          { label: 'Note', value: stats.avgRating, suffix: '/5' }
        ].map((stat, index) => (
          <GlassCard
            key={stat.label}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}{stat.suffix || ''}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {filteredProjects.map((project, index) => (
          <GlassCard
            key={project.id}
            className="overflow-hidden hover:bg-white/10 transition-all duration-300 group"
          >
            <ProjectGrid projects={filteredProjects} layout={viewMode} onLike={handleLike} />
          </GlassCard>
        ))}
      </motion.div>

      {/* FilterBar */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Recherche */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtre technologie */}
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="h-11 px-4 rounded-2xl bg-glass-bg backdrop-blur-md border border-glass-border text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 focus:border-brand-primary"
              >
                <option value="all">Toutes les technologies</option>
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech} className="bg-slate-800">
                    {tech}
                  </option>
                ))}
              </select>

              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 px-4 rounded-2xl bg-glass-bg backdrop-blur-md border border-glass-border text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 focus:border-brand-primary"
              >
                <option value="recent" className="bg-slate-800">Plus récents</option>
                <option value="popular" className="bg-slate-800">Plus populaires</option>
                <option value="views" className="bg-slate-800">Plus vus</option>
                <option value="alphabetical" className="bg-slate-800">Alphabétique</option>
              </select>

              {/* Mode d'affichage */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveFilter(category)}
            variant={activeFilter === category ? 'primary' : 'secondary'}
            size="md"
          >
            {category === 'all' ? 'Tous' : category}
          </Button>
        ))}
      </motion.div>
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">Aucun projet trouvé</div>
            </div>
          ) : (
            <ProjectGrid projects={filteredProjects} layout={viewMode} onLike={handleLike} />
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onLike={handleLike}
        />
      )}
    </PageWrapper>
  )
}

// Modal de détail du projet
const ProjectDetailModal = ({ project, onClose, onLike }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-800 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img
            src={project.cover || '/api/placeholder/800/400'}
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              {project.subtitle && (
                <p className="text-xl text-gray-300">{project.subtitle}</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => onLike(project._id)}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-full transition-colors"
              >
                <Heart size={16} />
                {project.metrics?.likes || 0}
              </button>
              <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
                <Eye size={16} />
                {project.metrics?.views || 0}
              </div>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Technologies */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Objectifs */}
          {project.objectives && project.objectives.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Objectifs</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {project.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Résultats */}
          {project.results && project.results.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Résultats</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {project.results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Galerie */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Galerie</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Liens */}
          <div className="flex gap-4">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors"
              >
                <ExternalLink size={16} />
                Voir le projet
              </a>
            )}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                <Github size={16} />
                Code source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectsPage
