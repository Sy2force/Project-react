import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  cover: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  excerpt: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      default: 'Shay Acoca'
    },
    avatar: {
      type: String,
      default: '/api/placeholder/100/100'
    }
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
postSchema.index({ slug: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Générer le slug automatiquement
postSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Méthode pour incrémenter les vues
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

export default mongoose.model('Post', postSchema);
