import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import GlassPanel from './GlassPanel';
import GlassInput from './GlassInput';
import GlassButton from './GlassButton';

/**
 * ContactSplit - Section contact avec informations et formulaire côte à côte
 * @param {Object} props
 * @param {Object} props.contactInfo - Informations de contact {email, phone, address}
 * @param {Function} props.onSubmit - Gestionnaire de soumission du formulaire
 * @param {boolean} props.loading - État de chargement
 */
const ContactSplit = ({ 
  contactInfo = {},
  onSubmit,
  loading = false,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
      {/* Informations de contact */}
      <GlassPanel className="p-8 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Contactez-nous
          </h3>
          <p className="text-white/70 line-clamp-3">
            N'hésitez pas à nous contacter pour toute question ou demande de collaboration.
          </p>
        </div>

        <div className="space-y-4">
          {contactInfo.email && (
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-white hover:text-primary transition-colors line-clamp-1"
                >
                  {contactInfo.email}
                </a>
              </div>
            </motion.div>
          )}

          {contactInfo.phone && (
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-2 rounded-lg bg-accent/20 text-accent">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-white/60 text-sm">Téléphone</p>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-white hover:text-accent transition-colors line-clamp-1"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </motion.div>
          )}

          {contactInfo.address && (
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="p-2 rounded-lg bg-neon/20 text-neon">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-white/60 text-sm">Adresse</p>
                <p className="text-white line-clamp-2 break-words">
                  {contactInfo.address}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </GlassPanel>

      {/* Formulaire de contact */}
      <GlassPanel className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <GlassInput
              label="Nom *"
              type="text"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              errorMessage={errors.name}
            />
            <GlassInput
              label="Email *"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              errorMessage={errors.email}
            />
          </div>

          <GlassInput
            label="Sujet *"
            type="text"
            placeholder="Sujet de votre message"
            value={formData.subject}
            onChange={handleChange('subject')}
            error={!!errors.subject}
            errorMessage={errors.subject}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Message *
            </label>
            <motion.textarea
              className="glass-input w-full h-32 resize-none text-white placeholder-white/50"
              placeholder="Votre message..."
              value={formData.message}
              onChange={handleChange('message')}
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-danger/80"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            <Send size={20} className="mr-2" />
            {loading ? 'Envoi en cours...' : 'Envoyer le message'}
          </GlassButton>
        </form>
      </GlassPanel>
    </div>
  );
};

export default ContactSplit;
