// [EXAM] Sécurité express
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

export const securityMiddlewares = [
  helmet({ 
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false 
  }),
  cors({
    origin: (origin, cb) => {
      // À restreindre avec ENV ALLOWED_ORIGINS en production
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3002', 'http://localhost:3001'];
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
    credentials: false,
  }),
  rateLimit({ 
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // limite à 300 requêtes par fenêtre par IP
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  }),
  mongoSanitize(),
];
