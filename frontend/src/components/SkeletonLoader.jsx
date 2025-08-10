import React from 'react';

/**
 * Composants Skeleton Loader pour améliorer l'UX pendant le chargement
 * Selon les exigences de performance de l'étape 4
 */

// Skeleton de base
const SkeletonBase = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  style = {}
}) => (
  <div
    className={`skeleton ${className}`}
    style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-loading 1.5s ease-in-out infinite',
      ...style
    }}
    aria-label="Chargement en cours..."
  />
);

// Skeleton pour carte business
export const CardSkeleton = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(17, 25, 40, 0.8)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px)'
  }}>
    {/* Header */}
    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
      <SkeletonBase width="60px" height="60px" borderRadius="8px" />
      <div style={{ flex: 1 }}>
        <SkeletonBase width="70%" height="24px" style={{ marginBottom: '8px' }} />
        <SkeletonBase width="50%" height="16px" />
      </div>
    </div>
    
    {/* Content */}
    <div style={{ marginBottom: '16px' }}>
      <SkeletonBase width="100%" height="16px" style={{ marginBottom: '8px' }} />
      <SkeletonBase width="80%" height="16px" style={{ marginBottom: '8px' }} />
      <SkeletonBase width="60%" height="16px" />
    </div>
    
    {/* Actions */}
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <SkeletonBase width="80px" height="36px" borderRadius="8px" />
      <SkeletonBase width="80px" height="36px" borderRadius="8px" />
    </div>
  </div>
);

// Skeleton pour grille de cartes
export const CardGridSkeleton = ({ count = 6 }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px'
  }}>
    {Array.from({ length: count }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);

// Skeleton pour liste
export const ListSkeleton = ({ count = 5 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        style={{
          padding: '16px',
          background: 'rgba(17, 25, 40, 0.6)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <SkeletonBase width="40px" height="40px" borderRadius="50%" />
          <div style={{ flex: 1 }}>
            <SkeletonBase width="60%" height="18px" style={{ marginBottom: '6px' }} />
            <SkeletonBase width="40%" height="14px" />
          </div>
          <SkeletonBase width="24px" height="24px" borderRadius="4px" />
        </div>
      </div>
    ))}
  </div>
);

// Skeleton pour formulaire
export const FormSkeleton = () => (
  <div style={{
    padding: '24px',
    background: 'rgba(17, 25, 40, 0.8)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  }}>
    {/* Title */}
    <SkeletonBase width="50%" height="28px" style={{ marginBottom: '24px' }} />
    
    {/* Form fields */}
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} style={{ marginBottom: '20px' }}>
        <SkeletonBase width="30%" height="16px" style={{ marginBottom: '8px' }} />
        <SkeletonBase width="100%" height="48px" borderRadius="8px" />
      </div>
    ))}
    
    {/* Actions */}
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
      <SkeletonBase width="100px" height="48px" borderRadius="8px" />
      <SkeletonBase width="120px" height="48px" borderRadius="8px" />
    </div>
  </div>
);

// Skeleton pour profil utilisateur
export const ProfileSkeleton = () => (
  <div style={{
    padding: '32px',
    background: 'rgba(17, 25, 40, 0.8)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  }}>
    {/* Avatar et info */}
    <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', alignItems: 'center' }}>
      <SkeletonBase width="100px" height="100px" borderRadius="50%" />
      <div style={{ flex: 1 }}>
        <SkeletonBase width="40%" height="32px" style={{ marginBottom: '8px' }} />
        <SkeletonBase width="60%" height="20px" style={{ marginBottom: '8px' }} />
        <SkeletonBase width="30%" height="16px" />
      </div>
    </div>
    
    {/* Stats */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} style={{
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <SkeletonBase width="60%" height="24px" style={{ marginBottom: '8px', margin: '0 auto' }} />
          <SkeletonBase width="80%" height="16px" style={{ margin: '0 auto' }} />
        </div>
      ))}
    </div>
    
    {/* Content sections */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <SkeletonBase width="25%" height="20px" style={{ marginBottom: '12px' }} />
          <SkeletonBase width="100%" height="16px" style={{ marginBottom: '8px' }} />
          <SkeletonBase width="85%" height="16px" />
        </div>
      ))}
    </div>
  </div>
);

// Skeleton pour navigation
export const NavSkeleton = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '16px 24px'
  }}>
    <SkeletonBase width="120px" height="32px" />
    <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonBase key={index} width="80px" height="24px" />
      ))}
    </div>
    <SkeletonBase width="40px" height="40px" borderRadius="50%" />
  </div>
);

// Skeleton pour tableau
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div style={{
    background: 'rgba(17, 25, 40, 0.8)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden'
  }}>
    {/* Header */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '16px',
      padding: '16px 24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {Array.from({ length: columns }).map((_, index) => (
        <SkeletonBase key={index} width="80%" height="20px" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '16px',
          padding: '16px 24px',
          borderBottom: rowIndex < rows - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
        }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <SkeletonBase key={colIndex} width="90%" height="16px" />
        ))}
      </div>
    ))}
  </div>
);

// Skeleton pour page complète
export const PageSkeleton = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '80px 20px 40px'
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <SkeletonBase width="40%" height="40px" style={{ marginBottom: '12px' }} />
        <SkeletonBase width="60%" height="20px" />
      </div>
      
      {/* Content */}
      <CardGridSkeleton count={6} />
    </div>
  </div>
);

// Styles CSS pour l'animation
export const SkeletonStyles = () => (
  <style>{`
    @keyframes skeleton-loading {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    .skeleton {
      position: relative;
      overflow: hidden;
    }
    
    .skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }
    
    @keyframes skeleton-shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    /* Réduction des animations pour les utilisateurs sensibles */
    @media (prefers-reduced-motion: reduce) {
      .skeleton,
      .skeleton::after {
        animation: none !important;
      }
    }
  `}</style>
);

export default {
  SkeletonBase,
  CardSkeleton,
  CardGridSkeleton,
  ListSkeleton,
  FormSkeleton,
  ProfileSkeleton,
  NavSkeleton,
  TableSkeleton,
  PageSkeleton,
  SkeletonStyles
};
