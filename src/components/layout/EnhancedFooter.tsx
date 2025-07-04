'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Send,
  Heart,
  Star,
  Shield,
  Truck,
  CreditCard,
  Clock
} from 'lucide-react';

const EnhancedFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-700">
        <div className="container-responsive py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Yangiliklar va maxsus takliflardan xabardor bo'ling
            </h3>
            <p className="text-neutral-300 mb-8 text-lg">
              Eng yaxshi takliflar va yangi mahsulotlar haqida birinchi bo'lib bilib oling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Email manzilingizni kiriting"
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder-neutral-400 focus:bg-white/20"
              />
              <Button className="h-12 px-8 bg-primary-600 hover:bg-primary-700">
                <Send className="w-4 h-4 mr-2" />
                Obuna bo'lish
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-responsive py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">INBOLA</h3>
                  <p className="text-sm text-neutral-400">Bolalar dunyosi</p>
                </div>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Bolalar uchun eng sifatli va xavfsiz mahsulotlarni taklif etuvchi onlayn do'kon. 
                Har bir mahsulot ehtiyotkorlik bilan tanlanadi.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>info@inbola.uz</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>Toshkent, O'zbekiston</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Tezkor havolalar</h4>
            <ul className="space-y-3">
              {[
                { name: "Bosh sahifa", href: "/" },
                { name: "Mahsulotlar", href: "/products" },
                { name: "Kategoriyalar", href: "/categories" },
                { name: "Aksiyalar", href: "/deals" },
                { name: "Yangiliklar", href: "/news" },
                { name: "Biz haqimizda", href: "/about" },
                { name: "Aloqa", href: "/contact" },
                { name: "Yordam", href: "/help" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Kategoriyalar</h4>
            <ul className="space-y-3">
              {[
                { name: "O'yinchoqlar", href: "/category/toys" },
                { name: "Kitoblar", href: "/category/books" },
                { name: "Kiyimlar", href: "/category/clothing" },
                { name: "Sport buyumlari", href: "/category/sports" },
                { name: "Maktab buyumlari", href: "/category/school" },
                { name: "Elektronika", href: "/category/electronics" },
                { name: "Uy-ro'zg'or", href: "/category/home" },
                { name: "Go'zallik", href: "/category/beauty" }
              ].map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Mijozlar xizmati</h4>
            <ul className="space-y-3">
              {[
                { name: "Yetkazib berish", href: "/delivery" },
                { name: "To'lov usullari", href: "/payment" },
                { name: "Qaytarish", href: "/returns" },
                { name: "Kafolat", href: "/warranty" },
                { name: "FAQ", href: "/faq" },
                { name: "Maxfiylik siyosati", href: "/privacy" },
                { name: "Foydalanish shartlari", href: "/terms" },
                { name: "Shikoyatlar", href: "/complaints" }
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-neutral-700">
        <div className="container-responsive py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-12 bg-success-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold">Bepul yetkazib berish</h5>
                <p className="text-sm text-neutral-400">100,000 so'm dan yuqori</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold">Sifat kafolati</h5>
                <p className="text-sm text-neutral-400">1 yillik kafolat</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-12 bg-warning-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold">Xavfsiz to'lov</h5>
                <p className="text-sm text-neutral-400">SSL shifrlash</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold">24/7 qo'llab-quvvatlash</h5>
                <p className="text-sm text-neutral-400">Doimo yordamda</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-700">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <span>© 2024 INBOLA. Barcha huquqlar himoyalangan.</span>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-neutral-400 text-sm">Bizni kuzatib boring:</span>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                  { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                  { icon: Twitter, href: "#", color: "hover:text-blue-300" },
                  { icon: Youtube, href: "#", color: "hover:text-red-400" }
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-neutral-400 ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
