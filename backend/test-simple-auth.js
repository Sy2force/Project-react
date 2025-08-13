import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app } from './server.js';
import User from './models/User.js';

let mongoServer;
let testUser = {
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

// Setup in-memory MongoDB server
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  
  // Create test user
  const user = new User(testUser);
  await user.setPassword(testUser.password);
  await user.save();
});

// Clean up after tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
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
describe('Authentication API', () => {
  test('should register a new user', async () => {
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

    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', newUser.email);
    expect(res.body.user).toHaveProperty('role', 'user');
  });

  test('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', testUser.email);
  });

  test('should not login with invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      })
      .expect(401);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Invalid email or password');
  });

  test('should get current user with valid token', async () => {
    const token = await loginUser();
    
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('email', testUser.email);
    expect(res.body).toHaveProperty('fullName', testUser.fullName);
  });

  test('should not get current user without token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .expect(401);

    expect(res.body).toHaveProperty('message', 'Authentication required');
  });

  test('should logout successfully', async () => {
    const token = await loginUser();
    
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.headers['set-cookie'][0]).toContain('jwt=');
  });
});
