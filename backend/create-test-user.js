import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

async function createTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('👤 Test user already exists');
      console.log('Email: test@example.com');
      console.log('Password: password123');
      console.log('Role:', existingUser.role);
      return;
    }

    // Create test user
    const passwordHash = await bcrypt.hash('password123', 12);
    
    const testUser = new User({
      fullName: 'Test User',
      email: 'test@example.com',
      passwordHash,
      role: 'user',
      marketing: false
    });

    await testUser.save();
    console.log('✅ Test user created successfully!');
    console.log('📧 Email: test@example.com');
    console.log('🔑 Password: password123');
    console.log('👤 Role: user');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const adminPasswordHash = await bcrypt.hash('admin123', 12);
      
      const adminUser = new User({
        fullName: 'Admin User',
        email: 'admin@example.com',
        passwordHash: adminPasswordHash,
        role: 'admin',
        marketing: false
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: admin123');
      console.log('👤 Role: admin');
    }

    // Create business user
    const businessExists = await User.findOne({ email: 'business@example.com' });
    if (!businessExists) {
      const businessPasswordHash = await bcrypt.hash('business123', 12);
      
      const businessUser = new User({
        fullName: 'Business User',
        email: 'business@example.com',
        passwordHash: businessPasswordHash,
        role: 'business',
        company: 'Test Company',
        marketing: false
      });

      await businessUser.save();
      console.log('✅ Business user created successfully!');
      console.log('📧 Email: business@example.com');
      console.log('🔑 Password: business123');
      console.log('👤 Role: business');
    }

  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

createTestUser();
