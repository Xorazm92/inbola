import React from 'react';
import { MapPin, Clock, Users, Briefcase, Heart, Zap } from 'lucide-react';

const CareersPage = () => {
  const openPositions = [
    {
      id: 1,
      title: "Katta Frontend Dasturchi",
      department: "Muhandislik",
      location: "Masofaviy",
      type: "To'liq vaqt",
      description: "React, Next.js va zamonaviy veb texnologiyalar bilan ajoyib foydalanuvchi tajribalarini yaratish uchun frontend jamoamizga qo'shiling."
    },
    {
      id: 2,
      title: "Mahsulot Menejeri",
      department: "Mahsulot",
      location: "Toshkent, O'zbekiston",
      type: "To'liq vaqt",
      description: "E-commerce platformamiz uchun mahsulot strategiyasi va rivojlantirishni boshqaring, muhandislik va dizayn jamoalari bilan yaqin hamkorlik qiling."
    },
    {
      id: 3,
      title: "Mijozlar Muvaffaqiyati Mutaxassisi",
      department: "Mijozlar Muvaffaqiyati",
      location: "Masofaviy",
      type: "To'liq vaqt",
      description: "Ajoyib qo'llab-quvvatlash va uzoq muddatli munosabatlar o'rnatish orqali mijozlarimizning muvaffaqiyatiga yordam bering."
    },
    {
      id: 4,
      title: "Marketing Mutaxassisi",
      department: "Marketing",
      location: "Toshkent, O'zbekiston",
      type: "To'liq vaqt",
      description: "Ijodiy marketing kampaniyalari, kontent yaratish va ma'lumotlarga asoslangan strategiyalar orqali o'sishni rag'batlantiring."
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Sog'liq va Farovonlik",
      description: "To'liq sog'liq sug'urtasi, tish, ko'z va sog'liqni saqlash dasturlari"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Ish-Hayot Muvozanati",
      description: "Moslashuvchan soatlar, masofadan ish imkoniyati va cheksiz dam olish kunlari"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "O'sish va O'rganish",
      description: "Professional rivojlanish byudjeti, konferensiyalar va o'rganish imkoniyatlari"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Ajoyib Jamoa",
      description: "Ishini yaxshi ko'rgan qiziqarli va iste'dodli odamlar bilan ishlash"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Jamoamizga Qo'shiling</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Ishini yaxshi ko'rgan qiziqarli odamlar bilan e-commerce kelajagini qurish
            </p>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nega Biz bilan Ishlash Kerak?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Inbola'da biz ajoyib mahsulotlar ajoyib odamlardan kelib chiqishini hisoblaymiz. Biz maxsus narsa qurmoqdamiz va sizni ham qatnashishingizni xohlaymiz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-indigo-600">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position) => (
              <div key={position.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                    <p className="text-gray-600 mb-4">{position.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {position.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {position.type}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                      Hozir Ariza Topshirish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Culture */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Bizning Madaniyatimiz</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Biz farq yaratadigan mahsulotlar qurishga ishtiyoqli yaratuvchilar, innovatorlar va muammolarni hal qiluvchilar xilma-xil jamoasimiz. Biz hamkorlik, ijodkorlik va doimiy o'rganishni qadrlaymiz.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-indigo-100">Jamoa A'zolari</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-indigo-100">Mamlakatlar</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-indigo-100">Masofadan Ishga Qulay</div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Application Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apply</h3>
              <p className="text-gray-600 text-sm">Arizangiz va rezyumeyingizni topshiring</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ko'rib Chiqish</h3>
              <p className="text-gray-600 text-sm">Arizangizni e'tibor bilan ko'rib chiqamiz</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Suhbat</h3>
              <p className="text-gray-600 text-sm">Jamoamiz bilan tanishing va ko'proq bilib oling</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Xush Kelibsiz</h3>
              <p className="text-gray-600 text-sm">Jamoa'ga qo'shiling va ta'sir ko'rsatishni boshlang</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">To'g'ri lavozimni ko'rmadingizmi?</h2>
          <p className="text-gray-600 mb-6">
            Biz har doim iste'dodli odamlarni qidirmoqdamiz. Rezyumeyingizni yuboring va kelajakdagi imkoniyatlar uchun sizni esda tutamiz.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Bog'laning
          </a>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
