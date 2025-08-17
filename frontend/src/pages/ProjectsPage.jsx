import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ExternalLink, Github, Filter, Search, Grid, List, Play, Award, Calendar, User, Tag } from 'lucide-react';
import { Button, Card, Input, Modal } from '../components/ui/index.js';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      description: 'Modern admin dashboard for e-commerce platform with real-time analytics, inventory management, and customer insights.',
      category: 'dashboard',
      image: '/api/placeholder/600/400',
      gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Node.js'],
      likes: 342,
      views: 1250,
      comments: 28,
      isLiked: false,
      projectUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example/project',
      createdAt: '2024-01-15',
      featured: true,
      status: 'completed'
    },
    {
      id: 2,
      title: 'AI-Powered SaaS Platform',
      description: 'Complete SaaS solution with AI integration, user management, subscription billing, and advanced analytics.',
      category: 'saas',
      image: '/api/placeholder/600/400',
      gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
      technologies: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Stripe'],
      likes: 567,
      views: 2100,
      comments: 45,
      isLiked: true,
      projectUrl: 'https://ai-saas.example.com',
      githubUrl: 'https://github.com/example/ai-saas',
      createdAt: '2024-02-20',
      featured: true,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication, transaction history, and budget tracking.',
      category: 'mobile-app',
      image: '/api/placeholder/600/400',
      gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Node.js'],
      likes: 423,
      views: 1800,
      comments: 32,
      isLiked: false,
      projectUrl: null,
      githubUrl: 'https://github.com/example/banking-app',
      createdAt: '2024-01-30',
      featured: false,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Real Estate Platform',
      description: 'Comprehensive real estate platform with property listings, virtual tours, and mortgage calculator.',
      category: 'web-app',
      image: '/api/placeholder/600/400',
      gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'Three.js'],
      likes: 289,
      views: 950,
      comments: 19,
      isLiked: false,
      projectUrl: 'https://realestate.example.com',
      githubUrl: null,
      createdAt: '2024-03-10',
      featured: false,
      status: 'in-progress'
    },
    {
      id: 5,
      title: 'Machine Learning Portfolio',
      description: 'Collection of ML projects including image recognition, natural language processing, and predictive analytics.',
      category: 'ai-ml',
      image: '/api/placeholder/600/400',
      gallery: ['/api/placeholder/600/400'],
      technologies: ['Python', 'TensorFlow', 'Jupyter', 'Pandas', 'Scikit-learn'],
      likes: 678,
      views: 3200,
      comments: 67,
      isLiked: true,
      projectUrl: null,
      githubUrl: 'https://github.com/example/ml-portfolio',
      createdAt: '2024-02-05',
      featured: true,
      status: 'completed'
    },
    {
      id: 6,
      title: 'Social Media Analytics',
      description: 'Advanced analytics platform for social media management with sentiment analysis and engagement tracking.',
      category: 'dashboard',
      image: '/api/placeholder/600/400',
      gallery: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      technologies: ['Angular', 'D3.js', 'Python', 'MongoDB', 'Docker'],
      likes: 234,
      views: 780,
      comments: 15,
      isLiked: false,
      projectUrl: 'https://social-analytics.example.com',
      githubUrl: 'https://github.com/example/social-analytics',
      createdAt: '2024-03-25',
      featured: false,
      status: 'completed'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: mockProjects.length },
    { id: 'web-app', name: 'Web Apps', count: mockProjects.filter(p => p.category === 'web-app').length },
    { id: 'mobile-app', name: 'Mobile Apps', count: mockProjects.filter(p => p.category === 'mobile-app').length },
    { id: 'dashboard', name: 'Dashboards', count: mockProjects.filter(p => p.category === 'dashboard').length },
    { id: 'saas', name: 'SaaS', count: mockProjects.filter(p => p.category === 'saas').length },
    { id: 'ai-ml', name: 'AI/ML', count: mockProjects.filter(p => p.category === 'ai-ml').length }
  ];

  useEffect(() => {
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm]);

  const handleLike = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, isLiked: !project.isLiked, likes: project.isLiked ? project.likes - 1 : project.likes + 1 }
        : project
    ));
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={viewMode === 'grid' ? '' : 'flex gap-6'}
    >
      <Card variant="glass" className={`group overflow-hidden ${viewMode === 'list' ? 'flex-1' : 'h-full'}`}>
        {/* Project Image */}
        <div className={`relative overflow-hidden bg-gradient-to-br from-neon-cyan/10 to-neon-blue/10 ${viewMode === 'grid' ? 'h-48' : 'w-64 h-40'} ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
          {project.featured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-neon-pink to-neon-purple text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" />
                FEATURED
              </span>
            </div>
          )}
          
          <div className="absolute top-3 right-3 z-10">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              project.status === 'completed' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}>
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full flex items-center justify-center">
              <Play className="w-10 h-10 text-black" />
            </div>
          </div>

          <motion.div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <Button
              variant="primary"
              size="sm"
              onClick={() => openProjectModal(project)}
            >
              View Details
            </Button>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className={`space-y-4 ${viewMode === 'grid' ? 'p-6' : 'p-4 flex-1'}`}>
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
              {project.title}
            </h3>
            <p className={`text-gray-400 leading-relaxed ${viewMode === 'list' ? 'text-sm' : ''}`}>
              {viewMode === 'list' ? project.description.slice(0, 120) + '...' : project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, viewMode === 'list' ? 3 : 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white/5 text-xs text-neon-cyan rounded-full border border-neon-cyan/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (viewMode === 'list' ? 3 : 5) && (
              <span className="px-2 py-1 bg-white/5 text-xs text-gray-400 rounded-full border border-white/10">
                +{project.technologies.length - (viewMode === 'list' ? 3 : 5)}
              </span>
            )}
          </div>

          {/* Stats and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className={`w-4 h-4 ${project.isLiked ? 'text-red-500 fill-current' : ''}`} />
                {project.likes}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(project.id)}
                className={project.isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`w-4 h-4 ${project.isLiked ? 'fill-current' : ''}`} />
              </Button>
              
              {project.projectUrl && (
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
              
              {project.githubUrl && (
                <Button variant="ghost" size="sm">
                  <Github className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">Projects</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore our portfolio of cutting-edge projects showcasing innovation, creativity, and technical excellence.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-6 items-center justify-between"
      >
        {/* Search */}
        <div className="w-full lg:w-96">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            variant="glass"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-glass-light rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'grid' 
                ? 'bg-neon-cyan text-black' 
                : 'text-gray-400 hover:text-neon-cyan'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'list' 
                ? 'bg-neon-cyan text-black' 
                : 'text-gray-400 hover:text-neon-cyan'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-semibold'
                  : 'bg-glass-light text-gray-300 hover:text-neon-cyan hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {category.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or browse all projects.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject?.title}
        size="xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Project Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {selectedProject.gallery.map((image, idx) => (
                <div key={idx} className="aspect-video bg-gradient-to-br from-neon-cyan/10 to-neon-blue/10 rounded-lg flex items-center justify-center">
                  <Play className="w-8 h-8 text-neon-cyan" />
                </div>
              ))}
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div>
                <h4 className="text-white font-semibold mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-sm border border-neon-cyan/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{selectedProject.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>{selectedProject.likes} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedProject.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                {selectedProject.projectUrl && (
                  <Button variant="primary" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button variant="outline" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectsPage;
