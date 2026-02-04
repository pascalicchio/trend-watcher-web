import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();
    console.log('Checkout request for:', priceId);
    
    // Test without Stripe
    const testUrl = 'https://example.com/pricing?success=true';
    
    console.log('Returning test URL:', testUrl);
    
    return new Response(JSON.stringify({ url: testUrl }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('ERROR:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
