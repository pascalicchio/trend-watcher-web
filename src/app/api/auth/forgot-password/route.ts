import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }
    
    const user = db.users.findByEmail(email);
    
    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({
        success: true,
        message: 'If an account exists, a reset link will be sent'
      });
    }
    
    // Generate reset token (expires in 1 hour)
    const resetToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    
    // Store reset token in user record
    db.users.update(user.id, {
      resetToken,
      resetTokenExpires: expiresAt
    });
    
    // In production, send email via SendGrid
    // For now, log the reset link
    const resetLink = `/reset-password?token=${resetToken}`;
    
    console.log(`[PASSWORD RESET] Email: ${email}`);
    console.log(`[PASSWORD RESET] Link: ${resetLink}`);
    console.log(`[PASSWORD RESET] Expires: ${expiresAt}`);
    
    // TODO: Send via SendGrid
    // await sendEmail(email, 'Password Reset', `Click here: ${resetLink}`);
    
    return NextResponse.json({
      success: true,
      message: 'If an account exists, a reset link will be sent',
      // Only show in development
      ...(process.env.NODE_ENV === 'development' && { resetLink })
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
