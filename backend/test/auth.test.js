import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';
import User from '../models/User.js';

let mongoServer;

// Test user data
const testUser = {
  fullName: 'Test User',
  email: 'test@example.com',
  password: 'Password123!',
  phone: '1234567890',
  company: 'Test Company',
  marketing: true,
  vipCode: 'VIP123456' // Using the test VIP code from .env
};

// Admin user data
const adminUser = {
  fullName: 'Admin User',
  email: 'admin@example.com',
  password: 'Admin123!',
  role: 'admin',
  isActive: true
};

// Before all tests, start the in-memory MongoDB server and connect to it
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  
  // Create an admin user for testing
  const admin = new User(adminUser);
  await admin.setPassword(adminUser.password);
  await admin.save();
});

// After all tests, close the connection and stop the in-memory server
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clear all test data after each test
afterEach(async () => {
  await User.deleteMany({ email: { $ne: 'admin@example.com' } });
});

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('email', testUser.email);
      expect(res.body.user).to.have.property('fullName', testUser.fullName);
      expect(res.body.user).to.have.property('role', 'user'); // Default role
      expect(res.body.user).not.to.have.property('password');
    });

    it('should not register a user with invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ ...testUser, email: 'invalid-email' })
        .expect(400);

      expect(res.body).to.have.property('message');
      expect(res.body.message).to.include('validation failed');
    });

    it('should not register a user with weak password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ ...testUser, password: '123' })
        .expect(400);

      expect(res.body).to.have.property('message');
      expect(res.body.message).to.include('Password must be at least 8 characters');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Register a test user before login tests
      const user = new User({
        ...testUser,
        isActive: true
      });
      await user.setPassword(testUser.password);
      await user.save();
    });

    it('should login with valid credentials', async () => {
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

    it('should not login with invalid password', async () => {
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

  describe('GET /api/auth/me', () => {
    let authToken;

    beforeEach(async () => {
      // Login to get token
      const user = new User({
        ...testUser,
        isActive: true
      });
      await user.setPassword(testUser.password);
      await user.save();

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      authToken = loginRes.body.token;
    });

    it('should get current user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body).to.have.property('email', testUser.email);
      expect(res.body).to.have.property('fullName', testUser.fullName);
      expect(res.body).not.to.have.property('password');
    });

    it('should not get profile without token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(res.body).to.have.property('message', 'Authentication required');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should clear the JWT cookie', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      // Check that the cookie is cleared
      expect(res.headers['set-cookie'][0]).to.include('jwt=;');
      expect(res.headers['set-cookie'][0]).to.include('Expires=Thu, 01 Jan 1970');
    });
  });

  describe('Role-based access control', () => {
    let adminToken;
    
    beforeEach(async () => {
      // Login as admin
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: adminUser.email,
          password: adminUser.password
        });
      
      adminToken = loginRes.body.token;
    });

    it('should allow admin to access admin-only routes', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).to.be.true;
    });

    it('should not allow regular users to access admin routes', async () => {
      // Create and login as regular user
      const user = new User({
        ...testUser,
        email: 'regular@example.com',
        isActive: true
      });
      await user.setPassword(testUser.password);
      await user.save();

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'regular@example.com',
          password: testUser.password
        });
      
      const userToken = loginRes.body.token;
      
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(res.body).to.have.property('message', 'Forbidden: Admin access required');
    });
  });
});
