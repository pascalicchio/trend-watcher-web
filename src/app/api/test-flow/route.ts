import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';
import crypto from 'crypto';

// Test endpoint - creates a user and sends welcome email
// Use this to verify the flow works
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'email required' }, { status: 400 });
    }

    console.log('🧪 TEST: Creating user for:', email);

    // Check if user exists
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      console.log('User already exists:', existingUser.id);
      
      // Resend welcome email
      const setupToken = crypto.randomBytes(32).toString('hex');
      await db.users.update(existingUser.id, {
        setup_token: setupToken,
        setup_expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
      
      await sendWelcomeEmail(email, setupToken);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Welcome email resent!',
        email,
        setupToken
      });
    }

    // Create new user with setup token
    const setupToken = crypto.randomBytes(32).toString('hex');
    const user = await db.users.create({
      email,
      password: '',
      name: email.split('@')[0],
      role: 'user',
      subscription: 'inner-circle',
      stripe_customer_id: 'test_' + Date.now(),
      setup_token: setupToken,
      setup_expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });

    console.log('✅ Created user:', user.id);

    // Send welcome email
    console.log('📧 Sending welcome email...');
    const emailSent = await sendWelcomeEmail(email, setupToken);
    console.log('📧 Email sent:', emailSent);

    return NextResponse.json({
      success: true,
      message: 'User created and welcome email sent!',
      userId: user.id,
      email,
      setupUrl: `https://trendwatcher.io/setup-password?token=${setupToken}&email=${encodeURIComponent(email)}`
    });
  } catch (error: any) {
    console.error('❌ Test error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
