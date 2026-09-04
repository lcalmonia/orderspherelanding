import React, { useState } from 'react';
import { ARCHITECTURE_PILLARS } from '../data/clients';
import { 
  Cpu, 
  Zap, 
  Layers, 
  Truck, 
  Database, 
  Server, 
  ShieldCheck, 
  Lock, 
  Check, 
  ArrowRight,
  GitMerge,
  Terminal,
  Activity
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const activePillar = ARCHITECTURE_PILLARS[activePillarIndex];

  const getPillarIcon = (icon: string) => {
    switch(icon) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-emerald-400" />;
      default: return <Server className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="architecture" className="py-24 bg-[#020408] relative overflow-hidden border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[300px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Engineered For Zero Downtime,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Infinite Scale
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Standard e-commerce plugins buckle under high traffic. Ordersphere provides a robust, decoupled architecture that processes orders, locks inventory, and routes shipments simultaneously.
          </p>
        </div>

        {/* Interactive Architecture Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Pillars */}
          <div className="lg:col-span-5 space-y-3">
            {ARCHITECTURE_PILLARS.map((pillar, idx) => {
              const isSelected = activePillarIndex === idx;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white/[0.04] border border-blue-500 shadow-xl shadow-blue-900/15'
                      : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-white/[0.04]'}`}>
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white font-sans">
                        {pillar.title}
                      </h3>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Platform Compliance Badges */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-around text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>PCI-DSS Level 1</span>
              </div>
              <span className="text-white/10">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>SOC2 Type II Ready</span>
              </div>
              <span className="text-white/10">|</span>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>99.99% SLA</span>
              </div>
            </div>
          </div>

          {/* Right Detailed Diagram & Spec HUD */}
          <div className="lg:col-span-7 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs font-mono">
              <div className="flex items-center gap-2 text-blue-400">
                <Terminal className="w-4 h-4" />
                <span>ORDERSPHERE-KERNEL // {activePillar.id.toUpperCase()}</span>
              </div>
              <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[10px] font-semibold">
                ACTIVE PIPELINE
              </span>
            </div>

            <div className="py-6 space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {activePillar.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-white font-sans mt-1">
                  {activePillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mt-3">
                  {activePillar.description}
                </p>
              </div>

              {/* Visualized Architecture Diagram flow */}
              <div className="p-5 rounded-2xl bg-[#020408] border border-white/10 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Data & Execution Flow</span>
                  <span className="text-[10px] text-blue-400 font-mono">Sub-10ms Async Dispatch</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center space-y-1">
                    <div className="text-[10px] text-slate-400">Step 1: Input</div>
                    <div className="text-xs font-bold text-white">Client Frontend / POS</div>
                    <div className="text-[10px] text-blue-400 font-mono">Edge Ingestion</div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/30 text-center space-y-1">
                    <div className="text-[10px] text-blue-300">Step 2: Core</div>
                    <div className="text-xs font-bold text-white">Ordersphere Bus</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Atomic Lock</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center space-y-1">
                    <div className="text-[10px] text-slate-400">Step 3: Output</div>
                    <div className="text-xs font-bold text-white">Carrier & Kitchen API</div>
                    <div className="text-[10px] text-cyan-400 font-mono">Instant Dispatch</div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Chips */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Engineering Benchmarks:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activePillar.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#020408] border border-white/5 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="font-mono text-[11px] sm:text-xs">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Fully compatible with existing ERPs (NetSuite, SAP, Custom SQL)</span>
              <span className="text-blue-400 font-medium">Auto-Healing Nodes</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
