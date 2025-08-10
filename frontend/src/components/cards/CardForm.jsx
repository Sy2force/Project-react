import { useState, useEffect } from 'react';
import { Save, X, MapPin } from 'lucide-react';

const CardForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  loading = false, 
  mode = 'create' // 'create' ou 'edit'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    webUrl: '',
    address: '',
    location: { lat: '', lng: '' },
    image: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        webUrl: '',
        address: '',
        location: { lat: '', lng: '' },
        image: '',
        ...initialData
      });
    }
  }, [initialData]);

  // Validation côté client
  const validateForm = () => {
    const newErrors = {};

    // Titre requis
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Le titre ne peut pas dépasser 100 caractères';
    }

    // Description requise
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.length > 1024) {
      newErrors.description = 'La description ne peut pas dépasser 1024 caractères';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères';
    }

    // Téléphone requis avec regex israélien
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^(\+972-?)?0?5[0-9]-?\d{7}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone israélien invalide (ex: 054-1234567)';
    }

    // Email requis
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // URL optionnelle mais doit être HTTPS si fournie
    if (formData.webUrl && !/^https:\/\/.+/.test(formData.webUrl)) {
      newErrors.webUrl = 'L\'URL doit commencer par https://';
    }

    // Adresse requise
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    } else if (formData.address.length > 200) {
      newErrors.address = 'L\'adresse ne peut pas dépasser 200 caractères';
    }

    // Validation géolocalisation optionnelle
    if (formData.location.lat && (isNaN(formData.location.lat) || formData.location.lat < -90 || formData.location.lat > 90)) {
      newErrors.lat = 'Latitude invalide (-90 à 90)';
    }
    if (formData.location.lng && (isNaN(formData.location.lng) || formData.location.lng < -180 || formData.location.lng > 180)) {
      newErrors.lng = 'Longitude invalide (-180 à 180)';
    }

    // Image optionnelle mais format validé
    if (formData.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.image)) {
      newErrors.image = 'URL d\'image invalide (jpg, jpeg, png, gif, webp)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Supprimer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Nettoyer les données avant envoi
    const cleanData = {
      ...formData,
      location: formData.location.lat && formData.location.lng ? {
        lat: parseFloat(formData.location.lat),
        lng: parseFloat(formData.location.lng)
      } : undefined
    };

    // Supprimer les champs vides optionnels
    if (!cleanData.subtitle?.trim()) delete cleanData.subtitle;
    if (!cleanData.webUrl?.trim()) delete cleanData.webUrl;
    if (!cleanData.image?.trim()) delete cleanData.image;
    if (!cleanData.location) delete cleanData.location;

    onSubmit(cleanData);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px',
      background: 'rgba(17, 25, 40, 0.8)',
      borderRadius: '16px',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        {mode === 'create' ? 'Créer une nouvelle carte' : 'Modifier la carte'}
      </h2>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Titre */}
        <div>
          <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            Titre *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            maxLength={100}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: errors.title ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px'
            }}
            placeholder="Nom de votre entreprise"
          />
          {errors.title && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.title}</p>}
        </div>

        {/* Sous-titre */}
        <div>
          <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            Sous-titre
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            maxLength={100}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px'
            }}
            placeholder="Slogan ou description courte"
          />
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            Description * ({formData.description.length}/1024)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={1024}
            rows={4}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: errors.description ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px',
              resize: 'vertical'
            }}
            placeholder="Décrivez votre entreprise, vos services..."
          />
          {errors.description && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.description}</p>}
        </div>

        {/* Téléphone et Email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
              Téléphone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: errors.phone ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px'
              }}
              placeholder="054-1234567"
            />
            {errors.phone && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.phone}</p>}
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: errors.email ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px'
              }}
              placeholder="contact@entreprise.com"
            />
            {errors.email && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.email}</p>}
          </div>
        </div>

        {/* Site web */}
        <div>
          <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            Site web
          </label>
          <input
            type="url"
            name="webUrl"
            value={formData.webUrl}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: errors.webUrl ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px'
            }}
            placeholder="https://votre-site.com"
          />
          {errors.webUrl && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.webUrl}</p>}
        </div>

        {/* Adresse */}
        <div>
          <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            Adresse *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            maxLength={200}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: errors.address ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px'
            }}
            placeholder="123 Rue Example, Tel Aviv, Israel"
          />
          {errors.address && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.address}</p>}
        </div>

        {/* Géolocalisation */}
        <div>
          <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            <MapPin size={16} style={{ display: 'inline', marginRight: '8px' }} />
            Géolocalisation (optionnel)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <input
                type="number"
                name="lat"
                value={formData.location.lat}
                onChange={handleInputChange}
                step="any"
                min="-90"
                max="90"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: errors.lat ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '16px'
                }}
                placeholder="Latitude"
              />
              {errors.lat && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.lat}</p>}
            </div>
            <div>
              <input
                type="number"
                name="lng"
                value={formData.location.lng}
                onChange={handleInputChange}
                step="any"
                min="-180"
                max="180"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: errors.lng ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '16px'
                }}
                placeholder="Longitude"
              />
              {errors.lng && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.lng}</p>}
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '500' }}>
            Image
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: errors.image ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '16px'
            }}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.image}</p>}
        </div>

        {/* Boutons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'rgba(71, 85, 105, 0.8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            <X size={20} />
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: loading ? 'rgba(59, 130, 246, 0.6)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Save size={20} />
            {loading ? 'Enregistrement...' : (mode === 'create' ? 'Créer la carte' : 'Mettre à jour')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CardForm;
