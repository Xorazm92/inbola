'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// Swiper temporarily disabled for compatibility
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

const topBrands = [
  {
    id: 1,
    name: "LEGO",
    logo: "/brands/placeholder.svg",
    description: "Dunyoning eng mashhur konstruktor brendi",
    products: 150,
    rating: 4.9,
    discount: "25% gacha",
    category: "Konstruktorlar",
    featured: true
  },
  {
    id: 2,
    name: "Fisher-Price",
    logo: "/brands/placeholder.svg",
    description: "Rivojlanish o'yinchoqlari bo'yicha yetakchi",
    products: 89,
    rating: 4.8,
    discount: "30% gacha",
    category: "Rivojlanish o'yinchoqlari",
    featured: true
  },
  {
    id: 3,
    name: "Barbie",
    logo: "/brands/placeholder.svg",
    description: "Qizlar uchun eng sevimli qo'g'irchoqlar",
    products: 67,
    rating: 4.7,
    discount: "20% gacha",
    category: "Qo'g'irchoqlar",
    featured: false
  },
  {
    id: 4,
    name: "Hot Wheels",
    logo: "/brands/placeholder.svg",
    description: "Mashinalar va yo'l o'yinlari",
    products: 124,
    rating: 4.8,
    discount: "15% gacha",
    category: "Mashinalar",
    featured: true
  },
  {
    id: 5,
    name: "Playmobil",
    logo: "/brands/placeholder.svg",
    description: "Ijodiy o'yin to'plamlari",
    products: 78,
    rating: 4.6,
    discount: "35% gacha",
    category: "O'yin to'plamlari",
    featured: false
  },
  {
    id: 6,
    name: "Melissa & Doug",
    logo: "/brands/placeholder.svg",
    description: "Ta'limiy va rivojlanish o'yinchoqlari",
    products: 95,
    rating: 4.9,
    discount: "40% gacha",
    category: "Ta'limiy o'yinchoqlar",
    featured: true
  },
  {
    id: 7,
    name: "VTech",
    logo: "/brands/placeholder.svg",
    description: "Elektron ta'limiy o'yinchoqlar",
    products: 56,
    rating: 4.7,
    discount: "25% gacha",
    category: "Elektron o'yinchoqlar",
    featured: false
  },
  {
    id: 8,
    name: "Crayola",
    logo: "/brands/placeholder.svg",
    description: "Rang-barang va ijodiy materiallar",
    products: 112,
    rating: 4.8,
    discount: "30% gacha",
    category: "Ijodiy materiallar",
    featured: true
  }
];

const featuredBrands = topBrands.filter(brand => brand.featured);

export default function BrandsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Mashhur Brendlar
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dunyoning eng yaxshi brendlaridan sifatli mahsulotlar. Har bir brend o'z sohasida yetakchi.
          </p>
        </div>

        {/* Featured Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredBrands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.name.toLowerCase()}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg h-full">
                <CardContent className="p-6 text-center space-y-4">
                  {/* Brand Logo */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>

                  {/* Brand Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {brand.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{brand.rating}</span>
                    </div>
                    <div className="text-gray-600">
                      {brand.products} mahsulot
                    </div>
                  </div>

                  {/* Category */}
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {brand.category}
                  </Badge>

                  {/* Discount */}
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Chegirma {brand.discount}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* All Brands Carousel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Barcha brendlar</h3>
            <Link 
              href="/brands" 
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            >
              Barchasini ko'rish
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>

          {/* Simple grid instead of Swiper */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {topBrands.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.name.toLowerCase()}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary/30">
                  <CardContent className="p-4 text-center">
                    <div className="relative w-16 h-16 mx-auto mb-3">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="64px"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors text-sm">
                      {brand.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {brand.products} mahsulot
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Brand Partnership CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-purple-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Brendingizni qo'shmoqchimisiz?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            INBOLA platformasida o'z brendingizni taqdim eting va minglab mijozlarga yetib boring.
          </p>
          <Link href="/seller/register">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Hamkor bo'lish
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
