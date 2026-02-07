'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | React.ReactNode>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const reason = searchParams.get('reason');

  useEffect(() => {
    // Show message if redirected due to session issue
    if (reason === 'session_expired') {
      setError('Your session has expired. Please log in again.');
    } else if (reason === 'account_deleted') {
      setError('Your account has been deleted.');
    } else if (reason === 'subscription_expired') {
      setError('Your subscription has expired. Please renew to access the dashboard.');
    }
  }, [reason]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        // Check if user needs to set up password
        if (data.error === 'setup_required' && data.setupUrl) {
          setError(
            <span>
              You need to set up your password first.{' '}
              <a href={data.setupUrl} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                Click here to set up password
              </a>
            </span>
          );
          return;
        }
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
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

        {/* Header */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          Welcome back
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Sign in to access your Intelligence Dashboard
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(252, 70, 107, 0.15)',
            border: '1px solid var(--accent-pink)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: 'var(--accent-pink)',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px',
              color: 'var(--text-secondary)'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px',
              color: 'var(--text-secondary)'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
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
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Links */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ marginBottom: '8px' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{
              color: 'var(--accent-blue)',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Create one
            </Link>
          </div>
          <Link href="/forgot-password" style={{
            color: 'var(--text-tertiary)',
            textDecoration: 'none',
            fontSize: '13px'
          }}>
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
