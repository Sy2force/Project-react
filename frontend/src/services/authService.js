// [EXAM] Service d'authentification complet avec toutes les fonctionnalités
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Configuration axios pour l'authentification
const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token automatiquement
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs d'authentification
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Service d'authentification complet
 */
export const authService = {
  /**
   * Connexion utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} Données utilisateur et token
   */
  async login(email, password) {
    try {
      const response = await authApi.post('/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Stocker le token
      if (token) {
        localStorage.setItem('token', token);
      }

      return {
        success: true,
        user,
        token,
        message: response.data.message || 'Connexion réussie'
      };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de connexion',
        errors: error.response?.data?.errors || []
      };
    }
  },

  /**
   * Inscription utilisateur
   * @param {Object} userData - Données d'inscription
   * @returns {Promise<Object>} Résultat de l'inscription
   */
  async register(userData) {
    try {
      const response = await authApi.post('/auth/register', userData);
      
      const { token, user } = response.data;
      
      // Stocker le token
      if (token) {
        localStorage.setItem('token', token);
      }

      return {
        success: true,
        user,
        token,
        message: response.data.message || 'Inscription réussie'
      };
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur d\'inscription',
        errors: error.response?.data?.errors || []
      };
    }
  },

  /**
   * Déconnexion utilisateur
   */
  async logout() {
    try {
      await authApi.post('/auth/logout');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      // Toujours supprimer le token localement
      localStorage.removeItem('token');
    }
  },

  /**
   * Récupérer le profil utilisateur actuel
   * @returns {Promise<Object>} Profil utilisateur
   */
  async getCurrentUser() {
    try {
      const response = await authApi.get('/auth/me');
      return {
        success: true,
        user: response.data.user
      };
    } catch (error) {
      console.error('Erreur récupération profil:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de récupération du profil'
      };
    }
  },

  /**
   * Demande de réinitialisation de mot de passe
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<Object>} Résultat de la demande
   */
  async forgotPassword(email) {
    try {
      const response = await authApi.post('/auth/forgot-password', { email });
      return {
        success: true,
        message: response.data.message || 'Email de réinitialisation envoyé'
      };
    } catch (error) {
      console.error('Erreur mot de passe oublié:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la demande'
      };
    }
  },

  /**
   * Réinitialisation de mot de passe
   * @param {string} token - Token de réinitialisation
   * @param {string} newPassword - Nouveau mot de passe
   * @returns {Promise<Object>} Résultat de la réinitialisation
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await authApi.post('/auth/reset-password', {
        token,
        newPassword
      });
      return {
        success: true,
        message: response.data.message || 'Mot de passe réinitialisé'
      };
    } catch (error) {
      console.error('Erreur réinitialisation:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de réinitialisation'
      };
    }
  },

  /**
   * Rafraîchir le token
   * @returns {Promise<Object>} Nouveau token
   */
  async refreshToken() {
    try {
      const response = await authApi.post('/auth/refresh');
      const { token } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
      }

      return {
        success: true,
        token
      };
    } catch (error) {
      console.error('Erreur rafraîchissement token:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de rafraîchissement'
      };
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {boolean} État de connexion
   */
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Vérifier si le token n'est pas expiré
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Token invalide:', error);
      localStorage.removeItem('token');
      return false;
    }
  },

  /**
   * Obtenir les données utilisateur depuis le token
   * @returns {Object|null} Données utilisateur
   */
  getUserFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 > Date.now()) {
        return {
          id: payload.userId,
          name: payload.name,
          email: payload.email,
          role: payload.role
        };
      }
    } catch (error) {
      console.error('Erreur décodage token:', error);
    }
    
    return null;
  }
};

export default authService;
