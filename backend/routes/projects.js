import express from 'express';
import Project from '../models/Project.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { validateProject, checkValidation } from '../utils/validators.js';
import { writeLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// GET /api/projects - Récupérer tous les projets
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 12, search, tech, sort = '-createdAt' } = req.query;
    
    let query = {};
    
    // Recherche textuelle
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filtrage par technologie
    if (tech) {
      query.tech = { $in: tech.split(',') };
    }
    
    const projects = await Project.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    const total = await Project.countDocuments(query);
    
    res.json({
      projects,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur récupération projets:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des projets' });
  }
});

// GET /api/projects/:id - Récupérer un projet spécifique
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    // Incrémenter les vues
    await project.incrementViews();
    
    res.json(project);
  } catch (error) {
    console.error('Erreur récupération projet:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du projet' });
  }
});

// POST /api/projects - Créer un nouveau projet (Admin seulement)
router.post('/', authenticateToken, requireRole('admin'), writeLimiter, validateProject, checkValidation, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    
    res.status(201).json({
      message: 'Projet créé avec succès',
      project
    });
  } catch (error) {
    console.error('Erreur création projet:', error);
    res.status(500).json({ message: 'Erreur lors de la création du projet' });
  }
});

// PATCH /api/projects/:id - Modifier un projet (Admin seulement)
router.patch('/:id', authenticateToken, requireRole('admin'), writeLimiter, validateProject, checkValidation, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json({
      message: 'Projet modifié avec succès',
      project
    });
  } catch (error) {
    console.error('Erreur modification projet:', error);
    res.status(500).json({ message: 'Erreur lors de la modification du projet' });
  }
});

// DELETE /api/projects/:id - Supprimer un projet (Admin seulement)
router.delete('/:id', authenticateToken, requireRole('admin'), writeLimiter, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression projet:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du projet' });
  }
});

// POST /api/projects/:id/like - Liker un projet
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    project.metrics.likes += 1;
    await project.save();
    
    res.json({
      message: 'Projet liké avec succès',
      likes: project.metrics.likes
    });
  } catch (error) {
    console.error('Erreur like projet:', error);
    res.status(500).json({ message: 'Erreur lors du like' });
  }
});

module.exports = router;
