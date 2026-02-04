import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();
    console.log('Checkout request for:', priceId);
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    console.log('ENV check - APP_URL:', appUrl ? 'SET' : 'NOT SET');
    console.log('ENV check - STRIPE_KEY:', process.env.STRIPE_SECRET_KEY ? 'SET' : 'NOT SET');
    
    if (!appUrl) {
      throw new Error('NEXT_PUBLIC_APP_URL not set in environment');
    }
    
    const successUrl = `${appUrl}/pricing?success=true`;
    const cancelUrl = `${appUrl}/pricing?canceled=true`;
    
    console.log('Creating session...');
    const session = await createCheckoutSession(priceId, successUrl, cancelUrl);
    console.log('Session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('FULL ERROR:', error);
    console.error('ERROR STACK:', error.stack);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session', stack: error.stack },
      { status: 500 }
    );
  }
}
