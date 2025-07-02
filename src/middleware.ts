
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sell (admin panel)
     * - health (health check)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sell|health).*)',
  ],
};
