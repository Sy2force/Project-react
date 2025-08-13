// [EXAM] Validation Zod pour l'authentification
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nom minimum 2 caractères"),
  role: z.enum(['user', 'business', 'admin']).optional().default('user'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token requis"),
});

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid payload", 
          details: parsed.error.errors 
        });
      }
      req.validatedData = parsed.data;
      next();
    } catch (error) {
      return res.status(400).json({ error: "Validation error" });
    }
  };
};
