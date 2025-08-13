// [EXAM] Service API complet pour la gestion des projets
import { optimizedApi } from './optimizedApi';

/**
 * [EXAM] Service de gestion des projets avec toutes les fonctionnalités CRUD
 * @module ProjectsService
 */

/**
 * [EXAM] Récupère tous les projets avec filtres et pagination
 * @param {Object} params - Paramètres de requête
 * @param {string} [params.category] - Catégorie de projet
 * @param {string} [params.technology] - Technologie utilisée
 * @param {string} [params.search] - Terme de recherche
 * @param {string} [params.sortBy] - Critère de tri (recent, popular, name)
 * @param {number} [params.page=1] - Numéro de page
 * @param {number} [params.limit=12] - Nombre d'éléments par page
 * @returns {Promise<Object>} Liste des projets avec métadonnées
 */
export const getProjects = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page || 1,
      limit: params.limit || 12,
      ...params
    });

    const response = await optimizedApi.get(`/projects?${queryParams}`);
    
    return {
      projects: response.data.projects || [],
      pagination: response.data.pagination || {},
      total: response.data.total || 0,
      filters: response.data.filters || {}
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des projets:', error);
    throw new Error('Impossible de charger les projets');
  }
};

/**
 * [EXAM] Récupère un projet spécifique par son ID
 * @param {string|number} projectId - ID du projet
 * @returns {Promise<Object>} Détails du projet
 */
export const getProjectById = async (projectId) => {
  try {
    const response = await optimizedApi.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la récupération du projet ${projectId}:`, error);
    throw new Error('Projet non trouvé');
  }
};

/**
 * [EXAM] Ajoute ou retire un like sur un projet
 * @param {string|number} projectId - ID du projet
 * @param {boolean} [isLiked=false] - État actuel du like
 * @returns {Promise<Object>} Nouvel état du like et nombre total
 */
export const likeProject = async (projectId, isLiked = false) => {
  try {
    const endpoint = isLiked ? `/projects/${projectId}/unlike` : `/projects/${projectId}/like`;
    const response = await optimizedApi.post(endpoint);
    
    return {
      liked: response.data.liked,
      likesCount: response.data.likesCount,
      message: response.data.message
    };
  } catch (error) {
    console.error(`[EXAM] Erreur lors du like du projet ${projectId}:`, error);
    throw new Error('Impossible de mettre à jour le like');
  }
};

/**
 * [EXAM] Crée un nouveau projet (pour les utilisateurs business/admin)
 * @param {Object} projectData - Données du projet
 * @param {string} projectData.title - Titre du projet
 * @param {string} projectData.description - Description
 * @param {string} projectData.category - Catégorie
 * @param {Array<string>} projectData.technologies - Technologies utilisées
 * @param {string} [projectData.image] - URL de l'image
 * @param {string} [projectData.github] - URL GitHub
 * @param {string} [projectData.demo] - URL de démo
 * @returns {Promise<Object>} Projet créé
 */
export const createProject = async (projectData) => {
  try {
    const response = await optimizedApi.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('[EXAM] Erreur lors de la création du projet:', error);
    throw new Error('Impossible de créer le projet');
  }
};

/**
 * [EXAM] Met à jour un projet existant
 * @param {string|number} projectId - ID du projet
 * @param {Object} updateData - Données à mettre à jour
 * @returns {Promise<Object>} Projet mis à jour
 */
export const updateProject = async (projectId, updateData) => {
  try {
    const response = await optimizedApi.put(`/projects/${projectId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la mise à jour du projet ${projectId}:`, error);
    throw new Error('Impossible de mettre à jour le projet');
  }
};

/**
 * [EXAM] Supprime un projet
 * @param {string|number} projectId - ID du projet
 * @returns {Promise<boolean>} Succès de la suppression
 */
export const deleteProject = async (projectId) => {
  try {
    await optimizedApi.delete(`/projects/${projectId}`);
    return true;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la suppression du projet ${projectId}:`, error);
    throw new Error('Impossible de supprimer le projet');
  }
};

/**
 * [EXAM] Récupère les statistiques des projets
 * @returns {Promise<Object>} Statistiques globales
 */
export const getProjectsStats = async () => {
  try {
    const response = await optimizedApi.get('/projects/stats');
    return response.data;
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des statistiques:', error);
    return {
      total: 0,
      byCategory: {},
      byTechnology: {},
      totalLikes: 0,
      totalViews: 0
    };
  }
};

/**
 * [EXAM] Incrémente le compteur de vues d'un projet
 * @param {string|number} projectId - ID du projet
 * @returns {Promise<number>} Nouveau nombre de vues
 */
export const incrementProjectViews = async (projectId) => {
  try {
    const response = await optimizedApi.post(`/projects/${projectId}/view`);
    return response.data.views;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de l'incrémentation des vues du projet ${projectId}:`, error);
    return 0;
  }
};

/**
 * [EXAM] Recherche de projets avec suggestions
 * @param {string} query - Terme de recherche
 * @param {number} [limit=5] - Nombre de suggestions
 * @returns {Promise<Array>} Suggestions de projets
 */
export const searchProjects = async (query, limit = 5) => {
  try {
    const response = await optimizedApi.get(`/projects/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data.suggestions || [];
  } catch (error) {
    console.error('[EXAM] Erreur lors de la recherche de projets:', error);
    return [];
  }
};

// [EXAM] Export par défaut de tous les services
export default {
  getProjects,
  getProjectById,
  likeProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsStats,
  incrementProjectViews,
  searchProjects
};
