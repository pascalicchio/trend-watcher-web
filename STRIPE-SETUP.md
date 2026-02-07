# Stripe Setup Guide for TrendWatcher

## Overview
This guide walks you through configuring Stripe for the TrendWatcher Inner Circle subscription ($49/month).

---

## Step 1: Access Stripe Dashboard

1. **Go to:** https://dashboard.stripe.com
2. **Sign up** or **log in** with your account
3. **Enable Test Mode** (toggle in top-right corner) for development

---

## Step 2: Create Products

### Inner Circle Product ($49/month)

1. Navigate to **Products** → **Add product**
2. Fill in:
   - **Name:** Inner Circle
   - **Description:** Predictive Velocity via Metadata Arbitrage - Daily Top 5 trending products, real-time alerts, supplier sourcing
   - **Pricing:**
     - **Price:** $49.00 USD
     - **Billing period:** Monthly
     - **Model:** Standard pricing
3. Click **Save product**
4. **Copy the Price ID** (starts with `price_...`) - you'll need this for your environment variables

### Optional: Test Product
- Create another product called "Inner Circle (Test)" with $0.01 or $1.00 for testing

---

## Step 3: Configure Webhook

### Create the Endpoint

1. Navigate to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Fill in:
   - **URL:** `https://trendwatcher.io/api/webhooks/stripe`
   - **Events to listen for:**
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
4. Click **Add endpoint**

### Get Webhook Secret

1. After creating, click **Reveal** next to "Signing secret"
2. **Copy the webhook secret** (starts with `whsec_...`)
3. Add to your `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
   ```

---

## Step 4: Get API Keys

1. Navigate to **Developers** → **API keys**
2. **Publishable key** (starts with `pk_test_...` or `pk_live_...`):
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
3. **Secret key** (starts with `sk_test_...` or `sk_live_...`):
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```

---

## Step 5: Environment Variables

Create or update `.env.local` in `/root/.openclaw/trendwatcher-web/`:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price ID (from Step 2)
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...

# Stripe Portal (optional)
NEXT_PUBLIC_STRIPE_PORTAL_URL=https://billing.stripe.com/p/login/...
```

---

## Step 6: Test Mode vs Production Mode

### Test Mode (Development)
- **Purpose:** Testing payments without charging real cards
- **Use test cards:** https://stripe.com/docs/testing
- **Common test card:** 4242 4242 4242 4242 (any future date, any CVC)
- **API keys:** Use `pk_test_...` and `sk_test_...`

### Production Mode (Live)
- **Purpose:** Real payments from customers
- **Activate when:** You're ready to launch
- **Process:**
  1. Click "Activate" in Stripe dashboard
  2. Verify your business details
  3. Add bank account for payouts
  4. Switch environment variables to live keys:
     - `pk_live_...`
     - `sk_live_...`
- **No test cards work in production!**

---

## Step 7: Test the Integration

### Test Checkout Flow

1. Start your dev server: `npm run dev`
2. Navigate to `/login` and sign up
3. Click "Upgrade to Inner Circle"
4. Use test card: `4242 4242 4242 4242` (exp: 12/30, CVC: 123)
5. Verify:
   - ✅ Payment succeeds
   - ✅ Webhook fires
   - ✅ User gets subscription in database
   - ✅ Welcome email sent

### Verify Webhook Locally (Optional)

Use Stripe CLI for local testing:
```bash
# Install Stripe CLI
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret shown
```

---

## Step 8: Launch Checklist

Before going live:

- [ ] All environment variables set in Vercel
- [ ] Webhook endpoint is live and responding
- [ ] Test payment flow works end-to-end
- [ ] Customer portal enabled (optional): **Settings** → **Customer portal**
- [ ] Business info filled in: **Settings** → **Business settings**
- [ ] Terms of Service and Privacy Policy URLs configured
- [ ] Support email configured: **Settings** → **Emails**
- [ ] Switched to production API keys
- [ ] Removed test products from website

---

## Troubleshooting

### Webhook Not Firing?
- Check endpoint URL is correct (HTTPS required for production)
- Verify events are selected
- Check Stripe dashboard for "Failed delivery" logs

### Payment Failing?
- Ensure price ID is correct and active
- Check Stripe dashboard for error logs
- Verify API keys are correct

### Need Help?
- Stripe Docs: https://stripe.com/docs
- Stripe Dashboard: https://dashboard.stripe.com
- Support: https://support.stripe.com

---

## Quick Reference

| Item | Value |
|------|-------|
| Webhook URL | `https://trendwatcher.io/api/webhooks/stripe` |
| Inner Circle Price | $49/month |
| Test Card | 4242 4242 4242 4242 |
| Test Mode Toggle | Top-right of Stripe Dashboard |
