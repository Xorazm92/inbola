'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  Phone,
  Menu,
  ChevronDown,
  Star,
  Truck,
  CreditCard,
  Globe
} from 'lucide-react';

const UzumHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { getTotalItems } = useCart();
  const { favoritesCount } = useFavorites();
  const { user, logout } = useAuth();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: "Bolalar kiyimlari", href: "/category/clothing", icon: "👕" },
    { name: "O'yinchoqlar", href: "/category/toys", icon: "🧸" },
    { name: "Kitoblar", href: "/category/books", icon: "📚" },
    { name: "Sport", href: "/category/sports", icon: "⚽" },
    { name: "Elektronika", href: "/category/electronics", icon: "📱" },
    { name: "Uy-ro'zg'or", href: "/category/home", icon: "🏠" },
    { name: "Salomatlik", href: "/category/health", icon: "💊" },
    { name: "Go'zallik", href: "/category/beauty", icon: "💄" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar - Exact Uzum Market sizing */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Toshkent</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+998 71 123 45 67</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Bepul yetkazib berish</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Bo'lib to'lash</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-primary">
                  <Globe className="w-4 h-4" />
                  <span>O'zbek</span>
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>O'zbek</DropdownMenuItem>
                  <DropdownMenuItem>Русский</DropdownMenuItem>
                  <DropdownMenuItem>English</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Exact Uzum Market sizing */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo - Exact Uzum Market style */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-[20px] font-bold text-gray-900 leading-tight">INBOLA</h1>
              <p className="text-[11px] text-gray-500 leading-none">Bolalar uchun marketplace</p>
            </div>
          </Link>



          {/* Search Bar - Expanded */}
          <div className="flex-1 max-w-[700px] mx-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Mahsulotlarni qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-[52px] h-[44px] rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-[2px] top-[2px] h-[40px] w-[48px] px-0 rounded-lg"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="relative p-2">
                <Heart className="w-5 h-5" />
                {mounted && favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {mounted && getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 p-2">
                  <User className="w-5 h-5" />
                  <span className="hidden md:block">
                    {mounted ? (user ? user.name || user.email : 'Kirish') : 'Kirish'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {mounted && user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Buyurtmalar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">Sevimlilar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Chiqish
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Kirish</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Ro'yxatdan o'tish</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Categories Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-10 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              <span>Yangi mijozlar uchun 50% chegirma! Birinchi buyurtmangizni bering</span>
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UzumHeader;
