'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: [
      '5 trend searches/day',
      'Basic velocity scoring',
      'Email support',
    ],
    priceId: null,
    gradient: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Inner Circle',
    price: '$49',
    period: '/month',
    features: [
      'Unlimited trend searches',
      'AI-powered trend analysis',
      'Velocity + Saturation scoring',
      'Amazon & eBay integration',
      'Priority email support',
      'Early access to new features',
    ],
    priceId: 'price_1Swyxa31jVHQylkhu0zQN5wn',
    gradient: 'from-emerald-500 to-teal-600',
    popular: true,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState({ success: '', canceled: '' });
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams({
      success: params.get('success') || '',
      canceled: params.get('canceled') || '',
    });
  }, []);

  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) return;

    setLoading(priceId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const { url, error } = await response.json();

      if (url) {
        window.location.href = url;
      } else if (error) {
        console.error('Server error:', error);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(null);
    }
  };

  if (searchParams.success) {
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
            Welcome to the Inner Circle!
          </h1>

          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <p style={{ color: '#aaa', marginBottom: '16px', lineHeight: '1.6' }}>
              Your payment was successful. Check your email for your login credentials:
            </p>
            <ul style={{ color: '#888', fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
              <li>📧 Check your inbox (and spam folder)</li>
              <li>🔐 Use the temporary password provided</li>
              <li>🔑 Log in and change your password</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Go to Login
            </button>
            <button
              onClick={() => router.push('/')}
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                border: '1px solid #333',
                background: 'transparent',
                color: '#888',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fafafa',
      padding: '40px 20px'
    }}>
      {searchParams.canceled && (
        <div style={{
          background: '#991B1B',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '40px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          <p style={{ margin: 0 }}>❌ Payment was canceled. No worries—try again when ready!</p>
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Choose Your Path
        </h1>
        <p style={{ color: '#888', fontSize: '18px' }}>
          From casual browsers to serious arbitrageurs
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'wrap',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            style={{
              background: '#111',
              border: `1px solid ${plan.popular ? '#10B981' : '#333'}`,
              borderRadius: '16px',
              padding: '40px',
              width: '320px',
              position: 'relative'
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '-30px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#000',
                padding: '5px 40px',
                fontSize: '12px',
                fontWeight: 'bold',
                transform: 'rotate(45deg)'
              }}>
                POPULAR
              </div>
            )}

            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: plan.popular ? '#10B981' : '#fafafa'
            }}>
              {plan.name}
            </h3>

            <div style={{ marginBottom: '30px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>{plan.price}</span>
              <span style={{ color: '#888' }}>{plan.period}</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px' }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
                  <span style={{ color: '#10B981' }}>✓</span> {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.priceId)}
              disabled={!!loading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                background: plan.popular
                  ? 'linear-gradient(135deg, #10B981, #059669)'
                  : '#333',
                color: plan.popular ? '#000' : '#888',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading === plan.priceId ? 'Processing...' : plan.price === '$0' ? 'Get Started Free' : 'Join Inner Circle'}
            </button>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: '60px', color: '#666', fontSize: '14px' }}>
        🔒 Secured by Stripe • Cancel anytime
      </p>
    </div>
  );
}
