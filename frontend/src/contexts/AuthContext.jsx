import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'test-user-123',
    email: 'test@shayacoca.com',
    name: 'Utilisateur Test',
    role: 'user',
    avatar: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const navigate = useNavigate()
  const logoutTimerRef = useRef(null)
  const tokenCheckIntervalRef = useRef(null)

  // Décoder le token JWT pour vérifier l'expiration
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload
    } catch (error) {
      return null
    }
  }

  // Vérifier si le token est expiré
  const isTokenExpired = (token) => {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return true
    
    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp < currentTime
  }

  // Auto-logout sur expiration
  const setupAutoLogout = (token) => {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return
    
    const currentTime = Math.floor(Date.now() / 1000)
    const timeUntilExpiry = (decoded.exp - currentTime) * 1000
    
    // Clear existing timer
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
    }
    
    // Set new timer for auto-logout
    if (timeUntilExpiry > 0) {
      logoutTimerRef.current = setTimeout(() => {
        logout(true) // true = auto logout
      }, timeUntilExpiry)
    }
  }

  // Vérification périodique du token
  const startTokenCheck = () => {
    if (tokenCheckIntervalRef.current) {
      clearInterval(tokenCheckIntervalRef.current)
    }
    
    tokenCheckIntervalRef.current = setInterval(() => {
      const token = localStorage.getItem('token')
      if (token && isTokenExpired(token)) {
        logout(true) // Auto logout
      }
    }, 60000) // Vérifier chaque minute
  }

  // Vérifier le token au chargement
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      const termsAccepted = localStorage.getItem('termsAccepted')
      
      setHasAcceptedTerms(termsAccepted === 'true')
      
      if (token) {
        // Vérifier si le token est expiré
        if (isTokenExpired(token)) {
          localStorage.removeItem('token')
          toast.error('Session expirée, veuillez vous reconnecter')
        } else {
          try {
            const userData = await apiService.getProfile()
            setUser(userData.user)
            setupAutoLogout(token)
            startTokenCheck()
          } catch (error) {
            // Token invalide côté serveur
            localStorage.removeItem('token')
            toast.error('Session invalide, veuillez vous reconnecter')
          }
        }
      }
      setIsLoading(false)
    }

    initAuth()
    
    // Cleanup on unmount
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current)
      }
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current)
      }
    }
  }, [])

  // Accepter les CGU
  const acceptTerms = () => {
    setHasAcceptedTerms(true)
    localStorage.setItem('termsAccepted', 'true')
  }

  // Connexion
  const login = async (email, password) => {
    try {
      setIsLoading(true)
      const response = await apiService.login({ email, password })
      
      // Stocker UNIQUEMENT le token (pas de données sensibles)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      
      // Setup auto-logout
      setupAutoLogout(response.token)
      startTokenCheck()
      
      toast.success('Connexion réussie!')
      navigate('/home')
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur de connexion'
      toast.error(message)
      return { success: false, message }
    } finally {
      setIsLoading(false)
    }
  }

  // Inscription
  const register = async (name, email, password) => {
    try {
      setIsLoading(true)
      const response = await apiService.register({ name, email, password })
      
      // Stocker UNIQUEMENT le token (pas de données sensibles)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      
      // Setup auto-logout
      setupAutoLogout(response.token)
      startTokenCheck()
      
      toast.success('Compte créé avec succès!')
      navigate('/home')
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription'
      toast.error(message)
      return { success: false, message }
    } finally {
      setIsLoading(false)
    }
  }

  // Déconnexion
  const logout = (isAutoLogout = false) => {
    // Clear timers
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
    }
    if (tokenCheckIntervalRef.current) {
      clearInterval(tokenCheckIntervalRef.current)
    }
    
    // Clear storage (UNIQUEMENT le token)
    localStorage.removeItem('token')
    setUser(null)
    
    if (isAutoLogout) {
      toast.error('Session expirée, veuillez vous reconnecter')
    } else {
      toast.success('Déconnexion réussie')
    }
    
    navigate('/intro')
  }

  // Vérifier si l'utilisateur est admin
  const isAdmin = () => {
    return user?.role === 'admin'
  }

  // Vérifier si l'utilisateur est connecté avec token valide
  const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    return !!user && !!token && !isTokenExpired(token)
  }
  
  // Vérifier les rôles avec sécurité
  const hasRole = (role) => {
    return user?.role === role
  }
  
  // Vérifier si business ou admin
  const canCreateCards = () => {
    return user && (user.role === 'business' || user.role === 'admin')
  }

  const value = {
    user,
    isLoading,
    hasAcceptedTerms,
    acceptTerms,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated,
    hasRole,
    canCreateCards,
    isTokenExpired: (token) => isTokenExpired(token || localStorage.getItem('token'))
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
