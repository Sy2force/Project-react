import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AdvancedForm from '../components/AdvancedForm';

const AdvancedRegister = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Configuration des champs du formulaire d'inscription
  const formFields = [
    {
      name: 'firstName',
      type: 'text',
      label: 'Prénom',
      placeholder: 'Votre prénom',
      required: true
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Nom',
      placeholder: 'Votre nom de famille',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Adresse email',
      placeholder: 'votre.email@exemple.com',
      required: true
    },
    {
      name: 'phone',
      type: 'phone',
      label: 'Téléphone',
      placeholder: '01 23 45 67 89',
      required: false
    },
    {
      name: 'password',
      type: 'password',
      label: 'Mot de passe',
      placeholder: 'Créez un mot de passe sécurisé',
      required: true
    },
    {
      name: 'passwordConfirmation',
      type: 'passwordConfirmation',
      label: 'Confirmer le mot de passe',
      placeholder: 'Répétez votre mot de passe',
      required: true
    },
    {
      name: 'role',
      type: 'select',
      label: 'Type de compte',
      placeholder: 'Sélectionnez votre type de compte',
      required: true,
      options: [
        { value: 'user', label: 'Utilisateur standard' },
        { value: 'business', label: 'Compte business (création de cartes)' }
      ]
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Présentation (optionnel)',
      placeholder: 'Parlez-nous un peu de vous...',
      required: false,
      rows: 4,
      maxLength: 500
    },
    {
      name: 'acceptTerms',
      type: 'checkbox',
      label: 'J\'accepte les conditions d\'utilisation et la politique de confidentialité',
      required: true
    },
    {
      name: 'acceptNewsletter',
      type: 'checkbox',
      label: 'Je souhaite recevoir la newsletter (optionnel)',
      required: false
    }
  ];

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API d'inscription
      // Traitement des données d'inscription
      
      // Ici, vous feriez un appel à votre API d'inscription
      const response = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        bio: formData.bio
      });

      if (response.success) {
        // Redirection vers le tableau de bord après inscription réussie
        navigate('/dashboard');
      } else {
        throw new Error(response.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      alert('Erreur lors de l\'inscription: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Créer un Compte
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Rejoignez notre plateforme avec un système de validation avancée
          </p>
        </motion.div>

        {/* Formulaire d'inscription avancé */}
        <AdvancedForm
          title="Inscription"
          fields={formFields}
          onSubmit={handleSubmit}
          submitText="Créer mon compte"
          initialData={{}}
        />

        {/* Liens supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center space-y-4"
        >
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Déjà un compte ?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Se connecter
            </button>
          </p>

          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} space-y-2`}>
            <p>🔒 Vos données sont protégées et chiffrées</p>
            <p>✅ Validation en temps réel pour une meilleure expérience</p>
            <p>🚀 Accès immédiat après validation de votre email</p>
          </div>
        </motion.div>

        {/* Informations sur les types de comptes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Types de comptes disponibles
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">👤</span>
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Utilisateur Standard
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Accès aux fonctionnalités de base, consultation des cartes, favoris
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">💼</span>
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Compte Business
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Création et gestion de cartes, analytics, outils professionnels
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedRegister;
