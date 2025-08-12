import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AdvancedForm from '../components/AdvancedForm';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Configuration des champs du formulaire de profil
  const profileFields = [
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
      name: 'bio',
      type: 'textarea',
      label: 'Présentation',
      placeholder: 'Parlez-nous un peu de vous...',
      required: false,
      rows: 4,
      maxLength: 500
    },
    {
      name: 'website',
      type: 'url',
      label: 'Site web',
      placeholder: 'https://votre-site.com',
      required: false
    },
    {
      name: 'location',
      type: 'text',
      label: 'Localisation',
      placeholder: 'Ville, Pays',
      required: false
    }
  ];

  // Configuration des champs pour changer le mot de passe
  const passwordFields = [
    {
      name: 'currentPassword',
      type: 'password',
      label: 'Mot de passe actuel',
      placeholder: 'Votre mot de passe actuel',
      required: true
    },
    {
      name: 'newPassword',
      type: 'password',
      label: 'Nouveau mot de passe',
      placeholder: 'Nouveau mot de passe sécurisé',
      required: true
    },
    {
      name: 'confirmNewPassword',
      type: 'passwordConfirmation',
      label: 'Confirmer le nouveau mot de passe',
      placeholder: 'Répétez le nouveau mot de passe',
      required: true
    }
  ];

  const handleProfileUpdate = async (formData) => {
    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      // Simulation d'un appel API de mise à jour du profil
      // Traitement de la mise à jour du profil
      
      await updateProfile(formData);
      setSuccessMessage('Profil mis à jour avec succès !');
      
      // Effacer le message après 3 secondes
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur de mise à jour du profil:', error);
      alert('Erreur lors de la mise à jour: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (formData) => {
    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      // Simulation d'un appel API de changement de mot de passe
      // Traitement du changement de mot de passe
      
      // Ici vous feriez un appel à votre API pour changer le mot de passe
      // await changePassword(formData);
      
      setSuccessMessage('Mot de passe changé avec succès !');
      
      // Effacer le message après 3 secondes
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erreur de changement de mot de passe:', error);
      alert('Erreur lors du changement de mot de passe: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Éditer mon Profil
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez vos informations personnelles et paramètres de compte
          </p>
        </motion.div>

        {/* Message de succès */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center"
          >
            ✅ {successMessage}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations du profil */}
          <div>
            <AdvancedForm
              title="Informations Personnelles"
              fields={profileFields}
              onSubmit={handleProfileUpdate}
              submitText="Mettre à jour le profil"
              initialData={{
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                bio: user?.bio || '',
                website: user?.website || '',
                location: user?.location || ''
              }}
            />
          </div>

          {/* Changement de mot de passe */}
          <div>
            <AdvancedForm
              title="Changer le Mot de Passe"
              fields={passwordFields}
              onSubmit={handlePasswordChange}
              submitText="Changer le mot de passe"
              initialData={{}}
            />
          </div>
        </div>

        {/* Informations sur le compte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mt-8 p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Informations du Compte
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Rôle</p>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user?.role === 'admin' && '👑 Administrateur'}
                {user?.role === 'business' && '⭐ Compte Business'}
                {user?.role === 'user' && '👤 Utilisateur Standard'}
              </p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Membre depuis</p>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Non disponible'}
              </p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Dernière connexion</p>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Maintenant'}
              </p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Statut</p>
              <p className="font-semibold text-green-600">
                ✅ Compte actif
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions dangereuses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-8 p-6 rounded-lg shadow-md border-2 border-red-200 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h3 className="text-xl font-bold mb-4 text-red-600">
            ⚠️ Zone Dangereuse
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Supprimer mon compte
              </h4>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Cette action est irréversible. Toutes vos données seront définitivement supprimées.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                    alert('Fonctionnalité de suppression de compte non implémentée dans cette démo.');
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Supprimer mon compte
              </button>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Exporter mes données
              </h4>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Téléchargez une copie de toutes vos données personnelles.
              </p>
              <button
                onClick={() => {
                  alert('Fonctionnalité d\'export de données non implémentée dans cette démo.');
                }}
                className={`border px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Exporter mes données
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
