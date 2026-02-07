import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json();

    if (!token || !email || !password) {
      return NextResponse.json(
        { error: 'token, email, and password required' },
        { status: 400 }
      );
    }

    // Find user by setup token
    const user = await db.users.findBySetupToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired setup token' },
        { status: 400 }
      );
    }

    // Verify email matches
    if (user.email !== email) {
      return NextResponse.json(
        { error: 'Email does not match token' },
        { status: 400 }
      );
    }

    // Check if token expired
    if (user.setup_expires && new Date(user.setup_expires) < new Date()) {
      return NextResponse.json(
        { error: 'Setup link has expired. Please contact support.' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 12);

    // Update user with password and clear setup token
    await db.users.update(user.id!, {
      password: passwordHash,
      setup_token: null,
      setup_expires: null
    });

    console.log('✅ Password set for user:', user.email);

    return NextResponse.json({
      success: true,
      message: 'Password set successfully. You can now login.'
    });
  } catch (error: any) {
    console.error('Password setup error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
