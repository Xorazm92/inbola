import React from 'react';
import { Search, HelpCircle, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';

const HelpPage = () => {
  const faqCategories = [
    {
      title: "Orders & Shipping",
      questions: [
        {
          question: "How can I track my order?",
          answer: "You can track your order by visiting the 'Track Order' page and entering your order number and email address. You'll also receive tracking information via email once your order ships."
        },
        {
          question: "What are your shipping options?",
          answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight shipping. Shipping costs vary based on location and order value."
        },
        {
          question: "Can I change or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some items like personalized products are not eligible for return."
        },
        {
          question: "How do I return an item?",
          answer: "Visit our Returns page, enter your order information, and follow the instructions. We'll provide a prepaid return label for eligible returns."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method."
        }
      ]
    },
    {
      title: "Account & Payment",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' at the top of any page, enter your email and create a password. You can also sign up using your Google, Facebook, or Twitter account."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and work with trusted payment processors to ensure your information is secure."
        }
      ]
    },
    {
      title: "Products & Pricing",
      questions: [
        {
          question: "Are your product images accurate?",
          answer: "We strive to display accurate product images and descriptions. However, colors may vary slightly due to monitor settings. Check the product description for detailed specifications."
        },
        {
          question: "Do you offer price matching?",
          answer: "We don't currently offer price matching, but we regularly review our prices to ensure they're competitive. Sign up for our newsletter to receive exclusive discounts."
        },
        {
          question: "How do I know if an item is in stock?",
          answer: "Stock availability is shown on each product page. If an item is out of stock, you can sign up for restock notifications."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      availability: "24/7",
      action: "Start Chat"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with a support representative",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "Response within 24 hours",
      action: "Send Email"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Help Center</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Find answers to your questions and get the help you need
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
