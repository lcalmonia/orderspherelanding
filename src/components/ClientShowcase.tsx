import React, { useState } from 'react';
import { CLIENT_PROJECTS } from '../data/clients';
import { ClientProject } from '../types';
import { 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Cpu, 
  Truck, 
  Sparkles, 
  Droplet, 
  Cake, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight,
  Maximize2,
  RefreshCw,
  ShoppingBag,
  Sliders
} from 'lucide-react';

interface ClientShowcaseProps {
  onOpenLiveModal: (client: ClientProject) => void;
  onOpenPartnerModal: () => void;
}

export const ClientShowcase: React.FC<ClientShowcaseProps> = ({ 
  onOpenLiveModal,
  onOpenPartnerModal
}) => {
  const [selectedClientIndex, setSelectedClientIndex] = useState<number>(0);
  const currentClient = CLIENT_PROJECTS[selectedClientIndex];

  // Interactive state for HydraPure demo
  const [filterLife, setFilterLife] = useState<number>(24);
  const [waterUsage, setWaterUsage] = useState<number>(3.5);
  const [replenishTriggered, setReplenishTriggered] = useState<boolean>(false);

  // Interactive state for iLuvKeyks demo
  const [cakeTiers, setCakeTiers] = useState<number>(2);
  const [cakeFlavor, setCakeFlavor] = useState<string>('Belgian Dark Chocolate Ganache');
  const [cakeFrosting, setCakeFrosting] = useState<string>('Silk Swiss Meringue');
  const [deliveryDate, setDeliveryDate] = useState<string>('Saturday (Peak Slot)');
  const [slotStatus, setSlotStatus] = useState<string>('Reserved (3 slots remaining)');

  const triggerHydraReplenish = () => {
    setReplenishTriggered(true);
    setTimeout(() => {
      setFilterLife(100);
      setReplenishTriggered(false);
    }, 1800);
  };

  const calculateCakePrice = () => {
    let base = cakeTiers === 1 ? 85 : cakeTiers === 2 ? 165 : 275;
    if (cakeFlavor.includes('Truffle') || cakeFlavor.includes('Ganache')) base += 25;
    return base;
  };

  return (
    <section id="clients" className="py-24 bg-[#020408] relative overflow-hidden border-t border-white/5">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Enterprise Implementations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Current Clients Scaling on{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Ordersphere Infrastructure
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Every business has unique operational genetics. We architect dedicated software engines that eliminate bottlenecks and turn complex fulfillment into seamless growth.
          </p>

          {/* Client Selection Switcher Tabs */}
          <div className="inline-flex p-1 rounded-full bg-[#020408] border border-white/10 shadow-xl mt-6">
            {CLIENT_PROJECTS.map((client, idx) => (
              <button
                key={client.id}
                id={`client-tab-${client.id}`}
                onClick={() => setSelectedClientIndex(idx)}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  selectedClientIndex === idx
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {client.id === 'hydrapure' ? (
                  <Droplet className={`w-4 h-4 ${selectedClientIndex === idx ? 'text-white' : 'text-slate-400'}`} />
                ) : (
                  <Cake className={`w-4 h-4 ${selectedClientIndex === idx ? 'text-white' : 'text-slate-400'}`} />
                )}
                <span>{client.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-black/40 text-slate-300 border border-white/10 hidden sm:inline">
                  {client.subdomain}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Client Spotlight Display */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
          
          {/* Client Top Header Banner */}
          <div className="p-6 sm:p-8 lg:p-10 border-b border-white/5 bg-transparent flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${currentClient.colorAccent.badgeBg} ${currentClient.colorAccent.badgeText} border-white/10`}>
                  {currentClient.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">Industry: {currentClient.industry}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {currentClient.heroHeadline}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {currentClient.summary}
              </p>
            </div>

            {/* Direct Subdomain Access Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
              <button
                id={`inspect-modal-${currentClient.id}`}
                onClick={() => onOpenLiveModal(currentClient)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Interactive Live Sandbox</span>
              </button>

              <a
                href={currentClient.fullUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-200 hover:text-white rounded-full text-sm font-mono transition-all inline-flex items-center justify-center gap-2"
              >
                <span>{currentClient.subdomain}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Core Body: 2-Column (Interactive Simulation Left, Architecture & Case Study Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            
            {/* Left Column: Interactive Storefront Feature Simulator */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Live Feature Simulator: {currentClient.name}
                  </span>
                </div>
                <span className="text-xs text-blue-400 font-medium">Built with Ordersphere SDK</span>
              </div>

              {/* Specific interactive mini-apps for each client */}
              {currentClient.id === 'hydrapure' ? (
                /* HYDRAPURE SIMULATOR */
                <div className="p-6 rounded-2xl bg-[#020408] border border-white/10 space-y-6 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                        <Droplet className="w-4 h-4" />
                        <span>HydraPure Mineral Cartridge IoT Engine</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Simulating household telemetry data & automatic 0-touch replenishment
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      IoT Node: HP-9042-US
                    </span>
                  </div>

                  {/* Interactive Cartridge Gauge */}
                  <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Smart Filter Life Remaining</span>
                      <span className={`font-mono font-bold ${filterLife < 30 ? 'text-amber-400' : 'text-blue-400'}`}>
                        {filterLife}% ({Math.round(filterLife * 4.2)} Gallons)
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                          filterLife < 25 
                            ? 'bg-gradient-to-r from-amber-500 to-rose-500' 
                            : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        }`}
                        style={{ width: `${filterLife}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Telemetry: {filterLife <= 25 ? '⚠️ Low Threshold Detected' : 'Optimal Filtration'}</span>
                      <span>Auto-Reorder: 25%</span>
                    </div>
                  </div>

                  {/* Water Usage Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Simulate Daily Household Flow:</span>
                      <span className="font-mono text-blue-400 font-semibold">{waterUsage} Gallons / Day</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      step="0.5"
                      value={waterUsage}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setWaterUsage(val);
                        setFilterLife(prev => Math.max(8, Math.min(100, Math.round(100 - val * 9))));
                      }}
                      className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                    />
                  </div>

                  {/* Trigger Action */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div>
                      <div className="text-xs font-semibold text-white">Replenishment Rule:</div>
                      <div className="text-xs text-slate-400">
                        {filterLife <= 25 ? 'Order payload generated for Regional Hub #3' : 'Monitoring filter exhaustion rhythm'}
                      </div>
                    </div>

                    <button
                      onClick={triggerHydraReplenish}
                      disabled={replenishTriggered}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${replenishTriggered ? 'animate-spin' : ''}`} />
                      <span>{replenishTriggered ? 'Dispatching via Ordersphere API...' : 'Simulate IoT Auto-Reorder'}</span>
                    </button>
                  </div>

                  {replenishTriggered && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Order #HP-8839 created: 1x Mineral Filter dispatched from Seattle Depot. Carrier tracking sent via SMS. Filter reset to 100%!</span>
                    </div>
                  )}
                </div>
              ) : (
                /* ILUVKEYKS SIMULATOR */
                <div className="p-6 rounded-2xl bg-[#020408] border border-white/10 space-y-6 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-pink-400 text-sm font-bold">
                        <Cake className="w-4 h-4" />
                        <span>iLuvKeyks Bespoke Tier Cake Customizer</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Dynamic pricing, multi-layer pairing & real-time kitchen oven capacity sync
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      Bakery Hub: Central Studio
                    </span>
                  </div>

                  {/* Tier Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Cake Tier Architecture:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setCakeTiers(tier)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                            cakeTiers === tier
                              ? 'bg-pink-950/60 border-pink-500 text-white shadow'
                              : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {tier === 1 ? '1 Tier (15-20 svgs)' : tier === 2 ? '2 Tiers (35-45 svgs)' : '3 Tiers (70+ svgs)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Flavor Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Artisan Sponge & Filling Pairing:</label>
                    <select
                      value={cakeFlavor}
                      onChange={(e) => setCakeFlavor(e.target.value)}
                      className="w-full bg-[#020408] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Belgian Dark Chocolate Ganache">Belgian Dark Chocolate Ganache + Salted Caramel</option>
                      <option value="Madagascar Bourbon Vanilla">Madagascar Bourbon Vanilla + Fresh Strawberry Compote</option>
                      <option value="Earl Grey Lavender Sponge">Earl Grey Lavender Sponge + White Peach Cream</option>
                      <option value="Red Velvet Truffle">Red Velvet Truffle + Whipped Cream Cheese</option>
                    </select>
                  </div>

                  {/* Delivery / Event Date with Capacity Validation */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Delivery Date & Oven Capacity:</span>
                      <span className="text-emerald-400 font-semibold">{slotStatus}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setDeliveryDate('Friday Afternoon');
                          setSlotStatus('Available (8 slots open)');
                        }}
                        className={`p-3 rounded-xl border text-xs text-left ${
                          deliveryDate === 'Friday Afternoon' ? 'bg-pink-950/50 border-pink-500 text-white' : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold">Friday Delivery</div>
                        <div className="text-[10px] text-slate-400">Regular Kitchen Capacity</div>
                      </button>

                      <button
                        onClick={() => {
                          setDeliveryDate('Saturday (Peak Slot)');
                          setSlotStatus('Reserved (3 slots remaining)');
                        }}
                        className={`p-3 rounded-xl border text-xs text-left ${
                          deliveryDate === 'Saturday (Peak Slot)' ? 'bg-pink-950/50 border-pink-500 text-white' : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold">Saturday Peak Slot</div>
                        <div className="text-[10px] text-amber-400">High Demand (85% Booked)</div>
                      </button>
                    </div>
                  </div>

                  {/* Calculated Price & POS Sync Bar */}
                  <div className="pt-2 flex items-center justify-between bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div>
                      <div className="text-xs text-slate-400">Calculated Custom Price</div>
                      <div className="text-xl font-bold text-white font-mono">${calculateCakePrice()}.00</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Kitchen Display System (KDS)</div>
                      <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready to Route to Pastry Oven #2</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {currentClient.stats.map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#020408] border border-white/10">
                    <div className="text-xl font-extrabold text-white font-mono">{stat.value}</div>
                    <div className="text-xs font-semibold text-slate-300 mt-0.5">{stat.label}</div>
                    <div className="text-[10px] text-slate-500 mt-1 leading-tight">{stat.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Case Study, Architectural Solution & Founder Testimonial */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Challenge & Solution */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      The Operational Challenge
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentClient.challenge}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Ordersphere Custom Architecture
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentClient.solution}
                    </p>
                  </div>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="space-y-2.5 pt-2 border-t border-white/5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Engineered Infrastructure Highlights:
                  </span>
                  <ul className="space-y-2">
                    {currentClient.techHighlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Founder Testimonial Card */}
                <div className="p-5 rounded-2xl bg-[#020408] border border-white/10 space-y-3 relative">
                  <div className="text-blue-500 font-serif text-3xl leading-none -mb-2">“</div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    {currentClient.testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <img 
                      src={currentClient.testimonial.avatar} 
                      alt={currentClient.testimonial.author}
                      className="w-9 h-9 rounded-full object-cover border border-white/10" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{currentClient.testimonial.author}</div>
                      <div className="text-[10px] text-slate-400">{currentClient.testimonial.role}</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Banner inside Card */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Ready for a custom solution like this?
                </span>
                <button
                  onClick={onOpenPartnerModal}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Discuss Your Custom Build &rarr;
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
