import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of E-commerce: Trends to Watch in 2024",
      excerpt: "Discover the latest trends shaping the e-commerce landscape and how they'll impact online shopping experiences.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Industry Insights",
      image: "/api/placeholder/400/250",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Building Trust in Online Shopping: Security Best Practices",
      excerpt: "Learn about the security measures we implement to protect your personal information and ensure safe transactions.",
      author: "Mike Chen",
      date: "March 10, 2024",
      category: "Security",
      image: "/api/placeholder/400/250",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Sustainable Shopping: Our Commitment to the Environment",
      excerpt: "Explore our sustainability initiatives and how we're working to reduce our environmental impact.",
      author: "Emma Davis",
      date: "March 5, 2024",
      category: "Sustainability",
      image: "/api/placeholder/400/250",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Customer Success Stories: How SS-Commerce Changed Lives",
      excerpt: "Read inspiring stories from our customers and how our platform has made a difference in their lives.",
      author: "David Wilson",
      date: "February 28, 2024",
      category: "Customer Stories",
      image: "/api/placeholder/400/250",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Mobile Commerce: Optimizing Your Shopping Experience",
      excerpt: "Discover the features and optimizations we've made to enhance your mobile shopping experience.",
      author: "Lisa Rodriguez",
      date: "February 20, 2024",
      category: "Technology",
      image: "/api/placeholder/400/250",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Behind the Scenes: Our Product Curation Process",
      excerpt: "Get an inside look at how we select and curate the products available on our platform.",
      author: "John Smith",
      date: "February 15, 2024",
      category: "Behind the Scenes",
      image: "/api/placeholder/400/250",
      readTime: "8 min read"
    }
  ];

  const categories = [
    "All Posts",
    "Industry Insights",
    "Technology",
    "Security",
    "Sustainability",
    "Customer Stories",
    "Behind the Scenes"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Insights, stories, and updates from the SS-Commerce team
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
                    <h3 className="text-2xl font-bold mb-2">Featured Article</h3>
                    <p className="text-indigo-100">Latest insights from our team</p>
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
                    Read More
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
                  <h4 className="text-lg font-semibold mb-1">Blog Post</h4>
                  <p className="text-indigo-100 text-sm">Image Placeholder</p>
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
                    Read More
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
            Load More Posts
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest blog posts, product updates, and exclusive content delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
