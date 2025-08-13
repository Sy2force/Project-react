// [EXAM] Page de mot de passe oublié complètement fonctionnelle
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Shield,
  Clock,
  Send
} from 'lucide-react';
import authService from '../services/authService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ForgotPasswordComplete = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Veuillez saisir votre adresse email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Format d\'email invalide');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.forgotPassword(email);
      
      if (result.success) {
        setSuccess(result.message);
        setEmailSent(true);
        setResendCooldown(60); // 60 secondes avant de pouvoir renvoyer
        
        // Décompte pour le renvoi
        const countdown = setInterval(() => {
          setResendCooldown(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      } else {
        setError(result.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur mot de passe oublié:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await authService.forgotPassword(email);
      
      if (result.success) {
        setSuccess('Email renvoyé avec succès');
        setResendCooldown(60);
        
        const countdown = setInterval(() => {
          setResendCooldown(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      } else {
        setError(result.message || 'Erreur lors du renvoi');
      }
    } catch (error) {
      console.error('Erreur renvoi email:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
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
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0.6, 0.2],
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
        className="max-w-md w-full relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl shadow-2xl relative">
              <span className="relative z-10">S.A</span>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-500/50 rounded-2xl blur-xl"></div>
            </div>
          </div>
          
          {!emailSent ? (
            <>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mot de passe oublié
              </h1>
              <p className="text-gray-300">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Email envoyé
              </h1>
              <p className="text-gray-300">
                Vérifiez votre boîte de réception
              </p>
            </>
          )}
          
          {/* Indicateur de sécurité */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Processus sécurisé</span>
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

        {/* Contenu principal */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" glow className="p-8 backdrop-blur-xl bg-white/5 border-white/10">
            {!emailSent ? (
              // Formulaire de demande
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Adresse email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    variant="glass"
                    icon={<Mail size={18} />}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                  loading={isLoading}
                  disabled={isLoading}
                  icon={isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </Button>
              </form>
            ) : (
              // Confirmation d'envoi
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Email envoyé avec succès
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Un lien de réinitialisation a été envoyé à :
                  </p>
                  <p className="text-blue-400 font-medium break-all">
                    {email}
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-blue-400 mb-1">
                        Instructions importantes
                      </h4>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Vérifiez votre boîte de réception et vos spams</li>
                        <li>• Le lien expire dans 15 minutes</li>
                        <li>• Cliquez sur le lien pour créer un nouveau mot de passe</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bouton de renvoi */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">
                    Vous n'avez pas reçu l'email ?
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    className="w-full bg-white/5 hover:bg-white/10 border-white/10"
                    onClick={handleResend}
                    disabled={isLoading || resendCooldown > 0}
                    icon={isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  >
                    {resendCooldown > 0 
                      ? `Renvoyer dans ${resendCooldown}s` 
                      : isLoading 
                        ? 'Renvoi...' 
                        : 'Renvoyer l\'email'
                    }
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-6"
          variants={itemVariants}
        >
          <Link 
            to="/login"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Retour à la connexion</span>
          </Link>
          
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

export default ForgotPasswordComplete;
