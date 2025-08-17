import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Configuration de la connexion MongoDB
const connectDB = async () => {
  try {
    console.log('🔄 Tentative de connexion à MongoDB Atlas...');
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout après 5 secondes
      socketTimeoutMS: 45000, // Fermer les sockets après 45 secondes d'inactivité
    });

    console.log('✅ MongoDB Atlas connecté avec succès !');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 URL de test: http://localhost:${process.env.PORT || 5001}/api/ping`);
    
    return conn;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB Atlas:', error.message);
    
    // Afficher des conseils de dépannage
    if (error.message.includes('authentication failed')) {
      console.log('💡 Vérifiez vos identifiants MongoDB (utilisateur/mot de passe)');
    } else if (error.message.includes('IP')) {
      console.log('💡 Ajoutez votre IP à la whitelist MongoDB Atlas');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Vérifiez l\'URL du cluster MongoDB');
    }
    
    process.exit(1);
  }
};

// Gestion des événements de connexion
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connecté à MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Erreur de connexion Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose déconnecté de MongoDB');
});

// Fermeture propre de la connexion
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔒 Connexion MongoDB fermée via SIGINT');
  process.exit(0);
});

export default connectDB;
