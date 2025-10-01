import React from 'react';
import { Search, HelpCircle, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';

const HelpPage = () => {
  const faqCategories = [
    {
      title: "Buyurtmalar va Yetkazib Berish",
      questions: [
        {
          question: "Buyurtmamni qanday kuzatishim mumkin?",
          answer: "Buyurtmangizni 'Buyurtmani Kuzatish' sahifasiga kirib, buyurtma raqami va email manzilingizni kiritish orqali kuzatishingiz mumkin. Buyurtmangiz jo'natilgandan keyin email orqali kuzatuv ma'lumotlarini olasiz."
        },
        {
          question: "Yetkazib berish variantlaringiz qanday?",
          answer: "Biz standart yetkazib berish (5-7 ish kuni), tezkor yetkazib berish (2-3 ish kuni) va bir kunlik yetkazib berish xizmatlarini taklif qilamiz. Yetkazib berish narxi joylashuv va buyurtma qiymatiga qarab o'zgaradi."
        },
        {
          question: "Buyurtmamni o'zgartirish yoki bekor qilishim mumkinmi?",
          answer: "Buyurtmangizni berganingizdan keyin 1 soat ichida o'zgartirish yoki bekor qilishingiz mumkin. Undan keyin yordam olish uchun mijozlarga xizmat jamoamiz bilan bog'laning."
        }
      ]
    },
    {
      title: "Qaytarish va Pulni Qaytarish",
      questions: [
        {
          question: "Qaytarish siyosatingiz qanday?",
          answer: "Biz ko'pchilik mahsulotlar uchun 30 kunlik qaytarish siyosatini taklif qilamiz. Mahsulotlar asl holatida va yorliqlari bilan bo'lishi kerak. Shaxsiy buyurtma mahsulotlari kabi ba'zi mahsulotlar qaytarilmaydi."
        },
        {
          question: "Mahsulotni qanday qaytarishim mumkin?",
          answer: "Qaytarish sahifamizga tashrif buyuring, buyurtma ma'lumotlaringizni kiriting va ko'rsatmalarga amal qiling. Biz mos qaytarishlar uchun oldindan to'langan qaytarish yorlig'ini taqdim etamiz."
        },
        {
          question: "Pullarimni qachon qaytarib olaman?",
          answer: "Qaytarilgan mahsulotni olganimizdan keyin 5-7 ish kuni ichida pul qaytariladi. Pul asl to'lov usulingizga qaytariladi."
        }
      ]
    },
    {
      title: "Hisob va To'lov",
      questions: [
        {
          question: "Hisobni qanday yaratishim mumkin?",
          answer: "Har qanday sahifaning yuqori qismidagi 'Ro'yxatdan O'tish' tugmasini bosing, emailingizni kiriting va parol yarating. Shuningdek, Google, Facebook yoki Twitter hisobingiz orqali ro'yxatdan o'tishingiz mumkin."
        },
        {
          question: "Qanday to'lov usullarini qabul qilasiz?",
          answer: "Biz Payme, Click, Uzum Bank, Visa, MasterCard, Humo va UzCard to'lov tizimlarini qabul qilamiz."
        },
        {
          question: "To'lov ma'lumotlarim xavfsizmi?",
          answer: "Ha, biz sanoat standartidagi SSL shifrlash texnologiyasidan foydalanamiz va ma'lumotlaringiz xavfsizligini ta'minlash uchun ishonchli to'lov protsessorlari bilan ishlaymiz."
        }
      ]
    },
    {
      title: "Mahsulotlar va Narxlar",
      questions: [
        {
          question: "Mahsulot rasmlari aniqmi?",
          answer: "Biz aniq mahsulot rasmlari va tavsiflarini ko'rsatishga harakat qilamiz. Biroq, monitor sozlamalari tufayli ranglar biroz farq qilishi mumkin. Batafsil spetsifikatsiyalar uchun mahsulot tavsifini tekshiring."
        },
        {
          question: "Narx moslashtirish xizmatini taklif qilasizmi?",
          answer: "Hozirda narx moslashtirish xizmatini taklif qilmaymiz, lekin narxlarimizni raqobatbardosh bo'lishini ta'minlash uchun muntazam ravishda ko'rib chiqamiz. Maxsus chegirmalarni olish uchun yangiliklar ro'yxatiga obuna bo'ling."
        },
        {
          question: "Mahsulot mavjudligini qanday bilishim mumkin?",
          answer: "Zaxira mavjudligi har bir mahsulot sahifasida ko'rsatilgan. Agar mahsulot mavjud bo'lmasa, qayta zaxiralash xabarnomalariga obuna bo'lishingiz mumkin."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Jonli Suhbat",
      description: "Qo'llab-quvvatlash jamoamiz bilan real vaqtda suhbatlashing",
      availability: "24/7",
      action: "Suhbatni Boshlash"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telefon Qo'llab-quvvatlash",
      description: "Qo'llab-quvvatlash vakili bilan bevosita gaplashing",
      availability: "Dush-Jum 9:00-18:00",
      action: "Hozir Qo'ng'iroq Qiling"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Qo'llab-quvvatlash",
      description: "Muammoingiz haqida batafsil xabar yuboring",
      availability: "24 soat ichida javob",
      action: "Email Yuborish"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Yordam Markazi</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Savollaringizga javob toping va kerakli yordamni oling
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full px-6 py-4 pl-12 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Help Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get Help Now</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-indigo-600">{option.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-sm text-gray-500 mb-4">{option.availability}</p>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-3 text-indigo-600" />
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <details key={faqIndex} className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="mt-4 p-4 text-gray-600 bg-white border-l-4 border-indigo-500">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Help Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Help Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "How to place an order",
              "Setting up your account",
              "Understanding shipping costs",
              "Using discount codes",
              "Managing your wishlist",
              "Updating payment methods"
            ].map((article, index) => (
              <a
                key={index}
                href="#"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {article}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Step-by-step guide to help you {article.toLowerCase()}.
                </p>
                <div className="flex items-center text-indigo-600 text-sm font-medium">
                  Read Article
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our customer support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
