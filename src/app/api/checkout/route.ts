import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();
    console.log('Checkout request received for priceId:', priceId);
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://trendwatcher.io';
    console.log('NEXT_PUBLIC_APP_URL:', appUrl);
    
    const successUrl = `${appUrl}/pricing?success=true`;
    const cancelUrl = `${appUrl}/pricing?canceled=true`;
    console.log('Success URL:', successUrl);
    console.log('Cancel URL:', cancelUrl);
    
    const session = await createCheckoutSession(priceId, successUrl, cancelUrl);

    console.log('Checkout session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
