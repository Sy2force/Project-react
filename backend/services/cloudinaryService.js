import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

class CloudinaryService {
  constructor() {
    this.isConfigured = false;
    this.initializeCloudinary();
  }

  initializeCloudinary() {
    try {
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.log('⚠️ Cloudinary: Configuration not found');
        return;
      }

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
      });

      this.isConfigured = true;
      console.log('✅ Cloudinary: Service initialized');
    } catch (error) {
      console.error('❌ Cloudinary: Initialization failed:', error.message);
    }
  }

  async uploadImage(file, options = {}) {
    if (!this.isConfigured) {
      throw new Error('Cloudinary service not configured');
    }

    try {
      const defaultOptions = {
        folder: 'portfolio',
        resource_type: 'auto',
        quality: 'auto:good',
        fetch_format: 'auto',
        ...options
      };

      const result = await cloudinary.uploader.upload(file.path || file, defaultOptions);
      
      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      };
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async uploadMultipleImages(files, options = {}) {
    if (!this.isConfigured) {
      throw new Error('Cloudinary service not configured');
    }

    const uploadPromises = files.map(file => this.uploadImage(file, options));
    
    try {
      const results = await Promise.all(uploadPromises);
      return {
        success: true,
        uploads: results
      };
    } catch (error) {
      console.error('❌ Cloudinary batch upload error:', error);
      throw new Error(`Batch upload failed: ${error.message}`);
    }
  }

  async deleteImage(publicId) {
    if (!this.isConfigured) {
      throw new Error('Cloudinary service not configured');
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return {
        success: result.result === 'ok',
        result: result.result
      };
    } catch (error) {
      console.error('❌ Cloudinary delete error:', error);
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  async getImageDetails(publicId) {
    if (!this.isConfigured) {
      throw new Error('Cloudinary service not configured');
    }

    try {
      const result = await cloudinary.api.resource(publicId);
      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        createdAt: result.created_at
      };
    } catch (error) {
      console.error('❌ Cloudinary get details error:', error);
      throw new Error(`Get details failed: ${error.message}`);
    }
  }

  generateOptimizedUrl(publicId, options = {}) {
    if (!this.isConfigured) {
      throw new Error('Cloudinary service not configured');
    }

    const defaultOptions = {
      quality: 'auto:good',
      fetch_format: 'auto',
      ...options
    };

    return cloudinary.url(publicId, defaultOptions);
  }

  generateThumbnail(publicId, width = 300, height = 200) {
    if (!this.isConfigured) {
      throw new Error('Cloudinary service not configured');
    }

    return cloudinary.url(publicId, {
      width,
      height,
      crop: 'fill',
      quality: 'auto:good',
      fetch_format: 'auto'
    });
  }
}

export default new CloudinaryService();
