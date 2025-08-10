import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  cover: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  tech: [{
    type: String,
    required: true
  }],
  tags: [{
    type: String
  }],
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  metrics: {
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    }
  },
  description: {
    type: String,
    required: true
  },
  objectives: [{
    type: String
  }],
  results: [{
    type: String
  }],
  links: {
    demo: String,
    repo: String
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
projectSchema.index({ year: -1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ tech: 1 });
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Méthode pour incrémenter les vues
projectSchema.methods.incrementViews = function() {
  this.metrics.views += 1;
  return this.save();
};

export default mongoose.model('Project', projectSchema);
