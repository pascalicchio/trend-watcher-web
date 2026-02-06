import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoTrend}>trend</span>
              <span className={styles.logoWatcher}>watcher</span>
            </div>
            <p className={styles.tagline}>
              Predictive intelligence infrastructure for e-commerce. Exploit the latency. Beat the saturation.
            </p>
          </div>

          <div className={styles.column}>
            <h4>Product</h4>
            <ul className={styles.links}>
              <li><Link href="/#how-it-works">How It Works</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
              <li><Link href="/#features">Features</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Resources</h4>
            <ul className={styles.links}>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/support">Support Center</Link></li>
              <li><Link href="/docs">Documentation</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Company</h4>
            <ul className={styles.links}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2026 Trendwatcher Inc. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/security">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
