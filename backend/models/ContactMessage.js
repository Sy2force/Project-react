const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[0-9\s\-\(\)]{10,20}$/, 'Numéro de téléphone invalide']
  },
  subject: {
    type: String,
    required: [true, 'Le sujet est requis'],
    trim: true,
    maxlength: [200, 'Le sujet ne peut pas dépasser 200 caractères']
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    trim: true,
    maxlength: [2000, 'Le message ne peut pas dépasser 2000 caractères']
  },
  projectType: {
    type: String,
    enum: ['web-development', 'mobile-app', 'ui-ux-design', 'branding', 'e-commerce', 'consultation', 'other'],
    default: 'other'
  },
  budget: {
    type: String,
    enum: ['< 1000€', '1000€ - 5000€', '5000€ - 15000€', '15000€ - 50000€', '> 50000€', 'À discuter']
  },
  timeline: {
    type: String,
    enum: ['Urgent (< 1 mois)', 'Court terme (1-3 mois)', 'Moyen terme (3-6 mois)', 'Long terme (> 6 mois)', 'Flexible']
  },
  source: {
    type: String,
    enum: ['website', 'linkedin', 'referral', 'google', 'social-media', 'other'],
    default: 'website'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    maxlength: [1000, 'Les notes ne peuvent pas dépasser 1000 caractères']
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  whatsappSent: {
    type: Boolean,
    default: false
  },
  responseDate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ priority: 1, status: 1 });

// Virtual for formatted date
contactMessageSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Static method to get stats
contactMessageSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const total = await this.countDocuments();
  const thisMonth = await this.countDocuments({
    createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
  });
  
  return { stats, total, thisMonth };
};

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
