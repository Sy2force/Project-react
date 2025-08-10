import express from 'express';
import Post from '../models/Post.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { validatePost, checkValidation } from '../utils/validators.js';
import { writeLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// GET /api/posts - Récupérer tous les articles
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 6, search, tags, sort = '-createdAt' } = req.query;
    
    let query = {};
    
    // Recherche textuelle
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filtrage par tags
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }
    
    const posts = await Post.find(query)
      .select('-content') // Exclure le contenu complet pour la liste
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    const total = await Post.countDocuments(query);
    
    res.json({
      posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Erreur récupération articles:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des articles' });
  }
});

// GET /api/posts/:id - Récupérer un article spécifique
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Erreur récupération article:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'article' });
  }
});

// POST /api/posts - Créer un nouvel article (Admin seulement)
router.post('/', authenticateToken, requireRole('admin'), writeLimiter, validatePost, checkValidation, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    
    res.status(201).json({
      message: 'Article créé avec succès',
      post
    });
  } catch (error) {
    console.error('Erreur création article:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'article' });
  }
});

// PATCH /api/posts/:id - Modifier un article (Admin seulement)
router.patch('/:id', authenticateToken, requireRole('admin'), writeLimiter, validatePost, checkValidation, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    res.json({
      message: 'Article modifié avec succès',
      post
    });
  } catch (error) {
    console.error('Erreur modification article:', error);
    res.status(500).json({ message: 'Erreur lors de la modification de l\'article' });
  }
});

// DELETE /api/posts/:id - Supprimer un article (Admin seulement)
router.delete('/:id', authenticateToken, requireRole('admin'), writeLimiter, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    
    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression article:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'article' });
  }
});

module.exports = router;
