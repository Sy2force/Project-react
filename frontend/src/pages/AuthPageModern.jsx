import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  GlassCard,
  GlassButton,
  GlassInput,
  FrameGlow
} from '../components/glass';

/**
 * AuthPageModern - Page d'authentification moderne avec Glass Kit
 */
const AuthPageModern = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, loading } = useAuth();
  
  const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = mode === 'login' ? 'Connexion - Shay Acoca' : 'Inscription - Shay Acoca';
  }, [mode]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (mode === 'register' && !formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    
    if (mode === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmez le mot de passe';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message || 'Une erreur est survenue' });
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen page-bg overflow-hidden">
      {/* Particules de fond */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="focus-visible"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </GlassButton>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <span className="text-white font-medium">Shay Acoca</span>
            </div>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FrameGlow color="primary" intensity="medium" animated={true}>
                <GlassCard size="lg">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h1 className="text-2xl font-bold text-white mb-2 line-clamp-1">
                      {mode === 'login' ? 'Bon Retour !' : 'Rejoignez-nous'}
                    </h1>
                    <p className="text-white/70 line-clamp-2 break-words">
                      {mode === 'login' 
                        ? 'Connectez-vous pour accéder à votre espace personnel'
                        : 'Créez votre compte pour commencer l\'aventure digitale'
                      }
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {mode === 'register' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <GlassInput
                            label="Nom complet"
                            type="text"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleChange('name')}
                            error={!!errors.name}
                            errorMessage={errors.name}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <GlassInput
                      label="Email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange('email')}
                      error={!!errors.email}
                      errorMessage={errors.email}
                    />

                    <div className="relative">
                      <GlassInput
                        label="Mot de passe"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange('password')}
                        error={!!errors.password}
                        errorMessage={errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-white/50 hover:text-white transition-colors focus-visible"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {mode === 'register' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <GlassInput
                            label="Confirmer le mot de passe"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            error={!!errors.confirmPassword}
                            errorMessage={errors.confirmPassword}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {errors.submit && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-danger/20 border border-danger/30"
                      >
                        <p className="text-danger text-sm text-center">{errors.submit}</p>
                      </motion.div>
                    )}

                    <GlassButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      className="w-full focus-visible"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          {mode === 'login' ? 'Connexion...' : 'Inscription...'}
                        </div>
                      ) : (
                        <>
                          {mode === 'login' ? <Mail className="w-5 h-5 mr-2" /> : <User className="w-5 h-5 mr-2" />}
                          {mode === 'login' ? 'Se Connecter' : 'Créer mon Compte'}
                        </>
                      )}
                    </GlassButton>
                  </form>

                  {/* Toggle Mode */}
                  <div className="mt-6 text-center">
                    <p className="text-white/60 mb-3">
                      {mode === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
                    </p>
                    <GlassButton
                      variant="ghost"
                      onClick={toggleMode}
                      disabled={loading}
                      className="focus-visible"
                    >
                      {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
                    </GlassButton>
                  </div>
                </GlassCard>
              </FrameGlow>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-white/40 text-sm">
              © 2024 Shay Acoca. Tous droits réservés.
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default AuthPageModern;
