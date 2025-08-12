// Utilitaires de validation avancée pour les formulaires

// Règles de validation pour les mots de passe
export const passwordRules = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  maxLength: 128
};

// Validation du mot de passe
export const validatePassword = (password) => {
  const errors = [];
  const warnings = [];
  
  if (!password) {
    errors.push('Le mot de passe est requis');
    return { isValid: false, errors, warnings, strength: 0 };
  }

  // Longueur minimale
  if (password.length < passwordRules.minLength) {
    errors.push(`Le mot de passe doit contenir au moins ${passwordRules.minLength} caractères`);
  }

  // Longueur maximale
  if (password.length > passwordRules.maxLength) {
    errors.push(`Le mot de passe ne peut pas dépasser ${passwordRules.maxLength} caractères`);
  }

  // Majuscules
  if (passwordRules.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }

  // Minuscules
  if (passwordRules.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }

  // Chiffres
  if (passwordRules.requireNumbers && !/\d/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }

  // Caractères spéciaux
  if (passwordRules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*(),.?":{}|<>)');
  }

  // Vérifications de sécurité supplémentaires
  if (password.length >= 8) {
    // Séquences communes
    const commonSequences = ['123456', 'abcdef', 'qwerty', 'azerty', 'password', 'motdepasse'];
    const lowerPassword = password.toLowerCase();
    
    for (const sequence of commonSequences) {
      if (lowerPassword.includes(sequence)) {
        warnings.push(`Évitez d'utiliser des séquences communes comme "${sequence}"`);
      }
    }

    // Répétitions
    if (/(.)\1{2,}/.test(password)) {
      warnings.push('Évitez de répéter le même caractère plusieurs fois de suite');
    }
  }

  // Calcul de la force du mot de passe
  let strength = 0;
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 10;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[a-z]/.test(password)) strength += 15;
  if (/\d/.test(password)) strength += 15;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 15;
  if (password.length >= 16) strength += 10;

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    strength: Math.min(strength, 100)
  };
};

// Validation de l'email
export const validateEmail = (email) => {
  const errors = [];
  
  if (!email) {
    errors.push('L\'email est requis');
    return { isValid: false, errors };
  }

  // Format email basique
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Format d\'email invalide');
  }

  // Longueur maximale
  if (email.length > 254) {
    errors.push('L\'email ne peut pas dépasser 254 caractères');
  }

  // Domaines suspects (optionnel)
  const suspiciousDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && suspiciousDomains.includes(domain)) {
    errors.push('Veuillez utiliser une adresse email permanente');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation du nom/prénom
export const validateName = (name, fieldName = 'nom') => {
  const errors = [];
  
  if (!name || !name.trim()) {
    errors.push(`Le ${fieldName} est requis`);
    return { isValid: false, errors };
  }

  const trimmedName = name.trim();

  // Longueur minimale
  if (trimmedName.length < 2) {
    errors.push(`Le ${fieldName} doit contenir au moins 2 caractères`);
  }

  // Longueur maximale
  if (trimmedName.length > 50) {
    errors.push(`Le ${fieldName} ne peut pas dépasser 50 caractères`);
  }

  // Caractères autorisés (lettres, espaces, tirets, apostrophes)
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmedName)) {
    errors.push(`Le ${fieldName} ne peut contenir que des lettres, espaces, tirets et apostrophes`);
  }

  // Pas que des espaces
  if (!/[a-zA-ZÀ-ÿ]/.test(trimmedName)) {
    errors.push(`Le ${fieldName} doit contenir au moins une lettre`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: trimmedName
  };
};

