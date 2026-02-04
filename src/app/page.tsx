'use client';

import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [seatCount, setSeatCount] = useState(46);
  const [streamItems, setStreamItems] = useState([
    { time: '3m ago', content: 'Metadata spike: Bedside Tech Organizer → Pet Care', velocity: '+380%', saturation: '1.2%' },
    { time: '8m ago', content: 'Saturation Guard: LED Strip Lights → High-Risk (Avoid)', velocity: '+120%', saturation: '74%' },
    { time: '14m ago', content: 'Golden Gap: Portable Sound Machine → Sleep Tech', velocity: '+520%', saturation: '0.8%' },
    { time: '19m ago', content: 'API velocity spike: Resistance Band Set → Fitness', velocity: '+290%', saturation: '3.1%' },
    { time: '26m ago', content: 'Supply chain shift: Travel Toiletry Kit → Accessories', velocity: '+210%', saturation: '5.4%' },
    { time: '31m ago', content: 'Trend momentum: LED Face Mask → Beauty Tech (accelerating)', velocity: '+440%', saturation: '1.9%' },
  ]);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const seatInterval = setInterval(() => {
      setSeatCount(prev => (Math.random() > 0.7 && prev < 50) ? prev + 1 : prev);
    }, 15000);
    return () => clearInterval(seatInterval);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const newItems = [
      { time: 'Just now', content: 'Metadata spike: Minimalist Desk Lamp → Home Office', velocity: '+340%', saturation: '2.1%' },
      { time: '2m ago', content: 'Golden Gap: Ergonomic Phone Stand → Tech Accessories', velocity: '+410%', saturation: '0.9%' },
      { time: '5m ago', content: 'High saturation alert: Phone Ring Holder → Avoid', velocity: '+80%', saturation: '68%' },
    ];
    const streamInterval = setInterval(() => {
      setStreamItems(prev => [newItems[Math.floor(Math.random() * newItems.length)], ...prev.slice(0, 5)]);
    }, 8000);
    return () => clearInterval(streamInterval);
  }, [isClient]);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 20% 30%, rgba(0, 201, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(146, 254, 157, 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, animation: 'backgroundPulse 15s ease-in-out infinite' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.02) 3px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.02) 3px)', pointerEvents: 'none', zIndex: 0, opacity: 0.4 }} />

      <header style={{ padding: '24px 0', borderBottom: '1px solid var(--border-subtle)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 14, 26, 0.85)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 300 }}>trend</span>
              <span style={{ fontWeight: 800, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>watcher</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--bg-card)', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gradient-1)', animation: 'pulse 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'monospace' }}>LIVE ENGINE</span>
              </div>
              <a href="/login" style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 600, borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'transparent', color: 'var(--text-primary)', textDecoration: 'none' }}>Login</a>
              <a href="/pricing" style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 600, borderRadius: '6px', border: 'none', background: 'var(--gradient-1)', color: 'var(--bg-primary)', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0, 201, 255, 0.2)' }}>Start Free Trial →</a>
            </div>
          </div>
        </div>
      </header>

      <section style={{ padding: '120px 0 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '24px' }}>Exploit the latency.<br />Beat the saturation.</h1>
              <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>We identify metadata spikes 48 hours before ad-spy tools catch them. First-mover advantage. The only advantage that matters.</p>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <a href="/pricing" style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 600, borderRadius: '8px', border: 'none', background: 'var(--gradient-1)', color: 'var(--bg-primary)', textDecoration: 'none', boxShadow: '0 8px 32px rgba(0, 201, 255, 0.3)' }}>Claim Your Seat →</a>
                <button style={{ padding: '16px 32px', fontSize: '16px', fontWeight: 600, borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer' }}>View Public Feed</button>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span>🔥</span>
                <span><strong style={{ background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700, fontSize: '14px' }}>{seatCount}/50</strong> seats occupied this month</span>
              </div>
            </div>
            <div style={{ background: 'rgba(20, 25, 40, 0.4)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '12px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px 8px 0 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'monospace', padding: '4px 12px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '6px', maxWidth: '400px', margin: '0 auto' }}>app.trendwatcher.io/dashboard</div>
              </div>
              <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.6) 0%, rgba(15, 20, 32, 0.8) 100%)', borderRadius: '0 0 8px 8px' }}>
                <div style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>ALPHA ALERT #2847</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gradient-1)', animation: 'pulse 2s ease-in-out infinite' }} />LIVE
                    </div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px' }}>Aesthetic Planner Kit</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px', textTransform: 'uppercase' }}>Viral Velocity</div>
                      <div style={{ fontSize: '32px', fontWeight: 700, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'monospace' }}>+520%</div>
                      <div style={{ display: 'inline-flex', padding: '4px 12px', background: 'rgba(0, 201, 255, 0.15)', border: '1px solid var(--accent-blue)', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: 'var(--accent-blue)', marginTop: '8px' }}>GOLDEN GAP</div>
                    </div>
                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px', textTransform: 'uppercase' }}>Saturation</div>
                      <div style={{ fontSize: '32px', fontWeight: 700, background: 'var(--gradient-4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'monospace' }}>0.4%</div>
                      <div style={{ display: 'inline-flex', padding: '4px 12px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid var(--accent-purple)', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: 'var(--accent-purple)', marginTop: '8px' }}>BLUE OCEAN</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed var(--border-subtle)', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span>🔒</span>
                    <span>Sourcing link, TikTok hooks & competitor intel locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>THE ECHO CHAMBER</div>
          <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>You&apos;re fighting for scraps.</h2>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 60px', lineHeight: 1.7 }}>Traditional ad-spy tools show you what&apos;s already selling. By the time you see it, 500 other sellers are already running ads.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '40px 32px', textAlign: 'left', opacity: 0.6 }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>❌</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Reactive Tools</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Show products when 1,000+ sellers are competing. Too late. Margins destroyed.</p>
            </div>
            <div style={{ border: '1px solid transparent', position: 'relative', background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, rgba(146, 254, 157, 0.1) 100%)', borderRadius: '12px', padding: '40px 32px', textAlign: 'left' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '1px', background: 'var(--gradient-1)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Trendwatcher</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Detect spikes 48 hours early. First-mover advantage. Blue ocean.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'rgba(15, 20, 32, 0.5)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>COMPETITIVE ALPHA</div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>Three pillars of asymmetric advantage.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '60px' }}>
            {[
              { icon: '⚡', title: '48-Hour Arbitrage', desc: 'We track metadata whispers—supply chain spikes, API velocity, social sentiment—before an ad is ever created.', stat: '2-DAY HEAD START', color: 'var(--accent-blue)', bg: 'rgba(0, 201, 255, 0.15)', gradient: 'var(--gradient-1)' },
              { icon: '🛡️', title: 'Saturation Guard', desc: 'Real-time saturation scoring tells you exactly when a trend is too crowded. Save thousands on doomed launches.', stat: '0-100% SATURATION', color: 'var(--accent-pink)', bg: 'rgba(252, 70, 107, 0.15)', gradient: 'var(--gradient-3)' },
              { icon: '🔒', title: 'Competitive Moat', desc: 'Limited to 50 members per month. Our signals remain exclusive. Your competitors stay in the dark.', stat: '50 SEATS ONLY', color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.15)', gradient: 'var(--gradient-4)' }
            ].map((pillar, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '48px 36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: pillar.gradient, transform: 'scaleX(0)', transformOrigin: 'left' }} />
                <div style={{ position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.4s ease', background: i === 0 ? 'radial-gradient(circle at center, rgba(0, 201, 255, 0.1), transparent)' : i === 1 ? 'radial-gradient(circle at center, rgba(252, 70, 107, 0.1), transparent)' : 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent)' }} />
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>{pillar.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>{pillar.desc}</p>
                <div style={{ display: 'inline-flex', padding: '8px 16px', background: pillar.bg, borderRadius: '6px', fontSize: '14px', fontWeight: 600, fontFamily: 'monospace', color: pillar.color }}>{pillar.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>PROOF OF ALPHA</div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>Watch the engine work.</h2>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>Real-time metadata spikes detected by our AI. Updated every 2 minutes.</p>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', marginTop: '60px', maxHeight: '400px', overflow: 'hidden', position: 'relative', backdropFilter: 'blur(20px)' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(transparent, rgba(20, 25, 40, 0.95))', pointerEvents: 'none' }} />
            {streamItems.map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer', position: 'relative' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{item.time}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.content}</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Velocity</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.velocity}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Saturation</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', background: 'var(--gradient-4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item.saturation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'rgba(15, 20, 32, 0.5)', borderTop: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>PUBLIC DATA FEED</div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>See what you&apos;re missing.</h2>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>Free users see velocity scores but can&apos;t identify products until 48 hours after saturation hits.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '60px' }}>
            {[
              { image: '📦', title: '████████ ████', score: '9.8' },
              { image: '🎯', title: '██████ ████████', score: '9.2' },
              { image: '✨', title: '████ ██████ ███', score: '8.9' }
            ].map((card, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15), transparent)', opacity: 0, transition: 'opacity 0.4s ease' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '100%', height: '180px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>{card.image}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{card.title}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '6px', marginTop: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>VELOCITY SCORE</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'monospace' }}>{card.score}</span>
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, textAlign: 'center', width: '80%' }}>
                  <button style={{ background: 'var(--gradient-1)', color: 'var(--bg-primary)', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Reveal 48hrs Early →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}>HISTORICAL ARBITRAGE</div>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '24px' }}>We called it before they knew.</h2>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>Products Trendwatcher identified 48 hours before they appeared on traditional ad-spy tools.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '60px' }}>
            {[
              { product: 'Collapsible Water Bottle', alert: 'Oct 12, 2025', ad: 'Oct 14, 2025', margin: '+62%' },
              { product: 'Portable Neck Fan', alert: 'Sep 28, 2025', ad: 'Sep 30, 2025', margin: '+58%' },
              { product: 'LED Therapy Mask', alert: 'Nov 03, 2025', ad: 'Nov 05, 2025', margin: '+71%' }
            ].map((card, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0, 201, 255, 0.1), transparent)', opacity: 0, transition: 'opacity 0.4s ease' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>{card.product}</div>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Trendwatcher Alert</span>
                      <span style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{card.alert}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>First Ad Detected</span>
                      <span style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{card.ad}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.1) 0%, rgba(146, 254, 157, 0.1) 100%)', borderRadius: '8px', border: '1px solid transparent', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '8px', padding: '1px', background: 'var(--gradient-1)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>MARGIN ADVANTAGE</div>
                    <div style={{ fontSize: '36px', fontWeight: 700, background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'monospace' }}>{card.margin}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', background: 'rgba(15, 20, 32, 0.5)', borderTop: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 }}