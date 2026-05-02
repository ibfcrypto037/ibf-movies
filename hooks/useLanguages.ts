import { useState, useEffect } from 'react';
import { getLanguages } from '../lib/api';
import { Language } from '../types';

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLanguages() {
      setLoading(true);
      const { data, error: apiError } = await getLanguages();
      if (apiError) {
        setError(apiError.message);
      } else {
        setLanguages(data || []);
      }
      setLoading(false);
    }
    fetchLanguages();
  }, []);

  return { languages, loading, error };
}
