import React from 'react';
import { Truck, Clock, MapPin, Package, Shield, Globe } from 'lucide-react';

const ShippingPage = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 Business Days",
      cost: "$5.99",
      description: "Reliable delivery for everyday orders",
      icon: <Package className="w-8 h-8" />
    },
    {
      name: "Express Shipping",
      time: "2-3 Business Days",
      cost: "$12.99",
      description: "Faster delivery when you need it sooner",
      icon: <Truck className="w-8 h-8" />
    },
    {
      name: "Overnight Shipping",
      time: "Next Business Day",
      cost: "$24.99",
      description: "Get your order the next business day",
      icon: <Clock className="w-8 h-8" />
    }
  ];

  const internationalZones = [
    { zone: "Zone 1 (Canada)", time: "7-10 Business Days", cost: "$15.99" },
    { zone: "Zone 2 (Europe, UK)", time: "10-14 Business Days", cost: "$25.99" },
    { zone: "Zone 3 (Asia, Australia)", time: "12-16 Business Days", cost: "$29.99" },
    { zone: "Zone 4 (Rest of World)", time: "14-21 Business Days", cost: "$35.99" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Shipping Information</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Fast, reliable shipping options to get your orders delivered safely
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Domestic Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Domestic Shipping Options</h2>
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
              <h3 className="text-lg font-semibold text-green-800">Free Shipping Available!</h3>
            </div>
            <p className="text-green-700">
              Enjoy free standard shipping on orders over $75. No code needed - discount applied automatically at checkout.
            </p>
          </div>
        </div>

        {/* Track Your Order CTA */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Restrictions</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Some items may have shipping restrictions based on destination</li>
              <li>• Hazardous materials cannot be shipped internationally</li>
              <li>• Large items may require special shipping arrangements</li>
              <li>• PO Box addresses may have limited shipping options</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Your Order</h3>
            <p className="text-gray-600 mb-4">
              Once your order ships, you'll receive a tracking number via email. You can also track your order anytime in your account.
            </p>
            <a 
              href="/track-order" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Track Your Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
