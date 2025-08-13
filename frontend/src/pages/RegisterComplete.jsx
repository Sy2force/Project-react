// [EXAM] Page d'inscription complètement fonctionnelle avec toutes les fonctionnalités
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserPlus, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Shield,
  Phone,
  Building,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const RegisterComplete = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    vipCode: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Validation de la force du mot de passe
  const checkPasswordStrength = (password) => {
    const checks = [
      { test: password.length >= 8, message: 'Au moins 8 caractères' },
      { test: /[a-z]/.test(password), message: 'Une lettre minuscule' },
      { test: /[A-Z]/.test(password), message: 'Une lettre majuscule' },
      { test: /\d/.test(password), message: 'Un chiffre' },
      { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), message: 'Un caractère spécial' }
    ];

    const passedChecks = checks.filter(check => check.test);
    const score = passedChecks.length;
    const feedback = checks.map(check => ({
      ...check,
      passed: check.test
    }));

    return { score, feedback };
  };

  // Validation en temps réel
  const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Nom requis';
        } else if (value.trim().length < 2) {
          errors.name = 'Nom trop court (minimum 2 caractères)';
        }
        break;
        
      case 'email':
        if (!value) {
          errors.email = 'Email requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Format d\'email invalide';
        }
        break;
        
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)]{10,}$/.test(value)) {
          errors.phone = 'Format de téléphone invalide';
        }
        break;
        
      case 'password':
        if (!value) {
          errors.password = 'Mot de passe requis';
        } else {
          const strength = checkPasswordStrength(value);
          setPasswordStrength(strength);
          if (strength.score < 3) {
            errors.password = 'Mot de passe trop faible';
          }
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Confirmation requise';
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        break;
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
    const nameErrors = validateField('name', formData.name);
    const emailErrors = validateField('email', formData.email);
    const phoneErrors = validateField('phone', formData.phone);
    const passwordErrors = validateField('password', formData.password);
    const confirmPasswordErrors = validateField('confirmPassword', formData.confirmPassword);
    
    const allErrors = { 
      ...nameErrors, 
      ...emailErrors, 
      ...phoneErrors, 
      ...passwordErrors, 
      ...confirmPasswordErrors 
    };

    if (!acceptTerms) {
      allErrors.terms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    setFormErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Préparer les données d'inscription
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        vipCode: formData.vipCode.trim() || undefined,
        acceptNewsletter
      };

      // Appel au service d'authentification
      const result = await authService.register(userData);
      
      if (result.success) {
        setSuccess('Inscription réussie ! Connexion automatique...');
        
        // Connexion automatique après inscription
        await login(formData.email, formData.password, {
          token: result.token,
          user: result.user
        });
        
        // Redirection après succès
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        
      } else {
        setError(result.message || 'Erreur lors de l\'inscription');
        if (result.errors && result.errors.length > 0) {
          const backendErrors = {};
          result.errors.forEach(err => {
            if (err.includes('email')) backendErrors.email = err;
            if (err.includes('password')) backendErrors.password = err;
            if (err.includes('name')) backendErrors.name = err;
          });
          setFormErrors(prev => ({ ...prev, ...backendErrors }));
        }
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = (score) => {
    if (score < 2) return 'text-red-400';
    if (score < 4) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getPasswordStrengthText = (score) => {
    if (score < 2) return 'Faible';
    if (score < 4) return 'Moyen';
    return 'Fort';
  };

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
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
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
        className="max-w-lg w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl shadow-2xl relative">
              <span className="relative z-10">S.A</span>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/50 to-blue-500/50 rounded-2xl blur-xl"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Créer un compte
          </h1>
          <p className="text-gray-300">Rejoignez la communauté Shay Acoca</p>
          
          {/* Indicateur de sécurité */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Inscription sécurisée</span>
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

        {/* Formulaire d'inscription */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" glow className="p-8 backdrop-blur-xl bg-white/5 border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom complet */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet"
                  variant="glass"
                  icon={<User size={18} />}
                  error={formErrors.name}
                  required
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email *
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

              {/* Téléphone (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Téléphone (optionnel)
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+33 1 23 45 67 89"
                  variant="glass"
                  icon={<Phone size={18} />}
                  error={formErrors.phone}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>

              {/* Entreprise (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Entreprise (optionnel)
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Nom de votre entreprise"
                  variant="glass"
                  icon={<Building size={18} />}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe *
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
                
                {/* Indicateur de force du mot de passe */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Force du mot de passe</span>
                      <span className={`text-xs font-medium ${getPasswordStrengthColor(passwordStrength.score)}`}>
                        {getPasswordStrengthText(passwordStrength.score)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          passwordStrength.score < 2 ? 'bg-red-500' :
                          passwordStrength.score < 4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="space-y-1">
                      {passwordStrength.feedback.map((check, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          {check.passed ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <X className="w-3 h-3 text-gray-500" />
                          )}
                          <span className={`text-xs ${check.passed ? 'text-green-400' : 'text-gray-500'}`}>
                            {check.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmer le mot de passe *
                </label>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmez votre mot de passe"
                  variant="glass"
                  icon={<Lock size={18} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-white transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  error={formErrors.confirmPassword}
                  required
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>

              {/* Code VIP (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Code VIP (optionnel)
                </label>
                <Input
                  type="text"
                  name="vipCode"
                  value={formData.vipCode}
                  onChange={handleInputChange}
                  placeholder="Code d'accès VIP"
                  variant="glass"
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Entrez un code VIP pour accéder aux fonctionnalités premium
                </p>
              </div>

              {/* Cases à cocher */}
              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2 mt-0.5"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-300">
                    J'accepte les{' '}
                    <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                      conditions d'utilisation
                    </Link>
                    {' '}et la{' '}
                    <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                      politique de confidentialité
                    </Link>
                    {' *'}
                  </span>
                </label>
                {formErrors.terms && (
                  <p className="text-red-400 text-xs ml-7">{formErrors.terms}</p>
                )}

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptNewsletter}
                    onChange={(e) => setAcceptNewsletter(e.target.checked)}
                    className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2 mt-0.5"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-300">
                    Je souhaite recevoir les actualités et offres spéciales par email
                  </span>
                </label>
              </div>

              {/* Bouton d'inscription */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:opacity-50"
                loading={isLoading}
                disabled={isLoading || !acceptTerms}
                icon={isLoading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
              >
                {isLoading ? 'Création du compte...' : 'Créer mon compte'}
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-6"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm">
            Vous avez déjà un compte ?{' '}
            <Link 
              to="/login" 
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Se connecter
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

export default RegisterComplete;
