
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['uz', 'en', 'ru'],
  defaultLocale: 'uz'
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Cache headers for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/') ||
      request.nextUrl.pathname.startsWith('/images/') ||
      request.nextUrl.pathname.startsWith('/nav/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
