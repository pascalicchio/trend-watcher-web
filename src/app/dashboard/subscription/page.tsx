'use client';

import { useEffect, useState } from 'react';

interface Subscription {
  plan: string;
  isActive: boolean;
  history: any[];
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch('/api/subscription');
        const data = await res.json();
        setSubscription(data.subscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscription();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px' }}>
        Subscription Management
      </h1>

      {/* Current Plan */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px'
      }}>
        <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
          Current Plan
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            background: subscription?.plan === 'inner-circle' ? 'var(--gradient-1)' : 'var(--text-secondary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {subscription?.plan === 'inner-circle' ? 'Inner Circle' : 'Free'}
          </div>
          {subscription?.isActive && (
            <span style={{
              padding: '6px 14px',
              background: 'rgba(0, 201, 255, 0.15)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--accent-blue)'
            }}>
              ACTIVE
            </span>
          )}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          {subscription?.plan === 'inner-circle'
            ? 'You have full access to all trend intelligence features.'
            : 'Upgrade to Inner Circle for 48-hour early access.'}
        </p>
      </div>

      {/* Pricing Plans */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {/* Free Plan */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '32px',
          opacity: subscription?.plan === 'free' ? 1 : 0.6
        }}>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
            Public Data Feed
          </div>
          <div style={{ fontSize: '40px', fontWeight: '700', marginBottom: '24px', fontFamily: 'monospace' }}>
            $0<span style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
            {['Daily velocity score updates', 'Saturation Guard alerts', '48-hour delayed reveals', 'Community access (read-only)'].map((feature, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px 0',
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <button
            disabled={subscription?.plan === 'free'}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: subscription?.plan === 'free' ? 'transparent' : 'var(--bg-card)',
              color: subscription?.plan === 'free' ? 'var(--text-tertiary)' : 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: '600',
              cursor: subscription?.plan === 'free' ? 'not-allowed' : 'pointer'
            }}
          >
            {subscription?.plan === 'free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* Inner Circle Plan */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.05) 0%, rgba(146, 254, 157, 0.05) 100%)',
          border: '2px solid var(--accent-blue)',
          borderRadius: '16px',
          padding: '32px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '24px',
            background: 'var(--gradient-1)',
            color: 'var(--bg-primary)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}>
            Recommended
          </div>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
            Inner Circle
          </div>
          <div style={{ fontSize: '40px', fontWeight: '700', marginBottom: '24px', fontFamily: 'monospace' }}>
            $49<span style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>/mo</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
            {['Everything in Free', 'Daily Intelligence Cards at 8 AM', '48-hour early detection', 'AI-generated TikTok scripts', 'Supplier sourcing & pricing', 'Full competitor analysis'].map((feature, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px 0',
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <button
            disabled={subscription?.plan === 'inner-circle'}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              background: subscription?.plan === 'inner-circle' ? 'var(--text-tertiary)' : 'var(--gradient-1)',
              color: 'var(--bg-primary)',
              fontSize: '15px',
              fontWeight: '600',
              cursor: subscription?.plan === 'inner-circle' ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 32px rgba(0, 201, 255, 0.3)'
            }}
          >
            {subscription?.plan === 'inner-circle' ? 'Current Plan' : 'Upgrade Now'}
          </button>
        </div>
      </div>

      {/* Billing History */}
      {subscription?.history && subscription.history.length > 0 && (
        <div style={{
          marginTop: '48px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '32px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
            Billing History
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {subscription.history.map((item: any) => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ fontWeight: '500' }}>{item.plan}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div style={{
                  padding: '6px 12px',
                  background: item.status === 'active' ? 'rgba(0, 201, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: item.status === 'active' ? 'var(--accent-blue)' : 'var(--text-tertiary)'
                }}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
