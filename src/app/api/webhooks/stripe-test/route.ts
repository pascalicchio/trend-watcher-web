import { NextRequest, NextResponse } from 'next/server';

// Simple debug endpoint to test webhook manually
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    console.log('='.repeat(60));
    console.log('🔔 WEBHOOK TEST RECEIVED');
    console.log('='.repeat(60));
    console.log('Signature present:', signature ? 'YES' : 'NO');
    console.log('Body length:', body.length, 'chars');
    
    // Try to parse the event
    try {
      const event = JSON.parse(body);
      console.log('Event type:', event.type);
      console.log('Event ID:', event.id);
      
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('Customer email:', session.customer_email);
        console.log('Customer details:', session.customer_details?.email);
      }
    } catch (parseError) {
      console.log('Parse error:', parseError.message);
    }
    
    console.log('='.repeat(60));
    
    // Always return 200 to prevent Stripe from retrying
    return NextResponse.json({ received: true, test: true });
  } catch (error: any) {
    console.error('Test error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
