'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  CreditCard,
  Truck,
  Shield,
  Clock
} from 'lucide-react';

const UzumFooter = () => {
  const footerSections = [
    {
      title: "INBOLA haqida",
      links: [
        { name: "Biz haqimizda", href: "/about" },
        { name: "Vakansiyalar", href: "/careers" },
        { name: "Yangiliklar", href: "/news" },
        { name: "Investorlar", href: "/investors" },
        { name: "Hamkorlik", href: "/partnership" }
      ]
    },
    {
      title: "Foydalanuvchilar uchun",
      links: [
        { name: "Buyurtma berish", href: "/how-to-order" },
        { name: "To'lov usullari", href: "/payment-methods" },
        { name: "Yetkazib berish", href: "/delivery" },
        { name: "Qaytarish", href: "/returns" },
        { name: "Yordam", href: "/help" }
      ]
    },
    {
      title: "Sotuvchilar uchun",
      links: [
        { name: "Sotuvchi bo'lish", href: "/sell" },
        { name: "Sotuvchi markazi", href: "/seller-center" },
        { name: "Qo'llanma", href: "/seller-guide" },
        { name: "Komissiya", href: "/commission" },
        { name: "Yordam", href: "/seller-help" }
      ]
    }
  ];

  const paymentMethods = [
    { name: "Click", logo: "/payment/placeholder.svg" },
    { name: "Payme", logo: "/payment/placeholder.svg" },
    { name: "Uzum Nasiya", logo: "/payment/placeholder.svg" },
    { name: "Humo", logo: "/payment/placeholder.svg" },
    { name: "UzCard", logo: "/payment/placeholder.svg" }
  ];

  const appDownloads = [
    { name: "App Store", logo: "/app/app-store.svg", href: "#" },
    { name: "Google Play", logo: "/app/google-play.svg", href: "#" }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">INBOLA</h1>
                  <p className="text-xs text-gray-500">Kids Marketplace</p>
                </div>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bolalar uchun eng yaxshi va xavfsiz mahsulotlar. 
                Sifat kafolati va tez yetkazib berish bilan.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-primary" />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@inbola.uz</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Toshkent, O'zbekiston</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Ijtimoiy tarmoqlar</h3>
              <div className="flex gap-3">
                <Link href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Yangiliklar va maxsus takliflar
              </h3>
              <p className="text-gray-600 text-sm">
                Eng so'nggi mahsulotlar va chegirmalar haqida birinchi bo'lib xabar oling
              </p>
            </div>
            <div className="flex gap-3">
              <Input 
                type="email" 
                placeholder="Email manzilingizni kiriting"
                className="flex-1"
              />
              <Button>Obuna bo'lish</Button>
            </div>
          </div>
        </div>

        {/* Payment Methods & App Downloads */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">To'lov usullari</h3>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="w-12 h-8 bg-gray-100 rounded border flex items-center justify-center">
                    <Image
                      src={method.logo}
                      alt={method.name}
                      width={32}
                      height={20}
                      className="object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* App Downloads */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Mobil ilovani yuklab oling</h3>
              <div className="flex gap-3">
                {appDownloads.map((app, index) => (
                  <Link key={index} href={app.href}>
                    <div className="w-32 h-10 bg-gray-100 rounded border flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Image
                        src={app.logo}
                        alt={app.name}
                        width={120}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Tez yetkazib berish</div>
                <div className="text-xs text-gray-600">24 soat ichida</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Sifat kafolati</div>
                <div className="text-xs text-gray-600">100% kafolat</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">Xavfsiz to'lov</div>
                <div className="text-xs text-gray-600">SSL himoya</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">24/7 yordam</div>
                <div className="text-xs text-gray-600">Doimo yordamda</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2024 INBOLA. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                Maxfiylik siyosati
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
                Foydalanish shartlari
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-primary transition-colors">
                Cookie siyosati
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UzumFooter;
