import React, { useState } from 'react';
import { PARTNER_PATHWAYS } from '../data/clients';
import { 
  Building2, 
  Rocket, 
  Handshake, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Zap, 
  Users,
  Store,
  LineChart,
  Code2
} from 'lucide-react';

interface PartnerProgramProps {
  onOpenPartnerModal: () => void;
}

export const PartnerProgram: React.FC<PartnerProgramProps> = ({ onOpenPartnerModal }) => {
  const [activePathwayId, setActivePathwayId] = useState<string>('retail-to-online');

  const activePathway = PARTNER_PATHWAYS.find(p => p.id === activePathwayId) || PARTNER_PATHWAYS[0];

  const comparisonData = [
    {
      feature: 'System Architecture',
      generic: 'Monolithic, shared databases, brittle plugins that conflict during updates',
      ordersphere: 'Isolated custom microservices, edge-accelerated APIs, bespoke logic'
    },
    {
      feature: 'Physical POS & Inventory Sync',
      generic: 'Delayed 15-30 minute sync, frequent out-of-stock over-sells and angry customers',
      ordersphere: 'Sub-second real-time bidirectional register & warehouse sync'
    },
    {
      feature: 'Flash Sales & Traffic Spikes',
      generic: 'Checkout queue lag, rate limits, cart crashes when traffic exceeds 1,000 visitors',
      ordersphere: 'Auto-scaling serverless edge compute tested for 50,000+ simultaneous checkouts'
    },
    {
      feature: 'Custom Operational Logic',
      generic: 'Forced to conform your business to restrictive off-the-shelf templates',
      ordersphere: '100% custom-coded to your production, logistics, and scheduling requirements'
    },
    {
      feature: 'Ongoing Engineering Support',
      generic: 'Impersonal support ticket queues or expensive outsourced freelancers',
      ordersphere: 'Dedicated engineering pod and co-growth partnership with aligned success'
    }
  ];

  return (
    <section id="partners" className="py-24 bg-[#020408] relative overflow-hidden border-t border-white/5">
      
      {/* Decorative gradient glow */}
      <div className="absolute -top-32 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            <Handshake className="w-3.5 h-3.5" />
            <span>Growth Partner Intake — 2026 Cohort</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Expand Your Business Areas with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Ordersphere Partnership
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We are actively looking for business partners looking to scale their digital infrastructure efficiently or make their physical business available online to tap new regional and global markets.
          </p>
        </div>

        {/* 3 Interactive Partner Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PARTNER_PATHWAYS.map((pathway) => {
            const isSelected = activePathwayId === pathway.id;
            return (
              <div
                key={pathway.id}
                onClick={() => setActivePathwayId(pathway.id)}
                className={`p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected 
                    ? 'bg-white/[0.04] border border-blue-500 shadow-xl shadow-blue-900/15 -translate-y-1' 
                    : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    Selected Pathway
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${
                      pathway.id === 'retail-to-online' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : pathway.id === 'enterprise-scale' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {pathway.id === 'retail-to-online' && <Store className="w-6 h-6" />}
                      {pathway.id === 'enterprise-scale' && <Rocket className="w-6 h-6" />}
                      {pathway.id === 'strategic-alliance' && <Handshake className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-300 border border-white/10">
                      {pathway.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">{pathway.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {pathway.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ideal For:</div>
                    <p className="text-xs text-slate-300 mt-1">{pathway.idealFor}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-400">View Blueprint</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-blue-400' : 'text-slate-500'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pathway Deep-Dive Container */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 lg:p-10 shadow-2xl mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Pathway Blueprint: {activePathway.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans mt-1">
                  How Ordersphere Partners With You To Deliver Impact
                </h3>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Partner Advantages:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePathway.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="p-3.5 rounded-xl bg-[#020408] border border-white/10 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Turnkey Deliverables:</h4>
                <div className="space-y-2">
                  {activePathway.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#020408] border border-white/10 text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                <Code2 className="w-7 h-7" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white font-sans">
                  Ready to activate this roadmap?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We schedule a 30-minute digital infrastructure audit to map your physical catalog or online bottlenecks into a production blueprint.
                </p>
              </div>

              <button
                onClick={onOpenPartnerModal}
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/20 transition-all cursor-pointer"
              >
                {activePathway.ctaText} &rarr;
              </button>

              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero obligation • Confidential Architecture Review</span>
              </div>
            </div>

          </div>
        </div>

        {/* Enterprise Comparison Matrix */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Why Category Leaders Choose Ordersphere Over Off-The-Shelf SaaS
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              Comparing generic subscription templates against dedicated scalable software infrastructure.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider font-semibold text-slate-400">
                    <th className="p-4 sm:p-5 w-1/4">Operational Capability</th>
                    <th className="p-4 sm:p-5 w-3/8 text-slate-400">Generic Off-the-Shelf SaaS</th>
                    <th className="p-4 sm:p-5 w-3/8 text-blue-400 bg-blue-500/5">Ordersphere Custom Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                  {comparisonData.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-white">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.generic}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-200 bg-blue-500/[0.03] font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.ordersphere}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
