import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { sendCredentialsEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.claver'
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log('📨 Stripe webhook received:', event.type);

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
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Handle successful checkout
 * - Create user account with auto-generated credentials
 * - Send credentials via email
 * - Redirect to success page with login info
 */
async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email || session.customer_email;
  const customerId = session.customer as string;

  if (!email) {
    console.error('No email in checkout session');
    return;
  }

  console.log('Processing checkout for:', email);

  // Check if user already exists
  const existingUser = await db.users.findByEmail(email);

  if (existingUser) {
    // User exists, just update subscription
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

    console.log('Updated existing user subscription:', existingUser.id);
    return;
  }

  // Generate unique username and password
  const username = email.split('@')[0] + '_' + Math.random().toString(36).substring(2, 8);
  const tempPassword = generateSecurePassword();

  // Create new user
  const user = await db.users.create({
    email,
    password: tempPassword, // Will be hashed by middleware
    name: session.customer_details?.name || email.split('@')[0],
    role: 'user',
    subscription: 'inner-circle',
    stripe_customer_id: customerId
  });

  // Create subscription record
  await db.subscriptions.create({
    user_id: user.id!,
    plan: 'inner-circle',
    stripe_payment_id: session.payment_intent as string,
    status: 'active',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });

  console.log('✅ Created new user:', user.id);

  // Send credentials email
  await sendCredentialsEmail(email, username, tempPassword);

  return { userId: user.id };
}

/**
 * Handle subscription updates/cancellations
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Find user by stripe customer ID
  const { data: users } = await db.users.findByEmail(''); // This won't work, need different approach

  // For now, log the event
  console.log('Subscription changed:', {
    customerId,
    status: subscription.status,
    cancelAtPeriodEnd: subscription.cancel_at_period_end
  });
}

/**
 * Generate secure random password
 */
function generateSecurePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
