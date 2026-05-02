import { useState, useEffect, useCallback } from 'react';
import { getMovies } from '../lib/api';
import { Movie } from '../types';

export function useMovies(language?: string, search?: string, pageSize = 18) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchMovies = useCallback(async (reset = false) => {
    setLoading(true);
    setError(null);
    const currentPage = reset ? 0 : page;
    const { data, count, error: apiError } = await getMovies(language, search, currentPage, pageSize);
    if (apiError) {
      setError(apiError.message);
    } else {
      setMovies(prev => reset ? (data || []) : [...prev, ...(data || [])]);
      setTotal(count || 0);
    }
    setLoading(false);
  }, [language, search, page, pageSize]);

  // Re-fetch when filters change, always reset to page 0
  useEffect(() => {
    setPage(0);
    setMovies([]);
  }, [language, search]);

  useEffect(() => {
    fetchMovies(page === 0);
  }, [language, search, page]);

  const loadMore = () => setPage(p => p + 1);
  const hasMore = movies.length < total;

  return { movies, loading, error, total, hasMore, loadMore, retry: () => fetchMovies(true) };
}
