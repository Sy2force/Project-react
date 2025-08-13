// [EXAM] Hook personnalisé pour l'internationalisation (i18n)
import { useState, useEffect, useContext, createContext } from 'react';

// [EXAM] Contexte pour l'internationalisation
const I18nContext = createContext();

/**
 * [EXAM] Traductions par défaut (français)
 */
const defaultTranslations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.favorites': 'Favoris',
    'nav.profile': 'Profil',
    'nav.dashboard': 'Tableau de Bord',
    'nav.login': 'Connexion',
    'nav.logout': 'Déconnexion',
    
    // Actions communes
    'action.save': 'Sauvegarder',
    'action.cancel': 'Annuler',
    'action.delete': 'Supprimer',
    'action.edit': 'Modifier',
    'action.view': 'Voir',
    'action.download': 'Télécharger',
    'action.share': 'Partager',
    'action.like': 'J\'aime',
    'action.comment': 'Commenter',
    'action.search': 'Rechercher',
    'action.filter': 'Filtrer',
    'action.sort': 'Trier',
    'action.submit': 'Envoyer',
    'action.loading': 'Chargement...',
    
    // Messages
    'message.success': 'Opération réussie',
    'message.error': 'Une erreur est survenue',
    'message.warning': 'Attention',
    'message.info': 'Information',
    'message.noResults': 'Aucun résultat trouvé',
    'message.noData': 'Aucune donnée disponible',
    'message.confirm': 'Êtes-vous sûr ?',
    
    // Formulaires
    'form.name': 'Nom',
    'form.email': 'Email',
    'form.password': 'Mot de passe',
    'form.confirmPassword': 'Confirmer le mot de passe',
    'form.subject': 'Sujet',
    'form.message': 'Message',
    'form.required': 'Champ requis',
    'form.invalid': 'Format invalide',
    'form.tooShort': 'Trop court',
    'form.tooLong': 'Trop long',
    
    // Accessibilité
    'a11y.skipToContent': 'Aller au contenu principal',
    'a11y.skipToNavigation': 'Aller à la navigation',
    'a11y.openMenu': 'Ouvrir le menu',
    'a11y.closeMenu': 'Fermer le menu',
    'a11y.loading': 'Chargement en cours',
    'a11y.error': 'Erreur',
    'a11y.success': 'Succès',
    'a11y.newWindow': 'Ouvre dans une nouvelle fenêtre',
    
    // Temps et dates
    'time.now': 'Maintenant',
    'time.today': 'Aujourd\'hui',
    'time.yesterday': 'Hier',
    'time.tomorrow': 'Demain',
    'time.minute': 'minute',
    'time.minutes': 'minutes',
    'time.hour': 'heure',
    'time.hours': 'heures',
    'time.day': 'jour',
    'time.days': 'jours',
    'time.week': 'semaine',
    'time.weeks': 'semaines',
    'time.month': 'mois',
    'time.months': 'mois',
    'time.year': 'année',
    'time.years': 'années'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.favorites': 'Favorites',
    'nav.profile': 'Profile',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Actions communes
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.view': 'View',
    'action.download': 'Download',
    'action.share': 'Share',
    'action.like': 'Like',
    'action.comment': 'Comment',
    'action.search': 'Search',
    'action.filter': 'Filter',
    'action.sort': 'Sort',
    'action.submit': 'Submit',
    'action.loading': 'Loading...',
    
    // Messages
    'message.success': 'Operation successful',
    'message.error': 'An error occurred',
    'message.warning': 'Warning',
    'message.info': 'Information',
    'message.noResults': 'No results found',
    'message.noData': 'No data available',
    'message.confirm': 'Are you sure?',
    
    // Formulaires
    'form.name': 'Name',
    'form.email': 'Email',
    'form.password': 'Password',
    'form.confirmPassword': 'Confirm Password',
    'form.subject': 'Subject',
    'form.message': 'Message',
    'form.required': 'Required field',
    'form.invalid': 'Invalid format',
    'form.tooShort': 'Too short',
    'form.tooLong': 'Too long',
    
    // Accessibilité
    'a11y.skipToContent': 'Skip to main content',
    'a11y.skipToNavigation': 'Skip to navigation',
    'a11y.openMenu': 'Open menu',
    'a11y.closeMenu': 'Close menu',
    'a11y.loading': 'Loading',
    'a11y.error': 'Error',
    'a11y.success': 'Success',
    'a11y.newWindow': 'Opens in new window',
    
    // Temps et dates
    'time.now': 'Now',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.tomorrow': 'Tomorrow',
    'time.minute': 'minute',
    'time.minutes': 'minutes',
    'time.hour': 'hour',
    'time.hours': 'hours',
    'time.day': 'day',
    'time.days': 'days',
    'time.week': 'week',
    'time.weeks': 'weeks',
    'time.month': 'month',
    'time.months': 'months',
    'time.year': 'year',
    'time.years': 'years'
  }
};

