// [EXAM] Page Témoignages complète avec filtres et animations
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { 
  MessageSquare,
  Star,
  Quote,
  Filter,
  Search,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  TrendingUp,
  Users,
  Heart,
  Share2,
  ExternalLink
} from 'lucide-react';

const TestimonialsComplete = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { id: 'all', name: 'Tous', count: 24 },
    { id: 'web-dev', name: 'Développement Web', count: 8 },
    { id: 'mobile-dev', name: 'Apps Mobile', count: 6 },
    { id: 'consulting', name: 'Consulting', count: 5 },
    { id: 'design', name: 'Design', count: 5 }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      position: 'CEO',
      company: 'TechStart Solutions',
      category: 'web-dev',
      rating: 5,
      text: 'Shay a transformé notre vision en une plateforme web exceptionnelle. Son expertise technique et sa créativité ont dépassé toutes nos attentes. Le projet a été livré dans les délais avec une qualité irréprochable.',
      longText: 'Travailler avec Shay a été une expérience remarquable. Non seulement il maîtrise parfaitement les technologies modernes, mais il apporte aussi une vision stratégique qui a considérablement amélioré notre produit. Sa capacité à comprendre nos besoins métier et à les traduire en solutions techniques élégantes est impressionnante.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      project: 'Plateforme SaaS B2B',
      date: '2024-08-01',
      tags: ['React', 'Node.js', 'SaaS'],
      metrics: {
        projectValue: '€50K',
        duration: '3 mois',
        satisfaction: '5/5'
      }
    },
    {
      id: 2,
      name: 'Thomas Martin',
      position: 'Fondateur',
      company: 'EcoCommerce',
      category: 'web-dev',
      rating: 5,
      text: 'Une collaboration exceptionnelle ! Shay a développé notre e-commerce écologique avec une attention particulière à l\'UX et aux performances. Les ventes ont augmenté de 150% depuis le lancement.',
      longText: 'Le professionnalisme de Shay est remarquable. Il a su créer une expérience utilisateur fluide et engageante qui reflète parfaitement nos valeurs écologiques. Son approche méthodique et ses conseils avisés ont été déterminants pour le succès de notre projet.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      project: 'E-commerce Écologique',
      date: '2024-07-15',
      tags: ['E-commerce', 'React', 'Stripe'],
      metrics: {
        projectValue: '€35K',
        duration: '4 mois',
        satisfaction: '5/5'
      }
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      position: 'Directrice Marketing',
      company: 'HealthTech Pro',
      category: 'mobile-dev',
      rating: 5,
      text: 'L\'application mobile que Shay a créée pour nous a révolutionné notre approche client. Interface intuitive, performances excellentes, et un design qui nous démarque de la concurrence.',
      longText: 'Shay a une compréhension profonde des enjeux mobiles. Il a su créer une app qui non seulement répond à nos besoins fonctionnels, mais qui offre aussi une expérience utilisateur exceptionnelle. Son expertise en React Native et son attention aux détails font la différence.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      project: 'App Mobile Santé',
      date: '2024-06-20',
      tags: ['React Native', 'HealthTech', 'Mobile'],
      metrics: {
        projectValue: '€40K',
        duration: '5 mois',
        satisfaction: '5/5'
      }
    },
    {
      id: 4,
      name: 'Pierre Rousseau',
      position: 'CTO',
      company: 'DataFlow Analytics',
      category: 'consulting',
      rating: 5,
      text: 'Les conseils de Shay ont été cruciaux pour optimiser notre architecture technique. Son expertise en performance et scalabilité nous a fait économiser des mois de développement.',
      longText: 'En tant que consultant, Shay apporte une valeur immense. Il a audité notre stack technique et proposé des améliorations qui ont considérablement amélioré nos performances. Sa capacité à expliquer des concepts complexes de manière claire est remarquable.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      project: 'Audit & Optimisation',
      date: '2024-05-10',
      tags: ['Consulting', 'Performance', 'Architecture'],
      metrics: {
        projectValue: '€25K',
        duration: '2 mois',
        satisfaction: '5/5'
      }
    },
    {
      id: 5,
      name: 'Camille Moreau',
      position: 'Directrice Produit',
      company: 'CreativeStudio',
      category: 'design',
      rating: 5,
      text: 'Shay a une vision design exceptionnelle. Il a créé une identité visuelle moderne et cohérente qui a transformé notre image de marque. Un vrai talent créatif !',
      longText: 'La collaboration avec Shay sur notre refonte design a été inspirante. Il combine parfaitement créativité et expertise technique. Son approche user-centered et son attention aux détails ont créé une expérience utilisateur remarquable.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      project: 'Refonte Design Système',
      date: '2024-04-25',
      tags: ['Design System', 'UI/UX', 'Branding'],
      metrics: {
        projectValue: '€30K',
        duration: '3 mois',
        satisfaction: '5/5'
      }
    },
    {
      id: 6,
      name: 'Alexandre Durand',
      position: 'CEO',
      company: 'FinanceNext',
      category: 'web-dev',
      rating: 5,
      text: 'Shay a développé notre plateforme fintech avec une sécurité et une fiabilité exemplaires. Son expertise en développement financier est impressionnante.',
      longText: 'Dans le secteur financier, la sécurité et la performance sont critiques. Shay a livré une solution qui dépasse nos exigences les plus strictes. Son professionnalisme et sa rigueur technique nous ont donné une confiance totale.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      project: 'Plateforme FinTech',
      date: '2024-03-15',
      tags: ['FinTech', 'Security', 'React'],
      metrics: {
        projectValue: '€75K',
        duration: '6 mois',
        satisfaction: '5/5'
      }
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || testimonial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredTestimonials = testimonials.slice(0, 3);

  const stats = [
    { label: 'Clients Satisfaits', value: '98%', icon: Users },
    { label: 'Projets Réussis', value: '50+', icon: Award },
    { label: 'Note Moyenne', value: '4.9/5', icon: Star },
    { label: 'Recommandations', value: '100%', icon: TrendingUp }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Helmet>
        <title>Témoignages - Ce que disent mes clients | Shay Acoca</title>
        <meta name="description" content="Découvrez les témoignages de mes clients satisfaits et leurs retours d'expérience sur mes services de développement." />
      </Helmet>

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white flex items-center justify-center space-x-4">
                <MessageSquare className="text-purple-500" size={48} />
                <span>Témoignages</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Découvrez ce que mes clients pensent de mon travail et comment j'ai contribué au succès de leurs projets
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center"
                  >
                    <stat.icon className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Carrousel Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden">
                <div className="relative">
                  <Quote className="absolute top-0 left-0 text-purple-500/30" size={64} />
                  
                  <div className="relative z-10">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="text-center"
                    >
                      <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                        "{featuredTestimonials[currentSlide]?.longText}"
                      </p>
                      
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={featuredTestimonials[currentSlide]?.avatar}
                          alt={featuredTestimonials[currentSlide]?.name}
                          className="w-16 h-16 rounded-full border-2 border-purple-500"
                        />
                        <div className="text-left">
                          <div className="text-white font-bold text-lg">
                            {featuredTestimonials[currentSlide]?.name}
                          </div>
                          <div className="text-gray-300">
                            {featuredTestimonials[currentSlide]?.position} chez {featuredTestimonials[currentSlide]?.company}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prevSlide}
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="flex space-x-2">
                    {featuredTestimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-purple-500' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextSlide}
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Recherche */}
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher un témoignage..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Catégories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                {/* Mode d'affichage */}
                <div className="flex items-center space-x-2 p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Témoignages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-purple-500/50"
                      />
                      <div>
                        <div className="text-white font-bold">{testimonial.name}</div>
                        <div className="text-gray-300 text-sm">{testimonial.position}</div>
                        <div className="text-purple-400 text-sm">{testimonial.company}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 text-purple-500/30" size={24} />
                    <p className="text-gray-300 leading-relaxed pl-4">
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {testimonial.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Projet */}
                  <div className="text-center p-3 bg-white/5 rounded-lg mb-4">
                    <div className="text-white font-semibold text-sm">{testimonial.project}</div>
                    <div className="text-gray-400 text-xs">{new Date(testimonial.date).toLocaleDateString()}</div>
                  </div>

                  {/* Métriques */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex} className="p-2 bg-white/5 rounded">
                        <div className="text-white font-bold">{value}</div>
                        <div className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300">
                        <Heart size={16} />
                      </button>
                      <button className="p-2 bg-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300">
                        <Share2 size={16} />
                      </button>
                    </div>
                    
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                      Voir le projet
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Rejoignez mes clients satisfaits
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Vous aussi, faites partie de cette communauté de clients qui ont transformé leurs idées en succès digital. 
                Discutons de votre projet dès aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <MessageSquare size={20} />
                  <span>Démarrer mon projet</span>
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play size={20} />
                  <span>Voir mes réalisations</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComplete;
