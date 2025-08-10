import rateLimit from 'express-rate-limit';

// Rate limit pour les routes d'authentification
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives par IP
  message: {
    error: 'Trop de tentatives de connexion, réessayez dans 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit pour les routes de création/modification
export const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requêtes par minute
  message: {
    error: 'Trop de requêtes, ralentissez un peu'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit général pour l'API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par IP
  message: {
    error: 'Limite de requêtes atteinte, réessayez plus tard'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
