'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SetupPasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const emailParam = searchParams.get('email');
    
    if (!token || !emailParam) {
      setError('Invalid setup link. Please check your email for the correct link.');
    } else {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = searchParams.get('token');

    if (!token) {
      setError('Invalid setup link');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/setup-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to set password');
        return;
      }

      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
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
          padding: '48px 40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
            Password Set!
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Your password has been set successfully. Redirecting to login...
          </p>
        </div>
      </div>
    );
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
          Set Your Password
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Create a password to access your Inner Circle dashboard
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
              disabled
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-tertiary)',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
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
              minLength={8}
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

          <div style={{ marginBottom: '24px' }}>
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
            {loading ? 'Setting password...' : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
