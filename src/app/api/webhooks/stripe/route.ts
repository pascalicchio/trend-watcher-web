import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { 
  apiVersion: '2026-01-28.clover' as any
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    console.log('📨 Webhook received! Signature:', sig ? 'present' : 'MISSING');

    if (!sig) {
      console.error('❌ Missing stripe-signature header');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('📨 Stripe webhook received:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session:', { id: session.id, customer_email: session.customer_email });
        await handleCheckoutComplete(session);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook error:', error.message);
    console.error('Stack:', error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Handle successful checkout
 * - Create user account with setup token (no password yet)
 * - Send welcome email with password setup link
 * - Create subscription record
 */
async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  const customerId = session.customer as string;

  console.log('🔄 Processing checkout for:', email);

  if (!email) {
    console.error('❌ No email in checkout session!');
    return;
  }

  // Check if user already exists
  const existingUser = await db.users.findByEmail(email);
  console.log('Existing user found:', existingUser ? 'YES' : 'NO');

  if (existingUser) {
    console.log('Updating existing user:', existingUser.id);
    
    await db.users.update(existingUser.id!, {
      stripe_customer_id: customerId,
      subscription: 'inner-circle'
    });

    await db.subscriptions.create({
      user_id: existingUser.id!,
      plan: 'inner-circle',
      stripe_payment_id: session.payment_intent as string,
      status: 'active',
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    console.log('✅ Updated existing user subscription:', existingUser.id);
    return;
  }

  // Generate setup token for password creation
  const setupToken = crypto.randomBytes(32).toString('hex');
  const setupExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  console.log('🆕 Creating new user...');

  // Create new user (no password yet, will be set via setup link)
  const user = await db.users.create({
    email,
    password: '',
    name: session.customer_details?.name || email.split('@')[0],
    role: 'user',
    subscription: 'inner-circle',
    stripe_customer_id: customerId,
    setup_token: setupToken,
    setup_expires: setupExpires.toISOString()
  });

  console.log('✅ Created user:', user.id);

  // Create subscription record
  await db.subscriptions.create({
    user_id: user.id!,
    plan: 'inner-circle',
    stripe_payment_id: session.payment_intent as string,
    status: 'active',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });

  console.log('✅ Created subscription');

  // Send welcome email with password setup link
  console.log('📧 Sending welcome email to:', email);
  const emailSent = await sendWelcomeEmail(email, setupToken);
  console.log('📧 Email sent:', emailSent ? 'YES' : 'NO');

  return { userId: user.id };
}

/**
 * Handle subscription updates/cancellations
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  console.log('Subscription changed:', { customerId, status: subscription.status });
}
