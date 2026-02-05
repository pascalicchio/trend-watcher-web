import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Careers | Trendwatcher',
  description: 'Join the Trendwatcher team and help shape the future of e-commerce intelligence.',
};

export default function CareersPage() {
  const positions = [
    {
      title: 'Senior AI Engineer',
      location: 'Remote',
      type: 'Engineering',
    },
    {
      title: 'Data Scientist',
      location: 'Remote',
      type: 'Engineering',
    },
    {
      title: 'Product Designer',
      location: 'Remote',
      type: 'Design',
    },
    {
      title: 'Head of Growth',
      location: 'Remote',
      type: 'Growth',
    },
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
            <div className={`${styles.sectionLabel} ${styles.mono}`}>CAREERS</div>
            <h1>Join the Mission</h1>
            <p>We're building the intelligence layer for e-commerce. Help us democratize early trend detection.</p>
          </div>

          <div className={styles.positions}>
            <h2>Open Positions</h2>
            {positions.map((pos, i) => (
              <div key={i} className={styles.position}>
                <div className={styles.positionInfo}>
                  <h3>{pos.title}</h3>
                  <p>{pos.location} • {pos.type}</p>
                </div>
                <a href="#" className={styles.applyBtn}>Apply →</a>
              </div>
            ))}
          </div>

          <div className={styles.benefits}>
            <h2>Benefits</h2>
            <div className={styles.benefitsGrid}>
              <div>💰 Competitive salary</div>
              <div>📈 Equity package</div>
              <div>🏠 Remote-first</div>
              <div>🏥 Health insurance</div>
              <div>🌴 Unlimited PTO</div>
              <div>💻 Top equipment</div>
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
