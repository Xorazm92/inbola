import React from 'react';
import { Search, Package, Truck, MapPin, CheckCircle } from 'lucide-react';

const TrackOrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Buyurtmangizni Kuzating</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Real vaqtda kuzatuv ma'lumotlarini ko'rish uchun buyurtma tafsilotlarini kiriting
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Posilkangizni Kuzating</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Buyurtma Raqami
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Buyurtma raqamingizni kiriting (masalan, ORD-123456)"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Manzili
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Buyurtma uchun ishlatilgan emailni kiriting"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Buyurtmani Kuzatish
            </button>
          </form>
        </div>

        {/* Sample tracking result - would be dynamic in real app */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Buyurtma Holati</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Buyurtma Tasdiqlandi</h4>
                <p className="text-sm text-gray-500">15 Mart, 2024 soat 14:30</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Posilka Tayyorlandi</h4>
                <p className="text-sm text-gray-500">16 Mart, 2024 soat 10:15</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Yo'lda</h4>
                <p className="text-sm text-gray-500">17 Mart, 2024 soat 08:00</p>
              </div>
            </div>
            <div className="flex items-center opacity-50">
              <div className="bg-gray-100 p-2 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Yetkazib Berish Uchun</h4>
                <p className="text-sm text-gray-500">Taxminiy: 18 Mart, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
