import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Chrome,
  Apple,
  Github,
  Fingerprint,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginAdvanced = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  // Form States
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Block timer countdown
  useEffect(() => {
    let interval;
    if (isBlocked && blockTimer > 0) {
      interval = setInterval(() => {
        setBlockTimer(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimer]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) return;
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate login logic
      if (formData.email === 'admin@test.com' && formData.password === 'password') {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } else {
        // Failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsBlocked(true);
          setBlockTimer(300); // 5 minutes
          setErrors({ general: 'Trop de tentatives. Compte bloqué pendant 5 minutes.' });
        } else {
          setErrors({ general: `Identifiants incorrects. ${3 - newAttempts} tentatives restantes.` });
        }
      }
    } catch (error) {
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.3})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <motion.div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          padding: '3rem',
          width: '100%',
          maxWidth: '500px',
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '2rem' }}
          variants={itemVariants}
        >
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
          }}>
            <Shield size={40} color="white" />
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Connexion Sécurisée
          </h1>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.125rem'
          }}>
            Accédez à votre espace personnel
          </p>
        </motion.div>

        {/* Security Status */}
        <motion.div
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
          variants={itemVariants}
        >
          <CheckCircle size={20} color="#22c55e" />
          <div>
            <div style={{ color: '#22c55e', fontWeight: '600', fontSize: '0.875rem' }}>
              Connexion Sécurisée SSL
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>
              Vos données sont protégées
            </div>
          </div>
        </motion.div>

        {/* Block Warning */}
        <AnimatePresence>
          {isBlocked && (
            <motion.div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '2rem',
                textAlign: 'center'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <AlertCircle size={24} color="#ef4444" style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ color: '#ef4444', fontWeight: '600', marginBottom: '0.5rem' }}>
                Compte temporairement bloqué
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                Réessayez dans {formatTime(blockTimer)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          style={{ marginBottom: '2rem' }}
          variants={itemVariants}
        >
          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@test.com"
                disabled={isBlocked}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            {errors.email && (
              <div style={{
                color: '#ef4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <XCircle size={14} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="password"
                disabled={isBlocked}
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 3rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `2px solid ${errors.password ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isBlocked}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div style={{
                color: '#ef4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <XCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isBlocked}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#667eea'
                }}
              />
              Se souvenir de moi
            </label>
            
            <Link
              to="/forgot-password"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* General Error */}
          {errors.general && (
            <motion.div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <XCircle size={20} color="#ef4444" />
              <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                {errors.general}
              </span>
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={isLoading || isBlocked}
            style={{
              width: '100%',
              padding: '1rem',
              background: isLoading || isBlocked 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: isLoading || isBlocked ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: isLoading || isBlocked ? 'none' : '0 4px 20px rgba(102, 126, 234, 0.3)'
            }}
            whileHover={!isLoading && !isBlocked ? { scale: 1.02 } : {}}
            whileTap={!isLoading && !isBlocked ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <motion.div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Connexion...
              </>
            ) : isBlocked ? (
              <>
                <Clock size={20} />
                Bloqué ({formatTime(blockTimer)})
              </>
            ) : (
              <>
                <Shield size={20} />
                Se connecter
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}
          variants={itemVariants}
        >
          <div style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.2)'
          }} />
          <span style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.875rem'
          }}>
            ou continuer avec
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.2)'
          }} />
        </motion.div>

        {/* Social Login */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}
          variants={itemVariants}
        >
          {[
            { icon: Chrome, color: '#4285f4' },
            { icon: Apple, color: '#000000' },
            { icon: Github, color: '#333333' },
            { icon: Fingerprint, color: '#22c55e' }
          ].map(({ icon: Icon, color }, index) => (
            <motion.button
              key={index}
              disabled={isLoading || isBlocked}
              style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                cursor: isLoading || isBlocked ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              whileHover={!isLoading && !isBlocked ? { scale: 1.05 } : {}}
              whileTap={!isLoading && !isBlocked ? { scale: 0.95 } : {}}
            >
              <Icon size={20} />
            </motion.button>
          ))}
        </motion.div>

        {/* Register Link */}
        <motion.div
          style={{ textAlign: 'center' }}
          variants={itemVariants}
        >
          <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
            Pas encore de compte ?{' '}
          </span>
          <Link
            to="/register"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            S'inscrire
          </Link>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '12px',
            textAlign: 'center'
          }}
          variants={itemVariants}
        >
          <div style={{ color: '#ffd700', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Compte de démonstration
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem' }}>
            Email: admin@test.com<br />
            Mot de passe: password
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginAdvanced;
