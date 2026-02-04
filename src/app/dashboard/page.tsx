'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: string;
}

interface Report {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  status: string;
}

export default function DashboardOverview() {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, reportsRes] = await Promise.all([
          fetch('/api/users/profile'),
          fetch('/api/reports')
        ]);
        
        const userData = await userRes.json();
        const reportsData = await reportsRes.json();
        
        setUser(userData.user);
        setReports(reportsData.reports?.slice(0, 5) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
          Here's your trend intelligence overview
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
          <div style={{ fontSize: '28px', fontWeight: '700' }}>{reports.length}</div>
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
            Trending Products
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Live</div>
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
            Real-time monitoring
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Recent Intelligence Reports</h2>
          <a href="/dashboard/reports" style={{
            color: 'var(--accent-blue)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            View all →
          </a>
        </div>

        {reports.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <p>No reports yet</p>
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '8px' }}>
              Intelligence cards will appear here once delivered
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reports.map((report) => (
              <div key={report.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>{report.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{
                  padding: '6px 12px',
                  background: report.status === 'delivered' ? 'rgba(0, 201, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: report.status === 'delivered' ? 'var(--accent-blue)' : 'var(--text-tertiary)'
                }}>
                  {report.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA for free users */}
      {user?.subscription !== 'inner-circle' && (
        <div style={{
          marginTop: '32px',
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
