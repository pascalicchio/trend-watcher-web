import { NextRequest, NextResponse } from 'next/server';
import { db, getDbInfo } from '@/lib/db';
import { createToken, setAuthCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Password requirements
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const dbInfo = getDbInfo();
    console.log('[Register] Using DB provider:', dbInfo.provider);

    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await db.users.create({
      email,
      password: passwordHash, // Store hash, not plain text
      name: name || email.split('@')[0],
      role: 'user',
      subscription: 'free',
      stripe_customer_id: null
    });

    console.log('[Register] User created:', user.id);

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
  } catch (error: any) {
    console.error('[Register] Error:', error.message);
    return NextResponse.json(
      { error: 'Registration failed: ' + error.message },
      { status: 500 }
    );
  }
}
