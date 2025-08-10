const mongoose = require('mongoose');

const bCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['web-development', 'mobile-app', 'ui-ux-design', 'branding', 'e-commerce', 'consultation'],
    default: 'web-development'
  },
  technologies: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
      },
      message: 'URL d\'image invalide'
    }
  },
  gallery: [{
    url: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
        },
        message: 'URL d\'image invalide'
      }
    },
    alt: {
      type: String,
      required: true,
      trim: true
    },
    caption: {
      type: String,
      trim: true
    }
  }],
  projectUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'URL de projet invalide'
    }
  },
  githubUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/(www\.)?github\.com\/.+/.test(v);
      },
      message: 'URL GitHub invalide'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  duration: {
    type: String,
    trim: true
  },
  client: {
    name: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    testimonial: {
      type: String,
      trim: true,
      maxlength: [500, 'Le témoignage ne peut pas dépasser 500 caractères']
    }
  },
  results: {
    performance: {
      type: String,
      trim: true
    },
    conversion: {
      type: String,
      trim: true
    },
    metrics: [{
      label: String,
      value: String,
      improvement: String
    }]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
bCardSchema.index({ category: 1, status: 1 });
bCardSchema.index({ featured: 1, publishedAt: -1 });
bCardSchema.index({ tags: 1 });
bCardSchema.index({ author: 1 });
bCardSchema.index({ title: 'text', description: 'text' });

// Virtual for formatted publish date
bCardSchema.virtual('formattedPublishDate').get(function() {
  if (!this.publishedAt) return null;
  return this.publishedAt.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save middleware
bCardSchema.pre('save', function(next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Static methods
bCardSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ status: 'published', featured: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'name email');
};

bCardSchema.statics.getByCategory = function(category, limit = 10) {
  return this.find({ status: 'published', category })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'name email');
};

bCardSchema.statics.search = function(query, options = {}) {
  const { category, tags, limit = 20, skip = 0 } = options;
  
  let searchQuery = { status: 'published' };
  
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  if (category) {
    searchQuery.category = category;
  }
  
  if (tags && tags.length > 0) {
    searchQuery.tags = { $in: tags };
  }
  
  return this.find(searchQuery)
    .sort({ score: { $meta: 'textScore' }, publishedAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('author', 'name email');
};

module.exports = mongoose.model('BCard', bCardSchema);
