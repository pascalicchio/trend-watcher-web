import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();
    
    const session = await createCheckoutSession(
      priceId,
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://trendwatcher.io'}/pricing?success=true`,
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://trendwatcher.io'}/pricing?canceled=true`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
