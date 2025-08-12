import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/search - Recherche globale
router.get('/', async (req, res) => {
  try {
    const { q, type, limit = 10, page = 1 } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: 'Le terme de recherche doit contenir au moins 2 caractères' });
    }

    const searchQuery = { $regex: q, $options: 'i' };
    const skip = (page - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    let results = {
      projects: [],
      posts: [],
      users: [],
      total: 0
    };

    // Recherche dans les projets
    if (!type || type === 'projects') {
      const projects = await Project.find({
        $or: [
          { title: searchQuery },
          { description: searchQuery },
          { technologies: searchQuery }
        ],
        status: 'published'
      })
      .populate('author', 'name email')
      .limit(limitNum)
      .skip(skip)
      .sort({ createdAt: -1 });

      results.projects = projects;
    }

    // Recherche dans les articles
    if (!type || type === 'posts') {
      const posts = await Post.find({
        $or: [
          { title: searchQuery },
          { content: searchQuery },
          { tags: searchQuery }
        ],
        status: 'published'
      })
      .populate('author', 'name email')
      .limit(limitNum)
      .skip(skip)
      .sort({ createdAt: -1 });

      results.posts = posts;
    }

    // Recherche dans les utilisateurs (seulement pour les admins)
    if (req.user && req.user.role === 'ADMIN' && (!type || type === 'users')) {
      const users = await User.find({
        $or: [
          { name: searchQuery },
          { email: searchQuery }
        ]
      })
      .select('name email role createdAt')
      .limit(limitNum)
      .skip(skip)
      .sort({ createdAt: -1 });

      results.users = users;
    }

    results.total = results.projects.length + results.posts.length + results.users.length;

    res.json({
      success: true,
      data: results,
      query: q,
      page: parseInt(page),
      limit: limitNum
    });

  } catch (error) {
    console.error('Erreur recherche globale:', error);
    res.status(500).json({ message: 'Erreur lors de la recherche' });
  }
});

export default router;
