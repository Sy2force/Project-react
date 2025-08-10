import express from 'express';
import Skill from '../models/Skill.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/skills - Récupérer toutes les compétences
router.get('/', optionalAuth, async (req, res) => {
  try {
    const skills = await Skill.find({})
      .sort({ proficiency: -1, usage: -1 })
      .lean();
    
    res.json({
      skills,
      total: skills.length
    });
  } catch (error) {
    console.error('Erreur récupération skills:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des compétences' });
  }
});

module.exports = router;
