import { useState, useEffect, useCallback } from 'react';
import { cardsAPI } from '../api/cards.js';
import toast from 'react-hot-toast';

export const useFavorites = (initialParams = {}) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Récupérer mes favoris
  const fetchFavorites = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await cardsAPI.getMyFavorites({ ...initialParams, ...params });
      setFavorites(response.data.cards);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  // Toggle favori
  const toggleFavorite = useCallback(async (cardId) => {
    try {
      const response = await cardsAPI.toggleFavorite(cardId);
      const message = response.data.isFavorite ? 'Ajouté aux favoris !' : 'Retiré des favoris !';
      toast.success(message);
      
      // Mettre à jour la liste locale si on est sur la page favoris
      if (!response.data.isFavorite) {
        setFavorites(prev => prev.filter(card => card._id !== cardId));
      }
      
      return response.data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  }, []);

  // Supprimer un favori
  const removeFavorite = useCallback(async (cardId) => {
    try {
      await cardsAPI.removeFavorite(cardId);
      toast.success('Retiré des favoris !');
      
      // Retirer de la liste locale
      setFavorites(prev => prev.filter(card => card._id !== cardId));
      
      return true;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  }, []);

  // Vérifier si une carte est en favori
  const isFavorite = useCallback((cardId) => {
    return favorites.some(card => card._id === cardId);
  }, [favorites]);

  // Changer de page
  const changePage = useCallback((page) => {
    fetchFavorites({ page });
  }, [fetchFavorites]);

  // Charger au montage
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    pagination,
    fetchFavorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    changePage,
    refetch: fetchFavorites
  };
};

export default useFavorites;
