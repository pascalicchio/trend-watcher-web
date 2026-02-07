import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qijbkikzcvpaqztlitbj.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpamJraWt6Y3ZwYXF6dGxpdGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDY1NjUsImV4cCI6MjA4NTgyMjU2NX0.Rs9krARbvjUrh2iCl4Koh0Td03EeJLbgQQ7aGJwDXSw';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const source = searchParams.get('source');
    const sort = searchParams.get('sort') || 'velocity';

    let url = `${SUPABASE_URL}/rest/v1/trends?select=*&order=${sort}.desc&limit=${limit}`;
    
    if (source && source !== 'all') {
      url += `&source=eq.${source}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trends');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      count: data.length,
      trends: data
    });
  } catch (error) {
    console.error('Error fetching trends:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch trends'
    }, { status: 500 });
  }
}
