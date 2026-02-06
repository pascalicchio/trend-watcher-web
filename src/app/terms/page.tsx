import { Metadata } from 'next';
import styles from './terms.module.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Trendwatcher',
  description: 'Terms and conditions for using Trendwatcher services.',
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoTrend}>trend</span>
              <span className={styles.logoWatcher}>watcher</span>
            </a>
            <nav className={styles.nav}>
              <a href="/login" className={styles.navLink}>Login</a>
              <a href="/register" className={`${styles.navLink} ${styles.cta}`}>Start Free Trial →</a>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last updated: February 5, 2026</p>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Agreement</h2>
            <p>By using TrendWatcher, you agree to these terms.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Subscription & Payment</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>Inner Circle: $49/month (billed monthly)</li>
              <li className={styles.listItem}>Free tier: Limited access</li>
              <li className={styles.listItem}>Cancel anytime via Dashboard &gt; Subscription</li>
              <li className={styles.listItem}>No refund for partial month</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Inner Circle Guarantee</h2>
            <p className={styles.guarantee}>"If you don&apos;t find a winning product, don&apos;t pay."</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>2-day free trial</li>
              <li className={styles.listItem}>Contact support@trendwatcher.io for refund</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Intellectual Property</h2>
            <p>All content, data, and intelligence provided by TrendWatcher is protected. You may not redistribute, resell, or share Intelligence Cards without written permission.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
            <p>TrendWatcher provides predictive intelligence. We do not guarantee specific business outcomes. You are responsible for your own product decisions and due diligence.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Disclaimers</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>Predictions are based on metadata analysis, not guarantees</li>
              <li className={styles.listItem}>Market conditions change rapidly; act on intelligence quickly</li>
              <li className={styles.listItem}>Supplier links are recommendations, not endorsements</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Termination</h2>
            <p>We may terminate or suspend your account for violating these terms. You may cancel anytime.</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p>Questions? legal@trendwatcher.io</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
