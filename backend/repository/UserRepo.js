import User from '../models/User.js';

class UserRepository {
  // Créer un nouvel utilisateur
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`Erreur création utilisateur: ${error.message}`);
    }
  }

  // Trouver un utilisateur par email
  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`Erreur recherche utilisateur: ${error.message}`);
    }
  }

  // Trouver un utilisateur par ID
  async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Erreur recherche utilisateur: ${error.message}`);
    }
  }

  // Mettre à jour un utilisateur
  async update(id, updateData) {
    try {
      return await User.findByIdAndUpdate(
        id, 
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Erreur mise à jour utilisateur: ${error.message}`);
    }
  }

  // Supprimer un utilisateur
  async delete(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Erreur suppression utilisateur: ${error.message}`);
    }
  }

  // Lister tous les utilisateurs avec pagination
  async findAll(options = {}) {
    try {
      const { page = 1, limit = 10, role, search } = options;
      const skip = (page - 1) * limit;
      
      let query = {};
      
      // Filtre par rôle
      if (role) {
        query.role = role;
      }
      
      // Recherche par nom ou email
      if (search) {
        query.$or = [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
      
      const users = await User.find(query)
        .select('-passwordHash')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
        
      const total = await User.countDocuments(query);
      
      return {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Erreur liste utilisateurs: ${error.message}`);
    }
  }

  // Compter les utilisateurs par rôle
  async countByRole() {
    try {
      return await User.aggregate([
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 }
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Erreur comptage utilisateurs: ${error.message}`);
    }
  }

  // Vérifier si un email existe déjà
  async emailExists(email, excludeId = null) {
    try {
      const query = { email };
      if (excludeId) {
        query._id = { $ne: excludeId };
      }
      const user = await User.findOne(query);
      return !!user;
    } catch (error) {
      throw new Error(`Erreur vérification email: ${error.message}`);
    }
  }

  // Obtenir les statistiques des utilisateurs
  async getStats() {
    try {
      const total = await User.countDocuments();
      const byRole = await this.countByRole();
      const recent = await User.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      });
      
      return {
        total,
        byRole,
        recentRegistrations: recent
      };
    } catch (error) {
      throw new Error(`Erreur statistiques utilisateurs: ${error.message}`);
    }
  }
}

export default new UserRepository();
