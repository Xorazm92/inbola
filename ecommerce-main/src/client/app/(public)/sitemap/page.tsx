import React from 'react';
import { Globe, FileText, ShoppingBag, Users, HelpCircle, Shield } from 'lucide-react';
import Link from 'next/link';

const SitemapPage = () => {
  const siteStructure = [
    {
      category: "Asosiy Sahifalar",
      icon: <Globe className="w-5 h-5" />,
      pages: [
        { name: "Bosh Sahifa", url: "/" },
        { name: "Do'kon", url: "/shop" },
        { name: "Blog", url: "/blog" },
        { name: "Biz Haqimizda", url: "/about" },
        { name: "Bog'lanish", url: "/contact" },
      ]
    },
    {
      category: "Mahsulot Kategoriyalari",
      icon: <ShoppingBag className="w-5 h-5" />,
      pages: [
        { name: "Elektronika", url: "/shop?category=electronics" },
        { name: "Kiyim", url: "/shop?category=clothing" },
        { name: "Poyabzal", url: "/shop?category=footwear" },
        { name: "Mebel", url: "/shop?category=furniture" },
        { name: "Aksessuarlar", url: "/shop?category=accessories" },
      ]
    },
    {
      category: "Foydalanuvchi Hisobi",
      icon: <Users className="w-5 h-5" />,
      pages: [
        { name: "Kirish", url: "/sign-in" },
        { name: "Ro'yxatdan O'tish", url: "/sign-up" },
        { name: "Profil", url: "/profile" },
        { name: "Buyurtmalar", url: "/orders" },
        { name: "Savatcha", url: "/cart" },
      ]
    },
    {
      category: "Yordam va Qo'llab-quvvatlash",
      icon: <HelpCircle className="w-5 h-5" />,
      pages: [
        { name: "Yordam Markazi", url: "/help" },
        { name: "Yetkazib Berish Ma'lumoti", url: "/shipping" },
        { name: "Qaytarish va Almashtirish", url: "/returns" },
        { name: "Buyurtmani Kuzatish", url: "/track-order" },
        { name: "O'lcham Qo'llanmasi", url: "/size-guide" },
      ]
    },
    {
      category: "Kompaniya",
      icon: <FileText className="w-5 h-5" />,
      pages: [
        { name: "Karyera", url: "/careers" },
        { name: "Matbuot", url: "/press" },
      ]
    },
    {
      category: "Huquqiy Ma'lumotlar",
      icon: <Shield className="w-5 h-5" />,
      pages: [
        { name: "Foydalanish Shartlari", url: "/terms" },
        { name: "Maxfiylik Siyosati", url: "/privacy" },
        { name: "Cookies Siyosati", url: "/cookies" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sayt Xaritasi</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Inbola platformasidagi barcha sahifalar va bo'limlar
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteStructure.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <div className="text-indigo-600">{section.icon}</div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.pages.map((page, pageIndex) => (
                  <li key={pageIndex}>
                    <Link
                      href={page.url}
                      className="text-gray-600 hover:text-indigo-600 text-sm flex items-center group transition-colors"
                    >
                      <span className="h-1 w-0 bg-indigo-500 rounded-full mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-200"></span>
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Qo'shimcha Ma'lumot</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">50+ Sahifa</h3>
              <p className="text-gray-600 text-sm">To'liq funksional e-commerce platformasi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">5000+ Mahsulot</h3>
              <p className="text-gray-600 text-sm">Turli kategoriyalarda premium mahsulotlar</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">10K+ Mijoz</h3>
              <p className="text-gray-600 text-sm">Qoniqarli mijozlar va o'suvchi jamiyat</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Qidirgan Sahifangizni Topa Olmadingizmi?</h3>
          <p className="text-gray-600 mb-6">
            Bizning qo'llab-quvvatlash jamoamiz sizga yordam berishga tayyor
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Biz bilan Bog'laning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
