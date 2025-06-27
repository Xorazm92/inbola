/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        protocol: "http",
        port: "3003",
      },
      {
        hostname: "inbola.uz",
        protocol: "https",
      },
    ],
  },
};

const withNextIntl = require('next-intl/plugin')('./next-intl.config.js');
module.exports = withNextIntl(nextConfig);
