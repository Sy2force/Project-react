import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  validatePassword,
  validateEmail,
  validateName,
  validatePhone,
  validateText,
  validatePasswordConfirmation,
  getPasswordStrengthColor,
  getPasswordStrengthText
} from '../utils/validation';

const AdvancedForm = ({ 
  onSubmit, 
  submitText = "Envoyer", 
  title = "Formulaire",
  fields = [],
  initialData = {}
}) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  // Validation en temps réel
  const validateField = (fieldName, value) => {
    const field = fields.find(f => f.name === fieldName);
    if (!field) return;

    let result = { isValid: true, errors: [], warnings: [] };

    switch (field.type) {
      case 'email':
        result = validateEmail(value);
        break;
      case 'password':
        result = validatePassword(value);
        if (result.strength !== undefined) {
          setPasswordStrength(result.strength);
        }
        break;
      case 'passwordConfirmation':
        result = validatePasswordConfirmation(formData.password, value);
        break;
      case 'text':
      case 'name':
        result = validateName(value, field.label);
        break;
      case 'phone':
        result = validatePhone(value);
        break;
      case 'textarea':
        result = validateText(value, field.label, field.minLength || 0, field.maxLength || 1000);
        break;
      default:
        if (field.required && (!value || !value.trim())) {
          result = { isValid: false, errors: [`${field.label} est requis`], warnings: [] };
        }
    }

    // Mise à jour des erreurs et warnings
    setErrors(prev => ({
      ...prev,
      [fieldName]: result.isValid ? [] : result.errors
    }));

    setWarnings(prev => ({
      ...prev,
      [fieldName]: result.warnings || []
    }));

    return result.isValid;
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Validation en temps réel avec un petit délai
    setTimeout(() => {
      validateField(fieldName, value);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation complète du formulaire
    let isFormValid = true;
    const newErrors = {};
    const newWarnings = {};

    for (const field of fields) {
      const isValid = validateField(field.name, formData[field.name]);
      if (!isValid) {
        isFormValid = false;
      }
    }

    if (isFormValid) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
      }
    }

    setIsSubmitting(false);
  };

  const renderField = (field) => {
    const fieldErrors = errors[field.name] || [];
    const fieldWarnings = warnings[field.name] || [];
    const hasErrors = fieldErrors.length > 0;
    const hasWarnings = fieldWarnings.length > 0;

    const baseInputClasses = `w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
      isDark 
        ? 'bg-gray-800 text-white border-gray-600 focus:border-blue-500' 
        : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
    } ${hasErrors ? 'border-red-500 focus:border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500/20`;

    switch (field.type) {
      case 'email':
        return (
          <div key={field.name} className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={baseInputClasses}
              required={field.required}
            />
            {renderFieldMessages(fieldErrors, fieldWarnings)}
          </div>
        );

      case 'password':
        return (
          <div key={field.name} className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={baseInputClasses + ' pr-12'}
                required={field.required}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            
            {/* Indicateur de force du mot de passe */}
            {formData[field.name] && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`flex-1 h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {getPasswordStrengthText(passwordStrength)}
                  </span>
                </div>
              </div>
            )}
            
            {renderFieldMessages(fieldErrors, fieldWarnings)}
          </div>
        );

      case 'passwordConfirmation':
        return (
          <div key={field.name} className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirmation ? 'text' : 'password'}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={baseInputClasses + ' pr-12'}
                required={field.required}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-sm ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {showPasswordConfirmation ? '🙈' : '👁️'}
              </button>
            </div>
            {renderFieldMessages(fieldErrors, fieldWarnings)}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              maxLength={field.maxLength || 1000}
              className={baseInputClasses}
              required={field.required}
            />
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {renderFieldMessages(fieldErrors, fieldWarnings)}
              </div>
              {field.maxLength && (
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {(formData[field.name] || '').length}/{field.maxLength}
                </span>
              )}
            </div>
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={baseInputClasses}
              required={field.required}
            >
              <option value="">{field.placeholder || `Sélectionner ${field.label.toLowerCase()}`}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {renderFieldMessages(fieldErrors, fieldWarnings)}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="space-y-2">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required={field.required}
              />
              <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </span>
            </label>
            {renderFieldMessages(fieldErrors, fieldWarnings)}
          </div>
        );

      default:
        return (
          <div key={field.name} className="space-y-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={baseInputClasses}
              required={field.required}
            />
            {renderFieldMessages(fieldErrors, fieldWarnings)}
          </div>
        );
    }
  };

  const renderFieldMessages = (fieldErrors, fieldWarnings) => {
    return (
      <div className="space-y-1">
        {fieldErrors.map((error, index) => (
          <motion.p
            key={`error-${index}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center space-x-1"
          >
            <span>❌</span>
            <span>{error}</span>
          </motion.p>
        ))}
        {fieldWarnings.map((warning, index) => (
          <motion.p
            key={`warning-${index}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-yellow-500 flex items-center space-x-1"
          >
            <span>⚠️</span>
            <span>{warning}</span>
          </motion.p>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map(renderField)}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Envoi en cours...</span>
            </span>
          ) : (
            submitText
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AdvancedForm;
