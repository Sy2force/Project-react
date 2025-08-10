import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './LoadingSpinner'

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading, hasAcceptedTerms } = useAuth()
  const location = useLocation()

  // Afficher le spinner pendant le chargement
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Rediriger vers l'intro si les CGU ne sont pas acceptées
  if (!hasAcceptedTerms) {
    return <Navigate to="/intro" state={{ from: location }} replace />
  }

  // Rediriger vers l'authentification si non connecté
  if (!isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Afficher le contenu protégé
  return children
}

export default RequireAuth
