import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

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
    
    // Try to get user's cards first
    let cards = await db.intelligenceCards.findByUserId(payload.id);
    
    // If no cards yet, show demo cards from all users
    if (cards.length === 0) {
      const allCards = await db.intelligenceCards.findAll();
      cards = allCards.slice(0, 5); // Show latest 5 demo cards
    }
    
    return NextResponse.json({ 
      cards,
      summary: {
        total: cards.length,
        latestCard: cards[0]?.data?.title || null,
        topTrend: cards[0]?.data?.summary?.topMover || null
      }
    });
  } catch (error) {
    console.error('Get intelligence cards error:', error);
    return NextResponse.json({ error: 'Failed to get intelligence cards' }, { status: 500 });
  }
}
