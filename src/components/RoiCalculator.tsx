import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface RoiCalculatorProps {
  onApplyWithMetrics: (orders: number, revenueEstimate: number) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onApplyWithMetrics }) => {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(3500);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(65);
  const [physicalLocations, setPhysicalLocations] = useState<number>(2);
  const [currentCartAbandonment, setCurrentCartAbandonment] = useState<number>(68);

  // Computations
  const grossMonthlyVolume = monthlyOrders * averageOrderValue;
  // Faster edge checkout (sub-85ms) typically recovers ~8% to 14% of abandoned carts
  const recoveredConversionBoost = 0.095; // 9.5%
  const monthlyRevenueRecovered = Math.round(grossMonthlyVolume * recoveredConversionBoost);
  const annualRevenueRecovered = monthlyRevenueRecovered * 12;
  // Estimated savings on app subscriptions, broken plugin fixes, manual inventory reconciliation
  const estimatedAnnualOperationalSavings = Math.round((monthlyOrders * 0.45 + physicalLocations * 450) * 12);
  // Estimated deployment timeline in weeks
  const estimatedLaunchWeeks = physicalLocations > 5 ? '4 - 6 Weeks' : monthlyOrders > 10000 ? '4 Weeks' : '2 - 3 Weeks';

  return (
    <section id="calculator" className="py-24 bg-[#020408] relative overflow-hidden border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Scale Impact Modeler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-sans">
            Estimate Your Scale ROI &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Growth Velocity
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            See how custom edge infrastructure, sub-second checkout, and zero-inventory mismatch translate into measurable bottom-line gains.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Inputs Controls */}
          <div className="lg:col-span-6 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span>Input Your Brand's Current Volume</span>
            </h3>

            {/* Slider 1: Monthly Orders */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Estimated Monthly Orders</span>
                <span className="text-white font-mono font-bold text-sm px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                  {monthlyOrders.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="50000"
                step="200"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>200 (Emerging)</span>
                <span>15,000 (Scaling)</span>
                <span>50,000+ (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Average Order Value (AOV) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Average Order Value (AOV)</span>
                <span className="text-white font-mono font-bold text-sm px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                  ${averageOrderValue}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="500"
                step="5"
                value={averageOrderValue}
                onChange={(e) => setAverageOrderValue(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>$15</span>
                <span>$150</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Slider 3: Physical Locations / Hubs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Physical Stores / Kitchens / Fulfillment Hubs</span>
                <span className="text-white font-mono font-bold text-sm px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                  {physicalLocations === 0 ? 'Digital Only' : `${physicalLocations} Location${physicalLocations > 1 ? 's' : ''}`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={physicalLocations}
                onChange={(e) => setPhysicalLocations(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0 (Pure Online)</span>
                <span>5 (Regional Retail)</span>
                <span>25+ (Franchise/Multi-city)</span>
              </div>
            </div>

            {/* Current Gross Volume display */}
            <div className="p-4 rounded-2xl bg-[#020408] border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Current Gross Monthly GMV:</div>
                <div className="text-xl font-mono font-bold text-white">${grossMonthlyVolume.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Projected Annual GMV:</div>
                <div className="text-xl font-mono font-bold text-blue-400">${(grossMonthlyVolume * 12).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Right Calculated Gains HUD */}
          <div className="lg:col-span-6 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Ordersphere Optimization Model
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  +9.5% Net Conversion Lift
                </span>
              </div>

              {/* Primary metric card */}
              <div className="p-6 rounded-2xl bg-[#020408] border border-white/10 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Projected Annual Revenue Recovered (Checkout Speed & Zero Drops):
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono">
                  +${annualRevenueRecovered.toLocaleString()}
                  <span className="text-xs font-sans text-slate-400 font-normal ml-2">/ year</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calculated from sub-85ms global edge rendering and elimination of cart checkout lag during peak buyer traffic.
                </p>
              </div>

              {/* Secondary stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#020408] border border-white/10">
                  <div className="text-xs text-slate-400">Annual Plugin & Infrastructure Savings</div>
                  <div className="text-xl font-bold text-white font-mono mt-1">
                    ${estimatedAnnualOperationalSavings.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Consolidated headless stack</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#020408] border border-white/10">
                  <div className="text-xs text-slate-400">Estimated Turnkey Launch Time</div>
                  <div className="text-xl font-bold text-blue-400 font-mono mt-1">
                    {estimatedLaunchWeeks}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">From kick-off to live production</div>
                </div>
              </div>
            </div>

            {/* Action bottom button */}
            <div className="pt-6 border-t border-white/5 mt-6 space-y-3">
              <button
                id="apply-calculated-metrics-btn"
                onClick={() => onApplyWithMetrics(monthlyOrders, annualRevenueRecovered)}
                className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Partner With Ordersphere Using These Metrics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-slate-400">
                Data used to generate your custom architecture and partnership feasibility blueprint.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
