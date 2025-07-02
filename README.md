
# INBOLA - Modern E-commerce Platform for Children

🚀 **INBOLA** is a cutting-edge, full-stack e-commerce marketplace designed specifically for children's products. Built with Next.js 14, TypeScript, and modern technologies to deliver exceptional performance and user experience.

## ✨ Key Features

### 🛍️ E-commerce Excellence
- **Advanced Product Search & Filtering** - Real-time search with debouncing, category filters, price ranges
- **Smart Product Recommendations** - AI-powered suggestions and related products
- **Modern Shopping Cart** - Persistent cart, quick add/remove, quantity management
- **Secure Payment Processing** - Stripe integration with multiple payment methods
- **Order Management** - Complete order tracking and history

### 🎨 Modern UI/UX
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark/Light Theme** - Automatic theme switching with user preferences
- **Progressive Web App (PWA)** - App-like experience with offline capabilities
- **Performance Optimized** - Image optimization, lazy loading, code splitting

### 🔧 Admin Features
- **Powerful Admin Panel** - Built with PayloadCMS for content management
- **Product Management** - Easy product creation, editing, and approval workflow
- **User Management** - Complete user administration and role management
- **Analytics Dashboard** - Sales insights and performance metrics

### 🚀 Technical Excellence
- **Full-Stack TypeScript** - Type-safe development from frontend to backend
- **Server-Side Rendering** - SEO optimized with Next.js App Router
- **Real-time Updates** - tRPC for type-safe API calls
- **Comprehensive Testing** - Unit tests, integration tests, and API testing
- **Production Ready** - Docker support, CI/CD pipelines, monitoring

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Form handling and validation

### Backend
- **PayloadCMS** - Headless CMS for content management
- **tRPC** - End-to-end typesafe APIs
- **MongoDB** - NoSQL database with Mongoose ODM
- **Redis** - Caching and session management
- **Node.js** - JavaScript runtime

### Services & Tools
- **Stripe** - Payment processing
- **AWS S3** - File storage and CDN
- **Sentry** - Error tracking and monitoring
- **Google Analytics** - Website analytics
- **Sharp** - Image optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd inbola-marketplace
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Database
MONGODB_URL=mongodb://localhost:27017/inbola
PAYLOAD_SECRET=your-payload-secret

# Server
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
PORT=5000

# Payments
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public

# Storage
S3_BUCKET=your-s3-bucket
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=your-region

# Email
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Monitoring
SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_SENTRY_DSN=your-public-sentry-dsn
```

4. **Create Admin User**
```bash
npm run create-admin
```

5. **Start Development Server**
```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/sell
- **Health Check**: http://localhost:3001/health

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Database
npm run create-admin # Create admin user
npm run seed         # Seed database with sample data

# Utilities
npm run analyze      # Bundle analysis
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   └── cart/              # Shopping cart
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── cart/             # Shopping cart components
│   ├── product/          # Product-related components
│   └── nav/              # Navigation components
├── collections/          # PayloadCMS collections
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configs
├── trpc/                # tRPC routers and procedures
└── types/               # TypeScript type definitions
```

## 🔌 API Endpoints

### Public APIs
- `GET /api/health` - Health check
- `GET /api/products` - Get products with filtering
- `GET /api/products/[id]` - Get single product
- `GET /api/categories` - Get product categories
- `GET /api/docs` - API documentation (Swagger UI)

### Authentication Required
- `POST /api/cart/add` - Add item to cart
- `GET /api/orders` - Get user orders
- `POST /api/checkout` - Process checkout

### Admin Only
- `GET /api/admin/products` - Manage products
- `PATCH /api/admin/products` - Update product status
- `GET /api/admin/users` - Manage users

## 🧪 Testing

### Run Tests
```bash
# All tests
npm run test

# API tests only
npm run test -- api.test.ts

# Watch mode
npm run test:watch
```

### Manual API Testing with cURL
```bash
# Health check
curl -X GET "http://localhost:5000/api/health"

# Get products
curl -X GET "http://localhost:5000/api/products?limit=10"

# Search products
curl -X GET "http://localhost:5000/api/products?search=toy&category=toys"

# Get categories
curl -X GET "http://localhost:5000/api/categories"
```

## 🚀 Deployment

### Replit Deployment (Recommended)
1. Push your code to GitHub
2. Import project to Replit
3. Set environment variables in Replit Secrets
4. Deploy using Replit's deployment feature

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔐 Security Features

- **Authentication & Authorization** - Secure user authentication with role-based access
- **CSRF Protection** - Cross-site request forgery protection
- **Rate Limiting** - API rate limiting to prevent abuse
- **Input Validation** - Comprehensive input validation and sanitization
- **Secure Headers** - Security headers with Helmet.js

## 📈 Performance Optimizations

- **Image Optimization** - WebP format with Sharp
- **Caching Strategy** - Redis caching for API responses
- **Code Splitting** - Automatic code splitting with Next.js
- **Lazy Loading** - Lazy loading for images and components
- **Bundle Analysis** - Regular bundle size monitoring

## 🛡️ Monitoring & Analytics

- **Error Tracking** - Sentry integration for error monitoring
- **Performance Monitoring** - Real-time performance metrics
- **Analytics** - Google Analytics integration
- **Health Checks** - Automated health monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check our comprehensive docs
- **Issues**: Report bugs on GitHub Issues
- **Community**: Join our Discord community

---

**Built with ❤️ for children's marketplace excellence**

🌟 **Star this repository if you find it helpful!**
