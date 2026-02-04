'use client';

import { useEffect, useState } from 'react';

interface Report {
  id: string;
  title: string;
  type: string;
  content: any;
  status: string;
  createdAt: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch('/api/reports');
        const data = await res.json();
        setReports(data.reports || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.type === filter);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'intelligence-card': return { bg: 'rgba(0, 201, 255, 0.15)', color: 'var(--accent-blue)' };
      case 'trending': return { bg: 'rgba(146, 254, 157, 0.15)', color: 'var(--accent-primary)' };
      default: return { bg: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' };
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading reports...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700' }}>
          Intelligence Reports
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'intelligence-card', 'trending'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: filter === f ? 'var(--gradient-1)' : 'var(--bg-card)',
                color: filter === f ? 'var(--bg-primary)' : 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              {f === 'all' ? 'All' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 40px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>📋</div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
            No reports yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Intelligence cards will appear here once TrendWatcher delivers your first report. Inner Circle members receive daily reports at 8 AM.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredReports.map((report) => {
            const colors = getTypeColor(report.type);
            return (
              <div
                key={report.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'border-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                      {report.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{
                        padding: '4px 12px',
                        background: colors.bg,
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: colors.color,
                        textTransform: 'uppercase'
                      }}>
                        {report.type.replace('-', ' ')}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                        {formatDate(report.createdAt)}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    padding: '6px 14px',
                    background: report.status === 'delivered' ? 'rgba(0, 201, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: report.status === 'delivered' ? 'var(--accent-blue)' : 'var(--text-tertiary)'
                  }}>
                    {report.status}
                  </span>
                </div>

                {/* Report Preview */}
                {report.content && (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    maxHeight: '150px',
                    overflow: 'hidden'
                  }}>
                    {typeof report.content === 'string' 
                      ? report.content 
                      : JSON.stringify(report.content).substring(0, 300) + '...'}
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button style={{
                    padding: '10px 20px',
                    background: 'var(--gradient-1)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'var(--bg-primary)',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    View Full Report
                  </button>
                  <button style={{
                    padding: '10px 20px',
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Download PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
