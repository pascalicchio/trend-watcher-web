import { Metadata } from 'next';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog | Trendwatcher - E-Commerce Intelligence',
  description: 'Latest insights on e-commerce trends, product discovery, and competitive intelligence.',
};

export default function BlogPage() {
  const posts = [
    {
      title: 'How We Detected the Collapsible Water Bottle Trend 48 Hours Early',
      excerpt: 'Our AI spotted the metadata spike before traditional ad tools. Here\'s how we did it.',
      date: 'Feb 3, 2026',
      category: 'Case Study',
    },
    {
      title: 'The Death of Ad-Spy Tools: Why Metadata is the Future',
      excerpt: 'Traditional ad-spy tools show you what's already saturated. Metadata analysis shows you what\'s coming.',
      date: 'Feb 1, 2026',
      category: 'Strategy',
    },
    {
      title: 'Saturation Scoring: A New Way to Evaluate Trends',
      excerpt: 'Introducing our proprietary saturation scoring system. Know exactly when to enter (or avoid) a market.',
      date: 'Jan 28, 2026',
      category: 'Product',
    },
    {
      title: 'Building the Ultimate E-Commerce Intelligence Engine',
      excerpt: 'How we built Trendwatcher from scratch using AI, metadata analysis, and real-time data pipelines.',
      date: 'Jan 25, 2026',
      category: 'Engineering',
    },
    {
      title: '5 Trends to Watch in Q1 2026',
      excerpt: 'Our predictions for the biggest e-commerce opportunities in the first quarter.',
      date: 'Jan 20, 2026',
      category: 'Trends',
    },
    {
      title: 'From $0 to $10K/Month: One Seller\'s Journey with Trendwatcher',
      excerpt: 'Interview with a member who used our early detection to build a 6-figure business.',
      date: 'Jan 15, 2026',
      category: 'Success Story',
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
          <nav className={styles.nav}>
            <a href="/login">Login</a>
            <a href="/register" className={styles.cta}>Start Free Trial →</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>BLOG</div>
            <h1>Intelligence for E-Commerce Leaders</h1>
            <p>Insights on trends, strategy, and competitive advantage.</p>
          </div>

          <div className={styles.grid}>
            {posts.map((post, i) => (
              <article key={i} className={styles.post}>
                <div className={styles.postMeta}>
                  <span className={styles.postCategory}>{post.category}</span>
                  <span className={styles.postDate}>{post.date}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <a href="#" className={styles.readMore}>Read More →</a>
              </article>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2026 Trendwatcher Inc. All rights reserved.</p>
          <nav>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
