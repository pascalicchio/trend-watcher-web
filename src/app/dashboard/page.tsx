'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: string;
}

interface IntelligenceCard {
  id: string;
  data: {
    title: string;
    summary: {
      totalTrends: number;
      topMover: string;
      avgVelocity: number;
    };
    products: Array<{
      name: string;
      velocity: number;
      saturation: number;
      priceRange: string;
      emoji: string;
      recommendation: string;
      platform?: string;
    }>;
    hnTrends: Array<{
      title: string;
      domain: string;
      score: number;
      category: string;
    }>;
    aiInsights: string[];
  };
  created_at: string;
}

interface Trend {
  id: number;
  title: string;
  link: string;
  query: string;
  velocity: number;
  saturation: number;
  source: string;
  status: string;
  collected_at: string;
}

const getSaturationColor = (saturation: number) => {
  if (saturation < 1) return '#00C9FF'; // Blue ocean
  if (saturation < 5) return '#92FE9D'; // Golden gap
  if (saturation < 10) return '#F5D300'; // Caution
  return '#FF6B6B'; // Saturated
};

const getVelocityColor = (velocity: number) => {
  if (velocity > 500) return '#8B5CF6'; // Hot
  if (velocity > 300) return '#EC4899'; // Very active
  if (velocity > 100) return '#10B981'; // Active
  return '#6B7280'; // Normal
};

export default function DashboardOverview() {
  const [user, setUser] = useState<User | null>(null);
  const [cards, setCards] = useState<IntelligenceCard[]>([]);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [trendsLoading, setTrendsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    
    async function fetchData() {
      try {
        const [userRes, cardsRes] = await Promise.all([
          fetch('/api/users/profile?_=' + Date.now(), { cache: 'no-store' }),
          fetch('/api/intelligence-cards?_=' + Date.now(), { cache: 'no-store' })
        ]);
        
        const userData = await userRes.json();
        const cardsData = await cardsRes.json();
        
        const shouldLogout = 
          !userRes.ok ||
          userData.forceLogout ||
          userData.error === 'Account not found' ||
          userData.error === 'Subscription expired' ||
          !userData.user;
        
        if (shouldLogout) {
          if (typeof document !== 'undefined') {
            document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }
          if (typeof window !== 'undefined') {
            window.location.replace('/login?reason=session_expired');
          }
          return;
        }
        
        setUser(userData.user);
        setCards(cardsData.cards || []);
      } catch (error) {
        if (typeof window !== 'undefined') {
          window.location.replace('/login');
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    function onFocus() {
      fetchData();
    }
    window.addEventListener('focus', onFocus);
    
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [pathname]);

  // Fetch real trends from Supabase
  useEffect(() => {
    async function fetchTrends() {
      setTrendsLoading(true);
      try {
        const response = await fetch('/api/trends?limit=20');
        const data = await response.json();
        if (data.success) {
          setTrends(data.trends);
        }
      } catch (error) {
        console.error('Error fetching trends:', error);
      } finally {
        setTrendsLoading(false);
      }
    }
    
    fetchTrends();
  }, []);

  const latestCard = cards[0];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '70vh',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '3px solid var(--border-subtle)',
          borderTopColor: 'var(--accent-purple)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <p>Verifying session...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Welcome back, {user?.name?.split(' ')[0]}! 
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {latestCard 
            ? 'Latest report: ' + latestCard.data.summary.totalTrends + ' trends detected'
            : 'Ready to start detecting trends'}
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Your Plan
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            background: user?.subscription === 'inner-circle' ? 'var(--gradient-1)' : 'var(--text-secondary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {user?.subscription === 'inner-circle' ? 'Inner Circle' : 'Free'}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Intelligence Cards
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700' }}>{cards.length}</div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Avg Velocity
          </div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            background: 'var(--gradient-1)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            {latestCard?.data.summary.avgVelocity || 0}%
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Live Trends
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700' }}>{trends.length}</div>
        </div>
      </div>

      {/* Live Trends Section */}
      {trends.length > 0 && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                🔥 Live Market Trends
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                Real-time trends from Google, Amazon & eBay
              </p>
            </div>
            <span style={{
              padding: '8px 16px',
              background: 'rgba(236, 72, 153, 0.15)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--accent-pink)'
            }}>
              LIVE
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {trends.slice(0, 12).map((trend) => (
              <div key={trend.id} style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: 'var(--text-tertiary)'
                  }}>
                    {trend.source.replace('_', ' ').toUpperCase()}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: getSaturationColor(trend.saturation),
                    color: '#0a0a0f'
                  }}>
                    {trend.saturation < 1 ? 'BLUE OCEAN' : `${(trend.saturation * 100).toFixed(1)}%`}
                  </span>
                </div>

                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  marginBottom: '12px',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {trend.title}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a 
                    href={trend.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      color: 'var(--accent-purple)',
                      textDecoration: 'none'
                    }}
                  >
                    View Source →
                  </a>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: getVelocityColor(trend.velocity)
                  }}>
                    {trend.velocity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest Intelligence Card */}
      {latestCard ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>
                {latestCard.data.title}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                {new Date(latestCard.created_at).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
            </div>
            <span style={{
              padding: '8px 16px',
              background: 'rgba(0, 201, 255, 0.15)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--accent-blue)'
            }}>
              INTELLIGENCE
            </span>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.08) 0%, rgba(146, 254, 157, 0.08) 100%)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--accent-blue)' }}>
              AI Insights
            </div>
            {latestCard.data.aiInsights?.slice(0, 3).map((insight: string, i: number) => (
              <div key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {insight}
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              Trending Products
            </h3>
            {latestCard.data.products?.slice(0, 3).map((product: any, i: number) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '24px' }}>{product.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    {product.priceRange}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>
                    {product.velocity}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            No intelligence cards yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Intelligence cards are generated daily at 8 AM UTC.
          </p>
        </div>
      )}
    </div>
  );
}
