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

    console.log('📨 Webhook received!');

    let event: Stripe.Event;

    // Skip signature verification if no secret (for testing)
    if (!WEBHOOK_SECRET || WEBHOOK_SECRET === '') {
      console.log('⚠️ No webhook secret - parsing without verification');
      try {
        event = JSON.parse(body);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }
    } else {
      if (!sig) {
        console.error('❌ Missing signature');
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
      }

      try {
        event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
      } catch (err: any) {
        console.error('❌ Signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    console.log('📨 Event type:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
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
        console.log('Unhandled event:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  const customerId = session.customer as string;
  const paymentIntent = session.payment_intent as string;

  console.log('🔄 Processing checkout for:', email);

  if (!email) {
    console.error('❌ No email in session!');
    return;
  }

  // Check if subscription already exists for this payment
  const existingSub = await db.subscriptions.findByPaymentId(paymentIntent);
  if (existingSub) {
    console.log('⚠️ Subscription already exists for payment:', paymentIntent);
    return;
  }

  // Check if user already exists
  let user = await db.users.findByEmail(email);
  
  if (user) {
    console.log('👤 Existing user found:', user.id);
    
    // Update user
    await db.users.update(user.id!, {
      stripe_customer_id: customerId,
      subscription: 'inner-circle'
    });

    // Create subscription record
    await db.subscriptions.create({
      user_id: user.id!,
      plan: 'inner-circle',
      stripe_payment_id: paymentIntent,
      status: 'active',
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    console.log('✅ Updated subscription for:', user.id);

    // Send welcome email if not already sent
    if (!user.setup_token) {
      const setupToken = crypto.randomBytes(32).toString('hex');
      await db.users.update(user.id!, {
        setup_token: setupToken,
        setup_expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
      
      console.log('📧 Sending welcome email...');
      await sendWelcomeEmail(email, setupToken);
    }
  } else {
    console.log('🆕 Creating new user...');
    
    // Create setup token
    const setupToken = crypto.randomBytes(32).toString('hex');
    
    // Create new user
    user = await db.users.create({
      email,
      password: '',
      name: session.customer_details?.name || email.split('@')[0],
      role: 'user',
      subscription: 'inner-circle',
      stripe_customer_id: customerId,
      setup_token: setupToken,
      setup_expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });

    console.log('✅ Created user:', user.id);

    // Create subscription record
    await db.subscriptions.create({
      user_id: user.id!,
      plan: 'inner-circle',
      stripe_payment_id: paymentIntent,
      status: 'active',
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    // Send welcome email
    console.log('📧 Sending welcome email...');
    await sendWelcomeEmail(email, setupToken);
  }

  return { userId: user!.id };
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  console.log('Subscription changed:', { customerId, status: subscription.status });
}
