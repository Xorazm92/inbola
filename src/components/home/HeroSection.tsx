'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, TrendingUp, Users, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// Swiper temporarily disabled for compatibility
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

const heroSlides = [
  {
    id: 1,
    title: "Bolalar uchun eng yaxshi mahsulotlar",
    subtitle: "Sifat va xavfsizlik kafolati bilan",
    description: "10,000+ mahsulot, 1000+ brend, 50,000+ mamnun mijoz",
    image: "/hero/placeholder.svg",
    cta: "Xarid qilishni boshlash",
    badge: "Yangi kolleksiya",
    stats: [
      { label: "Mahsulotlar", value: "10K+" },
      { label: "Brendlar", value: "1K+" },
      { label: "Mijozlar", value: "50K+" }
    ]
  },
  {
    id: 2,
    title: "Tez va bepul yetkazib berish",
    subtitle: "24 soat ichida eshigingizgacha",
    description: "Toshkent bo'ylab bepul yetkazib berish, boshqa viloyatlarga arzon narxda",
    image: "/hero/placeholder.svg",
    cta: "Yetkazib berish haqida",
    badge: "Bepul yetkazib berish",
    stats: [
      { label: "Yetkazib berish", value: "24h" },
      { label: "Bepul", value: "100K+" },
      { label: "Shaharlar", value: "50+" }
    ]
  },
  {
    id: 3,
    title: "Ishonchli to'lov tizimlari",
    subtitle: "Click, Payme, Uzum nasiya va boshqalar",
    description: "Xavfsiz to'lov, pul qaytarish kafolati, 24/7 yordam",
    image: "/hero/placeholder.svg",
    cta: "To'lov usullari",
    badge: "Xavfsiz to'lov",
    stats: [
      { label: "To'lov usullari", value: "10+" },
      { label: "Xavfsizlik", value: "100%" },
      { label: "Yordam", value: "24/7" }
    ]
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Simple slide without Swiper */}
        <div className="relative">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
                {/* Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {slide.badge}
                    </Badge>
                    
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      {slide.title}
                    </h1>
                    
                    <h2 className="text-xl lg:text-2xl text-gray-600 font-medium">
                      {slide.subtitle}
                    </h2>
                    
                    <p className="text-lg text-gray-600 max-w-lg">
                      {slide.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6">
                    {slide.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-primary">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="text-lg px-8 py-6">
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                      Katalogni ko'rish
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">4.9/5 (2,500+ sharh)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">50,000+ mamnun mijoz</span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative">
                  <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-purple-100">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={slide.id === 1}
                    />
                    
                    {/* Floating Cards */}
                    <div className="absolute top-4 right-4">
                      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">1000+ yangi mahsulot</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="absolute bottom-4 left-4">
                      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm font-medium">Yuqori sifat</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern Styles */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}
