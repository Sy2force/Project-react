import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.mongoServer = null;
    this.useInMemory = process.env.USE_INMEMORY_DB === 'true';
  }

  async connect() {
    try {
      if (this.useInMemory) {
        console.log('🔧 Configuration: Utilisation forcée de MongoDB en mémoire');
        await this.connectInMemory();
        return;
      }

      const mongoUri = process.env.MONGODB_URI;
      
      if (mongoUri && mongoUri !== 'your-mongodb-uri-here' && !mongoUri.includes('localhost')) {
        console.log('🔄 Tentative de connexion à MongoDB Atlas...');
        await mongoose.connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
        });
        console.log('✅ Connecté à MongoDB Atlas');
        this.isConnected = true;
        return;
      }
      
      console.log('⚠️  MongoDB Atlas non configuré, utilisation de MongoDB en mémoire...');
      await this.connectInMemory();
      
    } catch (error) {
      console.error('❌ Erreur de connexion MongoDB Atlas:', error.message);
      console.log('🔄 Basculement automatique vers MongoDB en mémoire...');
      await this.connectInMemory();
    }
  }

  async connectInMemory() {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }

      this.mongoServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'portfolio_dev',
        },
      });
      const mongoUri = this.mongoServer.getUri();
      
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('✅ Connecté à MongoDB en mémoire');
      console.log('📍 URI:', mongoUri);
      this.isConnected = true;
      
      await this.seedTestData();
      
    } catch (error) {
      console.error('❌ Erreur de connexion MongoDB en mémoire:', error);
      throw error;
    }
  }

  async seedTestData() {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const User = mongoose.models.User;
      if (!User) {
        console.log('⚠️  Modèle User non disponible, skip seed data');
        return;
      }

      const existingUsers = await User.countDocuments();
      
      if (existingUsers === 0) {
        console.log('🌱 Injection des données de test...');
        
        const testUsers = [
          {
            email: 'admin@test.com',
            fullName: 'Admin Test',
            passwordHash: '$2a$12$6A2z.ajmnxCFm63esE6kxOztNknfjJ7b6LY9axxCQ0skKqrY6Cnau',
            role: 'admin',
            accept: true
          },
          {
            email: 'business@test.com',
            fullName: 'Business Test',
            passwordHash: '$2a$12$6A2z.ajmnxCFm63esE6kxOztNknfjJ7b6LY9axxCQ0skKqrY6Cnau',
            role: 'business',
            accept: true
          },
          {
            email: 'user@test.com',
            fullName: 'User Test',
            passwordHash: '$2a$12$6A2z.ajmnxCFm63esE6kxOztNknfjJ7b6LY9axxCQ0skKqrY6Cnau',
            role: 'user',
            accept: true
          },
          {
            email: 'shay@test.com',
            fullName: 'Shay Acoca',
            passwordHash: '$2a$12$6A2z.ajmnxCFm63esE6kxOztNknfjJ7b6LY9axxCQ0skKqrY6Cnau',
            role: 'admin',
            accept: true
          }
        ];
        
        await User.insertMany(testUsers);
        console.log('✅ Données de test injectées (4 utilisateurs)');
      }
    } catch (error) {
      console.log('⚠️  Erreur lors de l\'injection des données de test:', error.message);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      if (this.mongoServer) {
        await this.mongoServer.stop();
      }
      this.isConnected = false;
      console.log('✅ Déconnecté de la base de données');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    }
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || 'in-memory',
      port: mongoose.connection.port || 'N/A',
      name: mongoose.connection.name || 'portfolio_dev',
      type: this.mongoServer ? 'MongoMemoryServer' : 'MongoDB Atlas'
    };
  }
}

export default new DatabaseConnection();
