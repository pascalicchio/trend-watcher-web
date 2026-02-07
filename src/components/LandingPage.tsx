'use client';

// TrendWatcher - AI-powered trend detection for e-commerce
import React, { useEffect, useState } from 'react';
import styles from './LandingPage.module.css';

interface StreamItem {
  time: string;
  content: string;
  velocity: string;
  saturation: string;
}

interface StreamItem {
  time: string;
  content: string;
  velocity: string;
  saturation: string;
}

// Helper Components
const StreamItem: React.FC<StreamItem> = ({ time, content, velocity, saturation }) => {
  return (
    <div className={styles.streamItem}>
      <div className={`${styles.streamTime} ${styles.mono}`}>{time}</div>
      <div className={styles.streamContent} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={styles.streamMetrics}>
        <div className={styles.streamMetric}>
          <div className={`${styles.streamMetricLabel} ${styles.mono}`}>Velocity</div>
          <div className={`${styles.streamMetricValue} ${styles.velocity}`}>{velocity}</div>
        </div>
        <div className={styles.streamMetric}>
          <div className={`${styles.streamMetricLabel} ${styles.mono}`}>Saturation</div>
          <div className={`${styles.streamMetricValue} ${styles.saturation}`}>{saturation}</div>
        </div>
      </div>
    </div>
  );
};

const TrendCard: React.FC<{ velocity: string }> = ({ velocity }) => {
  return (
    <div className={`${styles.trendCard} ${styles.locked}`}>
      <div className={`${styles.trendBlur} ${styles.blurred}`}>
        <div className={styles.trendImage}>📦</div>
        <div className={styles.trendTitle}>████████ ████</div>
      </div>
      <div className={styles.trendScoreDisplay}>
        <span className={`${styles.scoreLabel} ${styles.mono}`}>VELOCITY SCORE</span>
        <span className={styles.scoreValue}>{velocity}</span>
      </div>
      <div className={styles.unlockOverlay}>
        <button className={styles.unlockBtn}>Reveal 48hrs Early →</button>
      </div>
    </div>
  );
};

interface ArbitrageCardProps {
  product: string;
  trendDate: string;
  adDate: string;
  margin: string;
}

