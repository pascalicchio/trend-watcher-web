import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and new password required' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }
    
    // Find user with this reset token
    const users = db.users.findAll?.() || [];
    const user = users.find((u: any) => u.resetToken === token);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }
    
    // Check if token expired
    if (user.resetTokenExpires && new Date(user.resetTokenExpires) < new Date()) {
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }
    
    // Update password and clear reset token
    db.users.update(user.id, {
      password,
      resetToken: null,
      resetTokenExpires: null
    });
    
    return NextResponse.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}

// Helper to find all users (since db doesn't export this)
function findAllUsers() {
  try {
    const fs = require('fs');
    const path = require('path');
    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return data.users || [];
  } catch {
    return [];
  }
}
