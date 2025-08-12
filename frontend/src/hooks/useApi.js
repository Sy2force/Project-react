import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer les appels API
 * @param {string} url - URL de l'API
 * @param {object} options - Options de la requête
 * @returns {object} - {data, loading, error, refetch}
 */
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      };

      const response = await fetch(url, {
        method: 'GET',
        ...options,
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

/**
 * Hook pour les mutations API (POST, PUT, DELETE)
 * @param {string} url - URL de l'API
 * @param {object} options - Options de la requête
 * @returns {object} - {mutate, loading, error, data}
 */
export const useMutation = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (payload = null) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      };

      const response = await fetch(url, {
        method: 'POST',
        ...options,
        headers,
        ...(payload && { body: JSON.stringify(payload) })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Mutation Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { mutate, loading, error, data };
};

export default useApi;
