import { Metadata } from 'next';
import styles from './docs.module.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Documentation | Trendwatcher',
  description: 'Learn how to use Trendwatcher to find trending products before anyone else.',
};

export default function DocsPage() {
  const guides = [
    { title: 'Getting Started', desc: 'Quick start guide for new members', icon: '🚀' },
    { title: 'Intelligence Cards', desc: 'Understanding your daily reports', icon: '📊' },
    { title: 'Velocity Scoring', desc: 'How we score trend potential', icon: '⚡' },
    { title: 'Saturation Guard', desc: 'Avoiding crowded markets', icon: '🛡️' },
    { title: 'Content Generation', desc: 'Using AI for TikTok scripts', icon: '📝' },
    { title: 'Supplier Sourcing', desc: 'Finding products to sell', icon: '🏭' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoTrend}>trend</span>
            <span className={styles.logoWatcher}>watcher</span>
          </a>
          <nav>
            <a href="/login">Login</a>
            <a href="/register" className={styles.cta}>Start Free Trial →</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>DOCS</div>
            <h1>Documentation</h1>
            <p>Everything you need to master Trendwatcher.</p>
          </div>

          <div className={styles.grid}>
            {guides.map((guide, i) => (
              <a key={i} href="#" className={styles.card}>
                <div className={styles.cardIcon}>{guide.icon}</div>
                <h3>{guide.title}</h3>
                <p>{guide.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
