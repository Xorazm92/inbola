import React from 'react';
import AliExpressProductCard from './AliExpressProductCard';
import { Product } from '@/payload-types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AliExpressProductGridProps {
  products: Product[];
  title?: string;
  currentPage?: number;
  totalPages?: number;
}

export default function AliExpressProductGrid({ 
  products, 
  title = "Mahsulotlar",
  currentPage = 1,
  totalPages = 1
}: AliExpressProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Mahsulotlar topilmadi</h3>
        <p className="text-gray-500">Hozircha bu kategoriyada mahsulotlar mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {title && (
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {title}
          </h2>
        )}

        {/* AliExpress style grid - 5 columns on desktop, responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {products.map((product) => (
            <AliExpressProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            {currentPage > 1 && (
              <Link href={`?page=${currentPage - 1}`}>
                <Button variant="outline" size="sm">Oldingi</Button>
              </Link>
            )}

            <span className="text-sm text-gray-700">
              Sahifa {currentPage} / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link href={`?page=${currentPage + 1}`}>
                <Button variant="outline" size="sm">Keyingi</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
