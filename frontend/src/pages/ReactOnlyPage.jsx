import React from 'react'
import { motion } from 'framer-motion'
import { Code, Zap, Layers, Smartphone } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import ProjectGrid from '../components/ProjectGrid'

const ReactOnlyPage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReactProjects = async () => {
      try {
        setLoading(true)
        const response = await apiServices.projects.getAll({ tech: 'React' })
        const allProjects = response.data.projects || response.data
        
        // Filtrer uniquement les projets React
        const reactProjects = allProjects.filter(project => 
          project.tech && project.tech.includes('React')
        )
        
        setProjects(reactProjects)
      } catch (error) {
        console.error('Erreur lors du chargement des projets React:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReactProjects()
  }, [])

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
          title="React Specialist" 
          subtitle="Expertise approfondie en React et écosystème moderne JavaScript. Création d'applications performantes et scalables." 
          centered 
          className="mb-8"
        />
      </motion.div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Projets React
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mes projets React les plus significatifs : qualité et performance.
          </motion.p>

          {/* Stats React */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">{projects.length}</div>
              <div className="text-gray-400">Projets React</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-gray-400">Performance</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-pink-400 mb-2">Modern</div>
              <div className="text-gray-400">Stack</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* React Features */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          {
            title: 'Code Splitting',
            description: 'Chargement lazy des composants pour des temps de chargement optimaux.',
            techniques: ['React.lazy()', 'Suspense', 'Dynamic imports']
          },
          {
            title: 'State Management',
            description: 'Gestion d\'état efficace avec les hooks modernes et Context API.',
            techniques: ['useState', 'useReducer', 'Context', 'Zustand']
          }
        ].map((item, index) => (
          <GlassCard
            key={item.title}
            className="p-6 sm:p-8"
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
            <ul className="list-disc list-inside text-gray-400 mt-4">
              {item.techniques.map((technique, index) => (
                <li key={technique}>{technique}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </motion.div>

      {/* Technologies React */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Stack Technique React
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'React 18', icon: '⚛️', color: 'blue' },
              { name: 'Next.js', icon: '▲', color: 'purple' },
              { name: 'TypeScript', icon: '🔷', color: 'blue' },
              { name: 'Tailwind', icon: '🎨', color: 'cyan' },
              { name: 'Framer Motion', icon: '🎭', color: 'pink' },
              { name: 'Vite', icon: '⚡', color: 'yellow' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-${tech.color}-500/10 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <div className="text-white font-semibold">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mes Réalisations React
          </motion.h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">Aucun projet React trouvé</div>
              <p className="text-gray-500">Les projets seront bientôt disponibles via l'API backend.</p>
            </div>
          ) : (
            <ProjectGrid projects={projects} layout="grid" />
          )}
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Expertise React Avancée
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Développement d'applications React modernes, performantes et scalables avec les dernières technologies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">5+ ans</div>
                <div className="text-gray-400">Expérience React</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-gray-400">Composants créés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400 mb-2">98%</div>
                <div className="text-gray-400">Performance Score</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Discuter d'un projet React
              </motion.button>
              <motion.button
                className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/projects'}
              >
                Voir tous les projets
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default ReactOnlyPage
