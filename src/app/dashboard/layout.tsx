'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/users/profile');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--border-subtle)',
          borderTopColor: 'var(--accent-blue)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: '📊' },
    { href: '/dashboard/reports', label: 'Reports', icon: '📋' },
    { href: '/dashboard/subscription', label: 'Subscription', icon: '💳' },
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' }
  ];

  if (user?.role === 'admin') {
    navItems.push({ href: '/dashboard/admin', label: 'Admin', icon: '⚙️' });
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: 'rgba(15, 20, 32, 0.5)',
        borderRight: '1px solid var(--border-subtle)',
        padding: '24px 16px',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'baseline',
          marginBottom: '32px',
          padding: '0 12px',
          textDecoration: 'none'
        }}>
          <span style={{ fontWeight: '300', fontSize: '20px', color: 'var(--text-primary)' }}>trend</span>
          <span style={{
            fontWeight: '800',
            fontSize: '20px',
            background: 'var(--gradient-1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>watcher</span>
        </Link>

        {/* User info */}
        {user && (
          <div style={{
            padding: '16px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{user.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user.email}</div>
            <div style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '4px 10px',
              background: user.subscription === 'inner-circle' ? 'var(--gradient-1)' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              color: user.subscription === 'inner-circle' ? 'var(--bg-primary)' : 'var(--text-secondary)'
            }}>
              {user.subscription === 'inner-circle' ? 'INNER CIRCLE' : 'FREE'}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            color: 'var(--accent-pink)',
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%',
            marginTop: 'auto'
          }}
        >
          <span style={{ fontSize: '18px' }}>🚪</span>
          Sign Out
        </button>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1,
        marginLeft: '260px',
        padding: '32px',
        maxWidth: 'calc(100% - 260px)'
      }}>
        {children}
      </main>
    </div>
  );
}
