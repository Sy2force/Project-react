// FormField.jsx - Champ de formulaire avec style glassmorphism
import { motion } from 'framer-motion';

const FormField = ({ 
  id, 
  label, 
  type = 'text', 
  icon: Icon, 
  value, 
  onChange, 
  autoComplete, 
  placeholder, 
  error,
  required = false,
  disabled = false,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {/* Label */}
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-white/90"
      >
        {label}
        {required && <span className="text-rose-400 ml-1">*</span>}
      </label>

      {/* Input container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300/60">
            <Icon size={18} />
          </div>
        )}

        {/* Input field */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full rounded-xl bg-white/10 border text-white placeholder:text-slate-300/50 
            px-4 py-3 transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/30
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-11' : 'pl-4'}
            ${error 
              ? 'border-rose-400/50 bg-rose-500/10 focus:ring-rose-400/60' 
              : 'border-white/10 hover:border-white/20'
            }
          `}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          id={`${id}-error`}
          role="alert"
          className="text-sm text-rose-300 bg-rose-500/10 border border-rose-400/20 rounded-lg px-3 py-2"
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FormField;
