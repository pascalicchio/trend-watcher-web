import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }
    
    // Force fresh fetch from Supabase
    const user = await db.users.findByEmail(email);
    
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role || 'user',
      subscription: user.subscription || 'free'
    });
    
    // Set no-cache headers to force fresh session
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'user',
        subscription: user.subscription || 'free'
      }
    });
    
    response.headers.set('Set-Cookie', setAuthCookie(token));
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