const ArbitrageCard: React.FC<ArbitrageCardProps> = ({ product, trendDate, adDate, margin }) => {
  return (
    <div className={styles.arbitrageCard}>
      <div className={styles.arbitrageProduct}>{product}</div>
      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>Trendwatcher Alert</span>
          <span className={`${styles.timelineDate} ${styles.mono}`}>{trendDate}</span>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>First Ad Detected</span>
          <span className={`${styles.timelineDate} ${styles.mono}`}>{adDate}</span>
        </div>
      </div>
      <div className={styles.marginSaved}>
        <div className={`${styles.marginLabel} ${styles.mono}`}>MARGIN ADVANTAGE</div>
        <div className={styles.marginValue}>{margin}</div>
      </div>
    </div>
  );
};

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
              <a href="/login" className={`${styles.headerBtn} ${styles.headerBtnLogin}`}>Login</a>
              <a href="/register" className={`${styles.headerBtn} ${styles.headerBtnSignup}`}>
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
                <a href="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Claim Your Seat
                  <span>→</span>
                </a>
                <a href="/dashboard" className={`${styles.btn} ${styles.btnSecondary}`}>
                  View Public Feed
                </a>
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
      <section id="how-it-works" className={styles.problemSection}>
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

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>FEATURES</div>
            <h2 className={styles.sectionTitle}>Everything you need to dominate e-commerce.</h2>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>Early Detection</h3>
              <p>AI analyzes metadata to spot trends before they hit mainstream ad platforms.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Velocity Scoring</h3>
              <p>Proprietary algorithms score each trend's growth rate and market potential.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Saturation Guard</h3>
              <p>Avoid crowded markets with real-time saturation scoring.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📝</div>
              <h3>AI Content</h3>
              <p>Get TikTok scripts, product descriptions, and ad copy instantly.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏭</div>
              <h3>Supplier Sourcing</h3>
              <p>Direct links to suppliers with pricing for trending products.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📈</div>
              <h3>Competitor Intel</h3>
              <p>See what competitors are selling before they launch.</p>
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

      {/* Live Alpha Stream */}
      <section className={styles.liveStreamSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>PROOF OF ALPHA</div>
            <h2 className={styles.sectionTitle}>Watch the engine work.</h2>
            <p className={styles.sectionDescription}>
              Real-time metadata spikes detected by our AI. Updated every 2 minutes. This is what you'll receive before anyone else.
            </p>
          </div>

          <div className={styles.streamContainer}>
            <StreamItem time="3m ago" content="Metadata spike: <strong>Bedside Tech Organizer</strong> → Pet Care" velocity="+380%" saturation="1.2%" />
            <StreamItem time="8m ago" content="Saturation Guard: <strong>LED Strip Lights</strong> → High-Risk (Avoid)" velocity="+120%" saturation="74%" />
            <StreamItem time="14m ago" content="Golden Gap: <strong>Portable Sound Machine</strong> → Sleep Tech" velocity="+520%" saturation="0.8%" />
            <StreamItem time="19m ago" content="API velocity spike: <strong>Resistance Band Set</strong> → Fitness" velocity="+290%" saturation="3.1%" />
            <StreamItem time="26m ago" content="Supply chain shift: <strong>Travel Toiletry Kit</strong> → Accessories" velocity="+210%" saturation="5.4%" />
            <StreamItem time="31m ago" content="Trend momentum: <strong>LED Face Mask</strong> → Beauty Tech (accelerating)" velocity="+440%" saturation="1.9%" />
          </div>
        </div>
      </section>

      {/* Free Tier Section */}
      <section className={styles.freeTierSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>PUBLIC DATA FEED</div>
            <h2 className={styles.sectionTitle}>See what you're missing.</h2>
            <p className={styles.sectionDescription}>
              Free users see velocity scores but can't identify products until 48 hours after saturation hits. Inner Circle members exploit the gap.
            </p>
          </div>

          <div className={styles.freeTierGrid}>
            <TrendCard velocity="9.8" />
            <TrendCard velocity="9.2" />
            <TrendCard velocity="8.9" />
          </div>
        </div>
      </section>

      {/* Historical Arbitrage */}
      <section className={styles.arbitrageSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>HISTORICAL ARBITRAGE</div>
            <h2 className={styles.sectionTitle}>We called it before they knew.</h2>
            <p className={styles.sectionDescription}>
              Products Trendwatcher identified 48 hours before they appeared on traditional ad-spy tools.
            </p>
          </div>

          <div className={styles.arbitrageGrid}>
            <ArbitrageCard 
              product="Collapsible Water Bottle"
              trendDate="Oct 12, 2025"
              adDate="Oct 14, 2025"
              margin="+62%"
            />
            <ArbitrageCard 
              product="Portable Neck Fan"
              trendDate="Sep 28, 2025"
              adDate="Sep 30, 2025"
              margin="+58%"
            />
            <ArbitrageCard 
              product="LED Therapy Mask"
              trendDate="Nov 03, 2025"
              adDate="Nov 05, 2025"
              margin="+71%"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center' }}>
            <div className={`${styles.sectionLabel} ${styles.mono}`}>JOIN THE INNER CIRCLE</div>
            <h2 className={styles.sectionTitle}>Intelligence infrastructure.</h2>
            <p className={styles.sectionDescription}>
              Two tiers. One philosophy: information speed is the only real margin.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <div className={`${styles.pricingTier} ${styles.mono}`}>PUBLIC DATA FEED</div>
              <div className={styles.pricingPrice}>$0<span>/mo</span></div>
              <p className={styles.pricingDescription}>
                Access delayed signals after saturation hits. See velocity scores but not product details.
              </p>
              
              <ul className={styles.pricingFeatures}>
                <li>Daily velocity score updates</li>
                <li>Saturation Guard alerts</li>
                <li>48-hour delayed product reveals</li>
                <li>Community access (read-only)</li>
              </ul>

              <a href="/register" className={`${styles.pricingCta} ${styles.btnSecondary}`}>Get Started Free</a>
            </div>

            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <div className={styles.pricingBadge}>ONLY 4 SEATS LEFT</div>
              <div className={`${styles.pricingTier} ${styles.mono}`}>INNER CIRCLE</div>
              <div className={styles.pricingPrice}>$49<span>/mo</span></div>
              <p className={styles.pricingDescription}>
                Full predictive intelligence. 48-hour arbitrage window. Execution-ready assets. First-mover advantage.
              </p>
              
              <ul className={styles.pricingFeatures}>
                <li>Daily Intelligence Cards at 8 AM</li>
                <li>48-hour early product detection</li>
                <li>AI-generated TikTok scripts</li>
                <li>Supplier sourcing & pricing</li>
                <li>Full competitor analysis</li>
                <li>Exclusive community access</li>
                <li>Velocity + Saturation scoring</li>
              </ul>

              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={(e) => {
                  e.preventDefault();
                  fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ priceId: 'price_1Swyxa31jVHQylkhu0zQN5wn' })
                  })
                  .then(r => r.json())
                  .then(d => {
                    if (d.url) window.location.href = d.url;
                  });
                }}
              >
                Start 2-Day Free Trial
                <span>→</span>
              </button>
              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-tertiary)' }}>
                💰 No winning product? Don't pay a cent.
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <li><a href="/#how-it-works">How It Works</a></li>
                <li><a href="/#pricing">Pricing</a></li>
                <li><a href="/#features">Features</a></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Resources</h4>
              <ul className={styles.footerLinks}>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/support">Support Center</a></li>
                <li><a href="/docs">Documentation</a></li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <ul className={styles.footerLinks}>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/careers">Careers</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerDivider}></div>

          <div className={styles.footerBottom}>
            <div className={styles.footerCopyright}>
              © 2026 Trendwatcher Inc. All rights reserved.
            </div>
            <div className={styles.footerLegal}>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/security">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
