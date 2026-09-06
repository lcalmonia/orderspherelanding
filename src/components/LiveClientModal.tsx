import React, { useState } from 'react';
import { ClientProject } from '../types';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Tablet,
  CheckCircle2, 
  Server, 
  RefreshCw,
  Terminal,
  Clock,
  ArrowRight,
  Droplet,
  Coffee,
  Truck,
  Activity,
  PackageCheck,
  Zap
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

  const [viewMode, setViewMode] = useState<'live-embed' | 'operations' | 'pipeline' | 'logs'>('live-embed');
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSimulatingSync, setIsSimulatingSync] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const simulateSync = () => {
    setIsSimulatingSync(true);
    setTimeout(() => setIsSimulatingSync(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#020408] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-transparent flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${client.id === 'hydra' ? 'bg-blue-400' : 'bg-pink-400'} animate-pulse`}></div>
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
                onClick={() => setViewMode('live-embed')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === 'live-embed' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Live Web View
              </button>
              <button
                onClick={() => setViewMode('operations')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === 'operations' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Operations Console
              </button>
              <button
                onClick={() => setViewMode('pipeline')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === 'pipeline' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                API & Topology
              </button>
              <button
                onClick={() => setViewMode('logs')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${viewMode === 'logs' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Event Stream
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: LIVE EMBED VIEW */}
          {viewMode === 'live-embed' && (
            <div className="space-y-4">
              {/* Browser bar with URL & controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <span>https://{client.subdomain}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-sans">
                        200 OK • SSL Active
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">Ordersphere Multi-Tenant Cloud Ingress • Global Edge CDN</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {/* Device Toggles */}
                  <div className="flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded-full text-slate-400">
                    <button
                      onClick={() => setDeviceFrame('desktop')}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${deviceFrame === 'desktop' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
                      title="Desktop Viewport"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeviceFrame('tablet')}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${deviceFrame === 'tablet' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
                      title="Tablet Viewport"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeviceFrame('mobile')}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${deviceFrame === 'mobile' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
                      title="Mobile Viewport"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIframeKey(k => k + 1)}
                    className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 transition-colors cursor-pointer"
                    title="Reload frame"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={client.fullUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-900/20"
                  >
                    <span>Open Live Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Embedded Frame */}
              <div className="bg-[#020408] rounded-2xl border border-white/10 flex items-center justify-center p-2 sm:p-4 min-h-[520px]">
                <div 
                  className={`transition-all duration-300 overflow-hidden rounded-xl border border-white/10 shadow-2xl relative bg-[#020408] ${
                    deviceFrame === 'mobile' 
                      ? 'w-[375px] h-[560px]' 
                      : deviceFrame === 'tablet' 
                      ? 'w-[768px] h-[560px]' 
                      : 'w-full h-[540px]'
                  }`}
                >
                  <iframe
                    key={iframeKey}
                    src={client.fullUrl}
                    title={`${client.name} Live Production Tenant`}
                    className="w-full h-full border-0 bg-[#020408]"
                    loading="lazy"
                  />
                  
                  {/* Floating Link Overlay */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs text-slate-300 flex items-center gap-2 shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <a 
                      href={client.fullUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-blue-400 hover:text-white inline-flex items-center gap-1 font-semibold"
                    >
                      {client.subdomain} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPERATIONS CONSOLE VIEW */}
          {viewMode === 'operations' && (
            <div className="space-y-6">
              {client.id === 'hydra' ? (
                /* HYDRA REAL OPERATIONAL SNAPSHOT */
                <div className="rounded-2xl border border-blue-900/60 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-blue-400" />
                      <span className="text-lg font-bold text-blue-400 font-['Urbanist']">Hydra Water Refilling Station</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">Operational Console</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">Purity Sensor: 12 ppm • Station Status: Active</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-blue-300 font-semibold">Delivery Route Batching:</div>
                      <div className="text-sm font-bold text-white">4 Active Delivery Riders</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Automated batch dispatch with live rider status transitions.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-blue-300 font-semibold">5-Gallon Container Ledger:</div>
                      <div className="text-sm font-bold text-emerald-400">12,660 Bottles In Field</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Tracks round and slim loaners, empties collected, and bottle deposit credits.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-blue-300 font-semibold">Station POS & Cash Drawer:</div>
                      <div className="text-sm font-bold text-cyan-400">Walk-in Refills Synced</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Counter payment reconciliation and daily gallons dispensed meter.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 flex items-center justify-between">
                    <span>Active Deployment: 4,850+ recurring households serviced with sub-18 minute dispatch turnaround.</span>
                    <span className="text-blue-300 font-mono font-bold">Ordersphere Water Station OS</span>
                  </div>
                </div>
              ) : (
                /* ILUVKEYKS REAL OPERATIONAL SNAPSHOT */
                <div className="rounded-2xl border border-amber-900/60 bg-gradient-to-b from-slate-900 to-slate-950 p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-amber-400" />
                      <span className="text-lg font-bold text-amber-400 font-['Urbanist']">iLuvKeyks Coffee, Tea & Tub Cakes</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Online Ordering • Sales • Stock Audit</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">Portal: Online • Live Sync Active</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-amber-300 font-semibold">1. Customer Online Ordering:</div>
                      <div className="text-sm font-bold text-white">Pickup & Doorstep Delivery</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Interactive drink modifier customizer (sweetness, ice, milks), tub cakes, rice meals, and flat ₱49 / free delivery over ₱500.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-emerald-400 font-semibold">2. Sales Monitoring & KDS:</div>
                      <div className="text-sm font-bold text-emerald-400">Real-Time Barista Queue</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Live incoming orders dashboard, ticket prep timers, daily gross revenue monitoring, and automated sales metrics.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs text-cyan-400 font-semibold">3. Owner Stock Audit & Status:</div>
                      <div className="text-sm font-bold text-cyan-400">Daily Staff Shift Counts</div>
                      <p className="text-[11px] text-slate-400 leading-tight">Owner monitors physical counts logged by daily staff, with automated Low and Critical alerts on beans, milk, tubs & syrups.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-slate-300 flex items-center justify-between">
                    <span>Cafe Operations: 24,600+ orders processed with proactive owner oversight on staff daily inventory audits & zero surprise stockouts.</span>
                    <span className="text-amber-300 font-mono font-bold">+68% Online Order Growth</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: API & TOPOLOGY */}
          {viewMode === 'pipeline' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Ordersphere Real-Time Architecture for {client.name}
                </h4>
                <p className="text-xs text-slate-300">
                  Tracing how requests flow from buyer and operator devices across the Ordersphere Edge, payment processors, and physical fulfillment systems.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0 mt-0.5">1</div>
                  <div>
                    <div className="text-sm font-bold text-white">Edge Request & Headless Tenant Ingress</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Customer accesses {client.subdomain}. Global edge CDN delivers prerendered catalog pages in ~35ms with dynamic pricing microservices.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0 mt-0.5">2</div>
                  <div>
                    <div className="text-sm font-bold text-white">Optimistic Stock & Capacity Locking</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      When orders initiate, inventory units or oven production slots are temporarily locked for 8 minutes to prevent race conditions during peak hours.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0 mt-0.5">3</div>
                  <div>
                    <div className="text-sm font-bold text-white">Automated Warehouse, Rider & KDS Webhook</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      On capture confirmation, Ordersphere dispatches webhook payloads directly to rider mobile apps, kitchen display systems, and counter POS registers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE EVENT LOGS */}
          {viewMode === 'logs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>LIVE INGRESS LOG STREAM: {client.subdomain}</span>
                </div>
                <span className="text-emerald-400 animate-pulse">STREAMING 30 EPS</span>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-[11px] sm:text-xs text-slate-300 space-y-2 overflow-x-auto p-4">
                <div className="text-emerald-400">[2026-09-05 07:12:04 UTC] GET https://{client.subdomain}/api/v3/catalog 200 OK (24ms)</div>
                <div className="text-cyan-400">[2026-09-05 07:12:08 UTC] POST /v1/telemetry/heartbeat tenant_id={client.id} status=nominal</div>
                <div className="text-slate-400">[2026-09-05 07:12:11 UTC] REDIS_CACHE_HIT key=inventory_lock_{client.id}_region_main</div>
                <div className="text-indigo-400">[2026-09-05 07:12:15 UTC] EDGE_DISPATCH rider_broker destination_lat_lng=[verified]</div>
                <div className="text-emerald-400">[2026-09-05 07:12:19 UTC] POS_BRIDGE_SYNC square_webhook_ack seq=98242 (0.012s)</div>
                <div className="text-amber-400">[2026-09-05 07:12:22 UTC] AUTO_SCHEDULE_ENGINE evaluated_cadence=OK next_event=ready</div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Call to Action */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Want Ordersphere to engineer a dedicated scalable platform for your enterprise?
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
