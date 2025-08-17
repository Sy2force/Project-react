import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, ArrowRight, Check, Globe, Palette, Briefcase, TrendingUp, Code, Mail, Zap, ShoppingCart, Users } from 'lucide-react';
import { Card, Button, Input } from '../components/ui/index.js';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const services = useMemo(() => [
    {
      id: 1,
      title: 'Brand Identity Design',
      description: 'Complete brand identity package with logo, colors, typography, and brand guidelines.',
      category: 'branding',
      price: 299,
      tokens: 150,
      image: '/api/placeholder/400/250',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Business Cards'],
      tags: ['design', 'branding', 'identity'],
      rating: 4.9,
      reviews: 127,
      isPopular: true,
      deliveryTime: '3-5 days'
    },
    {
      id: 2,
      title: 'Content Strategy & Creation',
      description: 'Strategic content planning and creation for social media and marketing campaigns.',
      category: 'content',
      price: 199,
      tokens: 100,
      image: '/api/placeholder/400/250',
      features: ['Content Calendar', 'Social Media Posts', 'Blog Articles', 'SEO Optimization', 'Analytics'],
      tags: ['content', 'marketing', 'social'],
      rating: 4.8,
      reviews: 89,
      isPopular: false,
      deliveryTime: '5-7 days'
    },
    {
      id: 3,
      title: 'Digital Advertising Campaign',
      description: 'Complete digital advertising setup and management across multiple platforms.',
      category: 'advertising',
      price: 499,
      tokens: 250,
      image: '/api/placeholder/400/250',
      features: ['Campaign Setup', 'Ad Creative', 'Targeting', 'A/B Testing', 'Performance Reports'],
      tags: ['ads', 'marketing', 'ppc'],
      rating: 4.7,
      reviews: 156,
      isPopular: true,
      deliveryTime: '2-3 days'
    },
    {
      id: 4,
      title: 'Web Development',
      description: 'Custom website development with modern design and responsive layout.',
      category: 'web',
      price: 799,
      tokens: 400,
      image: '/api/placeholder/400/250',
      features: ['Responsive Design', 'CMS Integration', 'SEO Ready', 'Performance Optimization', 'Maintenance'],
      tags: ['web', 'development', 'responsive'],
      rating: 4.9,
      reviews: 203,
      isPopular: true,
      deliveryTime: '7-14 days'
    },
    {
      id: 5,
      title: 'SEO Optimization',
      description: 'Complete SEO audit and optimization to improve search engine rankings.',
      category: 'seo',
      price: 349,
      tokens: 175,
      image: '/api/placeholder/400/250',
      features: ['SEO Audit', 'Keyword Research', 'On-page SEO', 'Technical SEO', 'Monthly Reports'],
      tags: ['seo', 'optimization', 'ranking'],
      rating: 4.6,
      reviews: 94,
      isPopular: false,
      deliveryTime: '5-10 days'
    },
    {
      id: 6,
      title: 'Email Marketing Automation',
      description: 'Automated email marketing campaigns with personalized content and analytics.',
      category: 'email',
      price: 249,
      tokens: 125,
      image: '/api/placeholder/400/250',
      features: ['Email Templates', 'Automation Setup', 'Segmentation', 'A/B Testing', 'Analytics Dashboard'],
      tags: ['email', 'automation', 'marketing'],
      rating: 4.5,
      reviews: 67,
      isPopular: false,
      deliveryTime: '3-5 days',
      popularity: 40,
      priceRange: 'low'
    }
  ], []);

  const categories = [
    { id: 'all', name: 'All Services', icon: Globe },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'content', name: 'Content', icon: Briefcase },
    { id: 'advertising', name: 'Advertising', icon: TrendingUp },
    { id: 'web', name: 'Web Development', icon: Code },
    { id: 'seo', name: 'SEO', icon: Search },
    { id: 'email', name: 'Email Marketing', icon: Mail }
  ];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesPrice = selectedPriceRange === 'all' || 
                          (selectedPriceRange === 'low' && service.price < 500) ||
                          (selectedPriceRange === 'medium' && service.price >= 500 && service.price < 1500) ||
                          (selectedPriceRange === 'high' && service.price >= 1500);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedPriceRange, services]);

  const displayServices = useMemo(() => {
    let filtered = filteredServices;

    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [filteredServices, sortBy]);

  const ServiceCard = ({ service }) => {
    const Icon = service.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        layout
      >
        <Card 
          variant="glass" 
          className="group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
          onClick={() => setSelectedService(service)}
        >
          {/* Service Badge */}
          {service.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-gradient-to-r from-neon-cyan to-neon-blue text-white text-xs font-semibold rounded-full">
                {service.badge}
              </span>
            </div>
          )}

          {/* Service Image */}
          <div className="aspect-video bg-gradient-to-br from-neon-cyan/10 to-neon-blue/10 flex items-center justify-center mb-6">
            <Icon className="w-16 h-16 text-neon-cyan" />
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{service.rating}</span>
              </div>
              <span className="text-gray-400 text-sm">({service.reviews} reviews)</span>
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                    {feature}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                    +{service.features.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Price & Duration */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-neon-cyan font-bold">{service.price}</p>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.duration}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button variant="outline" className="w-full group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/50">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  };

  const ServiceModal = ({ service, isOpen, onClose }) => {
    if (!service) return null;

    const Icon = service.icon;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-10 h-10 text-neon-cyan" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                  <p className="text-gray-300 text-lg mb-4">{service.longDescription}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-medium">{service.rating}</span>
                      <span className="text-gray-400">({service.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-2 bg-white/10 text-white rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-8 p-6 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Investment</h3>
                    <p className="text-3xl font-bold text-neon-cyan">{service.price}</p>
                    <p className="text-gray-400">Timeline: {service.duration}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="primary">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

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
          Our <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">Services</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Transform your ideas into reality with our comprehensive digital solutions. From web development to mobile apps, we've got you covered.
        </p>
      </motion.div>

      {/* Filters & Search */}
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
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            variant="glass"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-glass-dark border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
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
              <category.icon className="w-4 h-4" />
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}-${sortBy}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full group overflow-hidden">
                  {/* Service Image */}
                  <div className="relative h-48 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 rounded-lg mb-4 overflow-hidden">
                    {service.isPopular && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-gradient-to-r from-neon-pink to-neon-purple text-white text-xs font-bold px-2 py-1 rounded-full">
                          POPULAR
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-black" />
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Service Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(service.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        {service.rating} ({service.reviews} reviews)
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-300">What's included:</h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                            <div className="w-1 h-1 bg-neon-cyan rounded-full" />
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-sm text-neon-cyan">
                            +{service.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/5 text-xs text-gray-400 rounded-full border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Pricing and CTA */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">${service.price}</span>
                            <span className="text-sm text-gray-400">or {service.tokens} tokens</span>
                          </div>
                          <p className="text-xs text-gray-500">Delivery: {service.deliveryTime}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="primary" className="flex-1 group">
                          <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Order Now
                        </Button>
                        <Button variant="outline" size="md">
                          <Users className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No services found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or browse all services.
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

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20"
      >
        <Card variant="neon" className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? Our team can create a custom service 
            package tailored to your specific business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              <Zap className="w-5 h-5 mr-2" />
              Request Custom Quote
            </Button>
            <Button variant="outline" size="lg">
              Schedule Consultation
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
