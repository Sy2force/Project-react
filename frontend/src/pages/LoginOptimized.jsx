// [EXAM] Page de connexion optimisée avec design moderne et fonctionnalités complètes
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { 
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader,
  Github,
  Chrome,
  Fingerprint,
  Smartphone,
  Key,
  UserPlus,
  ArrowLeft
} from 'lucide-react';

const LoginOptimized = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [showBiometric, setShowBiometric] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Simuler la détection de biométrie
  useEffect(() => {
    if (navigator.credentials && window.PublicKeyCredential) {
      setShowBiometric(true);
    }
  }, []);

  // Gestion du blocage temporaire
  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeRemaining]);

  // Validation en temps réel
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'L\'email est requis';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Format d\'email invalide';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Le mot de passe est requis';
        } else if (value.length < 6) {
          newErrors.password = 'Minimum 6 caractères';
        } else {
          delete newErrors.password;
        }
        
        // Calcul de la force du mot de passe
        let strength = 0;
        if (value.length >= 6) strength += 25;
        if (value.match(/[a-z]/)) strength += 25;
        if (value.match(/[A-Z]/)) strength += 25;
        if (value.match(/[0-9]/)) strength += 25;
        setPasswordStrength(strength);
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    if (name !== 'rememberMe') {
      validateField(name, fieldValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      return;
    }

    // Validation finale
    validateField('email', formData.email);
    validateField('password', formData.password);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Simuler l'authentification
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simuler échec pour démonstration (remplacer par vraie logique)
      if (formData.email === 'demo@fail.com') {
        throw new Error('Identifiants incorrects');
      }

      // Succès - redirection
      navigate(from, { replace: true });
      
    } catch (error) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsBlocked(true);
        setBlockTimeRemaining(300); // 5 minutes
        setErrors({ 
          general: 'Trop de tentatives échouées. Compte bloqué temporairement.' 
        });
      } else {
        setErrors({ 
          general: `Identifiants incorrects. ${3 - newAttempts} tentative(s) restante(s).` 
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      setIsLoading(true);
      
      // Simuler l'authentification biométrique
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ general: 'Authentification biométrique échouée' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Logique de connexion sociale
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1500);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Faible';
    if (passwordStrength < 50) return 'Moyen';
    if (passwordStrength < 75) return 'Bon';
    return 'Excellent';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Helmet>
        <title>Connexion - Shay Acoca Portfolio</title>
        <meta name="description" content="Connectez-vous à votre espace personnel pour accéder à tous les services." />
      </Helmet>

      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md">
        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Retour à l'accueil</span>
          </Link>
        </motion.div>

        {/* Carte principale */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg"
            >
              S.A
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Bon retour !
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300"
            >
              Connectez-vous pour accéder à votre espace
            </motion.p>
          </div>

          {/* Alerte de blocage */}
          {isBlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3"
            >
              <Shield className="text-red-400 flex-shrink-0" size={20} />
              <div className="text-red-300 text-sm">
                <div className="font-medium">Compte temporairement bloqué</div>
                <div>Déblocage dans : {formatTime(blockTimeRemaining)}</div>
              </div>
            </motion.div>
          )}

          {/* Erreur générale */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3"
            >
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <div className="text-red-300 text-sm">{errors.general}</div>
            </motion.div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-white font-medium mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isBlocked}
                  className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50'
                  }`}
                  placeholder="votre@email.com"
                />
                {formData.email && !errors.email && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" size={20} />
                )}
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-red-400 text-sm flex items-center space-x-1"
                >
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </motion.p>
              )}
            </motion.div>

            {/* Mot de passe */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-white font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isBlocked}
                  className={`w-full pl-12 pr-12 py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Indicateur de force du mot de passe */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Force du mot de passe</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength < 50 ? 'text-red-400' : 
                      passwordStrength < 75 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength}%` }}
                      transition={{ duration: 0.3 }}
                      className={`h-2 rounded-full transition-colors duration-300 ${getPasswordStrengthColor()}`}
                    />
                  </div>
                </motion.div>
              )}

              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-red-400 text-sm flex items-center space-x-1"
                >
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </motion.p>
              )}
            </motion.div>

            {/* Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                />
                <span className="text-gray-300 text-sm">Se souvenir de moi</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-300"
              >
                Mot de passe oublié ?
              </Link>
            </motion.div>

            {/* Bouton de connexion */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              type="submit"
              disabled={isLoading || isBlocked || Object.keys(errors).length > 0}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Se connecter</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Séparateur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="my-8 flex items-center"
          >
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">ou</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </motion.div>

          {/* Authentification alternative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            {/* Biométrie */}
            {showBiometric && (
              <button
                onClick={handleBiometricLogin}
                disabled={isLoading || isBlocked}
                className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Fingerprint size={20} />
                <span>Authentification biométrique</span>
              </button>
            )}

            {/* Connexions sociales */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading || isBlocked}
                className="py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Chrome size={18} />
                <span>Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading || isBlocked}
                className="py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Github size={18} />
                <span>GitHub</span>
              </button>
            </div>
          </motion.div>

          {/* Lien d'inscription */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-300">
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 inline-flex items-center space-x-1"
              >
                <span>Créer un compte</span>
                <UserPlus size={16} />
              </Link>
            </p>
          </motion.div>

          {/* Informations de sécurité */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <Shield className="text-blue-400 flex-shrink-0 mt-0.5" size={16} />
              <div className="text-blue-300 text-xs">
                <div className="font-medium mb-1">Connexion sécurisée</div>
                <div>Vos données sont protégées par un chiffrement SSL 256-bit et une authentification à deux facteurs.</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>© 2024 Shay Acoca. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Conditions
            </Link>
            <Link to="/support" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginOptimized;
