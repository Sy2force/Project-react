import mongoose from 'mongoose';

// Schéma pour le modèle Ping
const pingSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    default: 'unknown'
  },
  userAgent: {
    type: String,
    default: 'unknown'
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Index pour optimiser les requêtes par date
pingSchema.index({ timestamp: -1 });

// Méthode statique pour créer un ping de test
pingSchema.statics.createTestPing = function() {
  return this.create({
    message: `Test ping - ${new Date().toLocaleString('fr-FR')}`,
    ip: '127.0.0.1',
    userAgent: 'Test Agent'
  });
};

// Méthode d'instance pour formater l'affichage
pingSchema.methods.toJSON = function() {
  const ping = this.toObject();
  return {
    id: ping._id,
    message: ping.message,
    timestamp: ping.timestamp,
    ip: ping.ip,
    userAgent: ping.userAgent,
    createdAt: ping.createdAt,
    updatedAt: ping.updatedAt
  };
};

// Créer et exporter le modèle
const Ping = mongoose.model('Ping', pingSchema);

export default Ping;
