import axios from 'axios';
import toast from 'react-hot-toast';

// Je configure axios avec mes paramètres de base
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ici je rajoute automatiquement le token d'auth à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Je note l'heure de début pour mesurer les perfs
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Je gère les réponses et les erreurs ici
api.interceptors.response.use(
  (response) => {
    // Je calcule combien de temps ça a pris
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    
    // Si c'est trop lent, je préviens dans la console
    if (duration > 2000) {
      console.warn(`Slow API request: ${response.config.url} took ${duration}ms`);
    }
    
    return response;
  },
  (error) => {
    const { response, request, config } = error;
    
    // Je traite les différents types d'erreurs
    if (response) {
      // Le serveur a répondu mais avec une erreur
      const { status, data } = response;
      
      switch (status) {
        case 401:
          // Plus connecté - je vire le token et renvoie à la connexion
          localStorage.removeItem('token');
          window.location.href = '/login';
          toast.error('Session expirée. Veuillez vous reconnecter.');
          break;
          
        case 403:
          toast.error('Accès refusé. Permissions insuffisantes.');
          break;
          
        case 404:
          toast.error('Ressource non trouvée.');
          break;
          
        case 429:
          toast.error('Trop de requêtes. Veuillez patienter.');
          break;
          
        case 500:
          toast.error('Erreur serveur. Veuillez réessayer plus tard.');
          break;
          
        default:
          toast.error(data?.message || 'Une erreur est survenue.');
      }
    } else if (request) {
      // Problème de réseau
      toast.error('Erreur de connexion. Vérifiez votre connexion internet.');
    } else {
      // Erreur dans la config de ma requête
      toast.error('Erreur de configuration de la requête.');
    }
    
    return Promise.reject(error);
  }
);

// Mes classes pour organiser les appels API
class AuthService {
  async login(email, password, options = {}) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        deviceInfo: this.getDeviceInfo(),
        securityLevel: options.securityLevel || 'medium',
        rememberMe: options.rememberMe || false
      });
      
      const { token, user, sessionInfo } = response.data;
      
      // Store token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
      
      // Je note que l'utilisateur s'est connecté
      this.trackEvent('user_login', { userId: user.id, method: 'email' });
      
      return { token, user, sessionInfo };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', {
        ...userData,
        deviceInfo: this.getDeviceInfo(),
        registrationSource: 'web'
      });
      
      const { token, user } = response.data;
      
      // Store token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Je note l'inscription dans les stats
      this.trackEvent('user_register', { userId: user.id });
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur d\'inscription');
    }
  }

  async loginWithGoogle(googleToken) {
    try {
      const response = await api.post('/auth/google', {
        token: googleToken,
        deviceInfo: this.getDeviceInfo()
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      this.trackEvent('user_login', { userId: user.id, method: 'google' });
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur d\'authentification Google');
    }
  }

  async biometricAuth(biometricData) {
    try {
      const response = await api.post('/auth/biometric', {
        biometricData,
        deviceInfo: this.getDeviceInfo()
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      this.trackEvent('user_login', { userId: user.id, method: 'biometric' });
      
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur d\'authentification biométrique');
    }
  }

  async logout() {
    try {
      await api.post('/auth/logout');
      
      // Je nettoie tout ce qui était stocké localement
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('sessionInfo');
      
      this.trackEvent('user_logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      throw new Error('Erreur de rafraîchissement du token');
    }
  }

  async verifyEmail(token) {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur de vérification email');
    }
  }

  async resetPassword(email) {
    try {
      const response = await api.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur de réinitialisation');
    }
  }

  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth
      },
      timestamp: new Date().toISOString()
    };
  }

  trackEvent(eventName, data = {}) {
    // J'envoie les données d'usage pour les stats
    api.post('/analytics/track', {
      event: eventName,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    }).catch(console.error);
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
}

class ProjectsService {
  async getProjects(filters = {}) {
    try {
      const response = await api.get('/projects', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des projets');
    }
  }

  async getProject(id) {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement du projet');
    }
  }

  async createProject(projectData) {
    try {
      const response = await api.post('/projects', projectData);
      toast.success('Projet créé avec succès !');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la création du projet');
    }
  }

