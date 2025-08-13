import mongoose from 'mongoose';

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000; // 5 seconds
  }

  async connect(customUri = null) {
    if (this.isConnected && !customUri) {
      console.log('📊 MongoDB: Already connected');
      return;
    }

    const mongoUri = customUri || process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    try {
      console.log('🔄 MongoDB: Attempting connection...');
      console.log(`📍 MongoDB URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);

      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 45000, // 45 seconds
        maxPoolSize: 10,
        bufferCommands: false,
      });

      this.isConnected = true;
      this.retryCount = 0;
      console.log('✅ MongoDB: Connected successfully');
      console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
      console.log(`🔗 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);

      // Setup connection event listeners
      this.setupEventListeners();

    } catch (error) {
      this.isConnected = false;
      console.error('❌ MongoDB Connection Error:', error.message);
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`🔄 Retrying connection in ${this.retryDelay/1000}s... (${this.retryCount}/${this.maxRetries})`);
        setTimeout(() => this.connect(), this.retryDelay);
      } else {
        console.error('💥 MongoDB: Max retries reached. Connection failed.');
        throw new Error(`MongoDB connection failed after ${this.maxRetries} attempts`);
      }
    }
  }

  setupEventListeners() {
    mongoose.connection.on('connected', () => {
      console.log('🟢 MongoDB: Connection established');
      this.isConnected = true;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔴 MongoDB: Connection lost');
      this.isConnected = false;
    });

    mongoose.connection.on('error', (error) => {
      console.error('⚠️ MongoDB Error:', error.message);
      this.isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB: Reconnected successfully');
      this.isConnected = true;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  async disconnect() {
    try {
      await mongoose.connection.close();
      console.log('🔌 MongoDB: Connection closed gracefully');
      this.isConnected = false;
    } catch (error) {
      console.error('❌ MongoDB Disconnect Error:', error.message);
    }
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name
    };
  }
}

// Export singleton instance
export default new DatabaseConnection();
