import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  Sparkles, 
  ArrowRight, 
  Menu, 
  X, 
  ExternalLink, 
  CheckCircle2,
  ShieldCheck,
  Zap,
  Cloud,
  Database
} from 'lucide-react';

interface NavbarProps {
  onOpenPartnerModal: () => void;
  onOpenNetlifyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartnerModal, onOpenNetlifyModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Featured Clients', href: '#clients' },
    { name: 'Partner Program', href: '#partners' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Scale Calculator', href: '#calculator' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#020408]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/60 py-3.5' 
        : 'bg-transparent py-4 border-b border-white/5'
    }`}>
      {/* Top micro-announcement banner */}
      <div className="hidden md:flex items-center justify-center gap-3 text-xs text-slate-400 pb-2 border-b border-white/5 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Now Accepting 2026 Q3/Q4 Business Partners
        </span>
        <span className="text-slate-400">Expanding digital infrastructure for high-growth e-commerce & retail enterprises</span>
        <a 
          href="#partners" 
          className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium transition-colors"
        >
          Learn more <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo matching Sleek Interface specification */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  ORDERSPHERE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Solutions
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & System Ping */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-netlify-btn"
              onClick={onOpenNetlifyModal}
              className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-cyan-400"
              title="Inspect Netlify Database & Blobs storage engine"
            >
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Netlify DB & Blobs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </button>

            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Client Gateways Live</span>
            </div>

            <button
              id="nav-partner-btn"
              onClick={onOpenPartnerModal}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenNetlifyModal}
              className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1"
              title="Netlify DB & Blobs"
            >
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px]">DB & Blobs</span>
            </button>
            <button
              id="mobile-partner-quick-btn"
              onClick={onOpenPartnerModal}
              className="sm:hidden px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-sm"
            >
              Partner
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border border-white/10 space-y-3 bg-[#020408]/98 rounded-2xl p-4 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-300 hover:text-white py-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full text-center py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-900/30"
              >
                Become a Business Partner
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Active Infrastructure: hydra & iluvkeyks</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
