import mongoose from 'mongoose';

// Schéma temporaire pour les projets (en attendant le modèle complet)
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  gallery: [{ type: String }],
  technologies: [{ type: String }],
  status: { 
    type: String, 
    enum: ['En cours', 'Terminé', 'En pause', 'Planifié'], 
    default: 'En cours' 
  },
  client: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  startDate: { type: Date },
  endDate: { type: Date },
  url: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

class ProjectRepository {
  // Créer un nouveau projet
  async create(projectData) {
    try {
      const project = new Project({
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return await project.save();
    } catch (error) {
      throw new Error(`Erreur création projet: ${error.message}`);
    }
  }

  // Trouver un projet par ID
  async findById(id) {
    try {
      return await Project.findById(id).populate('createdBy', 'fullName email');
    } catch (error) {
      throw new Error(`Erreur recherche projet: ${error.message}`);
    }
  }

  // Trouver un projet par slug
  async findBySlug(slug) {
    try {
      return await Project.findOne({ slug }).populate('createdBy', 'fullName email');
    } catch (error) {
      throw new Error(`Erreur recherche projet: ${error.message}`);
    }
  }

  // Lister tous les projets avec filtres
  async findAll(options = {}) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        status, 
        category, 
        technology, 
        featured, 
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = options;
      
      const skip = (page - 1) * limit;
      let query = {};
      
      // Filtres
      if (status) query.status = status;
      if (category) query.category = category;
      if (technology) query.technologies = { $in: [technology] };
      if (featured !== undefined) query.featured = featured;
      
      // Recherche
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { client: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }
      
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
      
      const projects = await Project.find(query)
        .populate('createdBy', 'fullName email')
        .skip(skip)
        .limit(limit)
        .sort(sortOptions);
        
      const total = await Project.countDocuments(query);
      
      return {
        projects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Erreur liste projets: ${error.message}`);
    }
  }

  // Mettre à jour un projet
  async update(id, updateData) {
    try {
      return await Project.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate('createdBy', 'fullName email');
    } catch (error) {
      throw new Error(`Erreur mise à jour projet: ${error.message}`);
    }
  }

  // Supprimer un projet
  async delete(id) {
    try {
      return await Project.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Erreur suppression projet: ${error.message}`);
    }
  }

  // Incrémenter les vues
  async incrementViews(id) {
    try {
      return await Project.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Erreur incrémentation vues: ${error.message}`);
    }
  }

  // Incrémenter les likes
  async incrementLikes(id) {
    try {
      return await Project.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Erreur incrémentation likes: ${error.message}`);
    }
  }

  // Obtenir les projets en vedette
  async getFeatured(limit = 6) {
    try {
      return await Project.find({ featured: true })
        .populate('createdBy', 'fullName email')
        .limit(limit)
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Erreur projets vedette: ${error.message}`);
    }
  }

  // Obtenir les statistiques des projets
  async getStats() {
    try {
      const total = await Project.countDocuments();
      const byStatus = await Project.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const byCategory = await Project.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
      const totalViews = await Project.aggregate([
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]);
      const totalLikes = await Project.aggregate([
        { $group: { _id: null, total: { $sum: '$likes' } } }
      ]);
      
      return {
        total,
        byStatus,
        byCategory,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0
      };
    } catch (error) {
      throw new Error(`Erreur statistiques projets: ${error.message}`);
    }
  }

  // Obtenir les technologies populaires
  async getPopularTechnologies(limit = 10) {
    try {
      return await Project.aggregate([
        { $unwind: '$technologies' },
        { $group: { _id: '$technologies', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: limit }
      ]);
    } catch (error) {
      throw new Error(`Erreur technologies populaires: ${error.message}`);
    }
  }
}

export default new ProjectRepository();
