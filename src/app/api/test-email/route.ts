import { NextRequest, NextResponse } from 'next/server';
import { sendCredentialsEmail } from '@/lib/email';

// Test endpoint to verify email sending
export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'email, username, password required' },
        { status: 400 }
      );
    }

    console.log('🧪 Testing email send to:', email);

    const result = await sendCredentialsEmail(email, username, password);

    return NextResponse.json({
      success: result,
      message: result ? 'Email sent successfully' : 'Email sending failed - check server logs'
    });
  } catch (error: any) {
    console.error('Email test error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
