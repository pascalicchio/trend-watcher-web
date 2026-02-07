import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    console.log('📧 Password reset requested for:', email);
    
    const user = await db.users.findByEmail(email);
    
    if (!user) {
      // Don't reveal if user exists
      console.log('⚠️ User not found (this is fine for security)');
      return NextResponse.json({
        success: true,
        message: 'If an account exists, a reset link will be sent'
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    
    // Store reset token
    await db.users.update(user.id!, {
      reset_token: resetToken,
      reset_token_expires: expiresAt
    });
    
    // Send reset email
    console.log('📧 Sending reset email...');
    const emailSent = await sendResetEmail(email, resetToken);
    
    if (emailSent) {
      console.log('✅ Reset email sent');
    } else {
      console.log('⚠️ Email not sent (check SendGrid/Brevo config)');
    }
    
    return NextResponse.json({
      success: true,
      message: 'If an account exists, a reset link will be sent'
    });
  } catch (error: any) {
    console.error('❌ Password reset error:', error.message);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
