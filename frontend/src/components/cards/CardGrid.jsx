import { useState } from 'react';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import CardItem from './CardItem';
import LoadingSpinner from '../LoadingSpinner';

const CardGrid = ({
  cards = [],
  loading = false,
  error = null,
  pagination = {},
  onSearch,
  onSort,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  showActions = true,
  showSearch = true,
  showSort = true,
  showPagination = true,
  emptyMessage = "Aucune carte trouvée"
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchQuery.trim());
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    onSort?.(newSort);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      onPageChange?.(page);
    }
  };

  // Options de tri
  const sortOptions = [
    { value: '-createdAt', label: 'Plus récent' },
    { value: 'createdAt', label: 'Plus ancien' },
    { value: 'title', label: 'Nom A-Z' },
    { value: '-title', label: 'Nom Z-A' }
  ];

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#ef4444',
        background: 'rgba(239, 68, 68, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(239, 68, 68, 0.2)'
      }}>
        <p style={{ fontSize: '16px', margin: 0 }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Barre de contrôles */}
      {(showSearch || showSort) && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          padding: '20px',
          background: 'rgba(17, 25, 40, 0.8)',
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Recherche */}
          {showSearch && (
            <form onSubmit={handleSearch} style={{ flex: '1', minWidth: '300px' }}>
              <div style={{ position: 'relative' }}>
                <Search 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8'
                  }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher des cartes..."
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '16px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Rechercher
                </button>
              </div>
            </form>
          )}

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Tri */}
            {showSort && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={16} style={{ color: '#94a3b8' }} />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value} style={{ background: '#1e293b' }}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Mode d'affichage */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px',
                  background: viewMode === 'grid' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
                title="Vue grille"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px',
                  background: viewMode === 'list' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
                title="Vue liste"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Informations de pagination */}
      {showPagination && pagination.totalItems > 0 && (
        <div style={{
          marginBottom: '16px',
          fontSize: '14px',
          color: '#94a3b8',
          textAlign: 'center'
        }}>
          Affichage de {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} à{' '}
          {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} sur{' '}
          {pagination.totalItems} carte{pagination.totalItems > 1 ? 's' : ''}
        </div>
      )}

      {/* Grille/Liste des cartes */}
      {cards.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#94a3b8',
          background: 'rgba(17, 25, 40, 0.4)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ fontSize: '18px', margin: 0 }}>{emptyMessage}</p>
        </div>
      ) : (
        <div style={{
          display: viewMode === 'grid' ? 'grid' : 'flex',
          flexDirection: viewMode === 'list' ? 'column' : undefined,
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : undefined,
          gap: '20px'
        }}>
          {cards.map((card) => (
            <CardItem
              key={card._id}
              card={card}
              variant={viewMode}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && pagination.totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '32px',
          padding: '20px',
          background: 'rgba(17, 25, 40, 0.8)',
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Bouton précédent */}
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 12px',
              background: pagination.hasPrevPage ? 'rgba(30, 41, 59, 0.8)' : 'rgba(71, 85, 105, 0.4)',
              color: pagination.hasPrevPage ? '#ffffff' : '#64748b',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed'
            }}
          >
            <ChevronLeft size={16} />
            Précédent
          </button>

          {/* Numéros de page */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1;
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i;
              } else {
                pageNum = pagination.currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: '8px 12px',
                    background: pageNum === pagination.currentPage 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'rgba(30, 41, 59, 0.8)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: pageNum === pagination.currentPage ? '600' : '400',
                    cursor: 'pointer'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 12px',
              background: pagination.hasNextPage ? 'rgba(30, 41, 59, 0.8)' : 'rgba(71, 85, 105, 0.4)',
              color: pagination.hasNextPage ? '#ffffff' : '#64748b',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed'
            }}
          >
            Suivant
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardGrid;
