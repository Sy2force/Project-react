// LoginUltraModern.jsx - Page de connexion ultra-moderne avec glassmorphism
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Loader2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle,
  Github,
  Fingerprint,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Composants internes
import LoginLayout from '../components/auth/LoginLayout.jsx';
import BrandMark from '../components/auth/BrandMark.jsx';
import FormField from '../components/auth/FormField.jsx';
import PasswordInput from '../components/auth/PasswordInput.jsx';
import SocialButton from '../components/auth/SocialButton.jsx';
import LegalLinks from '../components/auth/LegalLinks.jsx';

// Services
import { useAuth } from '../context/AuthContext.jsx';

// Icône Google personnalisée
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Icône LinkedIn personnalisée
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LoginUltraModern = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, user } = useAuth();

  // États du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // États UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requires2FA, setRequires2FA] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  // Validation
  const [fieldErrors, setFieldErrors] = useState({});

  // Redirection si déjà connecté
  useEffect(() => {
    if (user) {
      const nextUrl = searchParams.get('next') || '/dashboard';
      navigate(nextUrl, { replace: true });
    }
  }, [user, navigate, searchParams]);

  // Validation email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'L\'adresse email est requise';
    if (!emailRegex.test(email)) return 'Format d\'email invalide';
    return null;
  };

  // Validation mot de passe
  const validatePassword = (password) => {
    if (!password) return 'Le mot de passe est requis';
    if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    return null;
  };

  // Gestion des changements de champs
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validation en temps réel
    let error = null;
    if (field === 'email') {
      error = validateEmail(value);
    } else if (field === 'password') {
      error = validatePassword(value);
    }
    
    setFieldErrors(prev => ({ ...prev, [field]: error }));
    
    // Effacer l'erreur globale si l'utilisateur tape
    if (error === null && fieldErrors[field]) {
      setError(null);
    }
  };

  // Soumission du formulaire principal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation complète
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError || passwordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError
      });
      setLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          remember: formData.remember
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }

      if (data.requires2FA) {
        setRequires2FA(true);
        toast.success('Code de vérification envoyé');
      } else {
        // Connexion réussie
        await login(data.token, data.user);
        toast.success('Connexion réussie !');
        
        const nextUrl = searchParams.get('next') || '/dashboard';
        navigate(nextUrl, { replace: true });
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Erreur de connexion. Veuillez réessayer.');
      toast.error('Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  // Gestion OAuth
  const handleOAuth = (provider) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    window.location.href = `${API_URL}/api/auth/${provider}`;
  };

  // Gestion 2FA
  const handle2FASubmit = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Veuillez saisir le code à 6 chiffres');
      return;
    }

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/auth/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Code invalide');
      }

      await login(data.token, data.user);
      toast.success('Connexion réussie !');
      
      const nextUrl = searchParams.get('next') || '/dashboard';
      navigate(nextUrl, { replace: true });
    } catch (err) {
      setError(err.message || 'Code de vérification invalide');
      toast.error('Code invalide');
    } finally {
      setLoading(false);
    }
  };

  // Gestion OTP
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Comptes de démonstration
  const demoAccounts = [
    { label: 'Admin', email: 'admin@shayacoca.com', password: 'admin123' },
    { label: 'Business', email: 'business@shayacoca.com', password: 'business123' },
    { label: 'Utilisateur', email: 'user@shayacoca.com', password: 'user123' }
  ];

  const fillDemoAccount = (account) => {
    setFormData({
      email: account.email,
      password: account.password,
      remember: false
    });
    setFieldErrors({});
    setError(null);
  };

  return (
    <LoginLayout>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 110, damping: 14 }}
        className="space-y-8"
      >
        {/* Brand Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BrandMark size="large" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-wide">
              Connexion Sécurisée
            </h1>
            <p className="text-slate-200/80">
              Accédez à votre espace personnel
            </p>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-400/20">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">
                Connexion SSL protégée
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 md:p-7 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.45)]"
        >
          {/* Erreur globale */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-400/30 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-rose-300">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formulaire 2FA */}
          <AnimatePresence>
            {requires2FA && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-semibold text-white">
                    Authentification à deux facteurs
                  </h2>
                  <p className="text-slate-300 text-sm">
                    Saisissez le code à 6 chiffres envoyé sur votre appareil
                  </p>
                </div>

                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-xl font-semibold rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/30"
                    />
                  ))}
                </div>

                <button
                  onClick={handle2FASubmit}
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Vérifier le code'
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formulaire principal */}
          <AnimatePresence>
            {!requires2FA && (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <FormField
                  label="Adresse email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  error={fieldErrors.email}
                  icon={Mail}
                  required
                  disabled={loading}
                />

                <PasswordInput
                  label="Mot de passe"
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  error={fieldErrors.password}
                  required
                  disabled={loading}
                />

                {/* Options */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) => handleFieldChange('remember', e.target.checked)}
                      className="rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-white/60 focus:ring-offset-0"
                    />
                    <span className="text-slate-300">Se souvenir de moi</span>
                  </label>
                  
                  <Link
                    to="/forgot-password"
                    className="text-indigo-300 hover:text-indigo-200 transition-colors duration-200"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Bouton principal */}
                <button
                  type="submit"
                  disabled={loading || fieldErrors.email || fieldErrors.password}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Se connecter'
                  )}
                </button>

                {/* Séparateur */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/5 text-slate-400 rounded-full">
                      ou continuer avec
                    </span>
                  </div>
                </div>

                {/* Boutons sociaux */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <SocialButton
                    provider="google"
                    onClick={() => handleOAuth('google')}
                    icon={GoogleIcon}
                    disabled={loading}
                  />
                  <SocialButton
                    provider="github"
                    onClick={() => handleOAuth('github')}
                    icon={Github}
                    disabled={loading}
                  />
                  <SocialButton
                    provider="linkedin"
                    onClick={() => handleOAuth('linkedin')}
                    icon={LinkedInIcon}
                    disabled={loading}
                  />
                </div>

                {/* Passkey */}
                <SocialButton
                  onClick={() => toast.info('Passkey non disponible pour le moment')}
                  icon={Fingerprint}
                  disabled={loading}
                >
                  Utiliser une Passkey
                </SocialButton>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Comptes de démonstration */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full flex items-center justify-between text-sm text-slate-300 hover:text-white transition-colors duration-200"
            >
              <span>Comptes de démonstration</span>
              {showDemoAccounts ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence>
              {showDemoAccounts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-2"
                >
                  {demoAccounts.map((account) => (
                    <button
                      key={account.label}
                      onClick={() => fillDemoAccount(account)}
                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 text-sm"
                    >
                      <div className="font-medium text-white">{account.label}</div>
                      <div className="text-slate-400">{account.email} / {account.password}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-sm">
            Pas encore de compte ?{' '}
            <Link
              to="/register"
              className="text-indigo-300 hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              Créer un compte
            </Link>
          </p>

          <LegalLinks />

          <div className="text-xs text-slate-500">
            v1.0.0 • FR/Europe
          </div>
        </div>
      </motion.div>
    </LoginLayout>
  );
};

export default LoginUltraModern;
