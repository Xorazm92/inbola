/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        protocol: "http",
        port: "3000",
      },
      {
        hostname: "inbola.uz",
        protocol: "https",
      },
    ],
  },
};

const withNextIntl = require('next-intl/plugin')('./i18n.ts');
module.exports = withNextIntl(nextConfig);
