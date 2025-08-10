// frontend/src/api/endpoints.js
// Helper minimal pour les chemins d'endpoints API

export const endpoints = {
  // Authentication
  auth: {
    register: () => '/auth/register',
    login: () => '/auth/login',
    logout: () => '/auth/logout',
    me: () => '/auth/me',
    profile: () => '/auth/profile',
  },

  // Projects
  projects: {
    list: () => '/projects',
    detail: (id) => `/projects/${id}`,
    create: () => '/projects',
    update: (id) => `/projects/${id}`,
    delete: (id) => `/projects/${id}`,
    like: (id) => `/projects/${id}/like`,
  },

  // Blog Posts
  posts: {
    list: () => '/posts',
    detail: (id) => `/posts/${id}`,
    create: () => '/posts',
    update: (id) => `/posts/${id}`,
    delete: (id) => `/posts/${id}`,
  },

  // Skills
  skills: {
    list: () => '/skills',
    create: () => '/skills',
    update: (id) => `/skills/${id}`,
    delete: (id) => `/skills/${id}`,
  },

  // Contact
  contact: {
    send: () => '/contact',
    list: () => '/contact',
    markRead: (id) => `/contact/${id}/read`,
  },

  // PDF Generation
  pdf: {
    generate: () => '/pdf/generate',
  },
};

export default endpoints;
