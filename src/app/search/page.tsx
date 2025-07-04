'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import UzumMarketProductCard from '@/components/product/UzumMarketProductCard';
import { useSearch } from '@/hooks/useSearch';
import { Search, Filter } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, loading, error, totalResults } = useSearch(query);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Qidiruv natijalari: "{query}"
            </h1>
            <p className="text-gray-600">Qidirilmoqda...</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Qidiruv xatoligi</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Qidiruv natijalari: "{query}"
          </h1>
          <p className="text-gray-600">
            {totalResults} ta mahsulot topildi
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filtrlar
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Eng mos keluvchi</option>
              <option>Narx: arzondan qimmmatga</option>
              <option>Narx: qimmatdan arzonga</option>
              <option>Yangi mahsulotlar</option>
              <option>Eng ko'p sotilgan</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Hech narsa topilmadi
            </h2>
            <p className="text-gray-600 mb-4">
              "{query}" bo'yicha qidiruv natijalari yo'q
            </p>
            <div className="text-sm text-gray-500">
              <p>Qidiruv takliflarimiz:</p>
              <ul className="mt-2 space-y-1">
                <li>• So'zlarni to'g'ri yozganingizni tekshiring</li>
                <li>• Boshqa kalit so'zlarni sinab ko'ring</li>
                <li>• Umumiy so'zlarni ishlating</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <UzumMarketProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.price + 30000,
                  image: product.images?.[0]?.image?.url || '/products/placeholder.jpg',
                  rating: product.rating || 4.5,
                  reviews: Math.floor(Math.random() * 100) + 10,
                  discount: Math.floor(Math.random() * 25) + 5,
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
        )}
      </div>
    </div>
  );
}
