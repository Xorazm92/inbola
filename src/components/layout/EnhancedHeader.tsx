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
  Menu,
  Phone,
  MapPin,
  Truck,
  CreditCard,
  Globe,
  ChevronDown,
  Bell,
  Gift,
  Star
} from 'lucide-react';

const EnhancedHeader = () => {
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

  return (
    <header className="bg-white shadow-xl border-b border-neutral-200 sticky top-0 z-50">
      {/* Top Bar - Enhanced */}
      <div className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 border-b border-neutral-200">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors cursor-pointer group">
                <MapPin className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Toshkent</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors cursor-pointer group">
                <Phone className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium">+998 71 123 45 67</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-success-700 hover:text-success-800 transition-colors cursor-pointer group">
                <Truck className="w-4 h-4 text-success-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Bepul yetkazib berish</span>
              </div>
              <div className="flex items-center gap-2 text-warning-700 hover:text-warning-800 transition-colors cursor-pointer group">
                <CreditCard className="w-4 h-4 text-warning-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Bo'lib to'lash</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors cursor-pointer group">
                <Gift className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Bonuslar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-responsive">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover-lift">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                INBOLA
              </h1>
              <p className="text-xs text-neutral-500 font-medium">Bolalar dunyosi</p>
            </div>
          </Link>

          {/* Search Bar - Enhanced */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Qidiruv... (masalan: o'yinchoq, kitob, kiyim)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-16 h-14 rounded-2xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 text-base placeholder-neutral-400 shadow-sm group-hover:shadow-md"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-2 h-10 w-12 px-0 rounded-xl bg-gradient-primary hover:shadow-lg transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              {/* Search suggestions could go here */}
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-3 hover:bg-primary-50 rounded-xl transition-all duration-300 group">
              <Bell className="w-5 h-5 text-neutral-600 group-hover:text-primary-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-error-500 hover:bg-error-600">
                3
              </Badge>
            </Button>

            {/* Wishlist */}
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="relative p-3 hover:bg-red-50 rounded-xl transition-all duration-300 group">
                <Heart className="w-5 h-5 text-neutral-600 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                {mounted && favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600 animate-pulse">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative p-3 hover:bg-green-50 rounded-xl transition-all duration-300 group">
                <ShoppingCart className="w-5 h-5 text-neutral-600 group-hover:text-green-600 group-hover:scale-110 transition-all" />
                {mounted && getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-green-500 hover:bg-green-600 animate-bounce">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-3 p-3 hover:bg-primary-50 rounded-xl transition-all duration-300 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:block font-medium text-neutral-700 group-hover:text-primary-600">
                    {mounted ? (user ? user.name || user.email : 'Kirish') : 'Kirish'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-primary-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-0 rounded-xl">
                {mounted && user ? (
                  <>
                    <div className="p-3 border-b border-neutral-100 mb-2">
                      <p className="font-semibold text-neutral-900">{user.name || 'Foydalanuvchi'}</p>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                      {user.role === 'admin' && (
                        <Badge className="mt-1 bg-primary-100 text-primary-800">Administrator</Badge>
                      )}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                        <User className="w-4 h-4 text-primary-600" />
                        Profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                        <ShoppingCart className="w-4 h-4 text-primary-600" />
                        Buyurtmalar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                        <Heart className="w-4 h-4 text-primary-600" />
                        Sevimlilar
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50">
                          <Star className="w-4 h-4 text-purple-600" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <div className="border-t border-neutral-100 mt-2 pt-2">
                      <DropdownMenuItem 
                        onClick={logout}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
                      >
                        Chiqish
                      </DropdownMenuItem>
                    </div>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                        <User className="w-4 h-4 text-primary-600" />
                        Kirish
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50">
                        <Star className="w-4 h-4 text-green-600" />
                        Ro'yxatdan o'tish
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-3 hover:bg-primary-50 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 shadow-lg animate-slide-up">
          <div className="container-responsive py-4">
            <div className="space-y-4">
              <Link href="/favorites" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Sevimlilar</span>
                {mounted && favoritesCount > 0 && (
                  <Badge className="ml-auto bg-red-500">{favoritesCount}</Badge>
                )}
              </Link>
              <Link href="/cart" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                <ShoppingCart className="w-5 h-5 text-green-500" />
                <span>Savat</span>
                {mounted && getTotalItems() > 0 && (
                  <Badge className="ml-auto bg-green-500">{getTotalItems()}</Badge>
                )}
              </Link>
              {mounted && user ? (
                <>
                  <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                    <User className="w-5 h-5 text-primary-600" />
                    <span>Profil</span>
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                    <ShoppingCart className="w-5 h-5 text-primary-600" />
                    <span>Buyurtmalar</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50">
                    <User className="w-5 h-5 text-primary-600" />
                    <span>Kirish</span>
                  </Link>
                  <Link href="/register" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50">
                    <Star className="w-5 h-5 text-green-600" />
                    <span>Ro'yxatdan o'tish</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default EnhancedHeader;
