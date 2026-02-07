import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken, clearAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    
    // Clear cookie regardless
    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', clearAuthCookie());
    
    // If we have a token, we could also invalidate it in database if we had token storage
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.headers.set('Set-Cookie', clearAuthCookie());
  return response;
}
