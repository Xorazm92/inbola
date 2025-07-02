'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Flame, Zap, Star, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatUZS } from '@/lib/utils';

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
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Discount Badge */}
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
                    -{deal.discount}%
                  </Badge>
                  
                  {/* Wishlist Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  
                  {/* Flash Sale Indicator */}
                  <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Flash Sale
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* Product Name */}
                  <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                    {deal.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(deal.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {deal.rating} ({deal.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-red-600">
                        {formatUZS(deal.salePrice)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatUZS(deal.originalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Sotildi: {deal.sold}</span>
                      <span>Qoldi: {deal.stock}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(deal.sold / (deal.sold + deal.stock)) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex items-center justify-between">
                    <CountdownTimer endTime={deal.endTime} />
                    <span className="text-xs text-red-600 font-medium">
                      Tugashiga
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Savatga qo'shish
                  </Button>
                </CardContent>
              </div>
            </Card>
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
