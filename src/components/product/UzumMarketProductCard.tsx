'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  isNew?: boolean;
  isFavorite?: boolean;
  isExclusive?: boolean;
  isPopular?: boolean;
  installment?: {
    monthlyPayment: number;
    months: number;
  };
}

interface UzumMarketProductCardProps {
  product: Product;
}

const formatUZS = (amount: number) => {
  // Use simple formatting to avoid hydration mismatch
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so\'m';
};

const UzumMarketProductCard: React.FC<UzumMarketProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  return (
    <Card 
      className="group relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Rasm</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isExclusive && (
            <Badge className="bg-uzum-purple hover:bg-uzum-purple text-white text-[10px] px-[6px] py-[2px] font-medium">
              Eksklyuziv
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-[6px] py-[2px] font-medium">
              Aksiya
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-[6px] py-[2px] font-medium">
              Yangi
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-[6px] py-[2px] font-medium">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>

        {/* Quick Actions on Hover */}
        {isHovered && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-2">
            <Button size="sm" className="flex-1 bg-uzum-purple hover:bg-uzum-purple/90 text-white text-xs">
              <ShoppingCart className="w-3 h-3 mr-1" />
              Savat
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="p-3">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-[12px] h-[12px] ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-600 ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-normal text-gray-900 text-[13px] line-clamp-2 mb-2 group-hover:text-uzum-purple transition-colors cursor-pointer leading-[16px]">
            {product.name}
          </h3>
        </Link>

        {/* Installment */}
        {product.installment && (
          <div className="mb-2">
            <div className="text-[11px] text-gray-600">
              {formatUZS(product.installment.monthlyPayment)}/oy
            </div>
          </div>
        )}

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-gray-900">
              {formatUZS(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[12px] text-gray-500 line-through">
                {formatUZS(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UzumMarketProductCard;
