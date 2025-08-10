import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import GlassFallback from '../ui/GlassFallback'

const AuthGuard = ({ children, requireAuth = true }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Afficher le loader pendant la vérification
  if (loading) {
    return <GlassFallback />
  }

  // Si auth requise et pas connecté → rediriger vers /auth
  if (requireAuth && !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Si pas d'auth requise et connecté → rediriger vers /
  if (!requireAuth && user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AuthGuard
