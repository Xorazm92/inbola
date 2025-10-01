import React from 'react';
import { Cookie, Settings, Shield, BarChart3, Target } from 'lucide-react';

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Cookies Siyosati</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Cookies va shunga o'xshash texnologiyalardan qanday foydalanishimiz
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Cookie className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies Nima?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Cookies - bu veb-saytlar tomonidan sizning qurilmangizga saqlanadigan kichik 
              matn fayllari. Ular sayt ishlashini yaxshilash va sizga moslashtirilgan 
              tajriba taqdim etish uchun ishlatiladi.
            </p>
            <p className="text-gray-600">
              Oxirgi yangilanish sanasi: 1 Yanvar, 2025
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">1. Cookies Turlari</h3>
              </div>
              <div className="ml-7 space-y-6">
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-medium text-gray-800 mb-2">Zaruriy Cookies</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Saytning asosiy funksiyalari uchun zarur. Ularni o'chirib bo'lmaydi.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Sessiya boshqaruvi</li>
                    <li>• Xavfsizlik</li>
                    <li>• Savatcha ma'lumotlari</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-gray-800 mb-2">Funksional Cookies</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Sayt funksiyalarini yaxshilash va shaxsiylashtirish uchun.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Til sozlamalari</li>
                    <li>• Foydalanuvchi afzalliklari</li>
                    <li>• Oxirgi ko'rilgan mahsulotlar</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-medium text-gray-800 mb-2">Analitik Cookies</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Sayt foydalanishini tahlil qilish va yaxshilash uchun.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Sahifa ko'rishlari</li>
                    <li>• Foydalanuvchi harakatlari</li>
                    <li>• Sayt ishlashi</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-medium text-gray-800 mb-2">Marketing Cookies</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Moslashtirilgan reklama va marketing uchun.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Reklama moslashuvi</li>
                    <li>• Konversiya kuzatuvi</li>
                    <li>• Ijtimoiy tarmoq integratsiyasi</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <BarChart3 className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">2. Ishlatadigan Cookies</h3>
              </div>
              <div className="ml-7">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nomi</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Maqsadi</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Muddati</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">session_id</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Foydalanuvchi sessiyasi</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Sessiya tugashi</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">cart_items</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Savatcha ma'lumotlari</td>
                        <td className="px-4 py-3 text-sm text-gray-600">30 kun</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">language</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Til sozlamalari</td>
                        <td className="px-4 py-3 text-sm text-gray-600">1 yil</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">analytics</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Sayt analitikasi</td>
                        <td className="px-4 py-3 text-sm text-gray-600">2 yil</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">3. Cookies Boshqaruvi</h3>
              </div>
              <div className="ml-7 space-y-4">
                <p className="text-gray-600">
                  Siz cookies-ni quyidagi usullar bilan boshqarishingiz mumkin:
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Brauzer Sozlamalari</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Chrome: Sozlamalar → Maxfiylik va xavfsizlik → Cookies</li>
                    <li>• Firefox: Sozlamalar → Maxfiylik va xavfsizlik</li>
                    <li>• Safari: Afzalliklar → Maxfiylik</li>
                    <li>• Edge: Sozlamalar → Cookies va sayt ruxsatlari</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Muhim Eslatma</h4>
                  <p className="text-yellow-700 text-sm">
                    Zaruriy cookies-ni o'chirsangiz, saytning ba'zi funksiyalari 
                    to'g'ri ishlamasligi mumkin.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">4. Uchinchi Tomon Cookies</h3>
              </div>
              <div className="ml-7 space-y-4">
                <p className="text-gray-600">
                  Ba'zi hollarda uchinchi tomon xizmatlarining cookies-larini ishlatamiz:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Google Analytics:</strong> Sayt analitikasi uchun</li>
                  <li>• <strong>To'lov tizimlari:</strong> Xavfsiz to'lovlar uchun</li>
                  <li>• <strong>Ijtimoiy tarmoqlar:</strong> Kontent ulashish uchun</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Bog'lanish</h3>
              <p className="text-gray-600 mb-4">
                Cookies bo'yicha savollaringiz bo'lsa, biz bilan bog'laning:
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

export default CookiesPage;
