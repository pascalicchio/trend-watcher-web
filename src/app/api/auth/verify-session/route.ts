import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { 
  apiVersion: '2026-01-28.clover' as any
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'session_id required' }, { status: 400 });
    }

    console.log('🔍 Verifying Stripe session:', sessionId);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const email = session.customer_details?.email || session.customer_email;

    if (!email) {
      return NextResponse.json({ error: 'No email in session' }, { status: 400 });
    }

    console.log('✅ Session verified for:', email);

    return NextResponse.json({ 
      email,
      customerId: session.customer,
      paymentStatus: session.payment_status
    });
  } catch (error: any) {
    console.error('❌ Session verification error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
