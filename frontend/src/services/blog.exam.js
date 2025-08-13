// [EXAM] Service API complet pour la gestion du blog
import { optimizedApi } from './optimizedApi';

/**
 * [EXAM] Service de gestion du blog avec toutes les fonctionnalités
 * @module BlogService
 */

/**
 * [EXAM] Récupère tous les articles avec filtres et pagination
 * @param {Object} params - Paramètres de requête
 * @param {string} [params.category] - Catégorie d'article
 * @param {string} [params.tag] - Tag spécifique
 * @param {string} [params.search] - Terme de recherche
 * @param {string} [params.sortBy] - Critère de tri (recent, popular, views)
 * @param {number} [params.page=1] - Numéro de page
 * @param {number} [params.limit=10] - Nombre d'articles par page
 * @param {boolean} [params.featured] - Articles en vedette uniquement
 * @returns {Promise<Object>} Liste des articles avec métadonnées
 */
export const getPosts = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 10,
      ...params
    });

    const response = await optimizedApi.get(`/blog/posts?${queryParams}`);
    
    return {
      posts: response.data.posts || [],
      pagination: response.data.pagination || {},
      total: response.data.total || 0,
      categories: response.data.categories || [],
      tags: response.data.tags || []
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des articles:', error);
    throw new Error('Impossible de charger les articles');
  }
};

/**
 * [EXAM] Récupère un article spécifique par son ID ou slug
 * @param {string|number} postId - ID ou slug de l'article
 * @returns {Promise<Object>} Détails de l'article
 */
export const getPostById = async (postId) => {
  try {
    const response = await optimizedApi.get(`/blog/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la récupération de l'article ${postId}:`, error);
    throw new Error('Article non trouvé');
  }
};

/**
 * [EXAM] Ajoute ou retire un like sur un article
 * @param {string|number} postId - ID de l'article
 * @param {boolean} [isLiked=false] - État actuel du like
 * @returns {Promise<Object>} Nouvel état du like et nombre total
 */
export const likePost = async (postId, isLiked = false) => {
  try {
    const endpoint = isLiked ? `/blog/posts/${postId}/unlike` : `/blog/posts/${postId}/like`;
    const response = await optimizedApi.post(endpoint);
    
    return {
      liked: response.data.liked,
      likesCount: response.data.likesCount,
      message: response.data.message
    };
  } catch (error) {
    console.error(`[EXAM] Erreur lors du like de l'article ${postId}:`, error);
    throw new Error('Impossible de mettre à jour le like');
  }
};

/**
 * [EXAM] Ajoute un commentaire à un article
 * @param {string|number} postId - ID de l'article
 * @param {Object} commentData - Données du commentaire
 * @param {string} commentData.content - Contenu du commentaire
 * @param {string|number} [commentData.parentId] - ID du commentaire parent (pour réponses)
 * @returns {Promise<Object>} Commentaire créé
 */
export const commentPost = async (postId, commentData) => {
  try {
    const response = await optimizedApi.post(`/blog/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de l'ajout du commentaire à l'article ${postId}:`, error);
    throw new Error('Impossible d\'ajouter le commentaire');
  }
};

/**
 * [EXAM] Récupère les commentaires d'un article
 * @param {string|number} postId - ID de l'article
 * @param {Object} [params] - Paramètres de pagination
 * @param {number} [params.page=1] - Numéro de page
 * @param {number} [params.limit=20] - Nombre de commentaires par page
 * @returns {Promise<Object>} Liste des commentaires
 */
export const getPostComments = async (postId, params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 20,
      ...params
    });

    const response = await optimizedApi.get(`/blog/posts/${postId}/comments?${queryParams}`);
    return {
      comments: response.data.comments || [],
      pagination: response.data.pagination || {},
      total: response.data.total || 0
    };
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la récupération des commentaires de l'article ${postId}:`, error);
    return { comments: [], pagination: {}, total: 0 };
  }
};

