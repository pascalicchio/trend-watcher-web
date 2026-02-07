import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import atomicStorage from '../../../storage/atomic-storage';

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
    
    // Check if admin
    const isAdmin = payload.role === 'admin';
    
    // Check for daily-top5 endpoint
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (type === 'daily-top5') {
      // Fetch from PostgreSQL database
      try {
        const products = await atomicStorage.getDailyTop5();
        return NextResponse.json({ 
          success: true,
          source: 'database',
          products 
        });
      } catch (dbError) {
        // Fallback to legacy JSON if DB fails
        console.warn('Database fetch failed, falling back to JSON:', dbError);
        
        try {
          const fs = require('fs');
          const path = require('path');
          const dataPath = path.join(process.cwd(), 'trend-engine/data/intelligence-card.json');
          const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
          
          return NextResponse.json({ 
            success: true,
            source: 'json-fallback',
            products: data.trends 
          });
        } catch (jsonError) {
          return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
        }
      }
    }
    
    // Original reports endpoint
    const reports = isAdmin 
      ? await db.reports.findAll()
      : await db.reports.findByUserId(payload.id);
    
    return NextResponse.json({ reports });
  } catch (error) {
    console.error('Get reports error:', error);
    return NextResponse.json({ error: 'Failed to get reports' }, { status: 500 });
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
    
    const data = await request.json();
    
    const report = await db.reports.create({
      user_id: payload.id,
      type: data.type || 'intelligence-card',
      title: data.title,
      content: data.content,
      data: data.data,
      status: 'delivered'
    });
    
    return NextResponse.json({ report });
  } catch (error) {
    console.error('Create report error:', error);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}
