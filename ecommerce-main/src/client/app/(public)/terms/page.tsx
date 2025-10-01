import React from 'react';
import { FileText, Shield, Users, AlertCircle } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Foydalanish Shartlari</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Inbola platformasidan foydalanish qoidalari va shartlari
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Umumiy Qoidalar</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Inbola veb-saytidan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz. 
              Agar siz ushbu shartlarga rozi bo'lmasangiz, iltimos, saytdan foydalanmang.
            </p>
            <p className="text-gray-600">
              Oxirgi yangilanish sanasi: 1 Yanvar, 2025
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">1. Foydalanuvchi Majburiyatlari</h3>
              </div>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• To'g'ri va aniq ma'lumotlar taqdim etish</li>
                <li>• Hisobingizning xavfsizligini ta'minlash</li>
                <li>• Qonuniy maqsadlarda foydalanish</li>
                <li>• Boshqa foydalanuvchilarning huquqlarini hurmat qilish</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">2. Xarid va To'lov Shartlari</h3>
              </div>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• Barcha narxlar O'zbekiston so'mida ko'rsatilgan</li>
                <li>• To'lov Payme, Click, Uzum Bank orqali amalga oshiriladi</li>
                <li>• Buyurtma tasdiqlangandan keyin bekor qilish cheklangan</li>
                <li>• Yetkazib berish xizmati alohida hisoblash</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <AlertCircle className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">3. Qaytarish va Almashtirish</h3>
              </div>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• 30 kunlik qaytarish muddati</li>
                <li>• Mahsulot asl holatida bo'lishi kerak</li>
                <li>• Qaytarish xarajatlari mijoz zimmasida</li>
                <li>• Maxsus buyurtma mahsulotlari qaytarilmaydi</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Intellektual Mulk</h3>
              <p className="text-gray-600 mb-4">
                Inbola veb-saytidagi barcha kontent, dizayn, logo va boshqa materiallar 
                mualliflik huquqi bilan himoyalangan. Ruxsatsiz nusxalash va tarqatish taqiqlanadi.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Javobgarlik Cheklovi</h3>
              <p className="text-gray-600 mb-4">
                Inbola texnik nosozliklar, ma'lumotlar yo'qolishi yoki boshqa zararlar 
                uchun cheklangan javobgarlikka ega. Biz xizmat sifatini ta'minlashga 
                harakat qilamiz, lekin 100% kafolat bera olmaymiz.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Bog'lanish</h3>
              <p className="text-gray-600">
                Ushbu shartlar bo'yicha savollaringiz bo'lsa, biz bilan bog'laning:
              </p>
              <div className="mt-4 space-y-2 text-gray-600">
                <p>📧 Email: inbola.uz@gmail.com</p>
                <p>📞 Telefon: +998 (97) 777-10-53</p>
                <p>📍 Manzil: 123 Savdo Ko'chasi, Toshkent, O'zbekiston</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
