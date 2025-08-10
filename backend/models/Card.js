import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [100, 'Le sous-titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    maxlength: [1024, 'La description ne peut pas dépasser 1024 caractères']
  },
  phone: {
    type: String,
    required: [true, 'Le téléphone est requis'],
    validate: {
      validator: function(v) {
        // Regex pour numéros israéliens (05X-XXXXXXX ou +972-5X-XXXXXXX)
        return /^(\+972-?)?0?5[0-9]-?\d{7}$/.test(v);
      },
      message: 'Format de téléphone israélien invalide'
    }
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Format d\'email invalide'
    }
  },
  webUrl: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optionnel
        return /^https:\/\/.+/.test(v);
      },
      message: 'L\'URL doit commencer par https://'
    }
  },
  address: {
    type: String,
    required: [true, 'L\'adresse est requise'],
    trim: true,
    maxlength: [200, 'L\'adresse ne peut pas dépasser 200 caractères']
  },
  location: {
    lat: {
      type: Number,
      min: [-90, 'Latitude invalide'],
      max: [90, 'Latitude invalide']
    },
    lng: {
      type: Number,
      min: [-180, 'Longitude invalide'],
      max: [180, 'Longitude invalide']
    }
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optionnel
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Format d\'image invalide'
    }
  },
  bizNumber: {
    type: Number,
    required: true,
    unique: true,
    min: [100000, 'Numéro business invalide'],
    max: [999999, 'Numéro business invalide']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index pour optimiser les requêtes
cardSchema.index({ bizNumber: 1 });
cardSchema.index({ userId: 1 });
cardSchema.index({ title: 'text', description: 'text' }); // Recherche textuelle

// Méthode pour formater la réponse
cardSchema.methods.toJSON = function() {
  const card = this.toObject();
  delete card.__v;
  return card;
};

export default mongoose.model('Card', cardSchema);
