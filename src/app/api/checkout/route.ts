import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { 
  apiVersion: '2026-01-28.clover' 
});

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();
    
    // Use env var or fallback to hardcoded for now
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://trendwatcher.io';
    
    const successUrl = `${appUrl}/pricing?success=true`;
    const cancelUrl = `${appUrl}/pricing?canceled=true`;
    
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
