import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassInput from './GlassInput';
import GlassButton from './GlassButton';

/**
 * CardForm - Formulaire de création/édition de carte dans un conteneur glass
 * @param {Object} props
 * @param {Object} props.initialData - Données initiales du formulaire
 * @param {Function} props.onSubmit - Gestionnaire de soumission
 * @param {Function} props.onCancel - Gestionnaire d'annulation
 * @param {boolean} props.loading - État de chargement
 * @param {string} props.title - Titre du formulaire
 */
const CardForm = ({ 
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  title = 'Nouvelle carte',
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    imageUrl: '',
    ...initialData
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.category.trim()) newErrors.category = 'La catégorie est requise';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      // Convertir les tags en tableau
      const processedData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      onSubmit(processedData);
    }
  };

  return (
    <GlassCard className={`max-w-2xl mx-auto ${className}`} size="lg">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white line-clamp-1">
            {title}
          </h2>
          {onCancel && (
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="p-2"
            >
              <X size={20} />
            </GlassButton>
          )}
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <GlassInput
            label="Titre *"
            type="text"
            placeholder="Titre de la carte"
            value={formData.title}
            onChange={handleChange('title')}
            error={!!errors.title}
            errorMessage={errors.title}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Description *
            </label>
            <motion.textarea
              className="glass-input w-full h-24 resize-none text-white placeholder-white/50"
              placeholder="Description de la carte..."
              value={formData.description}
              onChange={handleChange('description')}
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
            {errors.description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-danger/80"
              >
                {errors.description}
              </motion.p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <GlassInput
              label="Catégorie *"
              type="text"
              placeholder="ex: Web Design"
              value={formData.category}
              onChange={handleChange('category')}
              error={!!errors.category}
              errorMessage={errors.category}
            />

            <GlassInput
              label="Tags"
              type="text"
              placeholder="tag1, tag2, tag3"
              value={formData.tags}
              onChange={handleChange('tags')}
            />
          </div>

          <GlassInput
            label="URL de l'image"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleChange('imageUrl')}
          />

          {/* Aperçu de l'image */}
          {formData.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-white/80">
                Aperçu
              </label>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
                <img
                  src={formData.imageUrl}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 items-center justify-center text-white/50 text-sm">
                  Image non disponible
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <GlassButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="flex-1"
            >
              <Save size={20} className="mr-2" />
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </GlassButton>
            
            {onCancel && (
              <GlassButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={onCancel}
                disabled={loading}
                className="flex-1"
              >
                Annuler
              </GlassButton>
            )}
          </div>
        </form>
      </div>
    </GlassCard>
  );
};

export default CardForm;
