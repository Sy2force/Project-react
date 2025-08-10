/**
 * Sanitise le HTML en supprimant les balises dangereuses
 * @param {string} input - Texte à sanitiser
 * @returns {string} Texte sanitisé
 */
export const sanitizeHtml = (input) => {
  if (typeof input !== 'string') return input;
  
  // Supprimer les balises HTML potentiellement dangereuses
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

/**
 * Échappe les caractères spéciaux pour éviter les injections
 * @param {string} input - Texte à échapper
 * @returns {string} Texte échappé
 */
export const escapeHtml = (input) => {
  if (typeof input !== 'string') return input;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  
  return input.replace(/[&<>"']/g, (m) => map[m]);
};

export default { sanitizeHtml, escapeHtml };
