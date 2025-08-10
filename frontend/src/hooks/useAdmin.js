import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import toast from 'react-hot-toast';

export const useAdmin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Récupérer la liste des utilisateurs avec filtres
  const fetchUsers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getUsers(params);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(`Erreur lors du chargement des utilisateurs: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Changer le rôle d'un utilisateur
  const updateUserRole = useCallback(async (userId, newRole) => {
    try {
      const response = await apiService.updateUserRole(userId, newRole);
      
      // Mettre à jour la liste locale
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId 
            ? { ...user, role: newRole }
            : user
        )
      );
      
      toast.success(response.message || `Rôle mis à jour vers ${newRole}`);
      return response;
    } catch (err) {
      toast.error(`Erreur lors du changement de rôle: ${err.message}`);
      throw err;
    }
  }, []);

  // Supprimer un utilisateur
  const deleteUser = useCallback(async (userId) => {
    try {
      const response = await apiService.deleteUser(userId);
      
      // Retirer de la liste locale
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      
      toast.success(response.message || 'Utilisateur supprimé avec succès');
      return response;
    } catch (err) {
      toast.error(`Erreur lors de la suppression: ${err.message}`);
      throw err;
    }
  }, []);

  // Récupérer les statistiques admin
  const fetchStats = useCallback(async () => {
    try {
      const response = await apiService.getAdminStats();
      setStats(response.data);
    } catch (err) {
      console.error('Erreur stats admin:', err);
      toast.error(`Erreur lors du chargement des statistiques: ${err.message}`);
    }
  }, []);

  // Rechercher des utilisateurs
  const searchUsers = useCallback(async (searchTerm, filters = {}) => {
    const params = {
      search: searchTerm,
      page: 1, // Reset à la première page lors d'une recherche
      ...filters
    };
    
    await fetchUsers(params);
  }, [fetchUsers]);

  // Changer de page
  const changePage = useCallback(async (page, currentFilters = {}) => {
    const params = {
      page,
      ...currentFilters
    };
    
    await fetchUsers(params);
  }, [fetchUsers]);

  return {
    // État
    users,
    stats,
    loading,
    error,
    pagination,
    
    // Actions
    fetchUsers,
    updateUserRole,
    deleteUser,
    fetchStats,
    searchUsers,
    changePage
  };
};

export default useAdmin;
