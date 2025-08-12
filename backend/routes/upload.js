import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration Multer pour l'upload en mémoire
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    // Vérifier le type de fichier
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  }
});

// POST /api/upload/image - Upload d'une image
router.post('/image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const { folder = 'general' } = req.body;

    // Upload vers Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `shay-portfolio/${folder}`,
          resource_type: 'image',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.json({
      success: true,
      data: {
        id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      }
    });

  } catch (error) {
    console.error('Erreur upload image:', error);
    res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image' });
  }
});

// DELETE /api/upload/image/:id - Suppression d'une image
router.delete('/image/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimer de Cloudinary
    const result = await cloudinary.uploader.destroy(id);

    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'Image supprimée avec succès'
      });
    } else {
      res.status(404).json({ message: 'Image non trouvée' });
    }

  } catch (error) {
    console.error('Erreur suppression image:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'image' });
  }
});

// POST /api/upload/multiple - Upload multiple d'images
router.post('/multiple', authenticateToken, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const { folder = 'general' } = req.body;
    const uploadPromises = [];

    // Upload de chaque image
    for (const file of req.files) {
      const uploadPromise = new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: `shay-portfolio/${folder}`,
            resource_type: 'image',
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({
              id: result.public_id,
              url: result.secure_url,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes
            });
          }
        ).end(file.buffer);
      });

      uploadPromises.push(uploadPromise);
    }

    const results = await Promise.all(uploadPromises);

    res.json({
      success: true,
      data: results,
      count: results.length
    });

  } catch (error) {
    console.error('Erreur upload multiple:', error);
    res.status(500).json({ message: 'Erreur lors de l\'upload des images' });
  }
});

export default router;
