import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    setIsLoading(true);
    try {
      // Simulation d'envoi d'email de récupération
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('Un email de récupération a été envoyé à votre adresse email.');
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'email de récupération');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{ 
        width: '100%', 
        maxWidth: '400px',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            Mot de passe oublié
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            Entrez votre email pour recevoir un lien de récupération
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            marginBottom: '1rem',
            color: '#fca5a5',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            marginBottom: '1rem',
            color: '#86efac',
            fontSize: '0.875rem'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              color: 'white', 
              fontSize: '0.875rem',
              marginBottom: '0.5rem'
            }}>
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-dark"
              placeholder="votre@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              marginBottom: '1rem',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de récupération'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
              Vous vous souvenez de votre mot de passe ?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: '#60a5fa', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
