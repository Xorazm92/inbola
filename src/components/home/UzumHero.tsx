'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, TrendingUp, Zap, Gift, Percent } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const heroSlides = [
  {
    id: 1,
    title: "Kuz kolleksiyasi",
    subtitle: "Bolalar uchun yangi kiyimlar",
    description: "50% gacha chegirma",
    image: "/hero/placeholder.svg",
    bgColor: "from-orange-400 to-red-500",
    textColor: "text-white",
    cta: "Xarid qilish",
    badge: "Yangi"
  },
  {
    id: 2,
    title: "Bo'lib to'lash",
    subtitle: "Uzum Nasiya bilan",
    description: "0% birinchi to'lov",
    image: "/hero/placeholder.svg",
    bgColor: "from-green-400 to-blue-500",
    textColor: "text-white",
    cta: "Batafsil",
    badge: "Mashhur"
  },
  {
    id: 3,
    title: "Tez yetkazib berish",
    subtitle: "24 soat ichida",
    description: "Toshkent bo'ylab bepul",
    image: "/hero/placeholder.svg",
    bgColor: "from-purple-400 to-pink-500",
    textColor: "text-white",
    cta: "Buyurtma berish",
    badge: "Tez"
  }
];

const quickActions = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Flash chegirmalar",
    subtitle: "24 soat",
    color: "bg-red-500",
    href: "/flash-deals"
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Sovg'alar",
    subtitle: "Bepul",
    color: "bg-purple-500",
    href: "/gifts"
  },
  {
    icon: <Percent className="w-6 h-6" />,
    title: "Chegirmalar",
    subtitle: "70% gacha",
    color: "bg-orange-500",
    href: "/discounts"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Mashhur",
    subtitle: "Top 100",
    color: "bg-green-500",
    href: "/trending"
  }
];

const UzumHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white">
      <div className="mb-8">
        {/* Main Hero Slider - 400px height */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className={`w-full h-full bg-gradient-to-r ${slide.bgColor} relative`}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-1/2 p-8 lg:p-12">
                        <Badge className="mb-4 bg-white/20 text-white border-white/30">
                          {slide.badge}
                        </Badge>
                        <h2 className={`text-3xl lg:text-5xl font-bold mb-2 ${slide.textColor}`}>
                          {slide.title}
                        </h2>
                        <p className={`text-lg lg:text-xl mb-2 ${slide.textColor} opacity-90`}>
                          {slide.subtitle}
                        </p>
                        <p className={`text-2xl lg:text-3xl font-bold mb-6 ${slide.textColor}`}>
                          {slide.description}
                        </p>
                        <Button 
                          size="lg" 
                          className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                        >
                          {slide.cta}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                      <div className="w-1/2 h-full relative">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">10K+</div>
            <div className="text-sm text-gray-600">Mahsulotlar</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">1K+</div>
            <div className="text-sm text-gray-600">Brendlar</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">50K+</div>
            <div className="text-sm text-gray-600">Mijozlar</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <div className="text-2xl lg:text-3xl font-bold text-primary">4.9</div>
            </div>
            <div className="text-sm text-gray-600">Reyting</div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default UzumHero;
