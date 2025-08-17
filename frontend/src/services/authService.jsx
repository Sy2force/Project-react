import { getRoleRedirect } from '../utils/roles.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  // Redirection intelligente basée sur le rôle
  getRoleRedirect(role) {
    return getRoleRedirect(role);
  }

  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for httpOnly tokens
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Backend uses httpOnly cookies, so no token to store in localStorage
    // Just return the user data
    return data.user;
  }

  async register(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for httpOnly tokens
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors specifically
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.msg || err.message).join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Registration failed');
      }

      // Backend uses httpOnly cookies, so no token to store in localStorage
      // Just return the user data
      return data.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include', // Include httpOnly cookies
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          return null;
        }
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      return data.user || null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  async updateUser(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include httpOnly cookies
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return data.user;
  }

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Include httpOnly cookies
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    // Since we're using httpOnly cookies, we can't check token directly
    // We'll rely on the getCurrentUser() method to determine auth status
    return true; // This will be properly checked by getCurrentUser()
  }
}

export const authService = new AuthService();
