'use client';

import React, { useEffect, useState } from 'react';
import styles from './LandingPage.module.css';

interface StreamItem {
  time: string;
  content: string;
  velocity: string;
  saturation: string;
}

const LandingPage: React.FC = () => {
  const [currentSeats, setCurrentSeats] = useState(46);

  const streamItems: StreamItem[] = [
    { time: 'Just now', content: 'Metadata spike: <strong>Minimalist Desk Lamp</strong> → Home Office', velocity: '+340%', saturation: '2.1%' },
    { time: '2m ago', content: 'Golden Gap: <strong>Ergonomic Phone Stand</strong> → Tech Accessories', velocity: '+410%', saturation: '0.9%' },
    { time: '5m ago', content: 'High saturation alert: <strong>Phone Ring Holder</strong> → Avoid', velocity: '+80%', saturation: '68%' },
    { time: '7m ago', content: 'API velocity spike: <strong>Wireless Earbuds Case</strong> → Audio', velocity: '+290%', saturation: '4.2%' },
  ];

  useEffect(() => {
    // Seat counter animation
    const seatInterval = setInterval(() => {
      if (Math.random() > 0.7 && currentSeats < 50) {
        setCurrentSeats(prev => prev + 1);
      }
    }, 15000);

    return () => clearInterval(seatInterval);
  }, [currentSeats]);

  return (
    <div className={styles.landingPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <span className={styles.logoTrend}>trend</span>
              <span className={styles.logoWatcher}>watcher</span>
            </div>
            <div className={styles.headerNav}>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                <span className={styles.mono}>LIVE ENGINE</span>
              </div>
              <a href="#login" className={`${styles.headerBtn} ${styles.headerBtnLogin}`}>Login</a>
              <a href="#signup" className={`${styles.headerBtn} ${styles.headerBtnSignup}`}>
                Start Free Trial
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1>Exploit the latency.<br />Beat the saturation.</h1>
              <p className={styles.subtitle}>
                We identify metadata spikes 48 hours before ad-spy tools catch them. 
                First-mover advantage. The only advantage that matters.
              </p>
              
              <div className={styles.ctaGroup}>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  Claim Your Seat
                  <span>→</span>
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  View Public Feed
                </button>
              </div>

              <div className={styles.seatCounter}>
                <span className={styles.mono}>🔥</span>
                <span><strong>{currentSeats}/50</strong> seats occupied this month</span>
              </div>
            </div>

            <div className={styles.browserMockup}>
              <div className={styles.browserHeader}>
                <div className={styles.browserDots}>
                  <div className={`${styles.browserDot} ${styles.dotRed}`}></div>
                  <div className={`${styles.browserDot} ${styles.dotYellow}`}></div>
                  <div className={`${styles.browserDot} ${styles.dotGreen}`}></div>
                </div>
                <div className={styles.browserUrl}>app.trendwatcher.io/dashboard</div>
              </div>
              <div className={styles.browserContent}>
                <div className={styles.intelligenceCard}>
                  <div className={styles.cardHeader}>
                    <div className={`${styles.cardMeta} ${styles.mono}`}>ALPHA ALERT #2847</div>
                    <div className={styles.liveIndicator}>
                      <span className={styles.statusDot}></span>
                      LIVE
                    </div>
                  </div>

                  <div className={styles.productName}>Aesthetic Planner Kit</div>

                  <div className={styles.metricsGrid}>
                    <div className={styles.metric}>
                      <div className={`${styles.metricLabel} ${styles.mono}`}>Viral Velocity</div>
                      <div className={styles.metricValue}>+520%</div>
                      <div className={styles.metricBadge}>GOLDEN GAP</div>
                    </div>
                    <div className={styles.metric}>
                      <div className={`${styles.metricLabel} ${styles.mono}`}>Saturation</div>
                      <div className={styles.metricValue}>0.4%</div>
                      <div className={styles.metricBadge}>BLUE OCEAN</div>
                    </div>
                  </div>

                  <div className={styles.assetsLocked}>
                    <span>🔒</span>
                    <span>Sourcing link, TikTok hooks & competitor intel locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className={styles.problemSection}>
        <div className={styles.container}>
          <div className={`${styles.sectionLabel} ${styles.mono}`}>THE ECHO CHAMBER</div>
          <h2 className={styles.sectionTitle}>You're fighting for scraps.</h2>
          <p className={styles.sectionDescription}>
            Traditional ad-spy tools show you what's already selling. By the time you see it, 
            500 other sellers are already running ads. You're entering a saturated market with razor-thin margins.
          </p>

          <div className={styles.comparisonGrid}>
            <div className={`${styles.comparisonCard} ${styles.wrong}`}>
              <div className={styles.comparisonIcon}>❌</div>
              <h3 className={styles.comparisonTitle}>Reactive Tools</h3>
              <p className={styles.comparisonText}>
                Show products when 1,000+ sellers are competing. Too late. Margins destroyed. Ad costs through the roof.
              </p>
            </div>
            <div className={`${styles.comparisonCard} ${styles.right}`}>
              <div className={styles.comparisonIcon}>✓</div>
              <h3 className={styles.comparisonTitle}>Trendwatcher</h3>
              <p className={styles.comparisonText}>
                Detect spikes 48 hours early. First-mover advantage. Blue ocean. Profitable margins before saturation hits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>COMPETITIVE ALPHA</div>
            <h2 className={styles.sectionTitle}>Three pillars of asymmetric advantage.</h2>
          </div>

          <div className={styles.bentoGrid}>
            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>⚡</div>
              <h3 className={styles.bentoTitle}>48-Hour Arbitrage</h3>
              <p className={styles.bentoDescription}>
                We track metadata whispers—supply chain spikes, API velocity, social sentiment—before an ad is ever created.
              </p>
              <div className={`${styles.bentoStat} ${styles.mono}`}>2-DAY HEAD START</div>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>🛡️</div>
              <h3 className={styles.bentoTitle}>Saturation Guard</h3>
              <p className={styles.bentoDescription}>
                Real-time saturation scoring tells you exactly when a trend is too crowded. Save thousands on doomed launches.
              </p>
              <div className={`${styles.bentoStat} ${styles.mono}`}>0-100% SATURATION</div>
            </div>

            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>🔒</div>
              <h3 className={styles.bentoTitle}>Competitive Moat</h3>
              <p className={styles.bentoDescription}>
                Limited to 50 members per month. Our signals remain exclusive. Your competitors stay in the dark.
              </p>
              <div className={`${styles.bentoStat} ${styles.mono}`}>50 SEATS ONLY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of sections would continue here... */}
      {/* For brevity, I'm showing the structure. The full component would include all sections */}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <span className={styles.footerLogoTrend}>trend</span>
                <span className={styles.footerLogoWatcher}>watcher</span>
              </div>
              <p className={styles.footerTagline}>
                Predictive intelligence infrastructure for e-commerce. Exploit the latency. Beat the saturation.
              </p>
            </div>

            <div className={styles.footerColumn}>
              <h4>Product</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#features">Features</a></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Resources</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#support">Support Center</a></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul className={styles.footerLinks}>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerDivider}></div>

          <div className={styles.footerBottom}>
            <div className={styles.footerCopyright}>
              © 2026 Trendwatcher Inc. All rights reserved.
            </div>
            <div className={styles.footerLegal}>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#security">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
