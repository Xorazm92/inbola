import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Maxfiylik Siyosati</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Shaxsiy ma'lumotlaringizni qanday himoya qilishimiz haqida
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Maxfiylik Majburiyatimiz</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Inbola sizning maxfiyligingizni himoya qilishga sodiq. Ushbu siyosat 
              shaxsiy ma'lumotlaringizni qanday to'plash, ishlatish va himoya qilishimizni tushuntiradi.
            </p>
            <p className="text-gray-600">
              Oxirgi yangilanish sanasi: 1 Yanvar, 2025
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">1. To'planadigan Ma'lumotlar</h3>
              </div>
              <div className="ml-7 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Shaxsiy Ma'lumotlar:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Ism va familiya</li>
                    <li>• Email manzili</li>
                    <li>• Telefon raqami</li>
                    <li>• Yetkazib berish manzili</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Texnik Ma'lumotlar:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• IP manzili</li>
                    <li>• Brauzer turi va versiyasi</li>
                    <li>• Qurilma ma'lumotlari</li>
                    <li>• Saytda o'tkazilgan vaqt</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">2. Ma'lumotlardan Foydalanish</h3>
              </div>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• Buyurtmalarni qayta ishlash va yetkazib berish</li>
                <li>• Mijozlarga xizmat ko'rsatish</li>
                <li>• Xizmat sifatini yaxshilash</li>
                <li>• Marketing va reklama (rozilik bilan)</li>
                <li>• Qonuniy talablarni bajarish</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">3. Ma'lumotlar Xavfsizligi</h3>
              </div>
              <div className="ml-7 space-y-4">
                <p className="text-gray-600">
                  Biz shaxsiy ma'lumotlaringizni himoya qilish uchun zamonaviy xavfsizlik 
                  choralarini qo'llaymiz:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• SSL shifrlash texnologiyasi</li>
                  <li>• Xavfsiz serverlar va ma'lumotlar bazasi</li>
                  <li>• Muntazam xavfsizlik auditlari</li>
                  <li>• Cheklangan kirish huquqlari</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <UserCheck className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">4. Sizning Huquqlaringiz</h3>
              </div>
              <ul className="space-y-2 text-gray-600 ml-7">
                <li>• Shaxsiy ma'lumotlaringizni ko'rish huquqi</li>
                <li>• Ma'lumotlarni to'g'irlash yoki o'chirish</li>
                <li>• Ma'lumotlar qayta ishlashga e'tiroz bildirish</li>
                <li>• Ma'lumotlar portativligi huquqi</li>
                <li>• Marketing xabarlaridan voz kechish</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies va Kuzatuv</h3>
              <p className="text-gray-600 mb-4">
                Biz sayt tajribasini yaxshilash uchun cookies ishlatamiz. Siz brauzer 
                sozlamalarida cookies-ni boshqarishingiz mumkin.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Maslahat:</strong> Cookies haqida batafsil ma'lumot olish uchun 
                  <a href="/cookies" className="text-blue-600 hover:underline ml-1">Cookies Siyosati</a> 
                  sahifasiga tashrif buyuring.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Uchinchi Tomon Xizmatlari</h3>
              <p className="text-gray-600 mb-4">
                Biz quyidagi uchinchi tomon xizmatlaridan foydalanamiz:
              </p>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• <strong>To'lov tizimlari:</strong> Payme, Click, Uzum Bank</li>
                <li>• <strong>Yetkazib berish:</strong> Mahalliy logistika hamkorlari</li>
                <li>• <strong>Analitika:</strong> Google Analytics (anonim)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Bog'lanish</h3>
              <p className="text-gray-600 mb-4">
                Maxfiylik bo'yicha savollaringiz bo'lsa, biz bilan bog'laning:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-gray-600">
                <p>📧 <strong>Email:</strong> privacy@inbola.uz</p>
                <p>📞 <strong>Telefon:</strong> +998 (97) 777-10-53</p>
                <p>📍 <strong>Manzil:</strong> 123 Savdo Ko'chasi, Toshkent, O'zbekiston</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
