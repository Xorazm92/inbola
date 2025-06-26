/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://inbola.uz',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  sitemapSize: 7000,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  transform: async (config, path) => {
    // keep default transformation
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://inbola.uz'}/uz${path}`, hreflang: 'uz' },
        { href: `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://inbola.uz'}/ru${path}`, hreflang: 'ru' },
      ],
    };
  },
};
