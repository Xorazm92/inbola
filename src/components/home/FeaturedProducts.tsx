
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import EnhancedProductCard from '@/components/product/EnhancedProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';

const featuredProducts = [
  {
    id: 1,
    name: 'Bolalar uchun rangli ko\'ylak',
    price: 89000,
    originalPrice: 120000,
    image: '/products/placeholder.svg',
    rating: 4.8,
    reviews: 124,
    discount: 26,
    isNew: false,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Rivojlantiruvchi o\'yinchoq',
    price: 45000,
    originalPrice: null,
    image: '/products/placeholder.svg',
    rating: 4.9,
    reviews: 89,
    discount: 0,
    isNew: true,
    isFavorite: true
  },
  {
    id: 3,
    name: 'Bolalar uchun kitob to\'plami',
    price: 67000,
    originalPrice: 80000,
    image: '/products/placeholder.svg',
    rating: 4.7,
    reviews: 156,
    discount: 16,
    isNew: false,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Maktab sumkasi',
    price: 125000,
    originalPrice: 150000,
    image: '/products/placeholder.svg',
    rating: 4.6,
    reviews: 203,
    discount: 17,
    isNew: false,
    isFavorite: true
  }
];

function formatPrice(price: number) {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
}

export default function FeaturedProducts() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Star className="w-3 h-3 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Tavsiya etilgan mahsulotlar
            </h2>
          </div>
          <Link href="/products">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-sm">
              Barchasini ko'rish
              <ChevronRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {featuredProducts.map((product) => (
            <EnhancedProductCard
              key={product.id}
              product={{
                ...product,
                id: product.id.toString(),
                installment: {
                  monthlyPayment: Math.ceil(product.price / 12),
                  months: 12
                },
                category: 'Bolalar mahsulotlari',
                badges: product.isNew ? ['Yangi'] : []
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
