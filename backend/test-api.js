const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

// Configuration axios pour les tests
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken = '';
let testUserId = '';

// Fonction utilitaire pour les tests
const testEndpoint = async (name, method, url, data = null, headers = {}) => {
  try {
    console.log(`\n🧪 Test: ${name}`);
    console.log(`${method.toUpperCase()} ${url}`);
    
    const config = {
      method: method.toLowerCase(),
      url,
      headers: {
        ...headers,
        ...(authToken && { Authorization: `Bearer ${authToken}` })
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await api(config);
    console.log(`✅ Succès: ${response.status} ${response.statusText}`);
    console.log(`📊 Réponse:`, response.data);
    
    return response.data;
  } catch (error) {
    console.log(`❌ Erreur: ${error.response?.status || 'Network'} ${error.response?.statusText || error.message}`);
    if (error.response?.data) {
      console.log(`📊 Erreur détaillée:`, error.response.data);
    }
    return null;
  }
};

// Tests des endpoints
const runTests = async () => {
  console.log('🚀 Démarrage des tests API');
  console.log('=' .repeat(50));

  // 1. Test de santé
  await testEndpoint('Health Check', 'GET', '/health');

  // 2. Test d'inscription
  const registerData = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'testpassword123'
  };
  
  const registerResult = await testEndpoint('Inscription', 'POST', '/auth/register', registerData);
  if (registerResult?.token) {
    authToken = registerResult.token;
    testUserId = registerResult.user?.id;
  }

  // 3. Test de connexion
  const loginData = {
    email: registerData.email,
    password: registerData.password
  };
  
  const loginResult = await testEndpoint('Connexion', 'POST', '/auth/login', loginData);
  if (loginResult?.token) {
    authToken = loginResult.token;
  }

  // 4. Test du profil utilisateur
  await testEndpoint('Profil utilisateur', 'GET', '/users/profile');

  // 5. Test des projets
  await testEndpoint('Liste des projets', 'GET', '/projects');
  await testEndpoint('Recherche projets', 'GET', '/projects/search?q=react');
  await testEndpoint('Catégories projets', 'GET', '/projects/categories');
  await testEndpoint('Technologies projets', 'GET', '/projects/technologies');

  // 6. Test création d'un projet
  const projectData = {
    title: 'Projet Test API',
    description: 'Un projet créé pour tester l\'API',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'Web Development',
    status: 'published'
  };
  
  const projectResult = await testEndpoint('Création projet', 'POST', '/projects', projectData);
  const projectId = projectResult?.data?._id;

  // 7. Test like d'un projet
  if (projectId) {
    await testEndpoint('Like projet', 'POST', `/projects/${projectId}/like`);
  }

  // 8. Test des articles de blog
  await testEndpoint('Liste des articles', 'GET', '/posts');
  await testEndpoint('Catégories articles', 'GET', '/posts/categories');
  await testEndpoint('Tags articles', 'GET', '/posts/tags');

  // 9. Test création d'un article
  const postData = {
    title: 'Article Test API',
    content: 'Contenu de l\'article de test pour l\'API',
    excerpt: 'Extrait de l\'article de test',
    tags: ['test', 'api', 'nodejs'],
    category: 'Tech',
    status: 'published'
  };
  
  const postResult = await testEndpoint('Création article', 'POST', '/posts', postData);
  const postId = postResult?.data?._id;

  // 10. Test like et commentaire d'un article
  if (postId) {
    await testEndpoint('Like article', 'POST', `/posts/${postId}/like`);
    await testEndpoint('Commentaire article', 'POST', `/posts/${postId}/comments`, {
      content: 'Super article de test !'
    });
  }

  // 11. Test des compétences
  await testEndpoint('Liste des compétences', 'GET', '/skills');
  
  const skillData = {
    name: 'React.js',
    category: 'Frontend',
    level: 'Expert',
    description: 'Bibliothèque JavaScript pour créer des interfaces utilisateur'
  };
  
  await testEndpoint('Création compétence', 'POST', '/skills', skillData);

  // 12. Test du contact
  const contactData = {
    name: 'Test Contact',
    email: 'contact@test.com',
    subject: 'Test API Contact',
    message: 'Message de test pour l\'API de contact'
  };
  
  await testEndpoint('Envoi message contact', 'POST', '/contact', contactData);

  // 13. Test des cartes
  await testEndpoint('Mes cartes', 'GET', '/cards/my-cards');
  
  const cardData = {
    title: 'Carte Test',
    description: 'Description de la carte de test',
    type: 'business'
  };
  
  await testEndpoint('Création carte', 'POST', '/cards', cardData);

  // 14. Test de recherche globale
  await testEndpoint('Recherche globale', 'GET', '/search?q=test');

  // 15. Test des notifications
  await testEndpoint('Notifications', 'GET', '/notifications');

  // 16. Test refresh token
  await testEndpoint('Refresh token', 'POST', '/auth/refresh');

  // 17. Test déconnexion
  await testEndpoint('Déconnexion', 'POST', '/auth/logout');

  console.log('\n' + '='.repeat(50));
  console.log('🏁 Tests terminés');
};

// Exécuter les tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, testEndpoint };
