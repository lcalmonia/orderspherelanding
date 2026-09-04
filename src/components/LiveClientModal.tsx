import React, { useState } from 'react';
import { ClientProject } from '../types';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Server, 
  RefreshCw,
  Terminal,
  Clock,
  ArrowRight
} from 'lucide-react';

interface LiveClientModalProps {
  client: ClientProject | null;
  onClose: () => void;
  onOpenPartnerModal: () => void;
}

export const LiveClientModal: React.FC<LiveClientModalProps> = ({
  client,
  onClose,
  onOpenPartnerModal
}) => {
  if (!client) return null;

  const [viewMode, setViewMode] = useState<'storefront' | 'pipeline' | 'logs'>('storefront');
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'mobile'>('desktop');
  const [isSimulatingSync, setIsSimulatingSync] = useState(false);

  const simulateSync = () => {
    setIsSimulatingSync(true);
    setTimeout(() => setIsSimulatingSync(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#020408] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-transparent flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${client.id === 'hydrapure' ? 'bg-blue-400' : 'bg-pink-400'} animate-pulse`}></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-sans">{client.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-blue-400 border border-white/10">
                  {client.subdomain}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">{client.heroHeadline}</p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex p-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium">
              <button
                onClick={() => setViewMode('storefront')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === 'storefront' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Storefront Simulation
              </button>
              <button
                onClick={() => setViewMode('pipeline')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === 'pipeline' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                API & Sync Pipeline
              </button>
              <button
                onClick={() => setViewMode('logs')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === 'logs' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Live Event Logs
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {viewMode === 'storefront' && (
            <div className="space-y-6">
              
              {/* Simulation Header Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <span>https://{client.subdomain}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-sans">200 OK • SSL Valid</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Ordersphere Multi-Tenant Cloud Ingress • Global Edge CDN</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={simulateSync}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingSync ? 'animate-spin' : ''}`} />
                    <span>Test Latency Ping</span>
                  </button>

                  <a
                    href={client.fullUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-900/20"
                  >
                    <span>Visit Live URL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Mockup Showcase Render */}
              {client.id === 'hydrapure' ? (
                <div className="rounded-2xl border border-cyan-900/60 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-cyan-400 font-['Urbanist']">HydraPure Bio-Water</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Subscriber Portal</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">Cartridge Health: 94% • Auto-Refill Active</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-cyan-300 font-semibold">Active Formula:</div>
                      <div className="text-sm font-bold text-white">Electrolyte + Magnesium Core</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Delivered every 30 days based on family flow rate.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-cyan-300 font-semibold">Next Scheduled Dispatch:</div>
                      <div className="text-sm font-bold text-emerald-400">Sept 18, 2026 (Optimal)</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Automated routing from West Coast Regional Hub.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-cyan-300 font-semibold">Instant Cadence Adjustment:</div>
                      <div className="text-xs text-slate-300 font-mono">1-Click SMS: "DELAY 7 DAYS"</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Zero churn, zero customer support tickets needed.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-300 flex items-center justify-between">
                    <span>IoT Telemetry: Over 48,500 continuous water telemetry nodes updating the Ordersphere database in real time.</span>
                    <span className="text-cyan-300 font-mono font-bold">Sub-82ms Response</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-rose-900/60 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-rose-400 font-['Urbanist']">iLuvKeyks Studio</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Online Bakery Terminal</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">Kitchen Display System: Online & Synced</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-rose-300 font-semibold">Dynamic Capacity Governor:</div>
                      <div className="text-sm font-bold text-white">Max 12 Custom Tiers / Day</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Prevents kitchen burnout and protects artisanal quality.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-rose-300 font-semibold">Physical Register POS Bridge:</div>
                      <div className="text-sm font-bold text-emerald-400">Square & Clover POS Live Sync</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Bakery counter walk-in sales deduct ingredients instantly.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-rose-300 font-semibold">Fragile Cold-Chain Courier:</div>
                      <div className="text-sm font-bold text-cyan-400">Geo-Fenced 25-Mile Radius</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Guarantees fragile sugar art arrives refrigerated intact.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-slate-300 flex items-center justify-between">
                    <span>Bakery Production: 18,200+ multi-tier cakes custom designed online and fulfilled with zero double-bookings.</span>
                    <span className="text-rose-300 font-mono font-bold">+52% Mobile Conversion</span>
                  </div>
                </div>
              )}

            </div>
          )}

          {viewMode === 'pipeline' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Ordersphere Real-Time Event Topology for {client.name}
                </h4>
                <p className="text-xs text-slate-300">
                  Tracing how requests flow from buyer devices across the Ordersphere Edge, payment processors, and physical fulfillment systems.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0 mt-0.5">1</div>
                  <div>
                    <div className="text-sm font-bold text-white">Edge Request & Headless Rendering</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Customer accesses {client.subdomain}. Global edge CDN delivers prerendered catalog pages in ~35ms with dynamic pricing microservices.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0 mt-0.5">2</div>
                  <div>
                    <div className="text-sm font-bold text-white">Optimistic Stock Locking & Idempotent Checkout</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      When checkout initiates, inventory units or oven production slots are temporarily locked for 8 minutes to prevent race conditions during flash spikes.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0 mt-0.5">3</div>
                  <div>
                    <div className="text-sm font-bold text-white">Automated Warehouse / Kitchen Dispatch Webhook</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      On capture confirmation, Ordersphere dispatches webhook payloads directly to local POS printers, kitchen tablets, and regional 3PL courier APIs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'logs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>LIVE INGRESS LOG STREAM: {client.subdomain}</span>
                </div>
                <span className="text-emerald-400 animate-pulse">STREAMING 30 EPS</span>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-[11px] sm:text-xs text-slate-300 space-y-2 overflow-x-auto">
                <div className="text-emerald-400">[2026-09-04 01:32:04 UTC] GET https://{client.subdomain}/api/v3/catalog 200 OK (28ms)</div>
                <div className="text-cyan-400">[2026-09-04 01:32:08 UTC] POST /v1/telemetry/heartbeat tenant_id={client.id} status=nominal</div>
                <div className="text-slate-400">[2026-09-04 01:32:11 UTC] REDIS_CACHE_HIT key=inventory_lock_{client.id}_region_us_west</div>
                <div className="text-indigo-400">[2026-09-04 01:32:15 UTC] EDGE_DISPATCH carrier_broker destination_lat_lng=[verified]</div>
                <div className="text-emerald-400">[2026-09-04 01:32:19 UTC] POS_BRIDGE_SYNC square_webhook_ack seq=98242 (0.012s)</div>
                <div className="text-amber-400">[2026-09-04 01:32:22 UTC] AUTO_SCHEDULE_ENGINE evaluated_cadence=OK next_event=ready</div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Call to Action */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Want Ordersphere to engineer a dedicated scalable platform for your business?
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenPartnerModal();
              }}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-900/20 transition-all cursor-pointer"
            >
              Apply to Partner With Ordersphere &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
