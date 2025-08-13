import { describe, it, before, after, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app } from './server.js';
import User from './models/User.js';
import db from './config/database.js';

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

// Setup test environment
before(async function() {
  this.timeout(30000); // Increase timeout for MongoDB Memory Server
  
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to in-memory database using our database config
  await db.connect(mongoUri);
  
  // Clear any existing data
  await User.deleteMany({});
  
  // Create test user
  const user = new User(testUser);
  await user.setPassword(testUser.password);
  await user.save();
  
  // Start test server if not already started
  if (!testServer) {
    testServer = app.listen(TEST_PORT);
  }
});

// Clean up after tests
after(async function() {
  this.timeout(10000);
  
  // Clear all test data
  await User.deleteMany({});
  
  // Close server
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

// Clear database before each test
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

// Test cases
describe('Authentication API', function() {
  // Increase timeout for all tests in this suite
  this.timeout(5000);
  
  describe('POST /api/auth/register', function() {
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

  describe('POST /api/auth/login', function() {
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

  describe('GET /api/auth/me', function() {
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

  describe('POST /api/auth/logout', function() {
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
