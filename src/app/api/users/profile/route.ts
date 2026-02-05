import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { getDbInfo } = await import('@/lib/db');
    console.log('[Profile] DB Provider:', getDbInfo().provider, 'URL:', getDbInfo().url);
    
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    console.log('[Profile] Token payload:', payload);
    
    // Force fresh fetch from Supabase
    const user = await db.users.findById(payload.id);
    console.log('[Profile] DB result:', user);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subscription: user.subscription,
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
