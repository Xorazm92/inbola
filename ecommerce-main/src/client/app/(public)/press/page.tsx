import React from 'react';
import { Calendar, Download, ExternalLink, Award, TrendingUp } from 'lucide-react';

const PressPage = () => {
  const pressReleases = [
    {
      id: 1,
      title: "Inbola 10,000 Faol Mijoz Chegarasiga Yetdi",
      date: "20 Mart, 2024",
      excerpt: "Inbola 10,000 faol mijozga erishishni nishonlaydi, bu kompaniyaning o'sish yo'lidagi muhim bosqichdir.",
      category: "Kompaniya Yangiliklari"
    },
    {
      id: 2,
      title: "Yetakchi Logistika Provayderiga Yangi Hamkorlik E'lon Qilindi",
      date: "10 Mart, 2024",
      excerpt: "Strategik hamkorlik yetkazib berish imkoniyatlarini kuchaytiradi va butun dunyo bo'ylab mijozlar uchun yetkazib berish variantlarini kengaytiradi.",
      category: "Hamkorliklar"
    },
    {
      id: 3,
      title: "Inbola Barqarorlik Tashabbusini Ishga Tushirdi",
      date: "25 Fevral, 2024",
      excerpt: "Keng qamrovli barqarorlik dasturining bir qismi sifatida yangi ekologik toza qadoqlash va uglerod-neytral yetkazib berish variantlari joriy etildi.",
      category: "Barqarorlik"
    },
    {
      id: 4,
      title: "2023-yil 4-chorak O'sish Hisoboti: Yillik 150% O'sish",
      date: "15 Fevral, 2024",
      excerpt: "2023 yil davomida mijozlarni jalb qilish va platforma yaxshilanishlari tufayli kuchli moliyaviy ko'rsatkichlar.",
      category: "Moliyaviy"
    }
  ];

  const mediaKit = [
    {
      title: "Kompaniya Logo Paketi",
      description: "Turli formatlarda yuqori sifatli logotiplar (PNG, SVG, EPS)",
      fileSize: "2.5 MB"
    },
    {
      title: "Brend Qo'llanmalari",
      description: "To'liq brend identifikatsiyasi qo'llanmalari va foydalanish ko'rsatmalari",
      fileSize: "8.1 MB"
    },
    {
      title: "Mahsulot Skrinshotlari",
      description: "Platformamiz va mobil ilovamizning yuqori sifatli skrinshotlari",
      fileSize: "15.3 MB"
    },
    {
      title: "Rahbariyat Suratlari",
      description: "Rahbariyat jamoasi a'zolarining professional suratlari",
      fileSize: "5.7 MB"
    }
  ];

  const awards = [
    {
      title: "2024-yilning Eng Yaxshi E-commerce Platformasi",
      organization: "Texnologik Innovatsiya Mukofotlari",
      year: "2024"
    },
    {
      title: "Mijozlar Tanlovi Mukofoti",
      organization: "E-commerce Mukammalligi",
      year: "2023"
    },
    {
      title: "Chakana Savdo Texnologiyasida Yuksaluvchi Yulduz",
      organization: "Chakana Savdo Texnologiyasi Sharhi",
      year: "2023"
    }
  ];

  const stats = [
    { label: "Faol Mijozlar", value: "10,000+" },
    { label: "Mavjud Mahsulotlar", value: "5,000+" },
    { label: "Xizmat Ko'rsatilgan Mamlakatlar", value: "50+" },
    { label: "Mijozlar Qoniqishi", value: "99%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Matbuot Markazi</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Inbola'dan so'nggi yangiliklar, matbuot relizlari va media resurslari
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kompaniya Bir Qarashda</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">So'nggi Matbuot Relizlari</h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <article key={release.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2 md:mb-0">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">{release.date}</span>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                      {release.category}
                    </span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                    To'liq Relizni O'qish
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{release.title}</h3>
                <p className="text-gray-600">{release.excerpt}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Media Kit */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Media Paketi</h2>
            <p className="text-gray-600 mb-8">
              Yuqori sifatli aktivlar, brend qo'llanmalari va kompaniya ma'lumotlari uchun media paketimizni yuklab oling.
            </p>
            <div className="space-y-4">
              {mediaKit.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <span className="text-xs text-gray-500">{item.fileSize}</span>
                  </div>
                  <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Mukofotlar va E'tirof</h2>
            <p className="text-gray-600 mb-8">
              Sanoat yetakchilari va tashkilotlar tomonidan e'tirof etilganimizdan faxrlanamiz.
            </p>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{award.title}</h3>
                      <p className="text-gray-600 text-sm">{award.organization}</p>
                      <span className="text-xs text-gray-500">{award.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Media So'rovlari</h2>
              <p className="text-indigo-100 mb-6">
                Matbuot so'rovlari, intervyu so'rovlari yoki qo'shimcha ma'lumot uchun media jamoamiz bilan bog'laning.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> press@inbola.uz</p>
                <p><strong>Telefon:</strong> +998 (97) 777-10-53</p>
                <p><strong>Javob Vaqti:</strong> 24 soat ichida</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Tezkor Ma'lumotlar</h2>
              <div className="space-y-2 text-indigo-100">
                <p><strong>Tashkil etilgan:</strong> 2020</p>
                <p><strong>Bosh ofis:</strong> Toshkent, O'zbekiston</p>
                <p><strong>Soha:</strong> E-commerce Texnologiyasi</p>
                <p><strong>Missiya:</strong> Premium mahsulotlarni hammaga oson yetkazish</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yangilanishlardan Xabardor Bo'ling</h2>
          <p className="text-gray-600 mb-6">
            So'nggi matbuot relizlari va kompaniya yangiliklarini olish uchun obuna bo'ling.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Email manzilingizni kiriting"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
              Obuna Bo'lish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
