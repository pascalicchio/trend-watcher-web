import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';
import Footer from '@/components/Footer';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog | Trendwatcher - E-Commerce Intelligence',
  description: 'Latest insights on e-commerce trends, product discovery, and competitive intelligence.',
};

export default function BlogPage() {
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
            {blogPosts.map((post) => (
              <article key={post.slug} className={styles.post}>
                <div className={styles.postMeta}>
                  <span className={styles.postCategory}>{post.category}</span>
                  <span className={styles.postDate}>{post.date}</span>
                </div>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
