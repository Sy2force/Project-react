import axios from 'axios';

// Configuration de l'instance axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction toast simple pour les notifications
const showToast = (message, type = 'error') => {
  // Créer un toast simple si aucune librairie de toast n'est disponible
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Supprimer après 3 secondes
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Intercepteur de réponse pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => {
    // Toast de succès pour certaines opérations
    if (response.config.method !== 'get' && response.status >= 200 && response.status < 300) {
      const operation = response.config.method.toUpperCase();
      if (operation === 'POST') showToast('✅ Création réussie', 'success');
      if (operation === 'PUT') showToast('✅ Modification réussie', 'success');
      if (operation === 'DELETE') showToast('✅ Suppression réussie', 'success');
    }
    return response;
  },
  (error) => {
    // Toast d'erreur avec message approprié
    let errorMessage = 'Une erreur est survenue';
    
    if (error.response?.status === 401) {
      errorMessage = '🔒 Session expirée, reconnexion requise';
      localStorage.removeItem('token');
      setTimeout(() => window.location.href = '/login', 1500);
    } else if (error.response?.status === 403) {
      errorMessage = '🚫 Accès non autorisé';
    } else if (error.response?.status === 404) {
      errorMessage = '🔍 Ressource non trouvée';
    } else if (error.response?.status >= 500) {
      errorMessage = '🔧 Erreur serveur, veuillez réessayer';
      console.error('Erreur serveur:', error.response.data);
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    showToast(errorMessage, 'error');
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return {
        success: true,
        data: response.data,
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de connexion',
        error: error.response?.data
      };
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return {
        success: true,
        data: response.data,
        token: response.data.token,
        user: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur d\'inscription',
        error: error.response?.data
      };
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      // Même en cas d'erreur, on supprime les données locales
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    }
  },

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      return {
        success: true,
        token: response.data.token
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de rafraîchissement du token'
      };
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la demande de réinitialisation'
      };
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la réinitialisation'
      };
    }
  }
};

// Service utilisateur
export const userService = {
  async getProfile() {
    try {
      const response = await api.get('/user/profile');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération du profil'
      };
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/user/profile', profileData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour du profil'
      };
    }
  },

  async changePassword(passwordData) {
    try {
      const response = await api.put('/user/change-password', passwordData);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors du changement de mot de passe'
      };
    }
  },

  async deleteAccount() {
    try {
      await api.delete('/user/account');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        success: true,
        message: 'Compte supprimé avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression du compte'
      };
    }
  }
};

// Service des cartes
export const cardService = {
  async getMyCards() {
    try {
      const response = await api.get('/cards/my-cards');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des cartes'
      };
    }
  },

  async createCard(cardData) {
    try {
      const response = await api.post('/cards', cardData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création de la carte'
      };
    }
  },

  async updateCard(cardId, cardData) {
    try {
      const response = await api.put(`/cards/${cardId}`, cardData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour de la carte'
      };
    }
  },

  async deleteCard(cardId) {
    try {
      await api.delete(`/cards/${cardId}`);
      return {
        success: true,
        message: 'Carte supprimée avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de la carte'
      };
    }
  },

  async getCard(cardId) {
    try {
      const response = await api.get(`/cards/${cardId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération de la carte'
      };
    }
  },

  async searchCards(searchParams) {
    try {
      const response = await api.get('/cards/search', { params: searchParams });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la recherche'
      };
    }
  }
};

// Service des favoris
export const favoriteService = {
  async getFavorites() {
    try {
      const response = await api.get('/favorites');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des favoris'
      };
    }
  },

  async addToFavorites(cardId) {
    try {
      const response = await api.post('/favorites', { cardId });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'ajout aux favoris'
      };
    }
  },

  async removeFromFavorites(cardId) {
    try {
      await api.delete(`/favorites/${cardId}`);
      return {
        success: true,
        message: 'Retiré des favoris avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression des favoris'
      };
    }
  }
};

// Utilitaire pour gérer les erreurs de manière cohérente
export const handleApiError = (error, defaultMessage = 'Une erreur est survenue') => {
  if (error.response) {
    // Erreur de réponse du serveur
    return error.response.data?.message || defaultMessage;
  } else if (error.request) {
    // Erreur de réseau
    return 'Erreur de connexion au serveur';
  } else {
    // Autre erreur
    return error.message || defaultMessage;
  }
};

// Utilitaire pour vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Utilitaire pour obtenir les informations utilisateur
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    return null;
  }
};

// Service des projets
export const projectService = {
  async getAllProjects(params = {}) {
    try {
      const response = await api.get('/projects', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des projets'
      };
    }
  },

  async getProject(id) {
    try {
      const response = await api.get(`/projects/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération du projet'
      };
    }
  },

  async createProject(projectData) {
    try {
      const response = await api.post('/projects', projectData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création du projet'
      };
    }
  },

  async updateProject(id, projectData) {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour du projet'
      };
    }
  },

  async deleteProject(id) {
    try {
      await api.delete(`/projects/${id}`);
      return {
        success: true,
        message: 'Projet supprimé avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression du projet'
      };
    }
  },

  async likeProject(id) {
    try {
      const response = await api.post(`/projects/${id}/like`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors du like'
      };
    }
  },

  async searchProjects(query, filters = {}) {
    try {
      const response = await api.get('/projects/search', {
        params: { q: query, ...filters }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la recherche'
      };
    }
  }
};

