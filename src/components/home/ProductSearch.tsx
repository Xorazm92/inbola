
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_CATEGORIES } from "@/lib/kids-config";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchFilters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  featured: boolean;
}

const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<SearchFilters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'createdAt',
    featured: searchParams.get('featured') === 'true'
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedSearch = useDebounce(filters.search, 500);

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: '-createdAt', label: 'Oldest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: '-name', label: 'Name: Z to A' },
    { value: '-rating', label: 'Highest Rated' }
  ];

  const buildSearchUrl = useMemo(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.sort !== 'createdAt') params.set('sort', filters.sort);
    if (filters.featured) params.set('featured', 'true');

    return params.toString();
  }, [debouncedSearch, filters]);

  useEffect(() => {
    const url = buildSearchUrl ? `/products?${buildSearchUrl}` : '/products';
    router.push(url);
  }, [buildSearchUrl, router]);

  const handleFilterChange = (key: keyof SearchFilters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
      featured: false
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.featured,
    filters.sort !== 'createdAt'
  ].filter(Boolean).length;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                Filters
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Sort */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort by</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Separator />

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Categories</option>
                  {PRODUCT_CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <Separator />

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={filters.featured}
                  onChange={(e) => handleFilterChange('featured', e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured Products Only
                </label>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Category: {PRODUCT_CATEGORIES.find(c => c.value === filters.category)?.label}
              <button onClick={() => handleFilterChange('category', '')}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.minPrice && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Min: ${filters.minPrice}
              <button onClick={() => handleFilterChange('minPrice', '')}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.maxPrice && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Max: ${filters.maxPrice}
              <button onClick={() => handleFilterChange('maxPrice', '')}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.featured && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1">
              Featured
              <button onClick={() => handleFilterChange('featured', false)}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
