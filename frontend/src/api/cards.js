import { api } from './client.js';

// API pour la gestion des cartes business
export const cardsAPI = {
  // Récupérer toutes les cartes (public)
  getCards: async (params = {}) => {
    try {
      const response = await api.get('/cards', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des cartes');
    }
  },

  // Récupérer une carte par ID (public)
  getCard: async (id) => {
    try {
      const response = await api.get(`/cards/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de la carte');
    }
  },

  // Créer une nouvelle carte (business/admin)
  createCard: async (cardData) => {
    try {
      const response = await api.post('/cards', cardData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        throw new Error(error.response.data.errors.map(err => err.message).join(', '));
      }
      throw new Error(error.response?.data?.message || 'Erreur lors de la création de la carte');
    }
  },

  // Mettre à jour une carte (propriétaire/admin)
  updateCard: async (id, cardData) => {
    try {
      const response = await api.patch(`/cards/${id}`, cardData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        throw new Error(error.response.data.errors.map(err => err.message).join(', '));
      }
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour de la carte');
    }
  },

  // Supprimer une carte (propriétaire/admin)
  deleteCard: async (id) => {
    try {
      const response = await api.delete(`/cards/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de la carte');
    }
  },

  // Récupérer mes cartes (utilisateur connecté)
  getMyCards: async (params = {}) => {
    try {
      const response = await api.get('/users/me/cards', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de vos cartes');
    }
  },

  // Toggle favori
  toggleFavorite: async (id) => {
    try {
      const response = await api.patch(`/cards/${id}/toggle-favorite`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la gestion des favoris');
    }
  },

  // Récupérer mes favoris
  getMyFavorites: async (params = {}) => {
    try {
      const response = await api.get('/users/me/favorites', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de vos favoris');
    }
  },

  // Supprimer un favori
  removeFavorite: async (cardId) => {
    try {
      const response = await api.delete(`/users/me/favorites/${cardId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression du favori');
    }
  }
};

export default cardsAPI;
