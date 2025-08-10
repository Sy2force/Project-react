import React from 'react';
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { getPasswordStrengthProps } from '../utils/passwordValidation';

const PasswordStrength = ({ 
  password, 
  showPassword, 
  onToggleVisibility, 
  showStrengthIndicator = true,
  showRequirements = true,
  className = ''
}) => {
  const strengthProps = getPasswordStrengthProps(password);

  const requirements = [
    { key: 'length', label: 'Au moins 8 caractères', test: password.length >= 8 },
    { key: 'lowercase', label: 'Au moins 1 lettre minuscule', test: /[a-z]/.test(password) },
    { key: 'uppercase', label: 'Au moins 1 lettre majuscule', test: /[A-Z]/.test(password) },
    { key: 'digits', label: 'Au moins 4 chiffres', test: (password.match(/\d/g) || []).length >= 4 },
    { key: 'special', label: 'Au moins 1 caractère spécial (@$!%*?&)', test: /[@$!%*?&]/.test(password) }
  ];

  return (
    <div className={className}>
      {/* Password visibility toggle */}
      {onToggleVisibility && (
        <button
          type="button"
          onClick={onToggleVisibility}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
          aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {/* Strength indicator */}
      {showStrengthIndicator && password && (
        <div style={{ marginTop: '8px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px'
          }}>
            <span style={{
              fontSize: '12px',
              color: '#94a3b8',
              fontWeight: '500'
            }}>
              Force du mot de passe
            </span>
            <span style={{
              fontSize: '12px',
              color: strengthProps.color,
              fontWeight: '600'
            }}>
              {strengthProps.label} ({strengthProps.score}%)
            </span>
          </div>
          
          {/* Progress bar */}
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${strengthProps.score}%`,
              height: '100%',
              background: strengthProps.color,
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }} />
          </div>
        </div>
      )}

      {/* Requirements checklist */}
      {showRequirements && password && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: 'rgba(17, 25, 40, 0.6)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px'
          }}>
            <AlertCircle size={14} style={{ color: '#667eea' }} />
            <span style={{
              fontSize: '12px',
              color: '#667eea',
              fontWeight: '600'
            }}>
              Exigences du mot de passe
            </span>
          </div>
          
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {requirements.map((req) => (
              <li 
                key={req.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: req.test ? '#22c55e' : '#94a3b8'
                }}
              >
                {req.test ? (
                  <Check size={14} style={{ color: '#22c55e' }} />
                ) : (
                  <X size={14} style={{ color: '#ef4444' }} />
                )}
                <span>{req.label}</span>
              </li>
            ))}
          </ul>

          {/* Additional info */}
          <div style={{
            marginTop: '8px',
            padding: '8px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '4px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <p style={{
              fontSize: '11px',
              color: '#3b82f6',
              margin: 0,
              lineHeight: '1.4'
            }}>
              💡 <strong>Conseil :</strong> Utilisez une phrase avec des chiffres et symboles. 
              Exemple : "MonMotDePasse1234!"
            </p>
          </div>
        </div>
      )}

      {/* Error messages */}
      {strengthProps.errors.length > 0 && (
        <div 
          style={{
            marginTop: '8px',
            padding: '8px 12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '6px'
          }}
          role="alert"
          aria-live="polite"
        >
          {strengthProps.errors.map((error, index) => (
            <p 
              key={index}
              style={{
                fontSize: '12px',
                color: '#ef4444',
                margin: index === 0 ? 0 : '4px 0 0 0'
              }}
            >
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
