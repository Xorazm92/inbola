
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredProducts = [
  {
    id: 1,
    name: 'Bolalar uchun rangli ko\'ylak',
    price: 89000,
    originalPrice: 120000,
    image: '/nav/clothing.jpg',
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
    image: '/nav/toys.jpg',
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
    image: '/nav/books.jpg',
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
    image: '/nav/school_supplies.jpg',
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tavsiya etilgan mahsulotlar
            </h2>
            <p className="text-gray-600">
              Eng mashhur va sifatli mahsulotlar
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" size="lg">
              Barchasini ko'rish
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      YANGI
                    </Badge>
                  )}
                  {product.discount > 0 && (
                    <Badge variant="destructive">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>

                {/* Favorite button */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Heart className={`w-4 h-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>

                {/* Quick actions */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Savatga qo'shish
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