  async updateProject(id, projectData) {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      toast.success('Projet mis à jour avec succès !');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du projet');
    }
  }

  async deleteProject(id) {
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Projet supprimé avec succès !');
    } catch (error) {
      throw new Error('Erreur lors de la suppression du projet');
    }
  }

  async likeProject(id) {
    try {
      const response = await api.post(`/projects/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du like du projet');
    }
  }

  async addComment(projectId, comment) {
    try {
      const response = await api.post(`/projects/${projectId}/comments`, { comment });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de l\'ajout du commentaire');
    }
  }

  async getProjectStats(id) {
    try {
      const response = await api.get(`/projects/${id}/stats`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des statistiques');
    }
  }
}

class BlogService {
  async getPosts(filters = {}) {
    try {
      const response = await api.get('/blog/posts', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des articles');
    }
  }

  async getPost(slug) {
    try {
      const response = await api.get(`/blog/posts/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement de l\'article');
    }
  }

  async createPost(postData) {
    try {
      const response = await api.post('/blog/posts', postData);
      toast.success('Article créé avec succès !');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la création de l\'article');
    }
  }

  async updatePost(id, postData) {
    try {
      const response = await api.put(`/blog/posts/${id}`, postData);
      toast.success('Article mis à jour avec succès !');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour de l\'article');
    }
  }

  async deletePost(id) {
    try {
      await api.delete(`/blog/posts/${id}`);
      toast.success('Article supprimé avec succès !');
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'article');
    }
  }

  async likePost(id) {
    try {
      const response = await api.post(`/blog/posts/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du like de l\'article');
    }
  }

  async addComment(postId, comment) {
    try {
      const response = await api.post(`/blog/posts/${postId}/comments`, { comment });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de l\'ajout du commentaire');
    }
  }

  async getCategories() {
    try {
      const response = await api.get('/blog/categories');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des catégories');
    }
  }

  async getTags() {
    try {
      const response = await api.get('/blog/tags');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des tags');
    }
  }
}

class ForumService {
  async getTopics(filters = {}) {
    try {
      const response = await api.get('/forum/topics', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des sujets');
    }
  }

  async getTopic(id) {
    try {
      const response = await api.get(`/forum/topics/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement du sujet');
    }
  }

  async createTopic(topicData) {
    try {
      const response = await api.post('/forum/topics', topicData);
      toast.success('Sujet créé avec succès !');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la création du sujet');
    }
  }

  async replyToTopic(topicId, reply) {
    try {
      const response = await api.post(`/forum/topics/${topicId}/replies`, { reply });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de l\'ajout de la réponse');
    }
  }

  async likeTopic(id) {
    try {
      const response = await api.post(`/forum/topics/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du like du sujet');
    }
  }

  async markTopicSolved(id) {
    try {
      const response = await api.post(`/forum/topics/${id}/solve`);
      toast.success('Sujet marqué comme résolu !');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du marquage du sujet');
    }
  }

  async getCategories() {
    try {
      const response = await api.get('/forum/categories');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des catégories');
    }
  }
}

class ContactService {
  async sendMessage(messageData) {
    try {
      const response = await api.post('/contact/send', {
        ...messageData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      
      toast.success('Message envoyé avec succès ! Nous vous répondrons sous 24h.');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'envoi du message');
    }
  }

  async subscribeNewsletter(email) {
    try {
      const response = await api.post('/contact/newsletter', { email });
      toast.success('Inscription à la newsletter réussie !');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  }

  async getContactInfo() {
    try {
      const response = await api.get('/contact/info');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des informations de contact');
    }
  }
}

class SkillsService {
  async getSkills(filters = {}) {
    try {
      const response = await api.get('/skills', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des compétences');
    }
  }

  async getSkillCategories() {
    try {
      const response = await api.get('/skills/categories');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des catégories');
    }
  }

  async getCertifications() {
    try {
      const response = await api.get('/skills/certifications');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des certifications');
    }
  }
}

class AnalyticsService {
  async trackPageView(page) {
    try {
      await api.post('/analytics/pageview', {
        page,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  async trackEvent(eventName, data = {}) {
    try {
      await api.post('/analytics/event', {
        event: eventName,
        data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  async getStats() {
    try {
      const response = await api.get('/analytics/stats');
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des statistiques');
    }
  }
}

class FileService {
  async uploadFile(file, options = {}) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (options.category) formData.append('category', options.category);
      if (options.description) formData.append('description', options.description);
      
      const response = await api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (options.onProgress) {
            options.onProgress(percentCompleted);
          }
        },
      });
      
      toast.success('Fichier uploadé avec succès !');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'upload du fichier');
    }
  }

  async deleteFile(fileId) {
    try {
      await api.delete(`/files/${fileId}`);
      toast.success('Fichier supprimé avec succès !');
    } catch (error) {
      throw new Error('Erreur lors de la suppression du fichier');
    }
  }

  async getFiles(filters = {}) {
    try {
      const response = await api.get('/files', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors du chargement des fichiers');
    }
  }
}

// J'exporte toutes mes classes de services
export const authService = new AuthService();
export const projectsService = new ProjectsService();
export const blogService = new BlogService();
export const forumService = new ForumService();
export const contactService = new ContactService();
export const skillsService = new SkillsService();
export const analyticsService = new AnalyticsService();
export const fileService = new FileService();

// Et aussi l'instance axios au cas où on en aurait besoin ailleurs
export default api;
