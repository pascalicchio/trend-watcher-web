import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Hardcode the URL to bypass the env var issue on Vercel Edge
const APP_URL = 'https://trendwatcher.io';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key, { 
    apiVersion: '2026-01-28.clover' 
  });
}

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();
    
    const successUrl = `${APP_URL}/pricing?success=true`;
    const cancelUrl = `${APP_URL}/pricing?canceled=true`;
    
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    
    return new NextResponse(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('ERROR:', error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
