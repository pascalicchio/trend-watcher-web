import { Metadata } from 'next';
import styles from './security.module.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Security | Trendwatcher',
  description: 'How Trendwatcher protects your data and maintains enterprise-grade security.',
};

export default function SecurityPage() {
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
            <div className={`${styles.sectionLabel} ${styles.mono}`}>SECURITY</div>
            <h1>Your Data is Safe</h1>
            <p>Enterprise-grade security for your business intelligence.</p>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔐</div>
              <h3>Encryption</h3>
              <p>All data encrypted at rest and in transit using AES-256 and TLS 1.3.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>SOC 2 Compliant</h3>
              <p>Our infrastructure meets SOC 2 Type II standards for security and availability.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🏢</div>
              <h3>Isolated Infrastructure</h3>
              <p>Each customer runs in isolated containers with separate databases.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔄</div>
              <h3>Automatic Backups</h3>
              <p>Daily backups with 30-day retention and instant recovery options.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>👁️</div>
              <h3>Audit Logs</h3>
              <p>Complete audit trail of all account activity and data access.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🚨</div>
              <h3>24/7 Monitoring</h3>
              <p>Real-time threat detection and automated incident response.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
