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

// Intercepteur de réponse pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Gestion des erreurs serveur
    if (error.response?.status >= 500) {
      console.error('Erreur serveur:', error.response.data);
    }
    
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
      const response = await api.get('/users/profile');
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
      const response = await api.put('/users/profile', profileData);
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
      const response = await api.put('/users/change-password', passwordData);
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
      await api.delete('/users/account');
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

// Service d'upload de fichiers
export const uploadService = {
  async uploadImage(file, folder = 'general') {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);
      
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'upload de l\'image'
      };
    }
  },

  async deleteImage(imageId) {
    try {
      await api.delete(`/upload/image/${imageId}`);
      return {
        success: true,
        message: 'Image supprimée avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression de l\'image'
      };
    }
  }
};

// Service de notifications
export const notificationService = {
  async getNotifications(params = {}) {
    try {
      const response = await api.get('/notifications', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la récupération des notifications'
      };
    }
  },

  async markAsRead(notificationId) {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);
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
  },

  async markAllAsRead() {
    try {
      const response = await api.patch('/notifications/read-all');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors du marquage de toutes les notifications'
      };
    }
  }
};

// Utilitaire pour gérer les erreurs de manière cohérente
export const handleApiError = (error, defaultMessage = 'Une erreur est survenue') => {
  if (error.response) {
    return error.response.data?.message || defaultMessage;
  } else if (error.request) {
    return 'Problème de connexion au serveur';
  } else {
    return error.message || defaultMessage;
  }
};

export default api;
