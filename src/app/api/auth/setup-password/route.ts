import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { 
  apiVersion: '2026-01-28.clover' as any
});

export async function POST(request: NextRequest) {
  try {
    const { email, password, token, session_id } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'email and password required' },
        { status: 400 }
      );
    }

    console.log('🔐 Setting password for:', email);

    // Case 1: Email link with token (existing flow)
    if (token) {
      const user = await db.users.findBySetupToken(token);

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid or expired setup token' },
          { status: 400 }
        );
      }

      if (user.email !== email) {
        return NextResponse.json(
          { error: 'Email does not match token' },
          { status: 400 }
        );
      }

      // Hash password and clear setup token
      const passwordHash = await bcrypt.hash(password, 12);

      await db.users.update(user.id!, {
        password: passwordHash,
        setup_token: null,
        setup_expires: null
      });

      console.log('✅ Password set via token for:', email);

      return NextResponse.json({
        success: true,
        message: 'Password set successfully'
      });
    }

    // Case 2: Stripe session redirect (NEW FLOW)
    if (session_id) {
      // Verify session and get customer info
      const session = await stripe.checkout.sessions.retrieve(session_id);
      
      if (!session || session.payment_status !== 'paid') {
        return NextResponse.json(
          { error: 'Payment not completed' },
          { status: 400 }
        );
      }

      // Check if user exists
      let user = await db.users.findByEmail(email);

      if (!user) {
        // Create user if doesn't exist (webhook might have failed)
        console.log('🆕 Creating new user from session...');
        
        const setupToken = require('crypto').randomBytes(32).toString('hex');
        
        user = await db.users.create({
          email,
          password: '', // Will be set now
          name: session.customer_details?.name || email.split('@')[0],
          role: 'user',
          subscription: 'inner-circle',
          stripe_customer_id: session.customer as string,
          setup_token: setupToken,
          setup_expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });

        // Create subscription record
        await db.subscriptions.create({
          user_id: user.id!,
          plan: 'inner-circle',
          stripe_payment_id: session.payment_intent as string,
          status: 'active',
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });

        console.log('✅ Created user from session:', user.id);
      }

      // Set password
      const passwordHash = await bcrypt.hash(password, 12);

      await db.users.update(user.id!, {
        password: passwordHash,
        setup_token: null,
        setup_expires: null,
        subscription: 'inner-circle'
      });

      console.log('✅ Password set for:', email);

      return NextResponse.json({
        success: true,
        message: 'Password set successfully'
      });
    }

    return NextResponse.json(
      { error: 'token or session_id required' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('❌ Password setup error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
