import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts';
import Footer from '@/components/Footer';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Trendwatcher Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) notFound();

  // Format content for display
  const formattedContent = post.content.split('\n\n').map((paragraph, index) => {
    if (paragraph.startsWith('**') && paragraph.includes('**')) {
      // Handle bold headers
      return paragraph.split('\n').map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <h4 key={i}>{line.replace(/\*\*/g, '')}</h4>;
        }
        if (line.startsWith('- ')) {
          return <li key={i}>{line.substring(2)}</li>;
        }
        return <p key={i}>{line}</p>;
      });
    }
    if (paragraph.startsWith('- ')) {
      const items = paragraph.split('\n').map((line, i) => (
        <li key={i}>{line.substring(2)}</li>
      ));
      return <ul key={index}>{items}</ul>;
    }
    return <p key={index}>{paragraph}</p>;
  });

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
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <div className={styles.meta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
            <h1>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>
          </header>

          <div className={styles.content}>
            {formattedContent}
          </div>

          <footer className={styles.articleFooter}>
            <a href="/blog" className={styles.backLink}>← Back to Blog</a>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
