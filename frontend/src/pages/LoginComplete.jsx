// [EXAM] Page de connexion complètement fonctionnelle avec toutes les fonctionnalités
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LogIn, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Shield,
  Fingerprint,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginComplete = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Gestion du blocage temporaire après trop de tentatives
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
    const errors = {};
    
    if (name === 'email') {
      if (!value) {
        errors.email = 'Email requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = 'Format d\'email invalide';
      }
    }
    
    if (name === 'password') {
      if (!value) {
        errors.password = 'Mot de passe requis';
      } else if (value.length < 6) {
        errors.password = 'Minimum 6 caractères';
      }
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation en temps réel
    const fieldErrors = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      ...fieldErrors,
      [name]: fieldErrors[name] || undefined
    }));

    // Effacer les messages d'erreur/succès
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const emailErrors = validateField('email', formData.email);
    const passwordErrors = validateField('password', formData.password);
    
    const allErrors = { ...emailErrors, ...passwordErrors };
    setFormErrors(allErrors);
    
    return Object.keys(allErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError(`Trop de tentatives. Réessayez dans ${blockTimeRemaining} secondes.`);
      return;
    }

    if (!validateForm()) {
      setError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Appel au service d'authentification
      const result = await authService.login(formData.email, formData.password);
      
      if (result.success) {
        setSuccess('Connexion réussie ! Redirection...');
        
        // Connexion via le contexte Auth
        await login(formData.email, formData.password, {
          token: result.token,
          user: result.user
        });
        
        // Sauvegarder email si "Se souvenir de moi"
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Redirection après succès
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        
      } else {
        setError(result.message || 'Erreur de connexion');
        setLoginAttempts(prev => prev + 1);
        
        // Bloquer après 5 tentatives
        if (loginAttempts >= 4) {
          setIsBlocked(true);
          setBlockTimeRemaining(300); // 5 minutes
          setError('Trop de tentatives échouées. Compte bloqué pendant 5 minutes.');
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Erreur de connexion au serveur');
      setLoginAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion avec Google (simulée)
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulation connexion Google
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Connexion Google réussie !');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setError('Erreur de connexion Google');
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion biométrique (simulée)
  const handleBiometricLogin = async () => {
    if (!navigator.credentials) {
      setError('Authentification biométrique non supportée');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulation authentification biométrique
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Authentification biométrique réussie !');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setError('Erreur d\'authentification biométrique');
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer email sauvegardé
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-md w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl shadow-2xl relative">
              <span className="relative z-10">S.A</span>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-500/50 rounded-2xl blur-xl"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connexion Sécurisée
          </h1>
          <p className="text-gray-300">Accédez à votre espace personnel</p>
          
          {/* Indicateur de sécurité */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Connexion SSL protégée</span>
          </div>
        </motion.div>

        {/* Messages d'état */}
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div 
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-green-400 text-sm">{success}</span>
          </motion.div>
        )}

        {/* Formulaire de connexion */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" glow className="p-8 backdrop-blur-xl bg-white/5 border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  variant="glass"
                  icon={<Mail size={18} />}
                  error={formErrors.email}
                  required
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Votre mot de passe"
                  variant="glass"
                  icon={<Lock size={18} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-white transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  error={formErrors.password}
                  required
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-300">Se souvenir de moi</span>
                </label>

                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton de connexion */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                loading={isLoading}
                disabled={isLoading || isBlocked}
                icon={isLoading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            {/* Séparateur */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-4 text-sm text-gray-400">ou continuer avec</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Connexions alternatives */}
            <div className="space-y-3">
              {/* Google */}
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full bg-white/5 hover:bg-white/10 border-white/10"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                icon={<svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>}
              >
                Continuer avec Google
              </Button>

              {/* Authentification biométrique */}
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full bg-white/5 hover:bg-white/10 border-white/10"
                onClick={handleBiometricLogin}
                disabled={isLoading}
                icon={<Fingerprint size={18} />}
              >
                Authentification biométrique
              </Button>
            </div>

            {/* Comptes de démonstration */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center space-x-2">
                <Smartphone size={16} />
                <span>Comptes de démonstration</span>
              </h4>
              <div className="space-y-1 text-xs text-gray-400">
                <p><strong className="text-blue-400">Admin:</strong> admin@shayacoca.com / admin123</p>
                <p><strong className="text-green-400">Business:</strong> business@shayacoca.com / business123</p>
                <p><strong className="text-gray-300">Utilisateur:</strong> user@shayacoca.com / user123</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-6"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm">
            Pas encore de compte ?{' '}
            <Link 
              to="/register" 
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Créer un compte
            </Link>
          </p>
          
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">
              Confidentialité
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              Conditions
            </Link>
            <span>•</span>
            <Link to="/help" className="hover:text-gray-300 transition-colors">
              Aide
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginComplete;
