import { useState, useEffect, useCallback } from 'react';
import { cardsAPI } from '../api/cards.js';
import { getMockCards } from '../data/mockCards.js';
import toast from 'react-hot-toast';

export const useCards = (initialParams = {}) => {
  const [cards, setCards] = useState([]);
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

  // Récupérer les cartes avec paramètres
  const fetchCards = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await cardsAPI.getCards({ ...initialParams, ...params });
      setCards(response.data.cards);
      setPagination(response.data.pagination);
    } catch (err) {
      // Fallback vers les données de test si l'API échoue
      console.warn('API Cards indisponible, utilisation des données de test:', err.message);
      const mockResponse = getMockCards({ ...initialParams, ...params });
      setCards(mockResponse.data.cards);
      setPagination(mockResponse.data.pagination);
      setError(null); // Pas d'erreur avec les données de test
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  // Récupérer mes cartes
  const fetchMyCards = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await cardsAPI.getMyCards({ ...initialParams, ...params });
      setCards(response.data.cards);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  // Créer une carte
  const createCard = useCallback(async (cardData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await cardsAPI.createCard(cardData);
      toast.success('Carte créée avec succès !');
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour une carte
  const updateCard = useCallback(async (id, cardData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await cardsAPI.updateCard(id, cardData);
      toast.success('Carte mise à jour avec succès !');
      
      // Mettre à jour la carte dans la liste locale
      setCards(prev => prev.map(card => 
        card._id === id ? response.data : card
      ));
      
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer une carte
  const deleteCard = useCallback(async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await cardsAPI.deleteCard(id);
      toast.success('Carte supprimée avec succès !');
      
      // Retirer la carte de la liste locale
      setCards(prev => prev.filter(card => card._id !== id));
      
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Recherche
  const searchCards = useCallback((query, additionalParams = {}) => {
    fetchCards({ q: query, page: 1, ...additionalParams });
  }, [fetchCards]);

  // Changer de page
  const changePage = useCallback((page) => {
    fetchCards({ page });
  }, [fetchCards]);

  // Trier
  const sortCards = useCallback((sort) => {
    fetchCards({ sort, page: 1 });
  }, [fetchCards]);

  // Charger au montage
  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return {
    cards,
    loading,
    error,
    pagination,
    fetchCards,
    fetchMyCards,
    createCard,
    updateCard,
    deleteCard,
    searchCards,
    changePage,
    sortCards,
    refetch: fetchCards
  };
};

export default useCards;
