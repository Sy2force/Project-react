import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '500px',
        padding: '3rem'
      }}>
        <div style={{
          fontSize: '6rem',
          marginBottom: '1rem'
        }}>
          🚀
        </div>
        
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '1rem'
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: '1.5rem',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '1rem'
        }}>
          Page non trouvée
        </h2>
        
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          Retournons vers l'univers digital de Shay Acoca !
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/projects" className="btn btn-glass">
            Voir les projets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
