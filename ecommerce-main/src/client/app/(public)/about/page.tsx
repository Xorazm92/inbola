import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Inbola Haqida</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              2020-yildan beri sizga ishonchli premium e-commerce xizmatlari
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Bizning Tariximiz</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Inbola oddiy maqsadda tashkil etilgan: premium mahsulotlarni hammaga oson yetkazish. Katta orzular bilan boshlangan kichik jamoa hozir minglab mijozlarga xizmat ko'rsatuvchi ishonchli e-commerce platformaga aylandi.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Biz xarid oddiy tranzaksiyadan ko'ra ko'proq narsa bo'lishi kerak deb hisoblaymiz – bu sizning hayotingizga quvonch, qulaylik va qiymat keltiradigan tajriba bo'lishi kerak. Biz tanlagan har bir mahsulot, yaratgan har bir xususiyat va taqdim etgan har bir xizmat siz uchun mo'ljallangan.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Raqamlar bilan</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-indigo-100">Qoniqarli Mijozlar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5K+</div>
                  <div className="text-indigo-100">Mahsulotlar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-indigo-100">Mamlakatlar</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">99%</div>
                  <div className="text-indigo-100">Qoniqarlik</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Bizning Qadriyatlarimiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mijoz Birinchi O'rinda</h3>
              <p className="text-gray-600">
                Har bir qarorimiz mijozlarimizdan boshlanadi. Sizning qoniqarligingiz bizning muvaffaqiyatimiz.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sifatga e'tibor</h3>
              <p className="text-gray-600">
                Biz har bir mahsulotni e'tiborli ravishda tanlab, uning sifati yuqori standartlarga javob berishini ta'minlaymiz.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ajoyiblik</h3>
              <p className="text-gray-600">
                Biz har bir narsada ajoyiblikka intilamiz, mahsulot tanlashdan tortib mijozlarga xizmat ko'rsatishgacha.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ishonch</h3>
              <p className="text-gray-600">
                Biz mijozlarimizga ajoyib xarid tajribasi yaratish uchun doimiy ravishda takomillashtiramiz va innovatsiya qilamiz.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Bizning Jamoa</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Inbola ortida e-commerce, texnologiya va eng muhimi, mijozlarimizga xizmat ko'rsatishga ishonchli jamoa bor.
          </p>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Bizning Safarga Qo'shil</h3>
            <p className="text-indigo-100 mb-6">
              Biz doimiy ravishda ajoyiblikka intiluvchi iste'dodli shaxslarni qidirmoqdamiz.
            </p>
            <a 
              href="/careers" 
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Bo'sh Ish O'rinlarini Ko'rish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
