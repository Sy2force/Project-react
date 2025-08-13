import { describe, it, before, after, beforeEach } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app } from '../server.js';
import User from '../models/User.js';

// Test configuration
const TEST_PORT = 5002;
let mongoServer;
let testServer;

// Test user data
const testUser = {
  fullName: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  company: 'Test Company',
  marketing: true,
  vipCode: 'VIP123456',
  password: 'Password123!',
  role: 'user',
  isActive: true
};

describe('Authentication Integration Tests', function() {
  // Setup test environment
  before(async function() {
    this.timeout(60000); // Increased timeout to 60 seconds
    
    try {
      console.log('Starting in-memory MongoDB server...');
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      
      console.log('Waiting for MongoDB connection to be ready...');
      await new Promise((resolve, reject) => {
        mongoose.connection.once('open', resolve);
        mongoose.connection.on('error', reject);
        setTimeout(() => reject(new Error('MongoDB connection timeout')), 30000);
      });
      
      console.log('Starting test server...');
      await new Promise((resolve) => {
        testServer = app.listen(TEST_PORT, resolve);
      });
      
      console.log('Test setup completed');
    } catch (error) {
      console.error('Test setup failed:', error);
      throw error;
    }
  });

  // Clean up after all tests
  after(async function() {
    this.timeout(10000);
    
    // Close test server
    if (testServer) {
      testServer.close();
    }
    
    // Close database connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    
    // Stop in-memory server
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  // Clear database and recreate test user before each test
  beforeEach(async function() {
    await User.deleteMany({});
    
    // Recreate test user
    const user = new User(testUser);
    await user.setPassword(testUser.password);
    await user.save();
  });

  // Helper function to get auth token
  const loginUser = async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    return res.body.token;
  };

  describe('Registration', function() {
    it('should register a new user with valid data', async function() {
      const newUser = {
        fullName: 'New User',
        email: 'new@example.com',
        password: 'NewPass123!',
        phone: '0987654321',
        company: 'New Company',
        marketing: false,
        vipCode: 'VIP123456'
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201);

      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('email', newUser.email);
      expect(res.body.user).to.have.property('role', 'user');
    });
  });

  describe('Login', function() {
    it('should login with valid credentials', async function() {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('email', testUser.email);
      
      // Check that the token is set in cookies
      expect(res.headers['set-cookie']).to.exist;
      expect(res.headers['set-cookie'][0]).to.include('jwt=');
      expect(res.headers['set-cookie'][0]).to.include('HttpOnly');
    });

    it('should not login with invalid password', async function() {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(res.body).to.have.property('message');
      expect(res.body.message).to.include('Invalid email or password');
    });
  });

  describe('User Profile', function() {
    it('should get current user with valid token', async function() {
      const token = await loginUser();
      
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).to.have.property('email', testUser.email);
      expect(res.body).to.have.property('fullName', testUser.fullName);
    });

    it('should not get current user without token', async function() {
      const res = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(res.body).to.have.property('message', 'Authentication required');
    });
  });

  describe('Logout', function() {
    it('should clear the JWT cookie', async function() {
      const token = await loginUser();
      
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // Check that the cookie is cleared
      expect(res.headers['set-cookie']).to.exist;
      expect(res.headers['set-cookie'][0]).to.include('jwt=;');
      expect(res.headers['set-cookie'][0]).to.include('Expires=Thu, 01 Jan 1970');
    });
  });
});
