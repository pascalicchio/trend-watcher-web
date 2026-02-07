import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, getTokenFromRequest } from './lib/auth';

// Routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/set-password', '/api/auth/login', '/api/auth/register', '/api/checkout', '/api/webhooks/stripe', '/api/test-db', '/api/test-flow'];

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/api/users/', '/api/subscription', '/api/intelligence-cards'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check if route requires auth
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (!requiresAuth) {
    return NextResponse.next();
  }
  
  // Verify token
  const token = getTokenFromRequest(request);
  
  if (!token) {
    // No token - redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('reason', 'session_expired');
    return NextResponse.redirect(loginUrl);
  }
  
  // Token exists - verify it (but actual user validation happens in API routes)
  // This is just a preliminary check
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
