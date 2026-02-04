import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();
    console.log('Checkout request for:', priceId);
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      throw new Error('NEXT_PUBLIC_APP_URL not set');
    }
    
    const successUrl = `${appUrl}/pricing?success=true`;
    const cancelUrl = `${appUrl}/pricing?canceled=true`;
    
    const session = await createCheckoutSession(priceId, successUrl, cancelUrl);
    console.log('Session created:', session.id);
    
    // Return url for client-side redirect
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
