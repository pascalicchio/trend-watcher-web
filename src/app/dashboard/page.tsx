'use client';

import { useEffect, useState } from 'react';

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

export default function DashboardOverview() {
  const [user, setUser] = useState<User | null>(null);
  const [cards, setCards] = useState<IntelligenceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, cardsRes] = await Promise.all([
          fetch('/api/users/profile'),
          fetch('/api/intelligence-cards')
        ]);
        
        const userData = await userRes.json();
        const cardsData = await cardsRes.json();
        
        setUser(userData.user);
        setCards(cardsData.cards || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const latestCard = cards[0];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {latestCard 
            ? `Latest report: ${latestCard.data.summary.totalTrends} trends detected`
            : 'Ready to start detecting trends'}
        </p>
      </div>

      {/* Stats Cards */}
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
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
            {user?.subscription === 'inner-circle' 
              ? 'Full intelligence access' 
              : 'Upgrade for early access'}
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
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
            Reports delivered
          </div>
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
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
            Trend growth rate
          </div>
        </div>
      </div>

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
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
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
              🔥 LIVE
            </span>
          </div>

          {/* AI Insights */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.08) 0%, rgba(146, 254, 157, 0.08) 100%)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--accent-blue)' }}>
              🤖 AI Insights
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {latestCard.data.aiInsights?.slice(0, 3).map((insight, i) => (
                <div key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {insight}
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              🛒 Trending Products
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {latestCard.data.products?.slice(0, 3).map((product, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <span style={{ fontSize: '24px' }}>{product.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                      💰 {product.priceRange} • {product.platform || 'Amazon'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: '700',
                      color: product.velocity > 300 ? 'var(--accent-primary)' : 'var(--text-primary)'
                    }}>
                      {product.velocity}%
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                      Velocity
                    </div>
                  </div>
                  <div style={{
                    padding: '6px 12px',
                    background: product.recommendation?.includes('HOT') 
                      ? 'rgba(252, 70, 107, 0.2)' 
                      : 'rgba(0, 201, 255, 0.15)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: product.recommendation?.includes('HOT')
                      ? 'var(--accent-pink)'
                      : 'var(--accent-blue)'
                  }}>
                    {product.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HN Trends */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
              📰 Hacker News Trends
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {latestCard.data.hnTrends?.slice(0, 3).map((trend, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '8px'
                }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    background: 'var(--bg-card)', 
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--accent-purple)'
                  }}>
                    {trend.category}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {trend.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                      {trend.domain}
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    ⬆️ {trend.score}
                  </span>
                </div>
              ))}
            </div>
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
            Intelligence cards are generated daily at 8 AM UTC. Your first report will appear here soon!
          </p>
        </div>
      )}

      {/* CTA for free users */}
      {user?.subscription !== 'inner-circle' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, rgba(146, 254, 157, 0.1) 100%)',
          border: '1px solid var(--accent-blue)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            Upgrade to Inner Circle
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Get 48-hour early access to trending products, AI-generated TikTok scripts, and full competitor analysis.
          </p>
          <a href="/dashboard/subscription" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--gradient-1)',
            borderRadius: '8px',
            color: 'var(--bg-primary)',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Upgrade Now
          </a>
        </div>
      )}
    </div>
  );
}
