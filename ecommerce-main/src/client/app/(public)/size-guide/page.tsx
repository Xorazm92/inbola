import React from 'react';
import { Ruler, User, Shirt, Footprints } from 'lucide-react';

const SizeGuidePage = () => {
  const clothingSizes = [
    { size: 'XS', chest: '32-34', waist: '26-28', hips: '34-36' },
    { size: 'S', chest: '34-36', waist: '28-30', hips: '36-38' },
    { size: 'M', chest: '36-38', waist: '30-32', hips: '38-40' },
    { size: 'L', chest: '38-40', waist: '32-34', hips: '40-42' },
    { size: 'XL', chest: '40-42', waist: '34-36', hips: '42-44' },
    { size: 'XXL', chest: '42-44', waist: '36-38', hips: '44-46' }
  ];

  const shoeSizes = [
    { us: '6', uk: '5.5', eu: '39', cm: '24.5' },
    { us: '7', uk: '6.5', eu: '40', cm: '25.5' },
    { us: '8', uk: '7.5', eu: '41', cm: '26.5' },
    { us: '9', uk: '8.5', eu: '42', cm: '27.5' },
    { us: '10', uk: '9.5', eu: '43', cm: '28.5' },
    { us: '11', uk: '10.5', eu: '44', cm: '29.5' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">O'lcham Qo'llanmasi</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Keng qamrovli o'lcham jadvallari bilan o'zingizga mos keladigan o'lchamni toping
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* How to Measure */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Qanday O'lchash</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ko'krak</h3>
              <p className="text-gray-600 text-sm">Ko'krakning eng keng qismini o'lchang, lentani gorizontal holatda ushlab turing</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bel</h3>
              <p className="text-gray-600 text-sm">Tabiiy bel chizig'ini o'lchang, lentani qulay ravishda bo'sh ushlab turing</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kestirib</h3>
              <p className="text-gray-600 text-sm">Kestiribning eng keng qismini o'lchang, beldan taxminan 20 sm pastda</p>
            </div>
          </div>
        </div>

        {/* Clothing Size Chart */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kiyim O'lchamlari Jadvali</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O'lcham</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ko'krak (sm)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bel (sm)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kestirib (sm)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clothingSizes.map((size, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.chest}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.waist}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Shoe Size Chart */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Poyabzal O'lchamlari Jadvali</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">US</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UK</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CM</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shoeSizes.map((size, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size.us}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.uk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.eu}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Size Tips */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sizing Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">For the Best Fit:</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>• Measure yourself in underwear for accuracy</li>
                <li>• Use a soft measuring tape, not a ruler</li>
                <li>• Have someone help you measure for best results</li>
                <li>• When in doubt, size up for comfort</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Still Unsure?</h3>
              <p className="text-indigo-100 mb-4">
                Our customer service team is here to help you find the perfect size. 
                Contact us with any questions about sizing or fit.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
