import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const DynamicFooter = () => {
  const { user, isAuthenticated, isAdmin, isVIP } = useAuth();
  const { isDark } = useTheme();

  // Liens communs pour tous les utilisateurs
  const commonLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Politique de confidentialité', href: '/privacy' }
  ];

  // Liens pour utilisateurs connectés
  const userLinks = [
    { name: 'Mon profil', href: '/profile' },
    { name: 'Mes favoris', href: '/favorites' },
    { name: 'Paramètres', href: '/settings' }
  ];

  // Liens pour utilisateurs business/VIP
  const businessLinks = [
    { name: 'Mes cartes', href: '/my-cards' },
    { name: 'Créer une carte', href: '/create-card' },
    { name: 'Analytics', href: '/analytics' }
  ];

  // Liens pour administrateurs
  const adminLinks = [
    { name: 'Administration', href: '/admin' },
    { name: 'Gestion utilisateurs', href: '/admin/users' },
    { name: 'Modération', href: '/admin/moderation' },
    { name: 'Statistiques', href: '/admin/stats' }
  ];

  // Réseaux sociaux
  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'GitHub', href: '#', icon: '🐙' }
  ];

  // Informations de contact
  const contactInfo = {
    email: 'contact@monportfolio.com',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France'
  };

  return (
    <footer className={`mt-auto ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Section Navigation */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Navigation
            </h3>
            <ul className="space-y-2">
              {commonLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm hover:underline transition-colors duration-200 ${
                      isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Utilisateur (si connecté) */}
          {isAuthenticated && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Mon Compte
              </h3>
              <ul className="space-y-2">
                {userLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm hover:underline transition-colors duration-200 ${
                        isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                
                {/* Liens business pour VIP */}
                {isVIP && businessLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm hover:underline transition-colors duration-200 ${
                        isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      ⭐ {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section Admin (si admin) */}
          {isAdmin && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 text-red-500`}>
                🛡️ Administration
              </h3>
              <ul className="space-y-2">
                {adminLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm hover:underline transition-colors duration-200 ${
                        isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section Contact & Réseaux */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contact & Réseaux
            </h3>
            
            {/* Informations de contact */}
            <div className="space-y-2 mb-4">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                📧 {contactInfo.email}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                📱 {contactInfo.phone}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                📍 {contactInfo.address}
              </p>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  title={social.name}
                  className={`text-2xl hover:scale-110 transition-transform duration-200 ${
                    isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <hr className={`my-8 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Mon Portfolio. Tous droits réservés.
            {isAuthenticated && (
              <span className="ml-2">
                | Connecté en tant que <strong>{user?.name || 'Utilisateur'}</strong>
                {isAdmin && <span className="text-red-500 ml-1">👑 Admin</span>}
                {isVIP && !isAdmin && <span className="text-blue-500 ml-1">⭐ VIP</span>}
              </span>
            )}
          </div>
          
          {/* Liens légaux */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="/terms"
              className={`text-sm hover:underline transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conditions d'utilisation
            </a>
            <a
              href="/privacy"
              className={`text-sm hover:underline transition-colors duration-200 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Confidentialité
            </a>
            {isAuthenticated && (
              <a
                href="/support"
                className={`text-sm hover:underline transition-colors duration-200 ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Support
              </a>
            )}
          </div>
        </div>

        {/* Message spécial selon le rôle */}
        {isAuthenticated && (
          <div className={`mt-6 p-4 rounded-lg text-center ${
            isAdmin 
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
              : isVIP 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          }`}>
            {isAdmin && (
              <p className="text-sm">
                🛡️ <strong>Mode Administrateur</strong> - Vous avez accès à toutes les fonctionnalités de gestion.
              </p>
            )}
            {isVIP && !isAdmin && (
              <p className="text-sm">
                ⭐ <strong>Compte VIP</strong> - Profitez de fonctionnalités exclusives et d'un support prioritaire.
              </p>
            )}
            {!isVIP && !isAdmin && (
              <p className="text-sm">
                💡 <strong>Astuce</strong> - Découvrez nos fonctionnalités premium en passant au compte VIP !
              </p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};

export default DynamicFooter;
