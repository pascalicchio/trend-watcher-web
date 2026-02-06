import { Metadata } from 'next';
import styles from './about.module.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | Trendwatcher',
  description: 'Learn about Trendwatcher - the leading e-commerce intelligence platform for early trend detection.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoTrend}>trend</span>
            <span className={styles.logoWatcher}>watcher</span>
          </a>
          <nav className={styles.nav}>
            <a href="/login">Login</a>
            <a href="/register" className={styles.cta}>Start Free Trial →</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>ABOUT US</div>
            <h1>We Built the Future of E-Commerce Intelligence</h1>
            <p className={styles.heroText}>
              Trendwatcher was founded with a simple mission: give independent sellers 
              the same intelligence advantages as major brands. We believe information 
              velocity is the only real competitive edge.
            </p>
          </div>

          <div className={styles.values}>
            <h2>Our Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>⚡</div>
                <h3>Speed First</h3>
                <p>Information decays fast. We deliver insights in real-time.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🎯</div>
                <h3>Actionable Intelligence</h3>
                <p>No fluff. Just data you can act on immediately.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🔒</div>
                <h3>Member First</h3>
                <p>Limited membership keeps our signals exclusive.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3>Transparency</h3>
                <p>Our results speak for themselves. See our track record.</p>
              </div>
            </div>
          </div>

          <div className={styles.story}>
            <div className={styles.storyContent}>
              <h2>Our Story</h2>
              <p>
                Started in late 2025, Trendwatcher emerged from a simple frustration: 
                traditional ad-spy tools were too reactive. By the time you saw a trending 
                product, it was already saturated.
              </p>
              <p>
                We realized that the real money was made in the 48 hours before a trend 
                hit the mainstream. But getting that data required sophisticated AI and 
                multi-source metadata analysis.
              </p>
              <p>
                Today, Trendwatcher processes millions of data points daily, identifying 
                emerging trends before they appear anywhere else. Our Inner Circle members 
                have discovered products that went on to generate millions in revenue.
              </p>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Products Predicted</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>$2M+</div>
              <div className={styles.statLabel}>Member Revenue</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>48hrs</div>
              <div className={styles.statLabel}>Average Lead Time</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>94%</div>
              <div className={styles.statLabel}>Prediction Accuracy</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
