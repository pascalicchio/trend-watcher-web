import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getTokenFromRequest, verifyToken, clearAuthCookie } from '@/lib/auth';

// Force dynamic - this route accesses request.headers
export const dynamic = 'force-dynamic';

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
    
    // CRITICAL: Verify user still exists in database
    const user = await db.users.findById(payload.id);
    
    if (!user) {
      console.log('❌ User not found - account may have been deleted');
      return NextResponse.json({ 
        error: 'Account not found',
        forceLogout: true 
      }, { status: 401 });
    }
    
    // CRITICAL: Check subscription expiration
    const subscriptions = await db.subscriptions.findByUserId(user.id!);
    const activeSub = subscriptions.find(s => s.status === 'active');
    
    if (activeSub && activeSub.end_date) {
      const endDate = new Date(activeSub.end_date);
      if (endDate < new Date()) {
        console.log('❌ Subscription expired:', activeSub.end_date);
        return NextResponse.json({ 
          error: 'Subscription expired',
          expiredAt: activeSub.end_date,
          forceLogout: true
        }, { status: 401 });
      }
    }
    
    // User is valid - return profile
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
        subscriptionExpires: activeSub?.end_date,
        created_at: user.created_at
      }
    }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({ error: 'Failed to get profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    // Verify user still exists
    const user = await db.users.findById(payload.id);
    if (!user) {
      return NextResponse.json({ 
        error: 'Account not found',
        forceLogout: true 
      }, { status: 401 });
    }
    
    const updates = await request.json();
    const updatedUser = await db.users.update(payload.id, updates);
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        subscription: updatedUser.subscription
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
