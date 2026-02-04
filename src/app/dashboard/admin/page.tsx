'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: string;
  createdAt: string;
}

interface Report {
  id: string;
  title: string;
  type: string;
  userId: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalReports: number;
  freeUsers: number;
  paidUsers: number;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalReports: 0, freeUsers: 0, paidUsers: 0 });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const userRes = await fetch('/api/users/profile');
        const userData = await userRes.json();
        
        if (userData.user?.role !== 'admin') {
          router.push('/dashboard');
          return;
        }
        
        setUser(userData.user);

        // Fetch all users (admin only endpoint would go here)
        // For now, we'll just show stats from subscription endpoint
        const subRes = await fetch('/api/subscription');
        const subData = await subRes.json();
        
        // Calculate stats from subscription history
        const history = subData.subscription?.history || [];
        setStats({
          totalUsers: 1,
          totalReports: 0,
          freeUsers: userData.user.subscription === 'free' ? 1 : 0,
          paidUsers: userData.user.subscription === 'inner-circle' ? 1 : 0
        });
        setRecentUsers([userData.user]);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, [router]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px' }}>
        Admin Dashboard
      </h1>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
            Total Users
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700' }}>{stats.totalUsers}</div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Free Users
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-secondary)' }}>{stats.freeUsers}</div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Paid Users
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700', background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stats.paidUsers}</div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Total Reports
          </div>
          <div style={{ fontSize: '36px', fontWeight: '700' }}>{stats.totalReports}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button style={{
            padding: '12px 24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Send Broadcast
          </button>
          <button style={{
            padding: '12px 24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            View All Users
          </button>
          <button style={{
            padding: '12px 24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            System Status
          </button>
          <button style={{
            padding: '12px 24px',
            background: 'var(--gradient-1)',
            border: 'none',
            borderRadius: '8px',
            color: 'var(--bg-primary)',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Generate Report
          </button>
        </div>
      </div>

      {/* Recent Users */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600' }}>
            Recent Users
          </h2>
          <button style={{
            color: 'var(--accent-blue)',
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            View all →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentUsers.map((u) => (
            <div key={u.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--gradient-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {u.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: '500' }}>{u.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{u.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  padding: '6px 12px',
                  background: u.role === 'admin' ? 'rgba(252, 70, 107, 0.15)' : 'rgba(0, 201, 255, 0.15)',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: u.role === 'admin' ? 'var(--accent-pink)' : 'var(--accent-blue)'
                }}>
                  {u.role.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
