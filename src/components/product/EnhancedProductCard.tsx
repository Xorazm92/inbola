'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye, 
  Zap,
  Gift,
  Truck,
  Shield,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    discount?: number;
    isNew?: boolean;
    isFavorite?: boolean;
    isPopular?: boolean;
    installment?: {
      monthlyPayment: number;
      months: number;
    };
    badges?: string[];
    category?: string;
  };
}

const EnhancedProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace(/,/g, ' ') + ' so\'m';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success('Mahsulot savatga qo\'shildi!', {
      description: product.name,
      action: {
        label: 'Savatni ko\'rish',
        onClick: () => window.location.href = '/cart',
      },
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    toast.success(
      isFavorite(product.id) ? 'Sevimlilardan olib tashlandi' : 'Sevimlilarga qo\'shildi!',
      {
        description: product.name,
      }
    );
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  return (
    <Link href={`/product/${product.id}`}>
      <div 
        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-200 hover:border-primary-300 hover:-translate-y-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
          <Image
            src={product.image || '/products/placeholder.jpg'}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 animate-pulse flex items-center justify-center">
              <div className="text-4xl text-neutral-400">📦</div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <Badge className="bg-error-500 text-white font-bold px-2 py-1 rounded-lg shadow-lg animate-pulse">
                -{discountPercentage}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-success-500 text-white font-bold px-2 py-1 rounded-lg shadow-lg">
                <Zap className="w-3 h-3 mr-1" />
                Yangi
              </Badge>
            )}
            {product.isPopular && (
              <Badge className="bg-warning-500 text-white font-bold px-2 py-1 rounded-lg shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                TOP
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <Button
              size="sm"
              variant="secondary"
              className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleToggleFavorite}
            >
              <Heart 
                className={`w-4 h-4 transition-all duration-300 ${
                  isFavorite(product.id) 
                    ? 'text-red-500 fill-red-500 scale-110' 
                    : 'text-neutral-600 hover:text-red-500'
                }`} 
              />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Eye className="w-4 h-4 text-neutral-600 hover:text-primary-600" />
            </Button>
          </div>

          {/* Quick Add to Cart */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Savatga qo'shish
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category */}
          {product.category && (
            <Badge variant="outline" className="text-xs text-primary-600 border-primary-200">
              {product.category}
            </Badge>
          )}

          {/* Title */}
          <h3 className="font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!)
                        ? 'text-warning-500 fill-warning-500'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600">
                {product.rating} ({product.reviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-neutral-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            {/* Installment */}
            {product.installment && (
              <div className="flex items-center gap-1 text-sm text-success-600">
                <Gift className="w-4 h-4" />
                <span>
                  {formatPrice(product.installment.monthlyPayment)}/oy, {product.installment.months} oy
                </span>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3" />
              <span>Bepul yetkazish</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Kafolat</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Tez yetkazish</span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
    </Link>
  );
};

export default EnhancedProductCard;
