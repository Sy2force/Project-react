// [EXAM] Service API complet pour la gestion des favoris
import { optimizedApi } from './optimizedApi';

/**
 * [EXAM] Service de gestion des favoris utilisateur
 * @module FavoritesService
 */

/**
 * [EXAM] Récupère tous les favoris de l'utilisateur connecté
 * @param {Object} [params] - Paramètres de requête
 * @param {string} [params.type] - Type de favori (project, post, all)
 * @param {number} [params.page=1] - Numéro de page
 * @param {number} [params.limit=20] - Nombre d'éléments par page
 * @param {string} [params.sortBy] - Critère de tri (recent, name, type)
 * @returns {Promise<Object>} Liste des favoris avec métadonnées
 */
export const getFavorites = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 20,
      ...params
    });

    const response = await optimizedApi.get(`/favorites?${queryParams}`);
    
    return {
      favorites: response.data.favorites || [],
      pagination: response.data.pagination || {},
      total: response.data.total || 0,
      stats: response.data.stats || { projects: 0, posts: 0 }
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des favoris:', error);
    throw new Error('Impossible de charger les favoris');
  }
};

/**
 * [EXAM] Ajoute un élément aux favoris
 * @param {string} itemType - Type d'élément (project, post)
 * @param {string|number} itemId - ID de l'élément
 * @returns {Promise<Object>} Confirmation d'ajout
 */
export const addToFavorites = async (itemType, itemId) => {
  try {
    const response = await optimizedApi.post('/favorites', {
      itemType,
      itemId
    });
    
    return {
      success: true,
      message: response.data.message,
      favorite: response.data.favorite
    };
  } catch (error) {
    console.error(`[EXAM] Erreur lors de l'ajout aux favoris (${itemType}:${itemId}):`, error);
    throw new Error('Impossible d\'ajouter aux favoris');
  }
};

/**
 * [EXAM] Retire un élément des favoris
 * @param {string} itemType - Type d'élément (project, post)
 * @param {string|number} itemId - ID de l'élément
 * @returns {Promise<Object>} Confirmation de suppression
 */
export const removeFromFavorites = async (itemType, itemId) => {
  try {
    const response = await optimizedApi.delete(`/favorites/${itemType}/${itemId}`);
    
    return {
      success: true,
      message: response.data.message
    };
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la suppression des favoris (${itemType}:${itemId}):`, error);
    throw new Error('Impossible de retirer des favoris');
  }
};

/**
 * [EXAM] Vérifie si un élément est dans les favoris
 * @param {string} itemType - Type d'élément (project, post)
 * @param {string|number} itemId - ID de l'élément
 * @returns {Promise<boolean>} True si l'élément est favori
 */
export const isFavorite = async (itemType, itemId) => {
  try {
    const response = await optimizedApi.get(`/favorites/check/${itemType}/${itemId}`);
    return response.data.isFavorite || false;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la vérification du favori (${itemType}:${itemId}):`, error);
    return false;
  }
};

/**
 * [EXAM] Récupère les statistiques des favoris
 * @returns {Promise<Object>} Statistiques des favoris
 */
export const getFavoritesStats = async () => {
  try {
    const response = await optimizedApi.get('/favorites/stats');
    return response.data.stats || {
      total: 0,
      projects: 0,
      posts: 0,
      recentlyAdded: []
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des statistiques des favoris:', error);
    return {
      total: 0,
      projects: 0,
      posts: 0,
      recentlyAdded: []
    };
  }
};

/**
 * [EXAM] Supprime tous les favoris de l'utilisateur
 * @returns {Promise<boolean>} Succès de la suppression
 */
export const clearAllFavorites = async () => {
  try {
    await optimizedApi.delete('/favorites/all');
    return true;
  } catch (error) {
    console.error('[EXAM] Erreur lors de la suppression de tous les favoris:', error);
    throw new Error('Impossible de supprimer tous les favoris');
  }
};

/**
 * [EXAM] Exporte les favoris au format JSON
 * @returns {Promise<Object>} Données d'export des favoris
 */
export const exportFavorites = async () => {
  try {
    const response = await optimizedApi.get('/favorites/export');
    return response.data;
  } catch (error) {
    console.error('[EXAM] Erreur lors de l\'export des favoris:', error);
    throw new Error('Impossible d\'exporter les favoris');
  }
};

// [EXAM] Export par défaut de tous les services
export default {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  getFavoritesStats,
  clearAllFavorites,
  exportFavorites
};
