import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('MongoDB Connection Test', function() {
  let mongoServer;
  
  before(async function() {
    this.timeout(30000);
    
    try {
      console.log('Starting in-memory MongoDB server...');
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      console.log('MongoDB URI:', mongoUri);
      
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      
      console.log('Mongoose connection state:', mongoose.connection.readyState);
      
      // Test the connection
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'MongoDB connection error:'));
      db.once('open', () => {
        console.log('MongoDB connection opened!');
      });
      
      // Wait for connection to be established
      await new Promise((resolve) => {
        if (mongoose.connection.readyState === 1) {
          console.log('MongoDB already connected');
          return resolve();
        }
        
        mongoose.connection.on('connected', () => {
          console.log('MongoDB connected event fired');
          resolve();
        });
        
        // Timeout if connection takes too long
        setTimeout(() => {
          console.log('MongoDB connection timeout');
          resolve();
        }, 5000);
      });
      
      console.log('Test setup completed');
    } catch (error) {
      console.error('Test setup failed:', error);
      throw error;
    }
  });
  
  after(async function() {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });
  
  it('should connect to MongoDB', function() {
    expect(mongoose.connection.readyState).to.equal(1); // 1 = connected
  });
});
