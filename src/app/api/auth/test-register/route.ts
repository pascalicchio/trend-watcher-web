import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { createToken, setAuthCookie } from '@/lib/auth';

// Test endpoint to create a user directly (bypassing Stripe)
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with inner-circle subscription (for testing)
    const user = await db.users.create({
      email,
      password: passwordHash,
      name: name || email.split('@')[0],
      role: 'user',
      subscription: 'inner-circle', // Full access for testing
      stripe_customer_id: 'test_user_' + Date.now()
    });

    // Create token
    const token = await createToken({
      id: user.id!,
      email: user.email,
      role: user.role,
      subscription: user.subscription
    });

    // Return user info and set cookie
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

    console.log('✅ Test user created:', user.email);
    return response;
  } catch (error: any) {
    console.error('Test registration error:', error.message);
    return NextResponse.json(
      { error: 'Registration failed: ' + error.message },
      { status: 500 }
    );
  }
}
