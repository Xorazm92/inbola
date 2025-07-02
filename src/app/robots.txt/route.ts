
import { NextResponse } from 'next/server';

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
  
  const robots = `User-agent: *
Allow: /
Allow: /products
Allow: /categories
Allow: /api/products
Allow: /api/categories

Disallow: /sell
Disallow: /admin
Disallow: /api/admin
Disallow: /api/trpc
Disallow: /cart
Disallow: /thank-you
Disallow: /sign-in
Disallow: /sign-up

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
