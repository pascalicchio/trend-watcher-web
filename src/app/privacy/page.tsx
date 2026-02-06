import { Metadata } from 'next';
import styles from './privacy.module.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Trendwatcher',
  description: 'How Trendwatcher protects your privacy and data.',
};

export default function PrivacyPage() {
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
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: February 5, 2026</p>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Information We Collect</h2>
            <h3 className={styles.subsectionTitle}>Information You Provide</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>Account information (name, email, password)</li>
              <li className={styles.listItem}>Payment information (processed securely via Stripe)</li>
              <li className={styles.listItem}>Profile data (optional preferences, subscription tier)</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Information We Collect Automatically</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>Usage data (features used, time spent)</li>
              <li className={styles.listItem}>Device information (browser, IP address)</li>
              <li className={styles.listItem}>Analytics (via GA4)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>Provide and improve our trend intelligence services</li>
              <li className={styles.listItem}>Process payments and manage subscriptions</li>
              <li className={styles.listItem}>Send Intelligence Cards and product alerts</li>
              <li className={styles.listItem}>Analyze site performance (GA4)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Sharing</h2>
            <p>We do NOT sell your data. We share data only with:</p>
            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Supabase</strong> (database hosting)</li>
              <li className={styles.listItem}><strong>Stripe</strong> (payment processing)</li>
              <li className={styles.listItem}><strong>SendGrid</strong> (email delivery)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Rights</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>Delete your account anytime</li>
              <li className={styles.listItem}>Export your data upon request</li>
              <li className={styles.listItem}>Unsubscribe from emails</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p>For privacy concerns: privacy@trendwatcher.io</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
