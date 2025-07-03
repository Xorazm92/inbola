'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Flame } from 'lucide-react';
import Link from 'next/link';
import UzumProductCard from '@/components/product/UzumProductCard';

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

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
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
  }, [endTime]);

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
  return (
    <section className="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Flash Chegirmalar
            </h2>
            <Flame className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cheklangan vaqt uchun maxsus chegirmalar! Tezroq bo'ling, mahsulotlar tugab qolishi mumkin.
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {flashDeals.map((deal) => (
            <UzumProductCard
              key={deal.id}
              product={{
                id: deal.id,
                name: deal.name,
                price: deal.salePrice,
                originalPrice: deal.originalPrice,
                image: deal.image,
                rating: deal.rating,
                reviews: deal.reviews,
                discount: deal.discount,
                isNew: false,
                isFavorite: false,
                installment: {
                  monthlyPayment: Math.ceil(deal.salePrice / 12),
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
