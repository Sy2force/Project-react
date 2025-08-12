import express from 'express';
import Post from '../models/Post.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
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

// POST /api/posts/:id/like - Liker/unliker un article
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Retirer le like
      post.likes.splice(likeIndex, 1);
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      // Ajouter le like
      post.likes.push(userId);
      post.likesCount += 1;
    }

    await post.save();

    res.json({
      success: true,
      data: {
        liked: likeIndex === -1,
        likesCount: post.likesCount
      }
    });
  } catch (error) {
    console.error('Erreur like article:', error);
    res.status(500).json({ message: 'Erreur lors du like de l\'article' });
  }
});

// POST /api/posts/:id/comments - Ajouter un commentaire
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Le contenu du commentaire est requis' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    const comment = {
      author: req.user.id,
      content: content.trim(),
      createdAt: new Date()
    };

    post.comments.push(comment);
    post.commentsCount = post.comments.length;
    await post.save();

    // Populer l'auteur du commentaire pour la réponse
    await post.populate('comments.author', 'name email');
    const newComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      success: true,
      data: newComment
    });
  } catch (error) {
    console.error('Erreur ajout commentaire:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire' });
  }
});

// GET /api/posts/categories - Récupérer les catégories disponibles
router.get('/categories', async (req, res) => {
  try {
    const categories = await Post.distinct('category', { status: 'published' });
    res.json({
      success: true,
      data: categories.filter(cat => cat) // Filtrer les valeurs nulles
    });
  } catch (error) {
    console.error('Erreur récupération catégories:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
});

// GET /api/posts/tags - Récupérer les tags disponibles
router.get('/tags', async (req, res) => {
  try {
    const tags = await Post.distinct('tags', { status: 'published' });
    const flatTags = tags.flat().filter(tag => tag);
    const uniqueTags = [...new Set(flatTags)];
    
    res.json({
      success: true,
      data: uniqueTags.sort()
    });
  } catch (error) {
    console.error('Erreur récupération tags:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tags' });
  }
});

export default router;
