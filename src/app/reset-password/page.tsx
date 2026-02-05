'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
          Invalid reset link
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          This reset link is invalid or has expired.
        </p>
        <Link href="/forgot-password" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'var(--gradient-1)',
          borderRadius: '8px',
          color: 'var(--bg-primary)',
          fontWeight: '600',
          textDecoration: 'none'
        }}>
          Request New Link
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(false);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to reset password' });
        return;
      }

      setMessage({ type: 'success', text: 'Password reset successful! Redirecting to login...' });
      
      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
        Reset your password
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Enter your new password below
      </p>

      {message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '24px',
          background: message.type === 'success' 
            ? 'rgba(0, 201, 255, 0.15)' 
            : 'rgba(252, 70, 107, 0.15)',
          border: `1px solid ${message.type === 'success' ? 'var(--accent-blue)' : 'var(--accent-pink)'}`,
          color: message.type === 'success' ? 'var(--accent-blue)' : 'var(--accent-pink)',
          fontSize: '14px'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            color: 'var(--text-secondary)'
          }}>
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '15px',
              outline: 'none'
            }}
            placeholder="••••••••"
          />
        </div>

        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            color: 'var(--text-secondary)'
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '15px',
              outline: 'none'
            }}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            background: 'var(--gradient-1)',
            border: 'none',
            borderRadius: '8px',
            color: 'var(--bg-primary)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '48px 40px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{
            fontSize: '28px',
            fontWeight: '300',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'baseline'
          }}>
            <span style={{ color: 'var(--text-primary)' }}>trend</span>
            <span style={{
              fontWeight: '800',
              background: 'var(--gradient-1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>watcher</span>
          </Link>
        </div>

        <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
