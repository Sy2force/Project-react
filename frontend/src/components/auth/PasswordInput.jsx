// PasswordInput.jsx - Champ mot de passe avec toggle, jauge de force et détection CapsLock
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, AlertTriangle, CapsLock } from 'lucide-react';

const PasswordInput = ({ 
  label = "Mot de passe", 
  placeholder = "Votre mot de passe", 
  value, 
  onChange, 
  error, 
  disabled = false,
  showStrengthMeter = false,
  required = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [strength, setStrength] = useState(0);

  const fieldId = `password-${label.toLowerCase().replace(/\s+/g, '-')}`;

  // Détection CapsLock
  const handleKeyDown = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'));
  };

  // Calcul de la force du mot de passe
  useEffect(() => {
    if (!value) {
      setStrength(0);
      return;
    }

    let score = 0;
    
    // Longueur
    if (value.length >= 8) score += 1;
    if (value.length >= 12) score += 1;
    
    // Complexité
    if (/[a-z]/.test(value)) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    
    setStrength(Math.min(score, 4));
  }, [value]);

  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500', 
    'bg-yellow-500',
    'bg-green-500',
    'bg-emerald-500'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label htmlFor="password" className="block text-sm font-medium text-white/90">
        Mot de passe *
      </label>

      <div className="relative">
        {/* Icône de verrouillage */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Lock className="w-5 h-5 text-slate-300/70" />
        </div>

        {/* Champ mot de passe */}
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="current-password"
          placeholder="Votre mot de passe"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'password-error' : undefined}
          className={`
            w-full rounded-xl bg-white/10 border text-white placeholder:text-slate-300/50
            pl-12 pr-12 py-3 transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/30
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error 
              ? 'border-rose-400/50 bg-rose-500/10 focus:ring-rose-400/60' 
              : 'border-white/10 hover:border-white/20'
            }
          `}
          {...props}
        />

        {/* Bouton show/hide */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-300/70 hover:text-white transition-colors disabled:opacity-50"
          aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Alerte CapsLock */}
      {capsLockOn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex items-center gap-2 text-sm text-amber-300 bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Attention : Verr. Maj activé</span>
        </motion.div>
      )}

      {/* Jauge de force */}
      {value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-300">Force du mot de passe</span>
            <span className={`font-medium ${strength >= 3 ? 'text-green-300' : strength >= 2 ? 'text-yellow-300' : 'text-red-300'}`}>
              {strengthLabels[strength]}
            </span>
          </div>
          
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  level < strength 
                    ? strengthColors[strength] 
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Message d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id="password-error"
          className="text-sm text-rose-300 bg-rose-500/10 border border-rose-400/20 rounded-lg px-3 py-2"
          role="alert"
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PasswordInput;
