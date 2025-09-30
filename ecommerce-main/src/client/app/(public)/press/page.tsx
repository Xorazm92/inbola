import React from 'react';
import { Calendar, Download, ExternalLink, Award, TrendingUp } from 'lucide-react';

const PressPage = () => {
  const pressReleases = [
    {
      id: 1,
      title: "SS-Commerce Reaches 10,000 Active Customers Milestone",
      date: "March 20, 2024",
      excerpt: "SS-Commerce celebrates reaching 10,000 active customers, marking a significant milestone in the company's growth journey.",
      category: "Company News"
    },
    {
      id: 2,
      title: "New Partnership with Leading Logistics Provider Announced",
      date: "March 10, 2024",
      excerpt: "Strategic partnership will enhance delivery capabilities and expand shipping options for customers worldwide.",
      category: "Partnerships"
    },
    {
      id: 3,
      title: "SS-Commerce Launches Sustainability Initiative",
      date: "February 25, 2024",
      excerpt: "New eco-friendly packaging and carbon-neutral shipping options introduced as part of comprehensive sustainability program.",
      category: "Sustainability"
    },
    {
      id: 4,
      title: "Q4 2023 Growth Report: 150% Year-over-Year Increase",
      date: "February 15, 2024",
      excerpt: "Strong financial performance driven by customer acquisition and platform improvements throughout 2023.",
      category: "Financial"
    }
  ];

  const mediaKit = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      fileSize: "2.5 MB"
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand identity guidelines and usage instructions",
      fileSize: "8.1 MB"
    },
    {
      title: "Product Screenshots",
      description: "High-quality screenshots of our platform and mobile app",
      fileSize: "15.3 MB"
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team members",
      fileSize: "5.7 MB"
    }
  ];

  const awards = [
    {
      title: "Best E-commerce Platform 2024",
      organization: "Tech Innovation Awards",
      year: "2024"
    },
    {
      title: "Customer Choice Award",
      organization: "E-commerce Excellence",
      year: "2023"
    },
    {
      title: "Rising Star in Retail Tech",
      organization: "Retail Technology Review",
      year: "2023"
    }
  ];

  const stats = [
    { label: "Active Customers", value: "10,000+" },
    { label: "Products Available", value: "5,000+" },
    { label: "Countries Served", value: "50+" },
    { label: "Customer Satisfaction", value: "99%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Press Center</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Latest news, press releases, and media resources from SS-Commerce
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Company at a Glance</h2>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Press Releases</h2>
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
                    Read Full Release
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Media Kit</h2>
            <p className="text-gray-600 mb-8">
              Download our media kit for high-quality assets, brand guidelines, and company information.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Awards & Recognition</h2>
            <p className="text-gray-600 mb-8">
              We're honored to be recognized by industry leaders and organizations.
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
              <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
              <p className="text-indigo-100 mb-6">
                For press inquiries, interview requests, or additional information, please contact our media team.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> press@ss-commerce.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Facts</h2>
              <div className="space-y-2 text-indigo-100">
                <p><strong>Founded:</strong> 2020</p>
                <p><strong>Headquarters:</strong> New York, NY</p>
                <p><strong>Industry:</strong> E-commerce Technology</p>
                <p><strong>Mission:</strong> Making premium products accessible to everyone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive our latest press releases and company updates.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
