// [EXAM] Route refresh token
import { Router } from "express";
import jwt from "jsonwebtoken";
import { validateRequest, refreshTokenSchema } from "../validators/auth.exam.js";

const router = Router();

router.post("/refresh", validateRequest(refreshTokenSchema), async (req, res) => {
  try {
    const { refreshToken } = req.validatedData;
    
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token" });
    }

    // Vérifier le refresh token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "refresh_secret_key");
    
    // Générer un nouveau access token
    const accessToken = jwt.sign(
      { 
        sub: payload.sub, 
        email: payload.email,
        name: payload.name,
        roles: payload.roles || ['user']
      },
      process.env.JWT_SECRET || "secret_key", 
      { expiresIn: "15m" }
    );

    return res.json({ 
      accessToken,
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        roles: payload.roles || ['user']
      }
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});

export default router;
