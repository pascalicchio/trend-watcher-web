import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact | Trendwatcher',
  description: 'Get in touch with the Trendwatcher team.',
};

export default function ContactPage() {
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
            <div className={`${styles.sectionLabel} ${styles.mono}`}>CONTACT</div>
            <h1>Get in Touch</h1>
            <p>Have questions? We'd love to hear from you.</p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.icon}>📧</div>
              <h3>Email</h3>
              <p>hello@trendwatcher.io</p>
              <a href="mailto:hello@trendwatcher.io">Send Email →</a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.icon}>💬</div>
              <h3>Support</h3>
              <p>support@trendwatcher.io</p>
              <a href="/support">Visit Support →</a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.icon}>🐦</div>
              <h3>Twitter</h3>
              <p>@trendwatcher_io</p>
              <a href="https://x.com/trendwatcher_io" target="_blank" rel="noopener">Follow Us →</a>
            </div>
          </div>
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
