const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error.message);
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    return this.request('/health');
  }

  // Contact endpoints
  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async getContactMessages(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/contact/messages${queryString ? `?${queryString}` : ''}`);
  }

  async updateContactStatus(id, statusData) {
    return this.request(`/contact/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(statusData),
    });
  }

  async getContactStats() {
    return this.request('/contact/stats');
  }

  // Auth endpoints (placeholder for future implementation)
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Projects endpoints (placeholder)
  async getProjects(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/projects${queryString ? `?${queryString}` : ''}`);
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  // Cards endpoints (placeholder)
  async getCards(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/cards${queryString ? `?${queryString}` : ''}`);
  }

  async getCard(id) {
    return this.request(`/cards/${id}`);
  }

  async createCard(cardData) {
    return this.request('/cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async updateCard(id, cardData) {
    return this.request(`/cards/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(cardData),
    });
  }

  async deleteCard(id) {
    return this.request(`/cards/${id}`, {
      method: 'DELETE',
    });
  }

  // Admin endpoints
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/users${queryString ? `?${queryString}` : ''}`);
  }

  async updateUserRole(userId, role) {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(userId) {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getAdminStats() {
    return this.request('/admin/stats');
  }
}

// Export singleton instance
const apiService = new ApiService();
export default apiService;
