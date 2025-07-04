'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Gift, 
  Truck, 
  Shield,
  Zap,
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: "Bolalar uchun katta chegirmalar",
    subtitle: "80% gacha chegirma",
    description: "O'yinchoqlar, kiyimlar va boshqa buyumlarga",
    image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/9a2cdfb6ae844d8e.jpg?q=20",
    buttonText: "Xarid qilish",
    buttonLink: "/category/toys"
  },
  {
    id: 2,
    title: "Maktab buyumlari",
    subtitle: "25,000 so'mdan",
    description: "Yangi o'quv yili uchun barcha kerakli narsalar",
    image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a5ab3c6b0f8b5e7f.jpg?q=20",
    buttonText: "Xarid qilish",
    buttonLink: "/category/school"
  },
  {
    id: 3,
    title: "Bolalar kiyimlari",
    subtitle: "50% gacha chegirma",
    description: "Eng yaxshi brendlardan arzon narxlarda",
    image: "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/b4e5b2e5c5d5e5f5.jpg?q=20",
    buttonText: "Xarid qilish",
    buttonLink: "/category/clothes"
  }
];

const categories = [
  { name: "O'yinchoqlar", icon: "🧸", href: "/category/toys" },
  { name: "Kiyimlar", icon: "👕", href: "/category/clothes" },
  { name: "Kitoblar", icon: "📚", href: "/category/books" },
  { name: "Sport buyumlari", icon: "⚽", href: "/category/sports" },
  { name: "Maktab buyumlari", icon: "🎒", href: "/category/school" },
  { name: "Elektronika", icon: "📱", href: "/category/electronics" },
  { name: "Chaqaloq buyumlari", icon: "🍼", href: "/category/baby" },
  { name: "San'at va hunarmandchilik", icon: "🎨", href: "/category/arts" },
  { name: "Muzika asboblari", icon: "🎵", href: "/category/music" },
];

const EnhancedHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="bg-white">
      {/* Categories Navigation - Flipkart Style */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-[1248px] mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex flex-col items-center gap-1 px-3 py-2 text-gray-700 hover:text-[#2874f0] transition-colors duration-200 text-xs font-medium"
              >
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="max-w-[1248px] mx-auto px-4 py-4">
        <div className="w-full">

          <div
            className="relative h-[280px] overflow-hidden rounded-lg"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Hero Banner - Exact Flipkart Blue Style */}
            <div className="w-full h-full bg-gradient-to-r from-[#2874f0] to-[#4285f4] relative">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-8 w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
                <div className="absolute top-12 right-12 w-8 h-8 bg-white rounded-full opacity-30"></div>
                <div className="absolute bottom-8 left-16 w-12 h-12 bg-yellow-300 rounded-full opacity-25"></div>
                <div className="absolute bottom-16 right-8 w-6 h-6 bg-white rounded-full opacity-40"></div>
              </div>

              {/* Main Content */}
              <div className="relative z-10 h-full flex items-center justify-between px-12">
                {/* Left Content */}
                <div className="text-white max-w-md">
                  {/* Big Badge */}
                  <div className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold text-sm mb-4 inline-block">
                    KATTA CHEGIRMALAR
                  </div>

                  <h1 className="text-4xl font-bold mb-2 text-yellow-300">
                    Aksiya boshlandi!
                  </h1>
                  <h2 className="text-xl mb-4 font-medium">
                    Bolalar buyumlariga 80% gacha chegirma
                  </h2>

                  {/* Discount Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-white px-3 py-1 rounded text-xs font-semibold text-red-600">
                      CHEGIRMA
                    </div>
                    <span className="text-sm">Darhol 15% chegirma*</span>
                  </div>
                </div>

                {/* Right Illustration */}
                <div className="flex-1 flex justify-center items-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-4xl">🎁</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows - Flipkart Style */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                onClick={nextSlide}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Slide Indicators - Flipkart Style */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section - Bolalar uchun arzon narxlar */}
      <div className="bg-white">
        <div className="max-w-[1248px] mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">50,000 so'mgacha</h2>
          <div className="grid grid-cols-7 gap-4">
            {[
              { name: "O'yinchoqlar", price: "50,000 so'mgacha", image: "🧸", color: "bg-pink-50" },
              { name: "Bolalar kiyimlari", price: "45,000 so'mgacha", image: "👶", color: "bg-blue-50" },
              { name: "Kitoblar", price: "25,000 so'mgacha", image: "📚", color: "bg-green-50" },
              { name: "Sport buyumlari", price: "40,000 so'mgacha", image: "⚽", color: "bg-red-50" },
              { name: "Maktab buyumlari", price: "35,000 so'mgacha", image: "🎒", color: "bg-yellow-50" },
              { name: "San'at buyumlari", price: "30,000 so'mgacha", image: "🎨", color: "bg-purple-50" },
              { name: "Chaqaloq buyumlari", price: "60,000 so'mgacha", image: "🍼", color: "bg-orange-50" }
            ].map((item, index) => (
              <div key={index} className={`${item.color} rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer`}>
                <div className="text-4xl mb-2">{item.image}</div>
                <h3 className="font-medium text-sm text-gray-800 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-600">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
