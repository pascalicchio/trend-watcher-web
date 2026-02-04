import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    console.log('[Stripe] Initializing with key prefix:', key.substring(0, 10) + '...');
    stripeInstance = new Stripe(key, {
      apiVersion: '2026-01-28.clover',
    });
  }
  return stripeInstance;
}

export async function createCheckoutSession(priceId: string, successUrl: string, cancelUrl: string) {
  const stripe = getStripe();
  
  console.log('[Stripe] Creating session:', { priceId, successUrl, cancelUrl });
  
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}
