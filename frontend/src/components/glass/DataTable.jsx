import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import GlassPanel from './GlassPanel';
import GlassInput from './GlassInput';

/**
 * DataTable - Tableau de données avec tri, recherche et pagination
 * @param {Object} props
 * @param {Array} props.columns - Colonnes [{key, label, sortable, render}]
 * @param {Array} props.data - Données du tableau
 * @param {boolean} props.searchable - Active la recherche
 * @param {boolean} props.sortable - Active le tri global
 * @param {number} props.pageSize - Taille de page (défaut: 10)
 */
const DataTable = ({ 
  columns = [], 
  data = [], 
  searchable = true,
  sortable = true,
  pageSize = 10,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage par recherche
  const filteredData = searchable && searchTerm
    ? data.filter(row =>
        columns.some(col =>
          String(row[col.key] || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  // Tri des données
  const sortedData = sortable && sortConfig.key
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      })
    : filteredData;

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ column }) => {
    if (!sortable || !column.sortable) return null;
    
    const isActive = sortConfig.key === column.key;
    const isAsc = sortConfig.direction === 'asc';
    
    return (
      <span className="ml-2 inline-flex flex-col">
        <ChevronUp 
          size={12} 
          className={`${isActive && isAsc ? 'text-primary' : 'text-white/30'}`} 
        />
        <ChevronDown 
          size={12} 
          className={`-mt-1 ${isActive && !isAsc ? 'text-primary' : 'text-white/30'}`} 
        />
      </span>
    );
  };

  return (
    <GlassPanel className={`space-y-4 ${className}`}>
      {/* Recherche */}
      {searchable && (
        <div className="flex items-center space-x-2">
          <Search size={20} className="text-white/50" />
          <GlassInput
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      )}

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-white/80 ${
                    sortable && column.sortable ? 'cursor-pointer hover:text-white' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    <span className="line-clamp-1">{column.label}</span>
                    <SortIcon column={column} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-white">
                    <div className="line-clamp-2 break-words">
                      {column.render 
                        ? column.render(row[column.key], row, index)
                        : row[column.key]
                      }
                    </div>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/70">
            {startIndex + 1}-{Math.min(startIndex + pageSize, sortedData.length)} sur {sortedData.length}
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </GlassPanel>
  );
};

export default DataTable;
