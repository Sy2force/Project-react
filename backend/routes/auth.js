import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

// Initialize router
const router = express.Router();

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

// Rate limit configuration
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired, please log in again' });
    }
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Helper to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { sub: userId, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Helper to get public user data
const toPublic = (user) => ({
  id: user._id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt
});



// POST /api/auth/register - Simplified for unlimited account creation
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Registration request received:', req.body);

    const { fullName, name, email, password, role } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Use either fullName or name for the user's name
    const userName = fullName || name || 'User';

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'This email is already registered' });
    }

    // Simple role assignment - default to 'user'
    const finalRole = role || 'user';

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      fullName: userName.trim(),
      email: email.toLowerCase(),
      passwordHash,
      role: finalRole,
      marketing: false
    });

    await user.save();
    console.log('✅ User created successfully:', user.email);

    // Generate JWT token
    const token = generateToken(user._id, user.role);
    const userPublic = toPublic(user);

    // Set HTTP-only cookie
    res.cookie('accessToken', token, COOKIE_OPTIONS);

    // Return success with user data
    res.status(201).json({ 
      ok: true, 
      message: 'Account created successfully',
      user: userPublic 
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: 'Error creating account' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    const { email, password, remember } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Development fallback authentication for testing
    console.log('Checking demo credentials...');
    
    // Admin account
    if (email === 'shayacoca20@gmail.com' && password === 'Qwerty2121@') {
      const adminUser = {
        _id: '507f1f77bcf86cd799439011',
        email: 'shayacoca20@gmail.com',
        role: 'admin',
        fullName: 'Shay Acoca',
        createdAt: new Date()
      };
      
      const token = generateToken(adminUser._id, adminUser.role);
      res.cookie('accessToken', token, COOKIE_OPTIONS);
      
      console.log('Admin login successful');
      return res.json({
        ok: true,
        message: 'Login successful',
        user: toPublic(adminUser)
      });
    }
    
    // Demo accounts
    const demoUsers = {
      'user@example.com': { role: 'user', name: 'Demo User' },
      'business@example.com': { role: 'business', name: 'Demo Business' },
      'admin@example.com': { role: 'admin', name: 'Demo Admin' },
      'demo@futuresaas.com': { role: 'user', name: 'Demo User' }
    };
    
    if (demoUsers[email] && (password === 'password123' || password === 'demo123')) {
      const demoUser = {
        _id: '507f1f77bcf86cd799439012',
        email: email,
        role: demoUsers[email].role,
        fullName: demoUsers[email].name,
        createdAt: new Date()
      };
      
      const token = generateToken(demoUser._id, demoUser.role);
      res.cookie('accessToken', token, COOKIE_OPTIONS);
      
      console.log('Demo login successful for:', email);
      return res.json({
        ok: true,
        message: 'Login successful',
        user: toPublic(demoUser)
      });
    }

    console.log('Looking for user:', email.toLowerCase());
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ User found:', user.email);
    console.log('🔐 Checking password...');
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ Password valid for user:', email);

    // Generate JWT token
    const token = generateToken(user._id, user.role);
    const userPublic = toPublic(user);

    // Set HTTP-only cookie
    res.cookie('accessToken', token, {
      ...COOKIE_OPTIONS,
      maxAge: remember ? 1000 * 60 * 60 * 24 * 7 : undefined // 7 days if remember me
    });

    res.json({
      ok: true,
      message: 'Login successful',
      user: userPublic
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      ok: true,
      user: toPublic(user)
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const token = generateToken(user._id, user.role);
    res.json({ token });
  } catch (error) {
    console.error('Erreur refresh token:', error);
    res.status(500).json({ message: 'Erreur lors du rafraîchissement du token' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      // Ne pas révéler si l'email existe ou non
      return res.json({ message: 'Si cet email existe, un lien de réinitialisation a été envoyé' });
    }

    // TODO: Implémenter l'envoi d'email avec token de réinitialisation
    // Pour l'instant, on simule juste la réponse
    res.json({ message: 'Un lien de réinitialisation a été envoyé à votre email' });
  } catch (error) {
    console.error('Erreur forgot password:', error);
    res.status(500).json({ message: 'Erreur lors de la demande de réinitialisation' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // TODO: Vérifier le token de réinitialisation
    // Pour l'instant, on simule juste la réponse
    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur reset password:', error);
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  try {
    // Clear the access token cookie
    res.clearCookie('accessToken', {
      ...COOKIE_OPTIONS,
      maxAge: 0 // Expire immediately
    });
    
    res.json({ 
      ok: true,
      message: 'Logout successful' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
});

export default router;
