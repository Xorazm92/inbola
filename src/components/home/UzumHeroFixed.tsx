'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Zap, 
  Gift, 
  Percent, 
  TrendingUp,
  Star
} from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: "Kuz kolleksiyasi",
    subtitle: "Bolalar uchun yangi kiyimlar",
    description: "50% gacha chegirma",
    buttonText: "Xarid qilish",
    bgColor: "from-orange-400 to-red-500",
    textColor: "text-white",
    badge: "Yangi",
    image: "/hero/placeholder.svg"
  },
  {
    id: 2,
    title: "Bo'lib to'lash",
    subtitle: "Uzum Nasiya bilan",
    description: "0% birinchi to'lov",
    buttonText: "Batafsil",
    bgColor: "from-green-400 to-blue-500",
    textColor: "text-white",
    badge: "Mashhur",
    image: "/hero/placeholder.svg"
  },
  {
    id: 3,
    title: "Tez yetkazib berish",
    subtitle: "24 soat ichida",
    description: "Toshkent bo'ylab bepul",
    buttonText: "Buyurtma berish",
    bgColor: "from-purple-400 to-pink-500",
    textColor: "text-white",
    badge: "Tez",
    image: "/hero/placeholder.svg"
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
        {/* Main Hero Slider - 280px height */}
        <div className="relative h-[280px] rounded-lg overflow-hidden">
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
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                      {slide.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  <div className="w-1/2 h-full relative">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
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
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default UzumHero;
