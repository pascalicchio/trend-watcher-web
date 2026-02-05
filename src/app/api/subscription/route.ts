import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getTokenFromRequest, verifyToken, hasSubscription } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const subscriptions = await db.subscriptions.findByUserId(payload.id);
    const user = await db.users.findById(payload.id);
    
    return NextResponse.json({
      subscription: {
        plan: user?.subscription || 'free',
        isActive: hasSubscription(payload),
        history: subscriptions
      }
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    return NextResponse.json({ error: 'Failed to get subscription' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const { plan, stripePaymentId } = await request.json();
    
    // Create subscription record
    const subscription = await db.subscriptions.create({
      user_id: payload.id,
      plan,
      stripe_payment_id: stripePaymentId,
      status: 'active',
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
    
    // Update user subscription
    await db.users.updateSubscription(payload.id, plan);
    
    return NextResponse.json({
      success: true,
      subscription
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}
