const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

/**
 * Script pour créer les index MongoDB optimaux pour le CRM Admin
 */
async function createIndexes() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connexion MongoDB établie');

    // Index unique sur email (si pas déjà présent)
    try {
      await User.collection.createIndex({ email: 1 }, { unique: true });
      console.log('✅ Index unique créé sur User.email');
    } catch (error) {
      if (error.code === 85) {
        console.log('ℹ️  Index unique sur User.email déjà existant');
      } else {
        throw error;
      }
    }

    // Index composé pour recherche et tri par rôle et date
    try {
      await User.collection.createIndex({ role: 1, createdAt: -1 });
      console.log('✅ Index composé créé sur User.role + createdAt');
    } catch (error) {
      if (error.code === 85) {
        console.log('ℹ️  Index composé sur User.role + createdAt déjà existant');
      } else {
        throw error;
      }
    }

    // Index pour recherche textuelle sur name et email
    try {
      await User.collection.createIndex({ 
        name: 'text', 
        email: 'text' 
      }, {
        name: 'user_search_text',
        weights: { name: 2, email: 1 }
      });
      console.log('✅ Index de recherche textuelle créé sur User.name + email');
    } catch (error) {
      if (error.code === 85) {
        console.log('ℹ️  Index de recherche textuelle déjà existant');
      } else {
        throw error;
      }
    }

    // Index pour lastLogin (pour stats et tri)
    try {
      await User.collection.createIndex({ lastLogin: -1 });
      console.log('✅ Index créé sur User.lastLogin');
    } catch (error) {
      if (error.code === 85) {
        console.log('ℹ️  Index sur User.lastLogin déjà existant');
      } else {
        throw error;
      }
    }

    // Afficher tous les index créés
    const indexes = await User.collection.indexes();
    console.log('\n📊 Index MongoDB User collection:');
    indexes.forEach((index, i) => {
      console.log(`${i + 1}. ${index.name}: ${JSON.stringify(index.key)}`);
    });

    console.log('\n🎉 Création des index terminée avec succès');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des index:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Déconnexion MongoDB');
    process.exit(0);
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  createIndexes();
}

module.exports = createIndexes;
