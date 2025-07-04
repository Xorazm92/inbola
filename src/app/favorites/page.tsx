'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/contexts/FavoritesContext';
import UzumMarketProductCard from '@/components/product/UzumMarketProductCard';
import { ArrowLeft, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  images?: Array<{ image?: { url?: string } }>;
  rating?: number;
  featured?: boolean;
}

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        // Fetch products by IDs
        const response = await fetch('/api/products?limit=50');
        const data = await response.json();
        
        if (data.success && data.products) {
          const favoriteProducts = data.products.filter((product: Product) => 
            favorites.includes(product.id)
          );
          setProducts(favoriteProducts);
        }
      } catch (error) {
        console.error('Error fetching favorite products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Bosh sahifaga qaytish
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Sevimli mahsulotlar</h1>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Bosh sahifaga qaytish
          </Link>

          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sevimli mahsulotlar yo'q</h1>
            <p className="text-gray-600 mb-8">
              Hozircha sevimli mahsulotlar ro'yxati bo'sh. Yoqtirgan mahsulotlaringizni qo'shing!
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                Mahsulotlarni ko'rish
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Bosh sahifaga qaytish
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Sevimli mahsulotlar ({products.length})
            </h1>
          </div>
          
          <p className="text-gray-600">
            Sizning yoqtirgan mahsulotlaringiz ro'yxati
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <UzumMarketProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.price + 30000, // Fake original price for discount effect
                image: product.images?.[0]?.image?.url || '/products/placeholder.jpg',
                rating: product.rating || 4.5,
                reviews: Math.floor(Math.random() * 100) + 10, // Random reviews
                discount: Math.floor(Math.random() * 25) + 5, // Random discount 5-30%
                isNew: false,
                isFavorite: true, // All products in favorites are favorite
                isPopular: product.featured,
                installment: {
                  monthlyPayment: Math.ceil(product.price / 12),
                  months: 12
                }
              }}
            />
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="mr-4">
              Boshqa mahsulotlarni ko'rish
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
