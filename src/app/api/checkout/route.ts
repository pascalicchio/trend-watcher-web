import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import crypto from 'crypto';

const APP_URL = 'https://trendwatcher.io';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key, { 
    apiVersion: '2026-01-28.clover' as any
  });
}

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();
    
    if (!priceId) {
      return NextResponse.json({ error: 'priceId required' }, { status: 400 });
    }
    
    const stripe = getStripe();
    
    // Create or get Stripe customer
    // Note: We'll get email from checkout form
    let customerId = 'temp_' + Date.now();
    
    console.log('🆕 Creating checkout session...');
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      // REDIRECT DIRECTLY TO SET-PASSWORD AFTER PAYMENT!
      success_url: `${APP_URL}/set-password?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/?canceled=true`,
      subscription_data: {
        trial_period_days: 2,
      },
      phone_number_collection: { enabled: true },
    });
    
    console.log('✅ Created checkout session:', session.id);
    
    return new NextResponse(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('❌ Checkout error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
