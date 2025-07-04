import { useState, useEffect } from 'react';
import { Product } from './useProducts';

interface SearchResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

export function useSearch(query: string, debounceMs = 300): SearchResult {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotalResults(0);
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          search: query.trim(),
          limit: '20',
        });

        const response = await fetch(`/api/products/search?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.products || []);
        setTotalResults(data.totalDocs || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search error occurred');
        setResults([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, debounceMs]);

  return {
    products: results,
    loading,
    error,
    totalResults,
  };
}
