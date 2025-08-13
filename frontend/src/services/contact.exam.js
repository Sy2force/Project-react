// [EXAM] Service API complet pour la gestion des contacts
import { optimizedApi } from './optimizedApi';

/**
 * [EXAM] Service de gestion des formulaires de contact
 * @module ContactService
 */

/**
 * [EXAM] Soumet un formulaire de contact
 * @param {Object} contactData - Données du formulaire
 * @param {string} contactData.name - Nom complet
 * @param {string} contactData.email - Email de contact
 * @param {string} contactData.subject - Sujet du message
 * @param {string} contactData.message - Contenu du message
 * @param {string} [contactData.projectType] - Type de projet
 * @param {string} [contactData.phone] - Numéro de téléphone
 * @param {string} [contactData.company] - Nom de l'entreprise
 * @param {string} [contactData.budget] - Budget estimé
 * @returns {Promise<Object>} Confirmation d'envoi
 */
export const contactSubmit = async (contactData) => {
  try {
    // [EXAM] Validation côté client avant envoi
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !contactData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Champs requis manquants: ${missingFields.join(', ')}`);
    }

    // [EXAM] Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      throw new Error('Format d\'email invalide');
    }

    const response = await optimizedApi.post('/contact', {
      ...contactData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      source: 'portfolio_website'
    });
    
    return {
      success: true,
      message: response.data.message || 'Message envoyé avec succès',
      ticketId: response.data.ticketId,
      estimatedResponse: response.data.estimatedResponse || '24h'
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de l\'envoi du formulaire de contact:', error);
    throw new Error(error.message || 'Impossible d\'envoyer le message');
  }
};

/**
 * [EXAM] Récupère les types de projets disponibles
 * @returns {Promise<Array>} Liste des types de projets
 */
export const getProjectTypes = async () => {
  try {
    const response = await optimizedApi.get('/contact/project-types');
    return response.data.types || [
      { id: 'web', label: 'Application Web', icon: '🌐' },
      { id: 'mobile', label: 'Application Mobile', icon: '📱' },
      { id: 'api', label: 'API / Backend', icon: '⚙️' },
      { id: 'design', label: 'Design / UX', icon: '🎨' },
      { id: 'consulting', label: 'Consulting', icon: '💡' },
      { id: 'other', label: 'Autre', icon: '🚀' }
    ];
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des types de projets:', error);
    // [EXAM] Fallback avec données par défaut
    return [
      { id: 'web', label: 'Application Web', icon: '🌐' },
      { id: 'mobile', label: 'Application Mobile', icon: '📱' },
      { id: 'api', label: 'API / Backend', icon: '⚙️' },
      { id: 'design', label: 'Design / UX', icon: '🎨' },
      { id: 'consulting', label: 'Consulting', icon: '💡' },
      { id: 'other', label: 'Autre', icon: '🚀' }
    ];
  }
};

/**
 * [EXAM] Vérifie le statut d'un message envoyé
 * @param {string} ticketId - ID du ticket de support
 * @returns {Promise<Object>} Statut du message
 */
export const getContactStatus = async (ticketId) => {
  try {
    const response = await optimizedApi.get(`/contact/status/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error(`[EXAM] Erreur lors de la vérification du statut du ticket ${ticketId}:`, error);
    throw new Error('Impossible de vérifier le statut du message');
  }
};

/**
 * [EXAM] Soumet une demande de devis
 * @param {Object} quoteData - Données de la demande de devis
 * @param {string} quoteData.projectType - Type de projet
 * @param {string} quoteData.description - Description détaillée
 * @param {string} quoteData.timeline - Délai souhaité
 * @param {string} quoteData.budget - Budget estimé
 * @param {Array<string>} [quoteData.features] - Fonctionnalités souhaitées
 * @param {Object} quoteData.contact - Informations de contact
 * @returns {Promise<Object>} Confirmation de demande de devis
 */
export const submitQuoteRequest = async (quoteData) => {
  try {
    const response = await optimizedApi.post('/contact/quote', {
      ...quoteData,
      timestamp: new Date().toISOString(),
      source: 'portfolio_website'
    });
    
    return {
      success: true,
      message: response.data.message || 'Demande de devis envoyée avec succès',
      quoteId: response.data.quoteId,
      estimatedResponse: response.data.estimatedResponse || '48h'
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de l\'envoi de la demande de devis:', error);
    throw new Error('Impossible d\'envoyer la demande de devis');
  }
};

/**
 * [EXAM] S'abonne à la newsletter
 * @param {string} email - Email pour l'abonnement
 * @param {Array<string>} [interests] - Centres d'intérêt
 * @returns {Promise<Object>} Confirmation d'abonnement
 */
export const subscribeNewsletter = async (email, interests = []) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Format d\'email invalide');
    }

    const response = await optimizedApi.post('/contact/newsletter', {
      email,
      interests,
      timestamp: new Date().toISOString(),
      source: 'portfolio_website'
    });
    
    return {
      success: true,
      message: response.data.message || 'Abonnement réussi à la newsletter'
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de l\'abonnement à la newsletter:', error);
    throw new Error('Impossible de s\'abonner à la newsletter');
  }
};

/**
 * [EXAM] Récupère les informations de contact publiques
 * @returns {Promise<Object>} Informations de contact
 */
export const getContactInfo = async () => {
  try {
    const response = await optimizedApi.get('/contact/info');
    return response.data.contact || {
      email: 'contact@shayacoca.com', // [EXAM] {{contactEmail}} placeholder
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      availability: 'Lun-Ven 9h-18h',
      responseTime: '24h',
      socials: {
        github: 'https://github.com/shayacoca',
        linkedin: 'https://linkedin.com/in/shayacoca',
        twitter: 'https://twitter.com/shayacoca'
      }
    };
  } catch (error) {
    console.error('[EXAM] Erreur lors de la récupération des informations de contact:', error);
    // [EXAM] Fallback avec données par défaut
    return {
      email: 'contact@shayacoca.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      availability: 'Lun-Ven 9h-18h',
      responseTime: '24h',
      socials: {
        github: 'https://github.com/shayacoca',
        linkedin: 'https://linkedin.com/in/shayacoca',
        twitter: 'https://twitter.com/shayacoca'
      }
    };
  }
};

// [EXAM] Export par défaut de tous les services
export default {
  contactSubmit,
  getProjectTypes,
  getContactStatus,
  submitQuoteRequest,
  subscribeNewsletter,
  getContactInfo
};
