
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  {
    id: 'clothing',
    name: 'Kiyim-kechak',
    description: 'Bolalar uchun zamonaviy kiyimlar',
    image: '/nav/clothing.jpg',
    count: '500+ mahsulot',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'toys',
    name: "O'yinchoqlar",
    description: 'Rivojlantiruvchi va qiziqarli o\'yinchoqlar',
    image: '/nav/toys.jpg',
    count: '300+ mahsulot',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'books',
    name: 'Kitoblar',
    description: 'Ta\'lim va o\'yin kitoblari',
    image: '/nav/books.jpg',
    count: '200+ mahsulot',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'school_supplies',
    name: 'Maktab jihozlari',
    description: 'Maktab va ta\'lim uchun zarur narsalar',
    image: '/nav/school_supplies.jpg',
    count: '150+ mahsulot',
    color: 'from-purple-500 to-purple-600'
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kategoriyalar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bolalar uchun barcha kerakli mahsulotlarni topishning eng oson yo'li
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`} className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`h-48 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover mix-blend-overlay opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
