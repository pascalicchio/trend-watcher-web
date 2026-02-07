import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import crypto from 'crypto';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY not set');
  }
  return new Stripe(key, { 
    apiVersion: '2026-01-28.clover' as any
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, token, session_id } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'email and password required' }, { status: 400 });
    }

    // Token flow
    if (token) {
      const user = await db.users.findBySetupToken(token);
      
      if (!user || user.email !== email) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      await db.users.update(user.id!, {
        password: passwordHash,
        setup_token: null,
        setup_expires: null
      });

      console.log('✅ Password set (token flow)');
      return NextResponse.json({ success: true });
    }

    // Session flow
    if (session_id) {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id);
      
      if (session.payment_status !== 'paid') {
        return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
      }

      let user = await db.users.findByEmail(email);
      
      if (!user) {
        user = await db.users.findByCustomerId(session.customer as string);
        
        if (!user) {
          const setupToken = crypto.randomBytes(32).toString('hex');
          
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
        }
      }

      // ONLY create subscription if it doesn't exist
      console.log('💳 Checking for existing subscription...');
      const existingSubs = await db.subscriptions.findByUserId(user.id!);
      const hasActiveSubscription = existingSubs.some(s => 
        s.stripe_payment_id === session.payment_intent || s.status === 'active'
      );
      
      if (hasActiveSubscription) {
        console.log('⚠️ Subscription already exists, skipping creation');
      } else {
        console.log('🆕 Creating new subscription...');
        await db.subscriptions.create({
          user_id: user.id!,
          plan: 'inner-circle',
          stripe_payment_id: session.payment_intent as string,
          status: 'active',
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });
        console.log('✅ Subscription created');
      }

      // Set password
      const passwordHash = await bcrypt.hash(password, 12);

      await db.users.update(user.id!, {
        password: passwordHash,
        setup_token: null,
        setup_expires: null,
        subscription: 'inner-circle'
      });

      console.log('✅ All done!');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'token or session_id required' }, { status: 400 });

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
