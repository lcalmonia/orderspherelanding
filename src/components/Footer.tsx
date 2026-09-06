import React from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  Activity,
  Heart,
  Globe
} from 'lucide-react';

interface FooterProps {
  onOpenPartnerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPartnerModal }) => {
  return (
    <footer className="bg-[#020408] border-t border-white/5 text-slate-400 text-xs">
      
      {/* Top CTA Band */}
      <div className="border-b border-white/5 bg-transparent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span>Expanding Digital Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans max-w-3xl mx-auto">
            Ready to Build Your Scalable E-Commerce Infrastructure?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Partner with Ordersphere to transition your retail business online or scale your existing e-commerce operations into an unstoppable category leader.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenPartnerModal}
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Apply for Partnership</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#clients"
              className="px-6 py-3.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white font-medium text-sm transition-all"
            >
              Review Client Case Studies
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              </div>
              <span className="text-lg font-bold text-white font-sans tracking-tight">Ordersphere</span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              An application developer company engineering bespoke, high-concurrency software and digital infrastructure for e-commerce enterprises and growth partners worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational (99.99% Uptime)</span>
            </div>
          </div>

          {/* Col 2: Featured Client Tenants */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Current Clients
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="https://hydra.ordersphere.app" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>Hydra Water Station</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
                </a>
                <span className="text-[10px] text-slate-500 font-mono block">hydra.ordersphere.app</span>
              </li>
              <li>
                <a 
                  href="https://iluvkeyks.ordersphere.app" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>iLuvKeyks</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-pink-400" />
                </a>
                <span className="text-[10px] text-slate-500 font-mono block">iluvkeyks.ordersphere.app</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Infrastructure
            </h4>
            <ul className="space-y-2">
              <li><a href="#architecture" className="hover:text-white transition-colors">Distributed Edge Storefronts</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Atomic Order Orchestrator</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Omnichannel POS Bridge</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Automated 3PL Dispatch</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Scale ROI Calculator</a></li>
            </ul>
          </div>

          {/* Col 4: Partnership */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Partnership
            </h4>
            <ul className="space-y-2">
              <li><a href="#partners" className="hover:text-white transition-colors">Retail-to-Online Expansion</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Enterprise Scaling Tier</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Strategic Co-Ventures</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Partner FAQ</a></li>
              <li>
                <button onClick={onOpenPartnerModal} className="text-blue-400 hover:text-blue-300 font-medium">
                  Apply for Intake &rarr;
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Ordersphere Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Enterprise SLA</span>
            <span className="hover:text-slate-400 transition-colors">Developer Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
