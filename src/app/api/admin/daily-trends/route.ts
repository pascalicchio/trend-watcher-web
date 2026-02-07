import { NextRequest, NextResponse } from 'next/server';

// Admin API for pushing Daily 5 trends (used by cron job)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'trendwatcher-admin-secret';

export async function POST(request: NextRequest) {
  try {
    const { key, trends } = await request.json();

    // Verify admin key
    if (key !== ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!trends || !Array.isArray(trends)) {
      return NextResponse.json({ error: 'Invalid trends data' }, { status: 400 });
    }

    // Store in file for dashboard access
    const fs = require('fs');
    const path = require('path');

    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dailyTrendsPath = path.join(dataDir, 'daily-trends.json');
    fs.writeFileSync(dailyTrendsPath, JSON.stringify({
      updated: new Date().toISOString(),
      trends
    }, null, 2));

    console.log(`✅ Saved ${trends.length} trends to daily-trends.json`);

    return NextResponse.json({
      success: true,
      count: trends.length,
      updated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Daily trends API error:', error);
    return NextResponse.json({ error: 'Failed to save trends' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const fs = require('fs');
    const path = require('path');

    const dailyTrendsPath = path.join(process.cwd(), 'data', 'daily-trends.json');

    if (!fs.existsSync(dailyTrendsPath)) {
      return NextResponse.json({ trends: [], updated: null });
    }

    const data = JSON.parse(fs.readFileSync(dailyTrendsPath, 'utf8'));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get daily trends error:', error);
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
  }
}
