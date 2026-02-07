'use client';

import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/dashboard';
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
        border: '1px solid #10B981',
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
          background: 'linear-gradient(135deg, #10B981, #059669)',
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
            ✅ Your payment was processed successfully
          </p>
          <p style={{ color: '#aaa', marginBottom: '16px', lineHeight: '1.6' }}>
            📧 Check your email for login credentials:
          </p>
          <ul style={{ color: '#888', fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
            <li>📧 Check your inbox (and spam folder)</li>
            <li>🔐 Use the temporary password provided</li>
            <li>🔑 Log in and change your password</li>
          </ul>
        </div>

        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Redirecting to dashboard in 3 seconds...
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a
            href="/dashboard"
            style={{
              padding: '14px 32px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '16px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Go to Dashboard Now
          </a>
        </div>
      </div>
    </div>
  );
}
