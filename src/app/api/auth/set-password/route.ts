import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import crypto from 'crypto';

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

    console.log('='.repeat(50));
    console.log('🔐 SET-PASSWORD FLOW');
    console.log('='.repeat(50));
    console.log('Email:', email);
    console.log('Has token:', !!token);
    console.log('Has session_id:', !!session_id);

    // Case 1: Email link with token (existing flow)
    if (token) {
      console.log('📧 Using token flow...');
      
      const user = await db.users.findBySetupToken(token);

      if (!user) {
        console.log('❌ Token not found');
        return NextResponse.json(
          { error: 'Invalid or expired setup token' },
          { status: 400 }
        );
      }

      if (user.email !== email) {
        console.log('❌ Email mismatch');
        return NextResponse.json(
          { error: 'Email does not match token' },
          { status: 400 }
        );
      }

      const passwordHash = await bcrypt.hash(password, 12);

      await db.users.update(user.id!, {
        password: passwordHash,
        setup_token: null,
        setup_expires: null
      });

      console.log('✅ Password set for:', email);
      return NextResponse.json({ success: true });
    }

    // Case 2: Stripe session redirect (NEW FLOW)
    if (session_id) {
      console.log('💳 Using Stripe session flow...');
      
      const session = await stripe.checkout.sessions.retrieve(session_id);
      
      console.log('Session status:', session.payment_status);
      console.log('Customer email:', session.customer_details?.email);
      
      if (session.payment_status !== 'paid') {
        console.log('❌ Payment not completed');
        return NextResponse.json(
          { error: 'Payment not completed' },
          { status: 400 }
        );
      }

      let user = await db.users.findByEmail(email);
      console.log('Existing user:', user ? user.id : 'NO');

      if (!user) {
        console.log('🆕 Creating new user...');
        
        const setupToken = crypto.randomBytes(32).toString('hex');
        
        try {
          user = await db.users.create({
            email,
            password: '',
            name: session.customer_details?.name || email.split('@')[0],
            role: 'user',
            subscription: 'inner-circle',
            stripe_customer_id: session.customer as string,
            setup_token: setupToken,
            setup_expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          });
          console.log('✅ User created:', user.id);
        } catch (createError: any) {
          console.error('❌ User create error:', createError.message);
          
          // Try finding by customer ID
          const byCustomer = await db.users.findByCustomerId(session.customer as string);
          if (byCustomer) {
            user = byCustomer;
            console.log('📌 Found user by customer ID:', user.id);
          }
        }

        // Create subscription
        if (user?.id) {
          try {
            await db.subscriptions.create({
              user_id: user.id,
              plan: 'inner-circle',
              stripe_payment_id: session.payment_intent as string,
              status: 'active',
              start_date: new Date().toISOString(),
              end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            });
            console.log('✅ Subscription created');
          } catch (subError: any) {
            console.error('❌ Subscription error:', subError.message);
          }
        }
      }

      if (!user) {
        console.log('❌ Could not find or create user');
        return NextResponse.json(
          { error: 'Could not create user account' },
          { status: 500 }
        );
      }

      const passwordHash = await bcrypt.hash(password, 12);

      await db.users.update(user.id!, {
        password: passwordHash,
        setup_token: null,
        setup_expires: null,
        subscription: 'inner-circle'
      });

      console.log('✅ Password set for:', email);
      console.log('='.repeat(50));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'token or session_id required' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
