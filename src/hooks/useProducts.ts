import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: Array<{
    image: {
      url: string;
      alt?: string;
    };
  }>;
  featured: boolean;
  inStock: boolean;
  rating: number;
  size?: string[];
  color?: string[];
  ageGroup?: string;
  approvedForSale: 'pending' | 'approved' | 'denied';
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    totalPages: number;
    totalDocs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

interface UseProductsOptions {
  category?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        
        if (options.category) params.append('category', options.category);
        if (options.featured) params.append('featured', 'true');
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.page) params.append('page', options.page.toString());
        if (options.search) params.append('search', options.search);
        if (options.minPrice) params.append('minPrice', options.minPrice.toString());
        if (options.maxPrice) params.append('maxPrice', options.maxPrice.toString());

        const response = await fetch(`/api/products?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    options.category,
    options.featured,
    options.limit,
    options.page,
    options.search,
    options.minPrice,
    options.maxPrice,
  ]);

  return {
    products: data?.products || [],
    pagination: data?.pagination,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      // Re-trigger useEffect
    },
  };
}

export function useFeaturedProducts(limit = 8) {
  return useProducts({ featured: true, limit });
}

export function useProductsByCategory(category: string, limit = 12) {
  return useProducts({ category, limit });
}
