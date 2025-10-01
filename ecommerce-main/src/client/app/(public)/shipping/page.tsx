import React from 'react';
import { Truck, Clock, MapPin, Package, Shield, Globe } from 'lucide-react';

const ShippingPage = () => {
  const shippingOptions = [
    {
      name: "Standart Yetkazib Berish",
      time: "5-7 Ish Kuni",
      cost: "50,000 so'm",
      description: "Kundalik buyurtmalar uchun ishonchli yetkazib berish",
      icon: <Package className="w-8 h-8" />
    },
    {
      name: "Tezkor Yetkazib Berish",
      time: "2-3 Ish Kuni",
      cost: "100,000 so'm",
      description: "Tezroq kerak bo'lganda tezkor yetkazib berish",
      icon: <Truck className="w-8 h-8" />
    },
    {
      name: "Bir Kunlik Yetkazib Berish",
      time: "Keyingi Ish Kuni",
      cost: "200,000 so'm",
      description: "Buyurtmangizni keyingi ish kunida oling",
      icon: <Clock className="w-8 h-8" />
    }
  ];

  const internationalZones = [
    { zone: "1-zona (Markaziy Osiyo)", time: "7-10 Ish Kuni", cost: "150,000 so'm" },
    { zone: "2-zona (Rossiya, Qozog'iston)", time: "10-14 Ish Kuni", cost: "250,000 so'm" },
    { zone: "3-zona (Yevropa, Turkiya)", time: "12-16 Ish Kuni", cost: "300,000 so'm" },
    { zone: "4-zona (Boshqa Mamlakatlar)", time: "14-21 Ish Kuni", cost: "350,000 so'm" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Yetkazib Berish Ma'lumotlari</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Buyurtmalaringizni xavfsiz yetkazib berish uchun tez va ishonchli variantlar
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Domestic Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mahalliy Yetkazib Berish Variantlari</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-indigo-600">{option.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.name}</h3>
                <div className="text-2xl font-bold text-indigo-600 mb-2">{option.cost}</div>
                <div className="text-gray-600 mb-4">{option.time}</div>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-green-800">Bepul Yetkazib Berish Mavjud!</h3>
            </div>
            <p className="text-green-700">
              750,000 so'mdan ortiq buyurtmalarda bepul standart yetkazib berish. Kod kerak emas - chegirma to'lovda avtomatik qo'llaniladi.
            </p>
          </div>
        </div>

        {/* Track Your Order CTA */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Yetkazib Berish Cheklovlari</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Ba'zi mahsulotlar manzilga qarab yetkazib berish cheklovlariga ega bo'lishi mumkin</li>
              <li>• Xavfli materiallar xalqaro miqyosda jo'natilmaydi</li>
              <li>• Katta mahsulotlar maxsus yetkazib berish tartibini talab qilishi mumkin</li>
              <li>• Pochta qutisi manzillari cheklangan yetkazib berish variantlariga ega</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Buyurtmangizni Kuzating</h3>
            <p className="text-gray-600 mb-4">
              Buyurtmangiz jo'natilgandan keyin email orqali kuzatuv raqamini olasiz. Shuningdek, hisobingizda istalgan vaqtda buyurtmangizni kuzatishingiz mumkin.
            </p>
            <a 
              href="/track-order" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Buyurtmani Kuzatish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
