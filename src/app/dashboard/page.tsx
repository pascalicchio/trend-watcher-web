'use client';

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

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

const TrendCard: React.FC<{ trend: Trend }> = ({ trend }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={styles.trendCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.sourceBadge}>
          {trend.source.replace('_', ' ').toUpperCase()}
        </div>
        <div 
          className={styles.saturationBadge}
          style={{ background: getSaturationColor(trend.saturation) }}
        >
          {trend.saturation < 1 ? 'BLUE OCEAN' : `${(trend.saturation * 100).toFixed(1)}% SAT`}
        </div>
      </div>

      <h3 className={styles.trendTitle}>{trend.title}</h3>
      
      <a href={trend.link} target="_blank" rel="noopener noreferrer" className={styles.trendLink}>
        View Source →
      </a>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <div className={styles.metricLabel}>VELOCITY</div>
          <div 
            className={styles.metricValue}
            style={{ color: getVelocityColor(trend.velocity) }}
          >
            {trend.velocity}
          </div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricLabel}>QUERY</div>
          <div className={styles.metricValueSmall}>{trend.query}</div>
        </div>
      </div>

      <div className={styles.collectedAt}>
        Collected: {new Date(trend.collected_at).toLocaleString()}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchTrends();
  }, [filter]);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/trends?limit=50' 
        : `/api/trends?limit=50&source=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setTrends(data.trends);
        setLastUpdated(new Date());
      } else {
        setError(data.error || 'Failed to fetch trends');
      }
    } catch (err) {
      setError('Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  const sources = ['all', 'google_trends', 'amazon_movers', 'ebay_trending'];

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoTrend}>trend</span>
              <span className={styles.logoWatcher}>watcher</span>
            </a>
            <nav className={styles.nav}>
              <a href="/login" className={styles.navLink}>Login</a>
              <a href="/register" className={`${styles.navBtn} ${styles.primary}`}>
                Start Free Trial →
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Stats Bar */}
          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{trends.length}</span>
              <span className={styles.statLabel}>Active Trends</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {trends.filter(t => t.saturation < 1).length}
              </span>
              <span className={styles.statLabel}>Blue Ocean</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {trends.filter(t => t.velocity > 500).length}
              </span>
              <span className={styles.statLabel}>Hot Trends</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--'}
              </span>
              <span className={styles.statLabel}>Last Updated</span>
            </div>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            {sources.map(source => (
              <button
                key={source}
                className={`${styles.filterBtn} ${filter === source ? styles.active : ''}`}
                onClick={() => setFilter(source)}
              >
                {source === 'all' ? 'All Sources' : source.replace('_', ' ')}
              </button>
            ))}
            <button className={styles.refreshBtn} onClick={fetchTrends}>
              ↻ Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading trends...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={styles.error}>
              <p>⚠️ {error}</p>
              <button onClick={fetchTrends}>Retry</button>
            </div>
          )}

          {/* Trends Grid */}
          {!loading && !error && (
            <div className={styles.trendsGrid}>
              {trends.map(trend => (
                <TrendCard key={trend.id} trend={trend} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && trends.length === 0 && (
            <div className={styles.empty}>
              <p>No trends found. Try a different filter.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Powered by TrendWatcher.io | Data refreshed hourly</p>
      </footer>
    </div>
  );
};

export default Dashboard;
