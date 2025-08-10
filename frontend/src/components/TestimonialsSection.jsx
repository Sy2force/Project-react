import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "CEO, TechStart",
      content: "Travail exceptionnel sur notre plateforme React. Performance et design au rendez-vous.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Pierre Martin",
      role: "CTO, InnovCorp",
      content: "Expertise technique impressionnante. Livraison dans les délais avec une qualité irréprochable.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Sophie Laurent",
      role: "Product Manager, DigitalFlow",
      content: "Interface utilisateur moderne et intuitive. Nos utilisateurs adorent la nouvelle expérience.",
      rating: 5,
      avatar: "/api/placeholder/60/60"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Témoignages
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
            
            {/* Content */}
            <p className="text-gray-300 mb-6 italic">
              "{testimonial.content}"
            </p>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
