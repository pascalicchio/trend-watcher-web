import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrendWatcher AI - The Competition is Sleeping. Your Bot Isn\'t.',
  description: 'Find the next $10,000 product 48 hours before it hits ad-spy tools.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Live Trend Ticker - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#065f46] to-[#047857] border-b border-[#10B981]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
            <span className="text-[#10B981] text-xs font-bold tracking-wider">LIVE</span>
          </div>
          <div className="flex-1 text-center">
            <span className="text-sm font-mono">
              🟢 <span className="text-white font-bold">NEW TREND:</span> Portable Neck Fan | Velocity: +142% | Saturation: 0.8%
            </span>
          </div>
          <div className="text-xs text-[#10B981]">Updated: Now</div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e293b] border border-[#475569] rounded-full mb-8">
            <span className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse"></span>
            <span className="text-[#F59E0B] text-xs font-bold tracking-wider">THE BOT IS RUNNING</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Competition is <span className="text-[#EF4444]">Sleeping.</span><br/>
            Your <span className="text-[#10B981]">Bot Isn't.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Find the next <span className="text-white font-bold">$10,000 product</span> 48 hours before it hits ad-spy tools. 
            We don't track ads; we track the metadata spikes that create them.
          </p>
          
          {/* Urgency Banner */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#1e293b] border border-[#F59E0B]/50 rounded-xl mb-8">
            <span className="text-2xl">🔥</span>
            <div className="text-left">
              <div className="text-[#F59E0B] font-bold text-sm">ONLY 12 SPOTS REMAINING</div>
              <div className="text-gray-400 text-xs">50 new members/month (to protect saturation)</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-[#10B981]/25">
              Get 2 Days Free - Start Now
            </a>
            <a href="#how-it-works" className="px-8 py-4 border border-[#475569] rounded-lg hover:border-[#10B981] transition-colors">
              See How It Works
            </a>
          </div>
          
          <p className="mt-4 text-gray-500 text-sm">
            💰 If you don't find a winning product, <span className="text-[#10B981]">don't pay a cent.</span>
          </p>
        </div>
      </section>

      {/* The Problem - Agitate the Pain */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#EF4444] text-sm uppercase tracking-wider">The Problem</span>
            <h2 className="text-4xl font-bold mt-2">You're Fighting for Scraps</h2>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF4444]/5 rounded-full blur-3xl"></div>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed relative z-10 text-center">
              "Traditional ad-spy tools like Minea show you what is <span className="text-white font-bold">already selling.</span> 
              By the time you see it, 500 other dropshippers have already launched ads. You're fighting for scraps."
            </p>
            
            {/* The Contrast */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0a0a0a] border border-[#EF4444] rounded-xl">
                <div className="text-[#EF4444] font-bold mb-2">❌ Traditional Tools</div>
                <p className="text-gray-400 text-sm">Show you products when 1,000+ sellers are already competing. Too late.</p>
              </div>
              <div className="p-4 bg-[#0a0a0a] border border-[#10B981] rounded-xl">
                <div className="text-[#10B981] font-bold mb-2">✅ TrendWatcher</div>
                <p className="text-gray-400 text-sm">Detect spikes 48 hours early. First-mover advantage. The only advantage that matters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Daily Flash Report - Intelligence Card UI */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#F59E0B] text-sm uppercase tracking-wider">What You Receive</span>
            <h2 className="text-4xl font-bold mt-2">Intelligence Card</h2>
          </div>
          
          {/* Intelligence Card */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-2xl p-8 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-[#F59E0B] text-black text-xs font-bold rounded">ALPHA ALERT #842</div>
                <span className="text-gray-400 text-sm">Feb 3, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
                <span className="text-[#10B981] text-sm">LIVE</span>
              </div>
            </div>
            
            {/* Winner */}
            <div className="mb-6">
              <div className="text-[#94a3b8] text-sm uppercase tracking-wider mb-1">THE WINNER</div>
              <div className="text-3xl font-bold">Aesthetic Notebook Set</div>
            </div>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#0a0a0a] rounded-xl p-4 text-center">
                <div className="text-[#10B981] text-2xl font-bold">+520%</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">Viral Velocity</div>
                <div className="mt-1 h-1 bg-[#1e293b] rounded-full">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-4 text-center">
                <div className="text-[#F59E0B] text-2xl font-bold">0.4%</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">Saturation Index</div>
                <div className="text-[#10B981] text-xs mt-1">GOLDEN GAP</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-4 text-center">
                <div className="text-[#6366f1] text-2xl font-bold">92%</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">Confidence</div>
                <div className="mt-1 h-1 bg-[#1e293b] rounded-full">
                  <div className="h-full bg-[#6366f1] rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Asset Pack */}
            <div className="border-t border-[#334155] pt-6">
              <div className="text-[#94a3b8] text-sm uppercase tracking-wider mb-3">YOUR ASSET PACK</div>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span>
                  <span className="text-sm">1x Viral Hook</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span>
                  <span className="text-sm">1x Sourcing Link</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]">✓</span>
                  <span className="text-sm">1x Competitor Analysis</span>
                </div>
              </div>
            </div>
            
            {/* Blurred for free users */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <p className="text-gray-500 text-sm">🔒 <span className="text-[#94a3b8]">Unlock the full Intelligence Card with the Inner Circle</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">The Speed Advantage</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#10B981] text-black text-xs font-bold rounded-full">24H ADVANTAGE</div>
              <div className="text-5xl mb-4 mt-4">🤖</div>
              <h3 className="text-xl font-bold mb-4">1. AI Monitors</h3>
              <p className="text-gray-400">
                Every night at 2 AM, our AI scrapes TikTok #TikTokMadeMeBuyIt and Pinterest Rising Trends. Before you wake up, we've found tomorrow's winners.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#10B981] text-black text-xs font-bold rounded-full">VELOCITY FILTER</div>
              <div className="text-5xl mb-4 mt-4">📊</div>
              <h3 className="text-xl font-bold mb-4">2. Velocity Score</h3>
              <p className="text-gray-400">
                We identify items with <span className="text-[#10B981]">{'&gt;'}30% increase</span> in mentions over 24 hours. Only the fastest-growing products make the cut.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#10B981] text-black text-xs font-bold rounded-full">8AM DELIVERY</div>
              <div className="text-5xl mb-4 mt-4">📧</div>
              <h3 className="text-xl font-bold mb-4">3. Intelligence Card</h3>
              <p className="text-gray-400">
                At 8 AM, you get the full package: winning product, viral hooks, sourcing links, and competitor analysis. Ready to execute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's 5 Trends Preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Today's Alpha Trends</h2>
          <p className="text-gray-400 text-center mb-12">High velocity. Low saturation. Ready to sell.</p>
          
          <div className="space-y-3">
            {[
              { rank: '🥇', name: 'Aesthetic Notebook Set', velocity: '+520%', status: 'GOLDEN GAP', color: 'text-[#F59E0B]' },
              { rank: '🥈', name: 'Bedside Sleep Sound Machine', velocity: '+410%', status: 'GOLDEN GAP', color: 'text-[#94a3b8]' },
              { rank: '🥉', name: 'LED Therapy Face Mask', velocity: '+340%', status: 'GOLDEN GAP', color: 'text-[#b45309]' },
              { rank: '4️⃣', name: 'Resistance Band Set', velocity: '+290%', status: 'SCALABLE', color: 'text-gray-400' },
              { rank: '5️⃣', name: 'Portable Espresso Maker', velocity: '+280%', status: 'SCALABLE', color: 'text-gray-500' },
            ].map((trend, i) => (
              <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-4 flex items-center justify-between hover:border-[#10B981] transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-xl">{trend.rank}</span>
                  <div>
                    <div className="font-bold">{trend.name}</div>
                    <div className="text-gray-500 text-sm">Product Research Complete</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#10B981] font-bold">{trend.velocity}</div>
                  <div className={`text-xs ${trend.color}`}>{trend.status}</div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-500 text-sm">
            🔒 <span className="text-[#8B5CF6]">Join the Inner Circle to unlock suppliers, TikTok scripts, and ad angles.</span>
          </p>
        </div>
      </section>

      {/* Pricing - With Scarcity */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join the Inner Circle</h2>
          
          {/* Scarcity Banner */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#1e293b] border border-[#EF4444] rounded-xl mb-8">
            <span className="text-2xl">🔥</span>
            <div className="text-left">
              <div className="text-[#EF4444] font-bold text-sm">ONLY 12 SPOTS REMAINING THIS MONTH</div>
              <div className="text-gray-400 text-xs">50 new members/month to protect saturation</div>
            </div>
          </div>
          
          <div className="bg-[#111] border border-[#10B981] rounded-2xl p-8 md:p-12 max-w-md mx-auto relative overflow-hidden">
            {/* Best Value Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold px-4 py-2 rounded-bl-lg">
              BEST VALUE
            </div>
            
            <div className="text-xl text-gray-400 mb-2">Inner Circle</div>
            <div className="text-6xl font-bold mb-6">
              $49<span className="text-xl text-gray-500">/mo</span>
            </div>
            
            {/* Risk-Free Guarantee */}
            <div className="bg-[#1e293b] rounded-lg p-4 mb-6">
              <p className="text-[#10B981] font-bold text-sm">🛡️ 2-DAY RISK-FREE TRIAL</p>
              <p className="text-gray-400 text-xs mt-1">If you don't find a winning product, don't pay.</p>
            </div>
            
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-[#10B981]">✓</span>
                Daily Intelligence Card at 8 AM
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981]">✓</span>
                Velocity scores & saturation index
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981]">✓</span>
                AI-generated TikTok scripts
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981]">✓</span>
                Supplier sourcing & pricing
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981]">✓</span>
                Competitor analysis
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981]">✓</span>
                Exclusive community access
              </li>
            </ul>
            
            <button className="w-full py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-[#10B981]/25">
              Start 2-Day Free Trial
            </button>
            <p className="text-gray-500 text-sm mt-4">Cancel anytime. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The Competition is Sleeping</h2>
          <p className="text-gray-400 mb-8">
            Your bot isn't. The first-mover advantage is the only advantage that matters in e-commerce.
          </p>
          <a href="#pricing" className="inline-block px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-[#10B981]/25">
            Start Your 2-Day Free Trial
          </a>
          <p className="text-gray-500 text-sm mt-4">
            💰 No winning product? Don't pay a cent.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-gray-500 border-t border-[#222]">
        <p className="text-sm">© 2026 TrendWatcher AI. The speed advantage for e-commerce sellers.</p>
        <p className="text-xs mt-2">The competition doesn't know what hit them.</p>
      </footer>
    </div>
  )
}
