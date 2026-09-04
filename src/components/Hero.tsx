import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Cpu, 
  Server, 
  ExternalLink,
  ShieldAlert,
  Activity,
  Globe2,
  TrendingUp
} from 'lucide-react';

interface HeroProps {
  onOpenPartnerModal: () => void;
  onExploreClients: () => void;
  onSelectClient: (clientId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenPartnerModal, 
  onExploreClients,
  onSelectClient
}) => {
  // Simulated real-time metrics for interactive tech aura
  const [pulseTime, setPulseTime] = useState(84);
  const [activeTransactions, setActiveTransactions] = useState(1482);
  const [activeTab, setActiveTab] = useState<'hydrapure' | 'iluvkeyks'>('hydrapure');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTime(Math.floor(75 + Math.random() * 18));
      setActiveTransactions(prev => prev + Math.floor(Math.random() * 5 - 2));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting matching Sleek Interface specification */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full"></div>
        <div className="absolute top-2/3 right-10 w-[450px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        
        {/* Subtle hairline geometric grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Sleek status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Next-Gen E-Commerce Architecture</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.1] font-sans">
                The scalable backbone for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  digital empires.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-normal">
                We engineer custom scalable software, headless checkout pipelines, and unified omnichannel backbones for high-growth e-commerce enterprises looking to dominate their market.
              </p>
            </div>

            {/* Sleek Partner Mandate Callout */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 mt-0.5 border border-blue-500/20">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white tracking-wide">
                    We Are Currently Seeking Growth-Focused Business Partners
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-normal">
                    Whether you need to scale existing digital infrastructure effortlessly or bring physical retail operations online into new revenue streams, our platform delivers bespoke, high-concurrency integration.
                  </p>
                </div>
              </div>
            </div>

            {/* Sleek Pill CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-partner-cta-btn"
                onClick={onOpenPartnerModal}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm sm:text-base font-semibold transition-all shadow-lg shadow-blue-900/25 hover:shadow-blue-900/40 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2.5"
              >
                <span>Partner With Ordersphere</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-clients-btn"
                onClick={onExploreClients}
                className="px-6 py-3.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-300 hover:text-white rounded-full text-sm sm:text-base font-medium transition-all active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Inspect Live Client Builds</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick Proof Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
              <div>
                <div className="text-2xl font-bold text-white">99.99%</div>
                <div className="text-xs text-slate-400 mt-0.5">Guaranteed SLA Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">&lt;85ms</div>
                <div className="text-xs text-slate-400 mt-0.5">Edge Checkout Speed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-400">Zero-Drop</div>
                <div className="text-xs text-slate-400 mt-0.5">Flash-Sale Concurrency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">100% Sync</div>
                <div className="text-xs text-slate-400 mt-0.5">Omnichannel POS & Stock</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Infrastructure HUD */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl p-6 overflow-hidden backdrop-blur-xl">
              
              {/* Top Bar of the HUD */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">ordersphere-core.v3</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>EDGE: {pulseTime}ms</span>
                </div>
              </div>

              {/* Sub-Tabs for the 2 Current Clients */}
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Live Production Tenants
                  </span>
                  <span className="text-[11px] text-blue-400 font-medium">Click to inspect</span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 bg-[#020408] rounded-xl border border-white/5">
                  <button
                    id="hero-tab-hydrapure"
                    onClick={() => setActiveTab('hydrapure')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-left flex items-center justify-between ${
                      activeTab === 'hydrapure'
                        ? 'bg-blue-950/50 border border-blue-500/40 text-blue-300 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold">HydraPure</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">hydrapure.ordersphere.app</div>
                    </div>
                    {activeTab === 'hydrapure' && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>}
                  </button>

                  <button
                    id="hero-tab-iluvkeyks"
                    onClick={() => setActiveTab('iluvkeyks')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-left flex items-center justify-between ${
                      activeTab === 'iluvkeyks'
                        ? 'bg-pink-950/40 border border-pink-500/40 text-pink-300 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold">iLuvKeyks</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">iluvkeyks.orderspher.app</div>
                    </div>
                    {activeTab === 'iluvkeyks' && <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>}
                  </button>
                </div>

                {/* Tenant Detail Preview Card */}
                {activeTab === 'hydrapure' ? (
                  <div className="p-4 rounded-2xl bg-[#020408]/90 border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <span className="text-xs font-mono font-bold text-white">hydrapure.ordersphere.app</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        IoT Health & Bio-Water
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white">Smart Hydration & Auto-Replenishment</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Custom subscription engine reading IoT cartridge exhaust signals to trigger automated dispatch before household filters deplete.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-slate-400">Active Subscribers</div>
                        <div className="text-sm font-bold text-white font-mono">48,500+</div>
                      </div>
                      <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-slate-400">Monthly Auto-Orders</div>
                        <div className="text-sm font-bold text-blue-400 font-mono">99.98% Zero-Fail</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => onSelectClient('hydrapure')}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                      >
                        Launch Interactive Case Study &rarr;
                      </button>
                      <a
                        href="https://hydrapure.ordersphere.app"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-slate-400 hover:text-white inline-flex items-center gap-1 font-mono"
                      >
                        Visit Tenant <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#020408]/90 border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                        <span className="text-xs font-mono font-bold text-white">iluvkeyks.orderspher.app</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        Custom Bakery & Patisserie
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white">Bespoke 3D Cake Architect & KDS Dispatch</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Live tier builder with flavor pairing, strict anti-overbooking oven slot scheduler, and temperature-controlled courier routing.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-slate-400">Custom Cakes Built</div>
                        <div className="text-sm font-bold text-white font-mono">18,200+</div>
                      </div>
                      <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-slate-400">Kitchen Slot Sync</div>
                        <div className="text-sm font-bold text-pink-400 font-mono">Zero Overbooking</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => onSelectClient('iluvkeyks')}
                        className="text-xs font-semibold text-pink-400 hover:text-pink-300 inline-flex items-center gap-1 transition-colors"
                      >
                        Launch Interactive Case Study &rarr;
                      </button>
                      <a
                        href="https://iluvkeyks.orderspher.app"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-slate-400 hover:text-white inline-flex items-center gap-1 font-mono"
                      >
                        Visit Tenant <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Infrastructure Telemetry Stream */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-blue-400" />
                    <span>Global Cluster: us-east, eu-west, ap-south</span>
                  </div>
                  <div className="font-mono text-emerald-400">HTTP/3 • QUIC Enabled</div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Sleek Strip Section matching Design HTML */}
        <div className="bg-slate-900/40 border-y border-white/5 py-8 px-6 sm:px-12 mt-16 rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest">
              Powering Modern Leaders
            </div>
            <div className="flex flex-wrap gap-8 sm:gap-16 items-center justify-center">
              <button 
                onClick={() => onSelectClient('hydrapure')}
                className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer group"
              >
                <div className="w-6 h-6 bg-emerald-500 rounded-md group-hover:scale-105 transition-transform shadow-md shadow-emerald-500/20"></div>
                <span className="text-base sm:text-lg font-bold text-white">
                  hydrapure<span className="text-slate-500 font-normal">.ordersphere.app</span>
                </span>
              </button>
              <button 
                onClick={() => onSelectClient('iluvkeyks')}
                className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer group"
              >
                <div className="w-6 h-6 bg-pink-500 rounded-md group-hover:scale-105 transition-transform shadow-md shadow-pink-500/20"></div>
                <span className="text-base sm:text-lg font-bold text-white">
                  iluvkeyks<span className="text-slate-500 font-normal">.ordersphere.app</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Sleek Feature Grid matching Design HTML */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 rounded-2xl overflow-hidden mt-6 bg-[#020408]">
          <div className="p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center hover:bg-white/[0.01] transition-colors">
            <div className="text-blue-500 mb-3.5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Infinite Scalability</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built on robust distributed cloud infrastructure that effortlessly scales alongside your transaction volume without friction.
            </p>
          </div>

          <div className="p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center bg-white/[0.02] hover:bg-white/[0.03] transition-colors">
            <div className="text-blue-500 mb-3.5">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Seamless Integration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              API-first architecture ensuring your legacy ERPs, physical POS registers, and logistics gateways synchronize in real time.
            </p>
          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-center hover:bg-white/[0.01] transition-colors">
            <div className="text-blue-500 mb-3.5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Enterprise Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bank-grade payload encryption, idempotent order validation, and automated compliance built for international commerce standards.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
