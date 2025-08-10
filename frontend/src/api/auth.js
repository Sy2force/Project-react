import { api } from './client'

// API d'authentification pour le frontend
export const authAPI = {
  // Inscription
  register: async (name, email, password) => {
    try {
      const response = await api.auth.register({ name, email, password })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Connexion
  login: async (email, password) => {
    try {
      const response = await api.auth.login({ email, password })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.auth.logout()
    } catch (error) {
      // Ignore les erreurs de déconnexion
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  // Récupérer le profil utilisateur
  getProfile: async () => {
    try {
      const response = await api.auth.me()
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Alias pour compatibilité
  me: async () => {
    try {
      const response = await api.auth.me()
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  // Récupérer l'utilisateur depuis le localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}
