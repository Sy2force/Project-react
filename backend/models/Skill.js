import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  label: {
    type: String,
    required: true,
    trim: true
  },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  usage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  since: {
    type: Number,
    required: true
  },
  tools: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
skillSchema.index({ key: 1 });
skillSchema.index({ proficiency: -1 });

export default mongoose.model('Skill', skillSchema);
