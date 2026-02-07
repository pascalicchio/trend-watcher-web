import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Test Supabase connection
    console.log('🧪 Testing Supabase...');
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING');
    console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'SET' : 'MISSING');
    
    // Try to create a test subscription
    const testUserId = 'test-' + Date.now();
    
    console.log('🧪 Creating test subscription...');
    
    try {
      const sub = await db.subscriptions.create({
        user_id: testUserId,
        plan: 'test',
        status: 'test',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString()
      });
      
      console.log('✅ Test subscription created:', sub);
      
      // Clean up
      return NextResponse.json({ 
        success: true,
        subscription: sub,
        env: {
          supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseKey: !!process.env.SUPABASE_ANON_KEY
        }
      });
    } catch (subError: any) {
      console.error('❌ Subscription create error:', subError.message);
      return NextResponse.json({ 
        success: false,
        error: subError.message 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('❌ Test error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
