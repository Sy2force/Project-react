import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Calendar, Tag, Filter, Search, Heart, Eye, Star } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

const projects = [
  { 
    id: 1,
    title: "BCard • Cartes pro", 
    category: "Web App",
    technologies: ["React", "Material-UI", "Node.js", "MongoDB"],
    description: "Système complet de gestion de cartes de visite avec authentification, CRUD, likes et mode sombre/clair. Interface moderne avec animations fluides.",
    status: "Terminé",
    year: "2024",
    likes: 42,
    views: 1250,
    featured: true,
    color: "from-blue-500 to-cyan-500"
  },
  { 
    id: 2,
    title: "MarketFlow • SaaS", 
    category: "SaaS Platform",
    technologies: ["React", "Tailwind CSS", "Express", "PostgreSQL"],
    description: "Plateforme marketplace style Fiverr avec animations avancées, gestion des services, système de paiement et dashboard analytique.",
    status: "En cours",
    year: "2024",
    likes: 38,
    views: 890,
    featured: true,
    color: "from-purple-500 to-pink-500"
  },
  { 
    id: 3,
    title: "Pronotic • IA Sport", 
    category: "AI Platform",
    technologies: ["FastAPI", "Machine Learning", "Python", "TensorFlow"],
    description: "Intelligence artificielle pour prédictions sportives avec algorithmes de value betting et analyse de données avancée.",
    status: "Terminé",
    year: "2023",
    likes: 56,
    views: 2100,
    featured: false,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    category: "Dashboard",
    technologies: ["React", "D3.js", "Chart.js", "WebSocket"],
    description: "Tableau de bord interactif avec visualisations de données en temps réel, rapports personnalisés et intégrations API.",
    status: "Terminé",
    year: "2023",
    likes: 67,
    views: 1890,
    featured: true,
    color: "from-teal-500 to-cyan-500"
  }
];

const categories = ["Tous", "Web App", "SaaS Platform", "AI Platform", "Dashboard"];
const statuses = ["Tous", "Terminé", "En cours"];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Tous' || project.status === selectedStatus;
    const matchesFeatured = !showFeaturedOnly || project.featured;

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '4rem' }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              style={{ 
                fontSize: 'clamp(3rem, 5vw, 4rem)', 
                fontWeight: 'bold', 
                color: 'white', 
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
              }}
              variants={itemVariants}
            >
              Mes Projets
            </motion.h1>
            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Découvrez mes réalisations et créations digitales. Chaque projet reflète ma passion pour l'innovation et l'excellence technique.
            </motion.p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Card variant="glass" className="p-6">
              <div className="space-y-6">
                {/* Search */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Rechercher un projet..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      icon={<Search size={18} />}
                      variant="glass"
                    />
                  </div>
                  <Button
                    variant={showFeaturedOnly ? "primary" : "outline"}
                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    icon={<Star size={18} />}
                  >
                    Projets vedettes
                  </Button>
                </div>

                {/* Category & Status Filters */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-400 text-sm font-medium flex items-center">
                      <Filter size={16} className="mr-2" />
                      Catégorie:
                    </span>
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-gray-400 text-sm font-medium flex items-center">
                      <Tag size={16} className="mr-2" />
                      Status:
                    </span>
                    {statuses.map(status => (
                      <Button
                        key={status}
                        variant={selectedStatus === status ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card variant="glass" className="p-12 max-w-md mx-auto">
                <div className="text-gray-400">
                  <Search size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
                  <p>Essayez de modifier vos critères de recherche</p>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Card variant="glass" glow className="h-full overflow-hidden">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-6xl font-bold opacity-20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="warning" size="sm">
                            <Star size={12} className="mr-1" />
                            Vedette
                          </Badge>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={project.status === 'Terminé' ? 'success' : 'info'} 
                          size="sm"
                        >
                          {project.status}
                        </Badge>
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                        <Button
                          variant="glass"
                          size="sm"
                          icon={<ExternalLink size={16} />}
                        >
                          Demo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Github size={16} />}
                        >
                          Code
                        </Button>
                      </div>
                    </div>

                    {/* Project Content */}
                    <CardBody className="p-6">
                      <div className="space-y-4">
                        {/* Title & Category */}
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center mt-1">
                            <Calendar size={14} className="mr-1" />
                            {project.category} • {project.year}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge key={idx} variant="glass" size="sm">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="glass" size="sm">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Heart size={14} className="mr-1" />
                              {project.likes}
                            </span>
                            <span className="flex items-center">
                              <Eye size={14} className="mr-1" />
                              {project.views}
                            </span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2"
                              icon={<ExternalLink size={16} />}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2"
                              icon={<Github size={16} />}
                            />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="glass" className="p-12 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Intéressé par une collaboration ?
                  </h3>
                  <p className="text-gray-400 text-lg">
                    Discutons de votre prochain projet ensemble et créons quelque chose d'extraordinaire.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" icon={<Star size={20} />}>
                    Démarrer un projet
                  </Button>
                  <Button variant="outline" size="lg" icon={<Github size={20} />}>
                    Voir plus sur GitHub
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
