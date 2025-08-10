import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '../contexts/AuthContext'
import { validatePassword } from '../utils/passwordValidation'
import PasswordStrength from '../components/PasswordStrength'

const AuthPage = () => {
  const navigate = useNavigate()
  const { login, register, isLoading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  // SEO: Set page title and meta description
  useEffect(() => {
    document.title = isLogin ? 'Connexion | Shay Acoca Portfolio' : 'Inscription | Shay Acoca Portfolio'
    const metaDescription = document.querySelector('meta[name="description"]')
    const content = isLogin 
      ? 'Connectez-vous à votre compte Shay Acoca pour accéder à votre dashboard et gérer vos projets.'
      : 'Créez votre compte Shay Acoca pour découvrir des projets exclusifs et accéder aux services premium.'
    if (metaDescription) {
      metaDescription.setAttribute('content', content)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = content
      document.head.appendChild(meta)
    }
  }, [isLogin])
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (!isLogin) {
      // Validation stricte pour l'inscription
      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0] || 'Mot de passe invalide'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register(formData.name, formData.email, formData.password)
      }
    } catch (error) {
      console.error('Erreur authentification:', error)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: '', email: '', password: '' })
    setErrors({})
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative py-8">
      {/* Bouton retour simple */}
      <motion.div 
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => navigate('/intro')}
          variant="glass"
          size="sm"
          className="w-11 h-11 p-0 hover:scale-105 transition-transform duration-200"
        >
          <ArrowLeft size={20} />
        </Button>
      </motion.div>

      {/* Formulaire d'authentification moderne */}
      <motion.div 
        className="z-10 w-full max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <GlassCard className="p-8 backdrop-blur-xl border-white/10">
          <div>
            {/* Header simple et moderne */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">S.A</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h1 className="text-2xl font-semibold text-white mb-2">
                  {isLogin ? 'Connexion' : 'Inscription'}
                </h1>
                <p className="text-white/70 text-sm">
                  {isLogin ? 'Accédez à votre espace' : 'Créez votre compte'}
                </p>
              </motion.div>
            </div>

            {/* Formulaire fluide */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {/* Champ nom avec animation fluide */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nom complet"
                    icon={User}
                    error={errors.name}
                    required
                    data-cy="name-input"
                    autoComplete="name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                  {errors.name && (
                    <motion.p 
                      id="name-error" 
                      className="text-red-400 text-sm mt-1" 
                      role="alert"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* Champ email fluide */}
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Adresse email"
                  icon={Mail}
                  error={errors.email}
                  required
                  data-cy="email-input"
                  autoComplete="email"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
                {errors.email && (
                  <motion.p 
                    id="email-error" 
                    className="text-red-400 text-sm mt-1" 
                    role="alert"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Champ mot de passe fluide */}
              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mot de passe"
                    icon={Lock}
                    error={errors.password}
                    required
                    data-cy="password-input"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    aria-describedby={errors.password ? "password-error" : (!isLogin ? "password-requirements" : undefined)}
                    aria-invalid={!!errors.password}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-accent hover:text-white transition-all duration-200 hover:scale-110"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </motion.button>
                </div>
                
                {/* Indicateur de force du mot de passe pour l'inscription */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PasswordStrength
                      password={formData.password}
                      showPassword={showPassword}
                      onToggleVisibility={() => setShowPassword(!showPassword)}
                      showStrengthIndicator={true}
                      showRequirements={true}
                      className="mt-2"
                    />
                  </motion.div>
                )}
                
                {errors.password && (
                  <motion.p 
                    id="password-error" 
                    className="text-red-400 text-sm mt-1" 
                    role="alert"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.password}
                  </motion.p>
                )}
                {!isLogin && !errors.password && (
                  <div id="password-requirements" className="sr-only">
                    Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 4 chiffres et 1 caractère spécial
                  </div>
                )}
              </div>

              {/* Bouton de soumission fluide */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  data-cy={isLogin ? "login-button" : "register-button"}
                  className="w-full hover:scale-[1.02] transition-transform duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isLogin ? 'Connexion...' : 'Inscription...'}
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLogin ? 'Se connecter' : 'S\'inscrire'}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Toggle mode avec animation */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <p className="text-white/70 mb-3 text-sm">
                {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
              </p>
              <Button
                type="button"
                onClick={toggleMode}
                variant="glass"
                size="sm"
                data-cy={isLogin ? "switch-to-register" : "switch-to-login"}
                aria-label={isLogin ? 'Basculer vers le formulaire d\'inscription' : 'Basculer vers le formulaire de connexion'}
                className="hover:scale-105 transition-transform duration-200"
              >
                {isLogin ? 'Créer un compte' : 'Se connecter'}
              </Button>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default AuthPage

// Styles d'animation pour les particules
const styles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 1;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`

// Injection des styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
