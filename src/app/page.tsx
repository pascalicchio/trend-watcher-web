'use client';

import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [streamItems] = useState([
    { time: '3m ago', content: 'Metadata spike: Bedside Tech Organizer → Pet Care', velocity: '+380%', saturation: '1.2%' },
    { time: '8m ago', content: 'Saturation Guard: LED Strip Lights → High-Risk (Avoid)', velocity: '+120%', saturation: '74%' },
    { time: '14m ago', content: 'Golden Gap: Portable Sound Machine → Sleep Tech', velocity: '+520%', saturation: '0.8%' },
    { time: '19m ago', content: 'API velocity spike: Resistance Band Set → Fitness', velocity: '+290%', saturation: '3.1%' },
    { time: '26m ago', content: 'Supply chain shift: Travel Toiletry Kit → Accessories', velocity: '+210%', saturation: '5.4%' },
    { time: '31m ago', content: 'Trend momentum: LED Face Mask → Beauty Tech (accelerating)', velocity: '+440%', saturation: '1.9%' },
  ]);

  const [seatCount, setSeatCount] = useState(46);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && seatCount < 50) {
        setSeatCount(prev => Math.min(prev + 1, 50));
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isClient, seatCount]);

  return (
    <>
      {/* Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 20% 30%, rgba(0, 201, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(146, 254, 157, 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, animation: 'backgroundPulse 15s ease-in-out infinite' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.02) 3px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.02) 3px)', pointerEvents: 'none', zIndex: 0, opacity: 0.4 }} />

      {/* Header */}
      <header style={{ padding: '24px 0', borderBottom: '1px solid var(--border-subtle)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 14, 26, 0.85)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 300 }}><span style={{ color: 'var(--text-primary)' }}>trend</span><span style={{ fontWeight: 800, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>watcher</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--bg-card)', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gradient-1)', animation: 'pulse 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'monospace' }}>LIVE ENGINE</span>
              </div>
              <a href="/login" style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 600, borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-primary)', textDecoration: 'none' }}>Login</a>
              <a href="/pricing" style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 600, borderRadius: '6px', border: 'none', background: 'var(--gradient-1)', color: 'var(--bg-primary)', textDecoration: 'none' }}>Start Free Trial →</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>Exploit the latency.<br />Beat the saturation.</h1>
              <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>We identify metadata spikes 48 hours before ad-spy tools catch them. First-mover advantage. The only advantage that matters.</p>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <a href="/pricing" style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 600, borderRadius: '8px', border: 'none', background: 'var(--gradient-1)', color: 'var(--bg-primary)', textDecoration: 'none' }}>Claim Your Seat →</a>
                <button style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 600, borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer' }}>View Public Feed</button>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span>🔥</span>
                <span><strong style={{ background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>{seatCount}/50</strong> seats occupied this month</span>
              </div>
            </div>

            {/* Browser Mockup */}
            <div style={{ background: 'rgba(20, 25, 40, 0.4)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '12px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px 8px 0 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'monospace', padding: '4px 12px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '6px', maxWidth: '400px', margin: '0 auto' }}>app.trendwatcher.io/dashboard</div>
              </div>
              <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.6) 0%, rgba(15, 20, 32, 0.8) 100%)', borderRadius: '0 0 8px 8px' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>ALPHA ALERT #2847</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gradient-1)', animation: 'pulse 2s ease-in-out infinite' }} />LIVE
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px' }}>Aesthetic Planner Kit</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px', textTransform: 'uppercase' }}>Viral Velocity</div>
                      <div style={{ fontSize: '32px', fontWeight: 700, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'monospace' }}>+520%</div>
                    </div>
                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px', textTransform: 'uppercase' }}>Saturation</div>
                      <div style={{ fontSize: '32px', fontWeight: 700, background: 'var(--gradient-4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'monospace' }}>0.4%</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed var(--border-subtle)', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span>🔒</span><span>Sourcing link, TikTok hooks & competitor intel locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={{ padding: '120px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>THE ECHO CHAMBER</div>
          <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>You&apos;re fighting for scraps.</h2>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 60px' }}>Traditional ad-spy tools show you what&apos;s already selling. By the time you see it, 500 other sellers are already running ads.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '40px 32px', textAlign: 'left', opacity: 0.6 }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>❌</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Reactive Tools</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Show products when 1,000+ sellers are competing. Too late. Margins destroyed.</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, rgba(146, 254, 157, 0.1) 100%)', border: '1px solid transparent', borderRadius: '12px', padding: '40px 32px', textAlign: 'left', position: 'relative' }}>
              <div style={{ content: '', position: 'absolute', inset: 0, borderRadius: '12px', padding: '1px', background: 'var(--gradient-1)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Trendwatcher</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Detect spikes 48 hours early. First-mover advantage. Blue ocean.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: '120px 0', background: 'rgba(15, 20, 32, 0.5)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>COMPETITIVE ALPHA</div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>Three pillars of asymmetric advantage.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '60px' }}>
            {[
              { icon: '⚡', title: '48-Hour Arbitrage', desc: 'We track metadata whispers—supply chain spikes, API velocity, social sentiment—before an ad is ever created.', stat: '2-DAY HEAD START', color: 'var(--accent-blue)', bg: 'rgba(0, 201, 255, 0.15)' },
              { icon: '🛡️', title: 'Saturation Guard', desc: 'Real-time saturation scoring tells you exactly when a trend is too crowded. Save thousands on doomed launches.', stat: '0-100% SATURATION', color: 'var(--accent-pink)', bg: 'rgba(252, 70, 107, 0.15)' },
              { icon: '🔒', title: 'Competitive Moat', desc: 'Limited to 50 members per month. Our signals remain exclusive. Your competitors stay in the dark.', stat: '50 SEATS ONLY', color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.15)' }
            ].map((pillar, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '48px 36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ content: '', position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: i === 0 ? 'var(--gradient-1)' : i === 1 ? 'var(--gradient-3)' : 'var(--gradient-4)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>{pillar.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>{pillar.desc}</p>
                <div style={{ display: 'inline-flex', padding: '8px 16px', background: pillar.bg, borderRadius: '6px', fontSize: '14px', fontWeight: 600, fontFamily: 'monospace', color: pillar.color }}>{pillar.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stream */}
      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>PROOF OF ALPHA</div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>Watch the engine work.</h2>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>Real-time metadata spikes detected by our AI. Updated every 2 minutes.</p>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', marginTop: '60px', maxHeight: '400px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(transparent, rgba(20, 25, 40, 0.95))', pointerEvents: 'none' }} />
            {streamItems.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{item.time}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.content}</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div><div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Velocity</div><div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.velocity}</div></div>
                  <div><div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Saturation</div><div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', background: 'var(--gradient-4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.saturation}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '120px 0', background: 'rgba(15, 20, 32, 0.5)', borderTop: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>JOIN THE INNER CIRCLE</div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>Intelligence infrastructure.</h2>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>Two tiers. One philosophy: information speed is the only real margin.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '1000px', margin: '60px auto 0' }}>
            {/* Free */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '48px 40px', position: 'relative' }}>
              <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>PUBLIC DATA FEED</div>
              <div style={{ fontSize: '56px', fontWeight: 800, marginBottom: '8px', fontFamily: 'monospace' }}>$0<span style={{ fontSize: '20px', color: 'var(--text-secondary)', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>Access delayed signals after saturation hits.</p>
              <ul style={{ listStyle: 'none', marginBottom: '32px', padding: 0 }}>
                {['Daily velocity score updates', 'Saturation Guard alerts', '48-hour delayed product reveals', 'Community access (read-only)'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '15px', color: 'var(--text-secondary)' }}><span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>✓</span>{f}</li>
                ))}
              </ul>
              <a href="/pricing" style={{ display: 'block', width: '100%', padding: '18px', fontSize: '16px', fontWeight: 700, borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-primary)', textDecoration: 'none', textAlign: 'center' }}>Access Public Feed</a>
            </div>
            {/* Inner Circle */}
            <div style={{ background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.05) 0%, rgba(146, 254, 157, 0.05) 100%)', border: '1px solid transparent', borderRadius: '16px', padding: '48px 40px', position: 'relative' }}>
              <div style={{ content: '', position: 'absolute', inset: 0, borderRadius: '16px', padding: '1px', background: 'var(--gradient-1)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
              <div style={{ position: 'absolute', top: '-12px', right: '24px', background: 'var(--gradient-1)', color: 'var(--bg-primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>ONLY 4 SEATS LEFT</div>
              <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>INNER CIRCLE</div>
              <div style={{ fontSize: '56px', fontWeight: 800, marginBottom: '8px', fontFamily: 'monospace' }}>$49<span style={{ fontSize: '20px', color: 'var(--text-secondary)', fontWeight: 400 }}>/mo</span></div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>Full predictive intelligence. 48-hour arbitrage window.</p>
              <ul style={{ listStyle: 'none', marginBottom: '32px', padding: 0 }}>
                {['Daily Intelligence Cards at 8 AM', '48-hour early product detection', 'AI-generated TikTok scripts', 'Supplier sourcing & pricing', 'Full competitor analysis', 'Exclusive community access', 'Velocity + Saturation scoring'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', fontSize: '15px', color: 'var(--text-secondary)' }}><span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>✓</span>{f}</li>
                ))}
              </ul>
              <a href="/pricing" style={{ display: 'block', width: '100%', padding: '18px', fontSize: '16px', fontWeight: 700, borderRadius: '8px', border: 'none', background: 'var(--gradient-1)', color: 'var(--bg-primary)', textDecoration: 'none', textAlign: 'center', boxShadow: '0 8px 32px rgba(0, 201, 255, 0.3)' }}>Start 2-Day Free Trial →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '80px 0 40px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(10, 14, 26, 0.95)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'baseline' }}><span style={{ fontWeight: 300 }}>trend</span><span style={{ fontWeight: 800, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>watcher</span></div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>Predictive intelligence infrastructure for e-commerce. Exploit the latency. Beat the saturation.</p>
            </div>
            {['Product', 'Resources', 'Company'].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>{col}</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5'].map((l, j) => (
                    <li key={j} style={{ marginBottom: '12px' }}><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '40px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>© 2026 Trendwatcher Inc. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: '13px' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', fontSize: '13px' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
