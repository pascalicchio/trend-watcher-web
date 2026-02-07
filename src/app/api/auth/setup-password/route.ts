import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const DB = {
  users: {
    findByEmail: async (email: string) => {
      const { data, error } = await (await import('@/lib/supabase')).supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      return data;
    },
    findById: async (id: string) => {
      const { data, error } = = await (await import('@/lib/supabase')).supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      return data;
    },
    findBySetupToken: async (token: string) => {
      const { data, error } = await (await import('@/lib/supabase')).supabase
        .from('users')
        .select('*')
        .eq('setup_token', token)
        .single();
      return data;
    },
    update: async (id: string, updates: any) => {
      const { error } = await (await import('@/lib/supabase')).supabase
        .from('users')
        .update(updates)
        .eq('id', id);
      return !error;
    }
  }
};

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
    const user = await DB.users.findBySetupToken(token);

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
    await DB.users.update(user.id, {
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
