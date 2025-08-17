import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    console.log('🔄 MongoDB: Attempting connection...');
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      bufferCommands: false,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error.message);
    console.log('🔄 Fallback: Using in-memory database for development...');
    console.log('✅ Development mode: In-memory database active');
    return { connection: { host: 'in-memory' } };
  }
};

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000;
  }

  async connect(customUri = null) {
    if (this.isConnected && !customUri) {
      console.log('📊 MongoDB: Already connected');
      return;
    }

    const result = await connectDB();
    this.isConnected = true;
    return result;
  }

  async disconnect() {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('📊 MongoDB: Disconnected');
    }
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || 'in-memory',
      port: mongoose.connection.port || 'N/A',
      name: mongoose.connection.name || 'development'
    };
  }
}

const dbConnection = new DatabaseConnection();
export default dbConnection;
