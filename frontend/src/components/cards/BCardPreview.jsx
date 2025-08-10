import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Heart, 
  Edit3, 
  Trash2, 
  Eye, 
  Star,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react'

const BCardPreview = ({ card, onFavorite, onDelete }) => {
  const { user, hasRole } = useAuth()
  
  const isOwner = user && card.owner === user.id
  const canEdit = isOwner || hasRole('admin')
  const canDelete = isOwner || hasRole('admin')
  const canFavorite = user && !isOwner

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Image de la carte */}
      <div className="relative h-48 overflow-hidden">
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-6xl font-bold text-white/30">
              {card.title?.charAt(0) || 'B'}
            </div>
          </div>
        )}
        
        {/* Actions overlay */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {canFavorite && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault()
                onFavorite?.(card.id)
              }}
              className="w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Heart className="w-4 h-4 text-white" />
            </motion.button>
          )}
          
          {canEdit && (
            <Link
              to={`/cards/${card.id}/edit`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 bg-blue-500/80 hover:bg-blue-500 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Edit3 className="w-4 h-4 text-white" />
            </Link>
          )}
          
          {canDelete && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault()
                onDelete?.(card.id)
              }}
              className="w-8 h-8 bg-red-600/80 hover:bg-red-600 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </motion.button>
          )}
        </div>

        {/* Badge catégorie */}
        {card.category && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
              {card.category}
            </span>
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <Link to={`/cards/${card.id}`} className="block p-4">
        <div className="mb-3">
          <h3 className="font-sora text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-blue-300 transition-colors">
            {card.title}
          </h3>
          {card.businessNumber && (
            <p className="text-sm text-blue-400 font-mono">
              #{card.businessNumber}
            </p>
          )}
        </div>

        {card.description && (
          <p className="text-white/70 text-sm mb-3 line-clamp-3">
            {card.description}
          </p>
        )}

        {/* Contact info */}
        <div className="space-y-1 mb-3">
          {card.email && (
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Mail className="w-3 h-3" />
              <span className="truncate">{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Phone className="w-3 h-3" />
              <span className="truncate">{card.phone}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Globe className="w-3 h-3" />
              <span className="truncate">{card.website}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {card.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {card.tags.length > 3 && (
              <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                +{card.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {card.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {card.likes || 0}
            </span>
          </div>
          {card.createdAt && (
            <span>
              {new Date(card.createdAt).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default BCardPreview
