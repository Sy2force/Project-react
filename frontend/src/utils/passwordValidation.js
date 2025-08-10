/**
 * Utilitaires de validation de mot de passe selon les exigences PDF strictes
 * ≥8 caractères, ≥1 maj, ≥1 min, ≥4 chiffres, ≥1 spécial
 */

// Regex stricte pour mot de passe selon PDF
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Caractères spéciaux autorisés
export const SPECIAL_CHARS = '@$!%*?&';

/**
 * Valide un mot de passe selon les critères stricts
 * @param {string} password - Mot de passe à valider
 * @returns {Object} - Résultat de validation avec détails
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    errors: [],
    strength: 'weak',
    score: 0
  };

  if (!password) {
    result.errors.push('Mot de passe requis');
    return result;
  }

  // Vérifications individuelles selon PDF
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digits: (password.match(/\d/g) || []).length >= 4,
    special: new RegExp(`[${SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`).test(password),
    validChars: /^[A-Za-z\d@$!%*?&]+$/.test(password)
  };

  // Messages d'erreur spécifiques
  if (!checks.length) {
    result.errors.push('Minimum 8 caractères requis');
  }
  if (!checks.lowercase) {
    result.errors.push('Au moins 1 lettre minuscule requise');
  }
  if (!checks.uppercase) {
    result.errors.push('Au moins 1 lettre majuscule requise');
  }
  if (!checks.digits) {
    result.errors.push('Au moins 4 chiffres requis');
  }
  if (!checks.special) {
    result.errors.push(`Au moins 1 caractère spécial requis (${SPECIAL_CHARS})`);
  }
  if (!checks.validChars) {
    result.errors.push(`Seuls les lettres, chiffres et caractères spéciaux (${SPECIAL_CHARS}) sont autorisés`);
  }

  // Calcul du score et force
  const passedChecks = Object.values(checks).filter(Boolean).length;
  result.score = Math.round((passedChecks / 6) * 100);

  if (result.score === 100) {
    result.strength = 'strong';
    result.isValid = true;
  } else if (result.score >= 80) {
    result.strength = 'medium';
  } else {
    result.strength = 'weak';
  }

  return result;
};

/**
 * Valide la confirmation de mot de passe
 * @param {string} password - Mot de passe original
 * @param {string} confirmPassword - Confirmation du mot de passe
 * @returns {Object} - Résultat de validation
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  const result = {
    isValid: false,
    errors: []
  };

  if (!confirmPassword) {
    result.errors.push('Confirmation du mot de passe requise');
    return result;
  }

  if (password !== confirmPassword) {
    result.errors.push('Les mots de passe ne correspondent pas');
    return result;
  }

  result.isValid = true;
  return result;
};

/**
 * Génère des suggestions pour améliorer le mot de passe
 * @param {string} password - Mot de passe à analyser
 * @returns {Array} - Liste de suggestions
 */
export const getPasswordSuggestions = (password) => {
  const suggestions = [];
  const validation = validatePassword(password);

  if (!validation.isValid) {
    suggestions.push('Votre mot de passe doit respecter tous les critères suivants :');
    validation.errors.forEach(error => {
      suggestions.push(`• ${error}`);
    });
    
    suggestions.push('');
    suggestions.push('Exemples de mots de passe valides :');
    suggestions.push('• MySecure1234!');
    suggestions.push('• Strong2024@Pass');
    suggestions.push('• Valid1234$Word');
  }

  return suggestions;
};

/**
 * Composant React pour afficher la force du mot de passe
 * @param {string} password - Mot de passe à analyser
 * @returns {Object} - Props pour le composant de force
 */
export const getPasswordStrengthProps = (password) => {
  const validation = validatePassword(password);
  
  const strengthColors = {
    weak: '#ef4444',
    medium: '#f59e0b',
    strong: '#22c55e'
  };

  const strengthLabels = {
    weak: 'Faible',
    medium: 'Moyen',
    strong: 'Fort'
  };

  return {
    score: validation.score,
    strength: validation.strength,
    color: strengthColors[validation.strength],
    label: strengthLabels[validation.strength],
    isValid: validation.isValid,
    errors: validation.errors
  };
};

export default {
  PASSWORD_REGEX,
  SPECIAL_CHARS,
  validatePassword,
  validatePasswordConfirmation,
  getPasswordSuggestions,
  getPasswordStrengthProps
};
