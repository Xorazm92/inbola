'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatUZS } from '@/lib/utils';

interface UzumProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    discount?: number;
    isNew?: boolean;
    isFavorite?: boolean;
    installment?: {
      monthlyPayment: number;
      months: number;
    };
  };
}

const UzumProductCard: React.FC<UzumProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className="group relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Badges - Exact Uzum Market sizing */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
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
          className={`absolute top-2 right-2 w-8 h-8 p-0 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Actions - Show on Hover */}
        <div className={`absolute bottom-2 left-2 right-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-white">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Savatga
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info - Exact Uzum Market sizing */}
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

        {/* Product Name - Exact Uzum Market sizing */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-normal text-gray-900 text-[13px] line-clamp-2 mb-2 group-hover:text-primary transition-colors cursor-pointer leading-[16px]">
            {product.name}
          </h3>
        </Link>

        {/* Installment Info */}
        {product.installment && (
          <div className="mb-2">
            <div className="text-xs text-primary font-medium">
              {formatUZS(product.installment.monthlyPayment)}/oy
            </div>
            <div className="text-xs text-gray-500">
              {product.installment.months} oy muddatga
            </div>
          </div>
        )}

        {/* Price - Exact Uzum Market sizing */}
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

          {/* Uzum Nasiya */}
          <div className="text-[11px] text-green-600 font-medium">
            Uzum Nasiya {formatUZS(Math.ceil(product.price / 12))}/oy
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UzumProductCard;
