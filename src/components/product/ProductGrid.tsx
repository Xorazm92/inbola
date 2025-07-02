
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductListing from "./ProductListing";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Product } from "@/payload-types";

interface ProductGridProps {
  initialProducts?: Product[];
}

const ProductGrid = ({ initialProducts = [] }: ProductGridProps) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    totalDocs: 0
  });

  const fetchProducts = async (page = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      params.set('limit', '12');

      const response = await fetch(`/api/products?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      if (append) {
        setProducts(prev => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }
      
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, false);
  }, [searchParams]);

  const loadMore = () => {
    if (pagination.hasNextPage && !loading) {
      fetchProducts(pagination.page + 1, true);
    }
  };

  const retry = () => {
    fetchProducts(pagination.page, false);
  };

  if (error && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-4 text-center">{error}</p>
        <Button onClick={retry} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductListing key={product.id} product={product} index={index} />
        ))}
        
        {/* Loading Skeletons */}
        {loading && products.length === 0 && (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        )}
      </div>

      {/* Results Info */}
      {products.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {products.length} of {pagination.totalDocs} products
          </p>
          
          {pagination.hasNextPage && (
            <Button
              onClick={loadMore}
              disabled={loading}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Products'
              )}
            </Button>
          )}
        </div>
      )}

      {/* No Results */}
      {products.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

const ProductSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="aspect-square rounded-lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-1/4" />
  </div>
);

export default ProductGrid;
