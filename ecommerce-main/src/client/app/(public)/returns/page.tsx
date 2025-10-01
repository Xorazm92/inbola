import React from 'react';
import { RotateCcw, Package, CheckCircle, Clock } from 'lucide-react';

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Qaytarish va Almashtirish</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              30 kunlik siyosatimiz bilan oson qaytarish va almashtirish
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Qaytarish Siyosati</h2>
          <p className="text-gray-600 mb-4">
            Biz sizning xaridingizdan to'liq qoniqishingizni xohlaymiz. Agar buyurtmangizdan mamnun bo'lmasangiz, 
            ko'pchilik mahsulotlarni yetkazib berilganidan keyin 30 kun ichida to'liq pul qaytarish uchun qaytarishingiz mumkin.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">30 Kunlik Muddat</h3>
              <p className="text-gray-600 text-sm">Yetkazib berilganidan keyin 30 kun ichida qaytaring</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Asl Holat</h3>
              <p className="text-gray-600 text-sm">Mahsulotlar ishlatilmagan va asl yorliqlari bilan bo'lishi kerak</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bepul Qaytarish</h3>
              <p className="text-gray-600 text-sm">Biz oldindan to'langan qaytarish yorliqlarini taqdim etamiz</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Qaytarishni Boshlash</h2>
          <p className="text-indigo-100 mb-6">
            Mahsulotni qaytarish kerakmi? Biz sizni jarayon bo'ylab bosqichma-bosqich yo'naltirамiz.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Qaytarish Jarayonini Boshlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
