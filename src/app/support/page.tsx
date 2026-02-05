import { Metadata } from 'next';
import styles from './support.module.css';

export const metadata: Metadata = {
  title: 'Support Center | Trendwatcher',
  description: 'Get help with Trendwatcher. FAQ, documentation, and contact support.',
};

export default function SupportPage() {
  const faqs = [
    {
      question: 'How does the 48-hour early detection work?',
      answer: 'Our AI analyzes metadata from multiple sources including supply chain data, search trends, social media signals, and API velocity. This creates predictive models that identify rising products before they appear on traditional ad-spy tools.',
    },
    {
      question: 'What\'s included in the Inner Circle membership?',
      answer: 'Inner Circle members receive daily Intelligence Cards at 8 AM with trending products, 48-hour early detection, AI-generated TikTok scripts, supplier sourcing with pricing, competitor analysis, and access to our exclusive community.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes. Inner Circle is month-to-month. If you don\'t find a winning product in your first month, let us know and we\'ll refund your $49. No questions asked.',
    },
    {
      question: 'How accurate is the saturation scoring?',
      answer: 'Our saturation scoring is based on real-time data including competitor count, ad spend velocity, and market penetration. It\'s updated every 2 minutes and has been 94% accurate in predicting market crowding.',
    },
    {
      question: 'Do I need technical knowledge to use Trendwatcher?',
      answer: 'Not at all. We provide execution-ready assets including TikTok scripts, product descriptions, and supplier links. You just need to execute. Our dashboards are designed for non-technical e-commerce sellers.',
    },
    {
      question: 'Which markets do you track?',
      answer: 'Currently we track US, UK, Canada, and Australia. European markets are coming in Q2 2026. We focus on English-speaking markets for our initial launch.',
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
            <div className={`${styles.sectionLabel} ${styles.mono}`}>SUPPORT</div>
            <h1>How can we help?</h1>
            <p>Find answers to common questions or reach out to our team.</p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our AI assistant for instant answers.</p>
              <a href="#" className={styles.contactBtn}>Start Chat →</a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📧</div>
              <h3>Email Support</h3>
              <p>Get help within 24 hours.</p>
              <a href="mailto:support@trendwatcher.io" className={styles.contactBtn}>Email Us →</a>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📚</div>
              <h3>Documentation</h3>
              <p>Detailed guides and tutorials.</p>
              <a href="/docs" className={styles.contactBtn}>Browse Docs →</a>
            </div>
          </div>

          <div className={styles.faq}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              {faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
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
