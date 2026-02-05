import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }
    
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    const user = await db.users.create({
      email,
      password,
      name: name || email.split('@')[0],
      role: 'user',
      subscription: 'free',
      stripe_customer_id: null
    });
    
    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
      subscription: user.subscription
    });
    
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription
      }
    });
    
    response.headers.set('Set-Cookie', setAuthCookie(token));
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
