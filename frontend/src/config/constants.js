// Constantes globales pour le portfolio Shay Acoca
export const CONSTANTS = {
  // Routes principales
  ROUTES: {
    HOME: '/',
    AUTH: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    PROJECTS: '/projects',
    PROJECT_DETAIL: '/projects/:id',
    SERVICES: '/services',
    BLOG: '/blog',
    POST_DETAIL: '/blog/:id',
    GALLERY: '/gallery',
    CONTACT: '/contact',
    ABOUT: '/about',
    SIMULATOR: '/simulator',
    SEARCH: '/search',
    ADMIN: '/admin',
    SETTINGS: '/settings',
    NOT_FOUND: '*',
  },

  // Rôles utilisateur
  USER_ROLES: {
    VISITOR: 'visitor',
    USER: 'user',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
  },

  // Permissions
  PERMISSIONS: {
    READ_PROJECTS: 'read:projects',
    WRITE_PROJECTS: 'write:projects',
    DELETE_PROJECTS: 'delete:projects',
    READ_POSTS: 'read:posts',
    WRITE_POSTS: 'write:posts',
    DELETE_POSTS: 'delete:posts',
    MANAGE_USERS: 'manage:users',
    VIEW_ANALYTICS: 'view:analytics',
    MANAGE_GALLERY: 'manage:gallery',
    MANAGE_CONTACT: 'manage:contact',
  },

  // Statuts des projets
  PROJECT_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    FEATURED: 'featured',
  },

  // Types de projets
  PROJECT_TYPES: {
    WEB_APP: 'web_app',
    MOBILE_APP: 'mobile_app',
    DESKTOP_APP: 'desktop_app',
    WEBSITE: 'website',
    API: 'api',
    LIBRARY: 'library',
    OTHER: 'other',
  },

  // Technologies
  TECHNOLOGIES: {
    FRONTEND: [
      'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
      'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS',
      'Framer Motion', 'Three.js', 'D3.js'
    ],
    BACKEND: [
      'Node.js', 'Express.js', 'Nest.js', 'Python', 'Django', 'FastAPI',
      'PHP', 'Laravel', 'Java', 'Spring Boot', 'C#', '.NET'
    ],
    DATABASE: [
      'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase',
      'Supabase', 'PlanetScale', 'Prisma', 'TypeORM'
    ],
    CLOUD: [
      'AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify', 'Heroku',
      'DigitalOcean', 'Railway', 'Render'
    ],
    TOOLS: [
      'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'Jenkins',
      'GitHub Actions', 'Figma', 'Adobe XD', 'Photoshop'
    ],
  },

  // Catégories de compétences
  SKILL_CATEGORIES: {
    FRONTEND: 'frontend',
    BACKEND: 'backend',
    DATABASE: 'database',
    DEVOPS: 'devops',
    DESIGN: 'design',
    MOBILE: 'mobile',
    TESTING: 'testing',
    OTHER: 'other',
  },

  // Niveaux de compétences
  SKILL_LEVELS: {
    BEGINNER: { value: 1, label: 'Débutant', color: '#ef4444' },
    INTERMEDIATE: { value: 2, label: 'Intermédiaire', color: '#f97316' },
    ADVANCED: { value: 3, label: 'Avancé', color: '#eab308' },
    EXPERT: { value: 4, label: 'Expert', color: '#22c55e' },
    MASTER: { value: 5, label: 'Maître', color: '#06b6d4' },
  },

  // Types de contenu blog
  POST_CATEGORIES: {
    TUTORIAL: 'tutorial',
    NEWS: 'news',
    REVIEW: 'review',
    OPINION: 'opinion',
    CASE_STUDY: 'case_study',
    ANNOUNCEMENT: 'announcement',
  },

  // Statuts des posts
  POST_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    ARCHIVED: 'archived',
  },

  // Types de contact
  CONTACT_TYPES: {
    GENERAL: 'general',
    PROJECT: 'project',
    COLLABORATION: 'collaboration',
    SUPPORT: 'support',
    FEEDBACK: 'feedback',
  },

  // Priorités des messages
  CONTACT_PRIORITY: {
    LOW: { value: 1, label: 'Basse', color: '#6b7280' },
    NORMAL: { value: 2, label: 'Normale', color: '#3b82f6' },
    HIGH: { value: 3, label: 'Haute', color: '#f59e0b' },
    URGENT: { value: 4, label: 'Urgente', color: '#ef4444' },
  },

  // Animations
  ANIMATIONS: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500,
    },
    EASING: {
      EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
      EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
      EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Breakpoints responsive
  BREAKPOINTS: {
    XS: 320,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  },

  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  },

  // Couleurs du thème
  THEME_COLORS: {
    PRIMARY: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    SECONDARY: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      900: '#14532d',
    },
    ACCENT: {
      50: '#fdf4ff',
      100: '#fae8ff',
      500: '#a855f7',
      600: '#9333ea',
      900: '#581c87',
    },
  },

  // Messages par défaut
  MESSAGES: {
    LOADING: 'Chargement en cours...',
    ERROR: 'Une erreur est survenue',
    SUCCESS: 'Opération réussie',
    NO_DATA: 'Aucune donnée disponible',
    UNAUTHORIZED: 'Accès non autorisé',
    FORBIDDEN: 'Accès interdit',
    NOT_FOUND: 'Ressource introuvable',
  },

  // Formats de date
  DATE_FORMATS: {
    SHORT: 'DD/MM/YYYY',
    LONG: 'DD MMMM YYYY',
    WITH_TIME: 'DD/MM/YYYY HH:mm',
    ISO: 'YYYY-MM-DD',
    RELATIVE: 'relative', // il y a 2 heures
  },

  // Limites
  LIMITS: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_FILES_UPLOAD: 10,
    MAX_COMMENT_LENGTH: 500,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 1000,
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 128,
  },

  // Regex patterns
  PATTERNS: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^(?:\+33|0)[1-9](?:[0-9]{8})$/,
    URL: /^https?:\/\/.+/,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  },

  // Local Storage keys
  STORAGE_KEYS: {
    TOKEN: 'auth_token',
    USER: 'user_data',
    THEME: 'theme_preference',
    LANGUAGE: 'language_preference',
    CART: 'shopping_cart',
    FAVORITES: 'user_favorites',
    SETTINGS: 'user_settings',
  },

  // Event types pour analytics
  ANALYTICS_EVENTS: {
    PAGE_VIEW: 'page_view',
    CLICK: 'click',
    FORM_SUBMIT: 'form_submit',
    DOWNLOAD: 'download',
    CONTACT: 'contact',
    PROJECT_VIEW: 'project_view',
    SEARCH: 'search',
  },
}

export default CONSTANTS
