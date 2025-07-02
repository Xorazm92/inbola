/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@payloadcms/db-mongodb'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.replit.dev',
      },
      {
        protocol: 'https',
        hostname: '*.replit.app',
      },
      {
        hostname: "inbola.uz",
        protocol: "https",
      },
      {
        hostname: "digibee-mediafiles.s3.ap-south-1.amazonaws.com",
        protocol: "https",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    // Disable source maps in development to prevent issues
    if (dev) {
      config.devtool = false;
    }

    // Fix Sharp binary loading issue
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('sharp');
    }

    // Fix module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
    };

    // Handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    // Simplified optimization for development
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 244000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
