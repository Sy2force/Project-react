import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

// Configuration axios avec intercepteurs
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour les réponses d'erreur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré, rediriger vers auth
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

// Services API
export const apiServices = {
  // Auth
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    me: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
  },

  // Projects
  projects: {
    getAll: (params = {}) => api.get('/projects', { params }),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.patch(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
    like: (id) => api.post(`/projects/${id}/like`),
  },

  // Blog
  blog: {
    getAll: (params = {}) => api.get('/posts', { params }),
    getById: (id) => api.get(`/posts/${id}`),
    create: (data) => api.post('/posts', data),
    update: (id, data) => api.patch(`/posts/${id}`, data),
    delete: (id) => api.delete(`/posts/${id}`),
  },

  // Skills
  skills: {
    getAll: () => api.get('/skills'),
  },

  // Contact
  contact: {
    send: (data) => api.post('/contact', data),
  },

  // PDF
  pdf: {
    generate: (data) => api.post('/pdf', data),
  },
}

export default api