/**
 * [EXAM] Provider pour l'internationalisation
 */
export const I18nProvider = ({ children, defaultLocale = 'fr' }) => {
  const [locale, setLocale] = useState(() => {
    // [EXAM] Récupération de la langue depuis localStorage ou navigateur
    const saved = localStorage.getItem('locale');
    if (saved && defaultTranslations[saved]) {
      return saved;
    }
    
    const browserLang = navigator.language.split('-')[0];
    return defaultTranslations[browserLang] ? browserLang : defaultLocale;
  });

  const [translations, setTranslations] = useState(defaultTranslations);

  // [EXAM] Sauvegarde de la langue sélectionnée
  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  // [EXAM] Fonction de traduction
  const t = (key, params = {}) => {
    const translation = translations[locale]?.[key] || translations['fr']?.[key] || key;
    
    // [EXAM] Remplacement des paramètres dans la traduction
    return Object.entries(params).reduce((str, [param, value]) => {
      return str.replace(new RegExp(`{{${param}}}`, 'g'), value);
    }, translation);
  };

  // [EXAM] Fonction pour changer de langue
  const changeLocale = (newLocale) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
    }
  };

  // [EXAM] Fonction pour ajouter des traductions
  const addTranslations = (newTranslations) => {
    setTranslations(prev => ({
      ...prev,
      ...newTranslations
    }));
  };

  // [EXAM] Fonction pour obtenir les langues disponibles
  const getAvailableLocales = () => {
    return Object.keys(translations);
  };

  const value = {
    locale,
    t,
    changeLocale,
    addTranslations,
    getAvailableLocales,
    isRTL: locale === 'ar' || locale === 'he' // [EXAM] Support RTL basique
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

/**
 * [EXAM] Hook principal pour l'internationalisation
 */
export const useI18n = () => {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
};

/**
 * [EXAM] Hook pour le formatage des dates selon la locale
 */
export const useDateFormat = () => {
  const { locale } = useI18n();
  
  const formatDate = (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    
    return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
  };
  
  const formatTime = (date, options = {}) => {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...options
    };
    
    return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
  };
  
  const formatDateTime = (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options
    };
    
    return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
  };
  
  const formatRelativeTime = (date) => {
    const { t } = useI18n();
    const now = new Date();
    const target = new Date(date);
    const diffInSeconds = Math.floor((now - target) / 1000);
    
    if (diffInSeconds < 60) {
      return t('time.now');
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? t('time.minute') : t('time.minutes')}`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? t('time.hour') : t('time.hours')}`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? t('time.day') : t('time.days')}`;
    }
    
    return formatDate(date);
  };
  
  return {
    formatDate,
    formatTime,
    formatDateTime,
    formatRelativeTime
  };
};

/**
 * [EXAM] Hook pour le formatage des nombres selon la locale
 */
export const useNumberFormat = () => {
  const { locale } = useI18n();
  
  const formatNumber = (number, options = {}) => {
    return new Intl.NumberFormat(locale, options).format(number);
  };
  
  const formatCurrency = (amount, currency = 'EUR', options = {}) => {
    const defaultOptions = {
      style: 'currency',
      currency,
      ...options
    };
    
    return new Intl.NumberFormat(locale, defaultOptions).format(amount);
  };
  
  const formatPercent = (value, options = {}) => {
    const defaultOptions = {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      ...options
    };
    
    return new Intl.NumberFormat(locale, defaultOptions).format(value);
  };
  
  return {
    formatNumber,
    formatCurrency,
    formatPercent
  };
};

export default useI18n;
