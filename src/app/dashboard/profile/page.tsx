'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/users/profile');
        const data = await res.json();
        setUser(data.user);
        setName(data.user.name);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px' }}>
        Profile Settings
      </h1>

      <div style={{
        maxWidth: '600px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '32px'
      }}>
        {/* Message */}
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

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px',
              color: 'var(--text-secondary)'
            }}>
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '15px'
              }}
              placeholder="Your name"
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
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-tertiary)',
                fontSize: '15px',
                cursor: 'not-allowed'
              }}
            />
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
              Email cannot be changed
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '14px 32px',
              background: 'var(--gradient-1)',
              border: 'none',
              borderRadius: '8px',
              color: 'var(--bg-primary)',
              fontSize: '15px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        {/* Account Info */}
        <div style={{
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
            Account Information
          </h3>
          <div style={{ display: 'grid', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Member since</span>
              <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Plan</span>
              <span style={{
                color: user?.subscription === 'inner-circle' ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}>
                {user?.subscription === 'inner-circle' ? 'Inner Circle' : 'Free'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
