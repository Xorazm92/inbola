'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Flame, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import UzumMarketProductCard from '@/components/product/UzumMarketProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';

const flashDeals = [
  {
    id: 1,
    name: "Bolalar konstruktori LEGO",
    originalPrice: 250000,
    salePrice: 180000,
    discount: 28,
    image: "/products/placeholder.svg",
    rating: 4.8,
    reviews: 156,
    sold: 89,
    stock: 23,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  },
  {
    id: 2,
    name: "Bolalar velosipedi",
    originalPrice: 450000,
    salePrice: 320000,
    discount: 29,
    image: "/products/placeholder.svg",
    rating: 4.9,
    reviews: 203,
    sold: 45,
    stock: 12,
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
  },
  {
    id: 3,
    name: "Interaktiv robot o'yinchoq",
    originalPrice: 180000,
    salePrice: 120000,
    discount: 33,
    image: "/products/placeholder.svg",
    rating: 4.7,
    reviews: 89,
    sold: 67,
    stock: 8,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
  },
  {
    id: 4,
    name: "Bolalar kitoblar to'plami",
    originalPrice: 120000,
    salePrice: 85000,
    discount: 29,
    image: "/products/placeholder.svg",
    rating: 4.6,
    reviews: 124,
    sold: 156,
    stock: 34,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
  }
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set a fixed end time to avoid hydration issues
    const endTime = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 hours from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1 text-xs font-mono">
      <Clock className="w-3 h-3" />
      <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
      <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
      <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
}

export default function DealsSection() {
  const { products, loading, error } = useFeaturedProducts(6);

  if (loading) {
    return (
      <section className="bg-white py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
              <Flame className="w-3 h-3 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Flash chegirmalar</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center text-red-500">Mahsulotlarni yuklashda xatolik: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header - Simple like Featured Products */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
              <Flame className="w-3 h-3 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Flash chegirmalar</h2>
            <CountdownTimer />
          </div>
          <Link href="/deals">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-sm">
              Barchasini ko'rish
              <ChevronRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {products.map((product) => (
            <UzumMarketProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.price + 50000, // Fake original price for discount effect
                image: product.images?.[0]?.image?.url || '/products/placeholder.jpg',
                rating: product.rating || 4.5,
                reviews: Math.floor(Math.random() * 100) + 10, // Random reviews
                discount: Math.floor(Math.random() * 30) + 10, // Random discount 10-40%
                isNew: false,
                isFavorite: false,
                isPopular: product.featured,
                installment: {
                  monthlyPayment: Math.ceil(product.price / 12),
                  months: 12
                }
              }}
            />
          ))}
        </div>

        {/* View All Deals */}
        <div className="text-center mt-12">
          <Link href="/deals">
            <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              Barcha chegirmalarni ko'rish
              <Flame className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
