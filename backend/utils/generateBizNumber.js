import Card from '../models/Card.js';

/**
 * Génère un numéro business unique entre 100000 et 999999
 * @returns {Promise<number>} Numéro business unique
 */
export const generateUniqueBizNumber = async () => {
  let bizNumber;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    // Générer un nombre aléatoire entre 100000 et 999999
    bizNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    
    // Vérifier l'unicité
    const existingCard = await Card.findOne({ bizNumber });
    isUnique = !existingCard;
    attempts++;
  }

  if (!isUnique) {
    throw new Error('Impossible de générer un numéro business unique après plusieurs tentatives');
  }

  return bizNumber;
};

/**
 * Valide le format d'un numéro business
 * @param {number} bizNumber - Numéro à valider
 * @returns {boolean} True si valide
 */
export const validateBizNumber = (bizNumber) => {
  return Number.isInteger(bizNumber) && bizNumber >= 100000 && bizNumber <= 999999;
};

export default { generateUniqueBizNumber, validateBizNumber };
