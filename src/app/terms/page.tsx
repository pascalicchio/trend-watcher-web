import { Metadata } from 'next';
import styles from './terms.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | Trendwatcher',
  description: 'Terms and conditions for using Trendwatcher services.',
};

export default function TermsPage() {
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
          <h1>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last updated: February 5, 2026</p>

          <section>
            <h2>Agreement</h2>
            <p>By using TrendWatcher, you agree to these terms.</p>
          </section>

          <section>
            <h2>Subscription & Payment</h2>
            <ul>
              <li>Inner Circle: $49/month (billed monthly)</li>
              <li>Free tier: Limited access</li>
              <li>Cancel anytime via Dashboard &gt; Subscription</li>
              <li>No refund for partial month</li>
            </ul>
          </section>

          <section>
            <h2>Inner Circle Guarantee</h2>
            <p className={styles.guarantee}>"If you don&apos;t find a winning product, don&apos;t pay."</p>
            <ul>
              <li>2-day free trial</li>
              <li>Contact support@trendwatcher.io for refund</li>
            </ul>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <p>All content, data, and intelligence provided by TrendWatcher is protected. You may not redistribute, resell, or share Intelligence Cards without written permission.</p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>TrendWatcher provides predictive intelligence. We do not guarantee specific business outcomes. You are responsible for your own product decisions and due diligence.</p>
          </section>

          <section>
            <h2>Disclaimers</h2>
            <ul>
              <li>Predictions are based on metadata analysis, not guarantees</li>
              <li>Market conditions change rapidly; act on intelligence quickly</li>
              <li>Supplier links are recommendations, not endorsements</li>
            </ul>
          </section>

          <section>
            <h2>Termination</h2>
            <p>We may terminate or suspend your account for violating these terms. You may cancel anytime.</p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>Questions? legal@trendwatcher.io</p>
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
