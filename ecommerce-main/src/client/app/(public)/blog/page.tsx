import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "E-commerce Kelajagi: 2024-yilda Kuzatish Kerak Bo'lgan Trendlar",
      excerpt: "E-commerce landshaftini shakllantiruvchi so'nggi trendlarni kashf eting va ular onlayn xarid tajribalariga qanday ta'sir qilishini bilib oling.",
      author: "Sarah Johnson",
      date: "15 Mart, 2024",
      category: "Sanoat Tahlillari",
      image: "/api/placeholder/400/250",
      readTime: "5 daqiqa o'qish"
    },
    {
      id: 2,
      title: "Onlayn Xaridlarda Ishonch Yaratish: Xavfsizlik Eng Yaxshi Amaliyotlari",
      excerpt: "Shaxsiy ma'lumotlaringizni himoya qilish va xavfsiz tranzaksiyalarni ta'minlash uchun amalga oshiradigan xavfsizlik choralarini bilib oling.",
      author: "Mike Chen",
      date: "10 Mart, 2024",
      category: "Xavfsizlik",
      image: "/api/placeholder/400/250",
      readTime: "7 daqiqa o'qish"
    },
    {
      id: 3,
      title: "Barqaror Xarid: Atrof-Muhitga Bo'lgan Majburiyatimiz",
      excerpt: "Barqarorlik tashabbuslarimizni va atrof-muhitga ta'sirimizni qanday kamaytirishga ishlaganligimizni o'rganing.",
      author: "Emma Davis",
      date: "5 Mart, 2024",
      category: "Barqarorlik",
      image: "/api/placeholder/400/250",
      readTime: "4 daqiqa o'qish"
    },
    {
      id: 4,
      title: "Mijozlar Muvaffaqiyat Hikoyalari: Inbola Hayotlarni Qanday O'zgartirdi",
      excerpt: "Mijozlarimizning ilhomli hikoyalarini o'qing va bizning platformamiz ularning hayotida qanday o'zgarish yaratganini bilib oling.",
      author: "David Wilson",
      date: "28 Fevral, 2024",
      category: "Mijoz Hikoyalari",
      image: "/api/placeholder/400/250",
      readTime: "6 daqiqa o'qish"
    },
    {
      id: 5,
      title: "Mobil Tijorat: Xarid Tajribangizni Optimallashtirish",
      excerpt: "Mobil xarid tajribangizni yaxshilash uchun amalga oshirgan xususiyatlar va optimizatsiyalarni kashf eting.",
      author: "Lisa Rodriguez",
      date: "20 Fevral, 2024",
      category: "Texnologiya",
      image: "/api/placeholder/400/250",
      readTime: "5 daqiqa o'qish"
    },
    {
      id: 6,
      title: "Parda Ortida: Mahsulot Tanlash Jarayonimiz",
      excerpt: "Platformamizda mavjud mahsulotlarni qanday tanlab, tayyorlashimizni ichki ko'rinishda bilib oling.",
      author: "John Smith",
      date: "15 Fevral, 2024",
      category: "Parda Ortida",
      image: "/api/placeholder/400/250",
      readTime: "8 daqiqa o'qish"
    }
  ];

  const categories = [
    "Barcha Maqolalar",
    "Soha Tahlillari",
    "Texnologiya",
    "Xavfsizlik",
    "Barqarorlik",
    "Mijoz Hikoyalari",
    "Sahna Ortida"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bizning Blog</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Inbola jamoasidan yangiliklar, hikoyalar va ma'lumotlar
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <h3 className="text-2xl font-bold mb-2">Asosiy Maqola</h3>
                    <p className="text-indigo-100">Jamoamizdan so'nggi ma'lumotlar</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Tag className="w-4 h-4 mr-1" />
                  <span className="mr-4">{blogPosts[0].category}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{blogPosts[0].date}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{blogPosts[0].author}</span>
                  </div>
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center">
                    Batafsil O'qish
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <h4 className="text-lg font-semibold mb-1">Blog Maqolasi</h4>
                  <p className="text-indigo-100 text-sm">Rasm O'rni</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Tag className="w-3 h-3 mr-1" />
                  <span className="mr-3">{post.category}</span>
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="w-3 h-3 mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                    Batafsil O'qish
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
            Ko'proq Maqolalar
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Yangiliklar Bilan Tanishing</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            So'nggi blog maqolalari, mahsulot yangiliklari va maxsus kontentni olish uchun bizning yangiliklar ro'yxatiga obuna bo'ling.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Email manzilingizni kiriting"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Obuna Bo'lish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
