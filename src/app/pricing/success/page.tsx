'use client';

import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fafafa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#111',
        border: '1px solid #8B5CF6',
        borderRadius: '20px',
        padding: '60px',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Payment Successful!
        </h1>

        <div style={{
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <p style={{ color: '#aaa', marginBottom: '16px', lineHeight: '1.6' }}>
            ✅ Your 2-day free trial is now active
          </p>
          <p style={{ color: '#aaa', marginBottom: '16px', lineHeight: '1.6' }}>
            📧 Check your email for your <strong style={{ color: '#8B5CF6' }}>password setup link</strong>:
          </p>
          <ul style={{ color: '#888', fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
            <li>📧 Check your inbox (and spam folder)</li>
            <li>🔗 Click "Set Up Password" link</li>
            <li>🔑 Create your password</li>
            <li>🚀 Access Inner Circle dashboard</li>
          </ul>
        </div>

        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Redirecting to login in 3 seconds...
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a
            href="/login"
            style={{
              padding: '14px 32px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)'
            }}
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}
