import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();
    console.log('Checkout request received for priceId:', priceId);
    
    const session = await createCheckoutSession(
      priceId,
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://trendwatcher.io'}/pricing?success=true`,
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://trendwatcher.io'}/pricing?canceled=true`
    );

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
