import { Metadata } from 'next';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | Trendwatcher',
  description: 'How Trendwatcher protects your privacy and data.',
};

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: February 5, 2026</p>

          <section>
            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li>Account information (name, email, password)</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Profile data (optional preferences, subscription tier)</li>
            </ul>

            <h3>Information We Collect Automatically</h3>
            <ul>
              <li>Usage data (features used, time spent)</li>
              <li>Device information (browser, IP address)</li>
              <li>Analytics (via GA4)</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Provide and improve our trend intelligence services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send Intelligence Cards and product alerts</li>
              <li>Analyze site performance (GA4)</li>
            </ul>
          </section>

          <section>
            <h2>Data Sharing</h2>
            <p>We do NOT sell your data. We share data only with:</p>
            <ul>
              <li><strong>Supabase</strong> (database hosting)</li>
              <li><strong>Stripe</strong> (payment processing)</li>
              <li><strong>SendGrid</strong> (email delivery)</li>
            </ul>
          </section>

          <section>
            <h2>Your Rights</h2>
            <ul>
              <li>Delete your account anytime</li>
              <li>Export your data upon request</li>
              <li>Unsubscribe from emails</li>
            </ul>
          </section>

          <section>
            <h2>Contact</h2>
            <p>For privacy concerns: privacy@trendwatcher.io</p>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2026 Trendwatcher Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
