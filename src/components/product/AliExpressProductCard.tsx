'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, ShoppingCart, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/payload-types';

interface AliExpressProductCardProps {
  product: Product;
}

const AliExpressProductCard: React.FC<AliExpressProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate fake discount and original price for demo
  const discountPercentage = Math.floor(Math.random() * 50) + 10; // 10-60% discount
  const originalPrice = Math.floor(product.price * (1 + discountPercentage / 100));
  const rating = 4.2 + Math.random() * 0.7; // 4.2-4.9 rating
  const reviewCount = Math.floor(Math.random() * 500) + 50; // 50-550 reviews

  return (
    <Card
      className="group relative overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 bg-white rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images?.[0]?.image?.url || '/products/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white text-xs px-2 py-1">
            -{discountPercentage}%
          </Badge>
        )}

        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className={`absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white transition-all duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </Button>
      </div>

      {/* Product Info */}
      <CardContent className="p-3">
        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(originalPrice)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {rating.toFixed(1)} ({reviewCount})
          </span>
        </div>

        {/* Free Shipping */}
        <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
          <Truck className="w-3 h-3" />
          <span>Bepul yetkazib berish</span>
        </div>

        {/* Add to Cart Button - Show on Hover */}
        <div className={`transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <Button 
            size="sm" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 h-7"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic here
            }}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Savatga qo'shish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AliExpressProductCard;
