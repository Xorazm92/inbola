import React from 'react';
import ProductListing from './ProductListing';
import { Product } from '@/payload-types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProductGridProps {
  products: Product[];
  title?: string;
  currentPage?: number;
  totalPages?: number;
}

export default function ProductGrid({ 
  products, 
  title = "Mahsulotlar",
  currentPage = 1,
  totalPages = 1
}: ProductGridProps) {
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {title && (
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
            <ProductListing 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            {currentPage > 1 && (
              <Link href={`?page=${currentPage - 1}`}>
                <Button variant="outline">Oldingi</Button>
              </Link>
            )}

            <span className="text-sm text-gray-700">
              Sahifa {currentPage} / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link href={`?page=${currentPage + 1}`}>
                <Button variant="outline">Keyingi</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}