// Validation du numéro de téléphone
export const validatePhone = (phone) => {
  const errors = [];
  
  if (!phone) {
    // Le téléphone est optionnel dans la plupart des cas
    return { isValid: true, errors };
  }

  // Nettoyage du numéro (suppression des espaces, tirets, etc.)
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');

  // Format français basique
  const frenchPhoneRegex = /^(?:\+33|0)[1-9](?:[0-9]{8})$/;
  if (!frenchPhoneRegex.test(cleanPhone)) {
    errors.push('Format de téléphone invalide (ex: 01 23 45 67 89 ou +33 1 23 45 67 89)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: cleanPhone
  };
};

// Validation d'URL
export const validateUrl = (url, fieldName = 'URL') => {
  const errors = [];
  
  if (!url) {
    // L'URL est optionnelle dans la plupart des cas
    return { isValid: true, errors };
  }

  try {
    new URL(url);
    
    // Vérifier que c'est HTTP ou HTTPS
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      errors.push(`${fieldName} doit commencer par http:// ou https://`);
    }
  } catch {
    errors.push(`${fieldName} invalide`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation de texte libre (description, message, etc.)
export const validateText = (text, fieldName = 'texte', minLength = 0, maxLength = 1000) => {
  const errors = [];
  
  if (minLength > 0 && (!text || !text.trim())) {
    errors.push(`Le ${fieldName} est requis`);
    return { isValid: false, errors };
  }

  if (text) {
    const trimmedText = text.trim();
    
    if (minLength > 0 && trimmedText.length < minLength) {
      errors.push(`Le ${fieldName} doit contenir au moins ${minLength} caractères`);
    }

    if (trimmedText.length > maxLength) {
      errors.push(`Le ${fieldName} ne peut pas dépasser ${maxLength} caractères`);
    }

    // Vérification de contenu suspect (spam, etc.)
    const suspiciousPatterns = [
      /(.)\1{10,}/, // Répétition excessive du même caractère
      /https?:\/\/[^\s]+/gi // URLs multiples (potentiel spam)
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(trimmedText)) {
        errors.push(`Le ${fieldName} contient du contenu suspect`);
        break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: text?.trim()
  };
};

// Validation de confirmation de mot de passe
export const validatePasswordConfirmation = (password, confirmation) => {
  const errors = [];
  
  if (!confirmation) {
    errors.push('La confirmation du mot de passe est requise');
    return { isValid: false, errors };
  }

  if (password !== confirmation) {
    errors.push('Les mots de passe ne correspondent pas');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation d'âge (pour les conditions d'utilisation)
export const validateAge = (birthDate) => {
  const errors = [];
  
  if (!birthDate) {
    errors.push('La date de naissance est requise');
    return { isValid: false, errors };
  }

  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 13) {
    errors.push('Vous devez avoir au moins 13 ans pour créer un compte');
  }

  if (age > 120) {
    errors.push('Date de naissance invalide');
  }

  return {
    isValid: errors.length === 0,
    errors,
    age
  };
};

// Fonction utilitaire pour valider un formulaire complet
export const validateForm = (formData, validationRules) => {
  const errors = {};
  const warnings = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(validationRules)) {
    const value = formData[field];
    let fieldResult = { isValid: true, errors: [], warnings: [] };

    for (const rule of rules) {
      const result = rule(value);
      if (!result.isValid) {
        fieldResult.isValid = false;
        fieldResult.errors.push(...result.errors);
      }
      if (result.warnings) {
        fieldResult.warnings.push(...result.warnings);
      }
    }

    if (!fieldResult.isValid) {
      errors[field] = fieldResult.errors;
      isValid = false;
    }

    if (fieldResult.warnings.length > 0) {
      warnings[field] = fieldResult.warnings;
    }
  }

  return {
    isValid,
    errors,
    warnings
  };
};

// Fonction pour obtenir la couleur de la force du mot de passe
export const getPasswordStrengthColor = (strength) => {
  if (strength < 30) return 'bg-red-500';
  if (strength < 60) return 'bg-yellow-500';
  if (strength < 80) return 'bg-blue-500';
  return 'bg-green-500';
};

// Fonction pour obtenir le texte de la force du mot de passe
export const getPasswordStrengthText = (strength) => {
  if (strength < 30) return 'Faible';
  if (strength < 60) return 'Moyen';
  if (strength < 80) return 'Fort';
  return 'Très fort';
};