/**
 * [EXAM] Crée un nouvel article (pour admin)
 * @param {Object} postData - Données de l'article
 * @param {string} postData.title - Titre de l'article
 * @param {string} postData.content - Contenu de l'article
 * @param {string} postData.excerpt - Extrait de l'article
 * @param {string} postData.category - Catégorie
 * @param {Array<string>} postData.tags - Tags de l'article
 * @param {string} [postData.image] - URL de l'image
 * @param {boolean} [postData.featured=false] - Article en vedette
 * @param {boolean} [postData.published=true] - Article publié
 * @returns {Promise<Object>} Article créé
 */
export const createPost = async (postData) => {
  try {
    const response = await optimizedApi.post('/blog/posts', postData);
    return response.data;
  } catch (error) {
    console.error('[EXAM] Erreur lors de la création de l\'article:', error);
    throw new Error('Impossible de créer l\'article');
  }
};

/**
 * [EXAM] Met à jour un article existant
 * @param {string|number} postId - ID de l'article
 * @param {Object} updateData - Données à mettre à jour
 * @returns {Promise<Object>} Article mis à jour
 */
export const updatePost = async (postId, updateData) => {
  try {
    const response = await optimizedApi.put(`/blog/posts/${postId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la mise à jour de l'article ${postId}:`, error);
    throw new Error('Impossible de mettre à jour l\'article');
  }
};

/**
 * [EXAM] Supprime un article
 * @param {string|number} postId - ID de l'article
 * @returns {Promise<boolean>} Succès de la suppression
 */
export const deletePost = async (postId) => {
  try {
    await optimizedApi.delete(`/blog/posts/${postId}`);
    return true;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la suppression de l'article ${postId}:`, error);
    throw new Error('Impossible de supprimer l\'article');
  }
};

/**
 * [EXAM] Récupère les articles populaires
 * @param {number} [limit=5] - Nombre d'articles à récupérer
 * @returns {Promise<Array>} Articles populaires
 */
export const getPopularPosts = async (limit = 5) => {
  try {
    const response = await optimizedApi.get(`/blog/posts/popular?limit=${limit}`);
    return response.data.posts || [];
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des articles populaires:', error);
    return [];
  }
};

/**
 * [EXAM] Récupère les articles récents
 * @param {number} [limit=5] - Nombre d'articles à récupérer
 * @returns {Promise<Array>} Articles récents
 */
export const getRecentPosts = async (limit = 5) => {
  try {
    const response = await optimizedApi.get(`/blog/posts/recent?limit=${limit}`);
    return response.data.posts || [];
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des articles récents:', error);
    return [];
  }
};

/**
 * [EXAM] Incrémente le compteur de vues d'un article
 * @param {string|number} postId - ID de l'article
 * @returns {Promise<number>} Nouveau nombre de vues
 */
export const incrementPostViews = async (postId) => {
  try {
    const response = await optimizedApi.post(`/blog/posts/${postId}/view`);
    return response.data.views;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de l'incrémentation des vues de l'article ${postId}:`, error);
    return 0;
  }
};

/**
 * [EXAM] Recherche d'articles avec suggestions
 * @param {string} query - Terme de recherche
 * @param {number} [limit=5] - Nombre de suggestions
 * @returns {Promise<Array>} Suggestions d'articles
 */
export const searchPosts = async (query, limit = 5) => {
  try {
    const response = await optimizedApi.get(`/blog/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data.suggestions || [];
  } catch (error) {
    console.error('[EXAM] Erreur lors de la recherche d\'articles:', error);
    return [];
  }
};

// [EXAM] Export par défaut de tous les services
export default {
  getPosts,
  getPostById,
  likePost,
  commentPost,
  getPostComments,
  createPost,
  updatePost,
  deletePost,
  getPopularPosts,
  getRecentPosts,
  incrementPostViews,
  searchPosts
};
