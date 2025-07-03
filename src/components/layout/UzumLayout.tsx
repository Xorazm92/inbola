'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  Menu, 
  X,
  Shirt,
  Gamepad2,
  BookOpen,
  Dumbbell,
  Smartphone,
  Home,
  Heart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'clothing',
    name: 'Kiyim-kechak',
    icon: <Shirt className="w-5 h-5" />,
    count: '500+',
    subcategories: [
      'Ko\'ylaklar',
      'Shimlar',
      'Futbolkalar',
      'Kurtka va paltolar',
      'Ichki kiyimlar',
      'Poyabzallar'
    ]
  },
  {
    id: 'toys',
    name: 'O\'yinchoqlar',
    icon: <Gamepad2 className="w-5 h-5" />,
    count: '300+',
    subcategories: [
      'Rivojlantiruvchi o\'yinchoqlar',
      'Konstruktorlar',
      'Qo\'g\'irchoqlar',
      'Mashinalar',
      'Puzzle va o\'yinlar',
      'Musiqa asboblari'
    ]
  },
  {
    id: 'books',
    name: 'Kitoblar',
    icon: <BookOpen className="w-5 h-5" />,
    count: '200+',
    subcategories: [
      'Ta\'lim kitoblari',
      'Ertaklar',
      'Rang berish kitoblari',
      'Ensiklopediyalar',
      'Komiks va jurnallar'
    ]
  },
  {
    id: 'sports',
    name: 'Sport',
    icon: <Dumbbell className="w-5 h-5" />,
    count: '150+',
    subcategories: [
      'Futbol',
      'Basketbol',
      'Velosiped',
      'Suzish',
      'Gimnastika',
      'Boks va jang san\'ati'
    ]
  },
  {
    id: 'electronics',
    name: 'Elektronika',
    icon: <Smartphone className="w-5 h-5" />,
    count: '100+',
    subcategories: [
      'Planshets',
      'Smart soatlar',
      'Quloqchinlar',
      'O\'yin konsollari',
      'Kameralar'
    ]
  },
  {
    id: 'home',
    name: 'Uy-ro\'zg\'or',
    icon: <Home className="w-5 h-5" />,
    count: '250+',
    subcategories: [
      'Mebel',
      'Dekor',
      'Yotoq jihozlari',
      'Oshxona buyumlari',
      'Tozalash vositalari'
    ]
  },
  {
    id: 'health',
    name: 'Salomatlik',
    icon: <Heart className="w-5 h-5" />,
    count: '80+',
    subcategories: [
      'Vitaminlar',
      'Tibbiy asboblar',
      'Gigiyena vositalari',
      'Birinchi yordam'
    ]
  },
  {
    id: 'beauty',
    name: 'Go\'zallik',
    icon: <Sparkles className="w-5 h-5" />,
    count: '120+',
    subcategories: [
      'Terini parvarish qilish',
      'Soch uchun vositalar',
      'Parfyumeriya',
      'Kosmetika'
    ]
  }
];

interface UzumLayoutProps {
  children: React.ReactNode;
}

const UzumLayout: React.FC<UzumLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Left Sidebar - Categories - Exact Uzum Market sizing */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full overflow-y-auto">
            {/* Sidebar Header - Exact Uzum Market sizing */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-gray-900">Kategoriyalar</h2>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Categories List - Exact Uzum Market sizing */}
            <div className="px-2 py-1">
              {categories.map((category) => (
                <div key={category.id} className="mb-[2px]">
                  <Link href={`/category/${category.id}`}>
                    <div
                      className="flex items-center justify-between px-3 py-[10px] rounded-md hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={(e) => {
                        if (category.subcategories.length > 0) {
                          e.preventDefault();
                          setExpandedCategory(
                            expandedCategory === category.id ? null : category.id
                          );
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-primary group-hover:scale-110 transition-transform">
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {category.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {category.count} mahsulot
                          </div>
                        </div>
                      </div>
                      {category.subcategories.length > 0 && (
                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedCategory === category.id ? 'rotate-90' : ''
                        }`} />
                      )}
                    </div>
                  </Link>

                  {/* Subcategories */}
                  {expandedCategory === category.id && category.subcategories.length > 0 && (
                    <div className="ml-8 mt-2 space-y-1">
                      {category.subcategories.map((subcategory, index) => (
                        <Link 
                          key={index} 
                          href={`/category/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div className="p-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors cursor-pointer">
                            {subcategory}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200 mt-8">
              <Card className="bg-gradient-to-r from-primary/10 to-green-100">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Maxsus takliflar
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Yangi mahsulotlar va chegirmalar haqida birinchi bo'lib xabar oling
                  </p>
                  <Button size="sm" className="w-full">
                    Obuna bo'lish
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-0">
          {/* Mobile Menu Button */}
          <div className="lg:hidden p-4 bg-white border-b">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2"
            >
              <Menu className="w-4 h-4" />
              Kategoriyalar
            </Button>
          </div>

          {/* Page Content */}
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UzumLayout;
