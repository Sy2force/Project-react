import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const useGuard = (requireAuth = true, requireTerms = true) => {
  const navigate = useNavigate()
  const { user, hasAcceptedTerms, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    // Vérifier l'acceptation des CGU en premier
    if (requireTerms && !hasAcceptedTerms) {
      navigate('/intro')
      return
    }

    // Vérifier l'authentification
    if (requireAuth && !user) {
      navigate('/auth')
      return
    }

  }, [user, hasAcceptedTerms, loading, navigate, requireAuth, requireTerms])

  return {
    isAuthorized: (!requireTerms || hasAcceptedTerms) && (!requireAuth || user),
    loading
  }
}
