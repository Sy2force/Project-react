import { useState, useEffect } from 'react'

export const useAcceptTerms = () => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)

  useEffect(() => {
    // Vérifier si les CGU ont été acceptées dans localStorage
    const accepted = localStorage.getItem('termsAccepted') === 'true'
    setHasAcceptedTerms(accepted)
  }, [])

  const acceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true')
    setHasAcceptedTerms(true)
  }

  const resetTerms = () => {
    localStorage.removeItem('termsAccepted')
    setHasAcceptedTerms(false)
  }

  return {
    hasAcceptedTerms,
    acceptTerms,
    resetTerms
  }
}
