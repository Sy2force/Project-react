// Login.jsx - Page de connexion ultra-moderne avec glassmorphism
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  ShieldCheck, 
  Loader2, 
  AlertTriangle,
  Github,
  Linkedin,
  Chrome,
  Fingerprint
} from 'lucide-react';
import toast from 'react-hot-toast';

// Components
import BrandMark from '../components/auth/BrandMark';
import FormField from '../components/auth/FormField';
import PasswordInput from '../components/auth/PasswordInput';
import SocialButton from '../components/auth/SocialButton';
import LegalLinks from '../components/auth/LegalLinks';

// Services
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // États du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  // États UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [requires2FA, setRequires2FA] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  // Vérification WebAuthn
  const [supportsWebAuthn, setSupportsWebAuthn] = useState(false);
  
  useEffect(() => {
    setSupportsWebAuthn(
      window.PublicKeyCredential && 
      typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function'
    );
  }, []);
  
  // Cooldown pour renvoyer le code 2FA
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);
  
  // Validation email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Gestion des changements de formulaire
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  // Soumission du formulaire principal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
        remember: formData.remember
      });
      
      if (response.data.requires2FA) {
        setRequires2FA(true);
        setSessionId(response.data.sessionId);
        toast.success('Code de vérification envoyé !');
      } else {
        toast.success('Connexion réussie !');
        const redirectTo = new URLSearchParams(location.search).get('next') || '/dashboard';
        navigate(redirectTo);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Identifiants invalides';
      setErrors({ general: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  
  // Gestion OTP 2FA
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  // Gestion backspace OTP
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  
  // Vérification code 2FA
  const handleVerify2FA = async (e) => {
    e.preventDefault();
    const code = otpCode.join('');
    
    if (code.length !== 6) {
      toast.error('Veuillez saisir le code à 6 chiffres');
      return;
    }
    
    setLoading(true);
    
    try {
      await api.post('/auth/2fa/verify', {
        code,
        sessionId
      });
      
      toast.success('Authentification réussie !');
      const redirectTo = new URLSearchParams(location.search).get('next') || '/dashboard';
      navigate(redirectTo);
    } catch (error) {
      const message = error.response?.data?.message || 'Code invalide';
      toast.error(message);
      setOtpCode(['', '', '', '', '', '']);
      document.getElementById('otp-0')?.focus();
    } finally {
      setLoading(false);
    }
  };
  
  // Renvoyer le code 2FA
  const handleResendCode = async () => {
    try {
      await api.post('/auth/2fa/resend', { sessionId });
      toast.success('Nouveau code envoyé !');
      setResendCooldown(45);
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du code');
    }
  };
  
  // OAuth Social Login
  const handleSocialLogin = (provider) => {
    window.location.href = `${api.defaults.baseURL}/auth/${provider}`;
  };
  
  // WebAuthn Passkey
  const handlePasskeyLogin = async () => {
    if (!supportsWebAuthn) {
      toast.error('Les Passkeys ne sont pas supportées sur ce navigateur');
      return;
    }
    
    try {
      setLoading(true);
      const optionsResponse = await api.get('/webauthn/login/options');
      
      const credential = await navigator.credentials.get({
        publicKey: optionsResponse.data
      });
      
      await api.post('/webauthn/login/verify', {
        credential: {
          id: credential.id,
          rawId: Array.from(new Uint8Array(credential.rawId)),
          response: {
            authenticatorData: Array.from(new Uint8Array(credential.response.authenticatorData)),
            clientDataJSON: Array.from(new Uint8Array(credential.response.clientDataJSON)),
            signature: Array.from(new Uint8Array(credential.response.signature)),
            userHandle: credential.response.userHandle ? Array.from(new Uint8Array(credential.response.userHandle)) : null
          },
          type: credential.type
        }
      });
      
      toast.success('Connexion par Passkey réussie !');
      const redirectTo = new URLSearchParams(location.search).get('next') || '/dashboard';
      navigate(redirectTo);
    } catch (error) {
      toast.error('Échec de l\'authentification par Passkey');
    } finally {
      setLoading(false);
    }
  };
  
  // Remplissage rapide comptes de démo
  const fillDemoAccount = (type) => {
    const accounts = {
      admin: { email: 'admin@shayacoca.com', password: 'admin123' },
      business: { email: 'business@shayacoca.com', password: 'business123' },
      user: { email: 'user@shayacoca.com', password: 'user123' }
    };
    
    const account = accounts[type];
    if (account) {
      setFormData(prev => ({ ...prev, ...account }));
      toast.success(`Compte ${type} pré-rempli`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 relative overflow-hidden">
      {/* Particules animées */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-slate-900/50" />
      
      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* En-tête avec branding */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6 mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <BrandMark initials="S.A" size="large" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              <h1 className="text-5xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                🚀 CONNEXION ULTRA-MODERNE 🚀
              </h1>
              <p className="text-lg text-slate-200/90 font-light">
                Accédez à votre espace personnel
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/15 border border-green-400/30 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <ShieldCheck className="w-5 h-5 text-green-300" />
              </motion.div>
              <span className="text-sm text-green-300 font-medium">
                Connexion SSL protégée
              </span>
            </motion.div>
          </motion.div>

          {/* Carte principale */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_70px_-10px_rgba(0,0,0,0.6)] transition-all duration-500"
          >
            <AnimatePresence mode="wait">
              {!requires2FA ? (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, staggerChildren: 0.1 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Erreur générale */}
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="flex items-center gap-3 text-sm text-rose-300 bg-rose-500/15 border border-rose-400/30 rounded-xl px-4 py-3 backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                      <span className="font-medium">{errors.general}</span>
                    </motion.div>
                  )}

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <FormField
                      id="email"
                      label="Adresse email"
                      type="email"
                      icon={Mail}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      autoComplete="email"
                      placeholder="votre@email.com"
                      error={errors.email}
                      required
                    />
                  </motion.div>

                  {/* Mot de passe */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <PasswordInput
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={errors.password}
                    />
                  </motion.div>

                  {/* Options */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-between text-sm py-2"
                  >
                    <motion.label 
                      className="flex items-center gap-3 cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.remember}
                        onChange={(e) => handleInputChange('remember', e.target.checked)}
                        className="rounded-md border-white/30 bg-white/10 text-indigo-500 focus:ring-2 focus:ring-white/60 focus:ring-offset-0 transition-all duration-300 w-4 h-4"
                      />
                      <span className="text-slate-300 group-hover:text-white transition-colors duration-300 font-medium">
                        Se souvenir de moi
                      </span>
                    </motion.label>
                    <motion.a
                      href="/forgot-password"
                      className="text-indigo-300 hover:text-indigo-200 transition-colors duration-300 font-medium hover:underline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Mot de passe oublié ?
                    </motion.a>
                  </motion.div>

                  {/* Bouton de connexion */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ 
                        y: -3, 
                        scale: 1.02,
                        boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600 text-white font-bold py-4 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 text-lg relative overflow-hidden group"
                    >
                      {/* Effet de brillance au hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Connexion...</span>
                        </>
                      ) : (
                        <>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative z-10"
                          >
                            Se connecter
                          </motion.span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            →
                          </motion.div>
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Séparateur */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative py-4"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <motion.div 
                        className="w-full border-t border-white/20"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <motion.span 
                        className="px-6 py-2 bg-white/10 text-slate-300 rounded-full backdrop-blur-sm border border-white/10 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        ou continuer avec
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Boutons sociaux */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, staggerChildren: 0.1 }}
                    className="grid grid-cols-3 gap-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <SocialButton
                        icon={Chrome}
                        label="Google"
                        onClick={() => handleSocialLogin('google')}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <SocialButton
                        icon={Github}
                        label="GitHub"
                        onClick={() => handleSocialLogin('github')}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      <SocialButton
                        icon={Linkedin}
                        label="LinkedIn"
                        onClick={() => handleSocialLogin('linkedin')}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Passkey */}
                  {supportsWebAuthn && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      <motion.button
                        type="button"
                        onClick={handlePasskeyLogin}
                        whileHover={{ 
                          y: -2, 
                          scale: 1.02,
                          boxShadow: "0 10px 30px -5px rgba(168, 85, 247, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-xl border border-white/20 bg-white/8 hover:bg-white/15 text-white py-4 transition-all duration-300 flex items-center justify-center gap-3 font-medium backdrop-blur-sm group"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                        >
                          <Fingerprint className="w-6 h-6 text-violet-300 group-hover:text-violet-200" />
                        </motion.div>
                        <span className="group-hover:text-violet-100 transition-colors">
                          Utiliser une Passkey
                        </span>
                      </motion.button>
                    </motion.div>
                  )}
                </motion.form>
              ) : (
                <motion.form
                  key="2fa-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerify2FA}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <h2 className="text-xl font-semibold text-white">
                      Vérification en deux étapes
                    </h2>
                    <p className="text-slate-300 text-sm">
                      Saisissez le code à 6 chiffres envoyé sur votre appareil
                    </p>
                  </div>

                  {/* Champs OTP */}
                  <div className="flex gap-2 justify-center">
                    {otpCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-semibold rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/30 transition-all duration-300"
                      />
                    ))}
                  </div>

                  {/* Bouton vérifier */}
                  <motion.button
                    type="submit"
                    disabled={loading || otpCode.join('').length !== 6}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Vérification...
                      </>
                    ) : (
                      'Vérifier'
                    )}
                  </motion.button>

                  {/* Renvoyer le code */}
                  <div className="text-center">
                    {resendCooldown > 0 ? (
                      <span className="text-slate-400 text-sm">
                        Renvoyer le code dans {resendCooldown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors"
                      >
                        Renvoyer le code
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Comptes de démonstration */}
            {!requires2FA && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <details className="group">
                  <summary className="cursor-pointer text-sm text-slate-300 hover:text-white transition-colors">
                    Comptes de démonstration
                  </summary>
                  <div className="mt-3 space-y-2">
                    {[
                      { type: 'admin', label: 'Admin', email: 'admin@shayacoca.com' },
                      { type: 'business', label: 'Business', email: 'business@shayacoca.com' },
                      { type: 'user', label: 'Utilisateur', email: 'user@shayacoca.com' }
                    ].map(({ type, label, email }) => (
                      <motion.button
                        key={type}
                        onClick={() => fillDemoAccount(type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 text-left transition-all duration-300"
                      >
                        <div className="font-medium text-white">{label}</div>
                        <div className="text-slate-400 text-sm">{email}</div>
                      </motion.button>
                    ))}
                  </div>
                </details>
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-4 mt-8"
          >
            <p className="text-slate-400 text-sm">
              Pas encore de compte ?{' '}
              <a href="/register" className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors">
                Créer un compte
              </a>
            </p>
            <LegalLinks />
            <div className="text-xs text-slate-500">v1.0.0 • FR/Europe</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