// Service du blog
export const blogService = {
  async getAllPosts(params = {}) {
    try {
      const response = await api.get('/posts', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des articles'
      };
    }
  },

  async getPost(id) {
    try {
      const response = await api.get(`/posts/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération de l\'article'
      };
    }
  },

  async createPost(postData) {
    try {
      const response = await api.post('/posts', postData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création de l\'article'
      };
    }
  },

  async updatePost(id, postData) {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour de l\'article'
      };
    }
  },

  async deletePost(id) {
    try {
      await api.delete(`/posts/${id}`);
      return {
        success: true,
        message: 'Article supprimé avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de l\'article'
      };
    }
  },

  async likePost(id) {
    try {
      const response = await api.post(`/posts/${id}/like`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors du like'
      };
    }
  },

  async addComment(postId, commentData) {
    try {
      const response = await api.post(`/posts/${postId}/comments`, commentData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'ajout du commentaire'
      };
    }
  }
};

// Service de contact
export const contactService = {
  async sendMessage(messageData) {
    try {
      const response = await api.post('/contact', messageData);
      return {
        success: true,
        data: response.data,
        message: 'Message envoyé avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'envoi du message'
      };
    }
  },

  async getMessages(params = {}) {
    try {
      const response = await api.get('/contact', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des messages'
      };
    }
  },

  async markAsRead(messageId) {
    try {
      const response = await api.patch(`/contact/${messageId}/read`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors du marquage comme lu'
      };
    }
  }
};

// Service des compétences
export const skillService = {
  async getAllSkills() {
    try {
      const response = await api.get('/skills');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des compétences'
      };
    }
  },

  async createSkill(skillData) {
    try {
      const response = await api.post('/skills', skillData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création de la compétence'
      };
    }
  },

  async updateSkill(id, skillData) {
    try {
      const response = await api.put(`/skills/${id}`, skillData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour de la compétence'
      };
    }
  },

  async deleteSkill(id) {
    try {
      await api.delete(`/skills/${id}`);
      return {
        success: true,
        message: 'Compétence supprimée avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de la compétence'
      };
    }
  }
};

// Service PDF
export const pdfService = {
  async generateProjectPDF(projectData) {
    try {
      const response = await api.post('/pdf/project', projectData, {
        responseType: 'blob'
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la génération du PDF'
      };
    }
  },

  async generateQuotePDF(quoteData) {
    try {
      const response = await api.post('/pdf/quote', quoteData, {
        responseType: 'blob'
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la génération du devis'
      };
    }
  }
};

// Service d'administration
export const adminService = {
  async getDashboardStats() {
    try {
      const response = await api.get('/admin/dashboard');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des statistiques'
      };
    }
  },

  async getAllUsers(params = {}) {
    try {
      const response = await api.get('/admin/users', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des utilisateurs'
      };
    }
  },

  async updateUserRole(userId, role) {
    try {
      const response = await api.patch(`/admin/users/${userId}/role`, { role });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour du rôle'
      };
    }
  },

  async deleteUser(userId) {
    try {
      await api.delete(`/admin/users/${userId}`);
      return {
        success: true,
        message: 'Utilisateur supprimé avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur'
      };
    }
  }
};

// Service de recherche globale
export const searchService = {
  async globalSearch(query, filters = {}) {
    try {
      const response = await api.get('/search', {
        params: { q: query, ...filters }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la recherche'
      };
    }
  }
};

// Service de santé de l'API
export const healthService = {
  async checkHealth() {
    try {
      const response = await api.get('/health');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'API non disponible'
      };
    }
  }
};

export default api;
