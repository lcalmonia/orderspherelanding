import React, { useState } from 'react';
import { CLIENT_PROJECTS } from '../data/clients';
import { ClientProject } from '../types';
import { 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Droplet, 
  Cake, 
  Coffee,
  Calendar, 
  ShieldCheck, 
  ArrowUpRight,
  Maximize2,
  RefreshCw,
  Truck,
  PackageCheck,
  Activity,
  Gauge,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  Zap,
  ShoppingBag,
  Boxes,
  TrendingUp,
  Plus,
  AlertCircle,
  AlertTriangle,
  ClipboardCheck,
  Utensils
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
  const currentClient = CLIENT_PROJECTS[selectedClientIndex] || CLIENT_PROJECTS[0];

  // Showcase view mode: 'console' (Interactive Operations) vs 'live-embed' (Interactive Browser View)
  const [showcaseMode, setShowcaseMode] = useState<'console' | 'live-embed'>('console');
  const [embedDevice, setEmbedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);

  // --- HYDRA WATER STATION INTERACTIVE STATE ---
  // 1. Rider Route Dispatcher state: 0 = Pending, 1 = Accepted, 2 = In Transit, 3 = Completed
  const [hydraOrderStatus, setHydraOrderStatus] = useState<number>(2); // Default to In Transit
  const [hydraActionMessage, setHydraActionMessage] = useState<string>('Rider Arnel D. is in transit (Est. arrival in 6 mins). Customer notified via SMS.');
  // 2. 5-Gallon Container Ledger
  const [slimLoaned, setSlimLoaned] = useState<number>(4210);
  const [roundLoaned, setRoundLoaned] = useState<number>(8450);
  const [containerActionStatus, setContainerActionStatus] = useState<string | null>(null);
  // 3. Station Telemetry
  const [tdsLevel, setTdsLevel] = useState<number>(12); // ppm
  const [isStationFlushing, setIsStationFlushing] = useState<boolean>(false);

  // --- ILUVKEYKS CAFE & BAKERY INTERACTIVE STATE (Online Ordering, Sales Monitoring, Live Inventory) ---
  const [iluvkeyksSubTab, setIluvkeyksSubTab] = useState<'ordering' | 'sales' | 'inventory'>('ordering');

  // 1. Online Ordering
  const iluvkeyksMenu = [
    { id: 'spanish-latte', name: 'Spanish Latte', category: 'Coffee & Cold Brew', price: 145, icon: '☕' },
    { id: 'matcha-cloud', name: 'Matcha Cloud Latte', category: 'Tea & Signature', price: 165, icon: '🍵' },
    { id: 'ube-tub-cake', name: 'Signature Ube Tub Cake', category: 'Cakes on Tub', price: 220, icon: '🍰' },
    { id: 'choco-tub-cake', name: 'Belgian Dark Choco Tub', category: 'Cakes on Tub', price: 220, icon: '🍫' },
    { id: 'tapa-meal', name: 'Beef Tapa w/ Garlic Rice & Egg', category: 'Rice Meals', price: 185, icon: '🍳' },
  ];
  const [selectedProductIdx, setSelectedProductIdx] = useState<number>(0);
  const [orderTemp, setOrderTemp] = useState<'Iced' | 'Hot'>('Iced');
  const [orderSweetness, setOrderSweetness] = useState<string>('50%');
  const [orderMilk, setOrderMilk] = useState<'Dairy Milk' | 'Oat Milk (+₱35)'>('Dairy Milk');
  const [orderExtraShot, setOrderExtraShot] = useState<boolean>(false);
  const [orderCheeseFoam, setOrderCheeseFoam] = useState<boolean>(false);
  const [orderFulfillment, setOrderFulfillment] = useState<'Delivery' | 'Pickup'>('Delivery');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  // 2. Sales Monitoring & Barista KDS
  const [kdsStatus, setKdsStatus] = useState<number>(1); // Prepping
  const [kdsTimer, setKdsTimer] = useState<string>('01:45 remaining');
  const [todayRevenue, setTodayRevenue] = useState<number>(48920);
  const [todayOrdersCount, setTodayOrdersCount] = useState<number>(142);
  const [kdsOrders, setKdsOrders] = useState([
    { id: '#IK-842', customer: 'Maria Santos', items: '1x Spanish Latte (Iced, 50%), 1x Ube Tub Cake', total: 365, status: 'Barista Prepping', channel: 'Delivery' },
    { id: '#IK-841', customer: 'Kyle Dela Cruz', items: '2x Matcha Cloud Latte', total: 330, status: 'Ready for Pickup', channel: 'Store Pickup' },
    { id: '#IK-840', customer: 'Bea Ramos', items: '1x Belgian Dark Choco Tub Cake', total: 220, status: 'Completed', channel: 'Delivery' },
  ]);

  // 3. Owner Daily Staff Inventory & Stock Status Monitoring
  interface StoreInventoryItem {
    id: string;
    name: string;
    category: string;
    currentStock: number;
    unit: string;
    lowThreshold: number;
    criticalThreshold: number;
    lastCountedBy: string;
    lastCountedShift: string;
    status: 'normal' | 'low' | 'critical';
  }

  const [inventoryItems, setInventoryItems] = useState<StoreInventoryItem[]>([
    {
      id: 'beans',
      name: 'Espresso Arabica Beans',
      category: 'Raw Coffee',
      currentStock: 3.2,
      unit: 'kg',
      lowThreshold: 6.0,
      criticalThreshold: 3.5,
      lastCountedBy: 'Lead Barista Carlos',
      lastCountedShift: 'Today, 05:30 PM (Evening Shift)',
      status: 'critical'
    },
    {
      id: 'milk',
      name: 'Fresh Dairy & Barista Oat Milk',
      category: 'Dairy & Milks',
      currentStock: 14.5,
      unit: 'L',
      lowThreshold: 24.0,
      criticalThreshold: 10.0,
      lastCountedBy: 'Lead Barista Carlos',
      lastCountedShift: 'Today, 05:30 PM (Evening Shift)',
      status: 'low'
    },
    {
      id: 'tubs',
      name: 'Signature Cake Tub Containers',
      category: 'Bakery Packaging',
      currentStock: 86,
      unit: 'pcs',
      lowThreshold: 30,
      criticalThreshold: 15,
      lastCountedBy: 'Barista Maya',
      lastCountedShift: 'Today, 01:15 PM (Midday Count)',
      status: 'normal'
    },
    {
      id: 'tapa',
      name: 'Pre-portioned Beef Tapa & Rice',
      category: 'Kitchen Meals',
      currentStock: 8,
      unit: 'sets',
      lowThreshold: 25,
      criticalThreshold: 12,
      lastCountedBy: 'Kitchen Staff Aris',
      lastCountedShift: 'Today, 07:45 AM (Opening Shift)',
      status: 'critical'
    },
    {
      id: 'syrup',
      name: 'Flavored Syrups & Purees',
      category: 'Barista Syrups',
      currentStock: 7.0,
      unit: 'btls',
      lowThreshold: 12.0,
      criticalThreshold: 4.0,
      lastCountedBy: 'Barista Maya',
      lastCountedShift: 'Today, 01:15 PM (Midday Count)',
      status: 'low'
    },
    {
      id: 'cups',
      name: 'Cold & Hot Cups with Lids',
      category: 'Consumables',
      currentStock: 320,
      unit: 'sets',
      lowThreshold: 120,
      criticalThreshold: 50,
      lastCountedBy: 'Barista Maya',
      lastCountedShift: 'Today, 01:15 PM (Midday Count)',
      status: 'normal'
    }
  ]);

  const [inventoryStatusFilter, setInventoryStatusFilter] = useState<'all' | 'critical' | 'low' | 'normal'>('all');
  const [inventoryRestockedNotice, setInventoryRestockedNotice] = useState<string | null>(null);
  const [staffAuditLogs, setStaffAuditLogs] = useState<string[]>([
    'Evening Shift Count logged by Carlos: Beans 3.2kg (CRITICAL) & Milk 14.5L (LOW)',
    'Midday Spot Audit logged by Maya: 86 Tub Containers (NORMAL)',
    'Morning Opening Audit logged by Aris: Beef Tapa sets 8 (CRITICAL)',
    'Store Owner reviewed Shift Audit: Supplier PO sent for Beans & Beef Tapa'
  ]);

  // Hydra dispatch status advance handler
  const advanceHydraOrder = () => {
    const next = (hydraOrderStatus + 1) % 4;
    setHydraOrderStatus(next);
    if (next === 0) {
      setHydraActionMessage('Order #HY-2840 queued. Awaiting dispatch to available rider.');
    } else if (next === 1) {
      setHydraActionMessage('Rider Arnel D. accepted order. Loading 5x Alkaline & 2x Slim Mineral at Station Bay #2.');
    } else if (next === 2) {
      setHydraActionMessage('Rider dispatched on route to Villa Grande Subd. Real-time GPS tracking sent to customer.');
    } else {
      setHydraActionMessage('Delivery verified! 7 full gallons delivered, 7 empties returned to station ledger.');
      setRoundLoaned(prev => prev + 5);
      setSlimLoaned(prev => prev + 2);
    }
  };

  // Hydra container exchange simulation
  const handleContainerExchange = () => {
    setContainerActionStatus('Collected 4 empty containers & issued 4 full Alkaline refills. Deposit balance reconciled: $0.00.');
    setTimeout(() => {
      setContainerActionStatus(null);
    }, 3200);
  };

  // Hydra station TDS test
  const triggerHydraTelemetryTest = () => {
    setIsStationFlushing(true);
    setTimeout(() => {
      setTdsLevel(Math.floor(10 + Math.random() * 4));
      setIsStationFlushing(false);
    }, 1200);
  };

  // iLuvKeyks Calculations and Handlers
  const activeProduct = iluvkeyksMenu[selectedProductIdx];
  const itemSubtotal = activeProduct.price + (orderMilk.includes('Oat') ? 35 : 0) + (orderExtraShot ? 30 : 0) + (orderCheeseFoam ? 25 : 0);
  const deliveryFee = orderFulfillment === 'Delivery' ? (itemSubtotal >= 500 ? 0 : 49) : 0;
  const currentGrandTotal = itemSubtotal + deliveryFee;

  const handlePlaceOnlineOrder = () => {
    const newOrderId = `#IK-${843 + (todayOrdersCount - 142)}`;
    const newOrder = {
      id: newOrderId,
      customer: 'Online Guest Buyer',
      items: `1x ${activeProduct.name} (${orderTemp}, ${orderSweetness}${orderMilk.includes('Oat') ? ', Oat Milk' : ''})`,
      total: currentGrandTotal,
      status: 'Order Queued',
      channel: orderFulfillment
    };
    
    // Update Sales Monitoring & KDS queue (Inventory is NOT auto-deducted per order; managed via daily staff physical counts)
    setTodayRevenue(prev => prev + currentGrandTotal);
    setTodayOrdersCount(prev => prev + 1);
    setKdsOrders(prev => [newOrder, ...prev.slice(0, 4)]);
    setKdsStatus(0);
    setKdsTimer('Queued (Position #1)');

    setOrderSuccessMsg(`Order ${newOrderId} placed! ₱${currentGrandTotal.toLocaleString()} routed to Barista KDS queue.`);
    setTimeout(() => {
      setOrderSuccessMsg(null);
    }, 4000);
  };

  const advanceKdsOrder = () => {
    const next = (kdsStatus + 1) % 4;
    setKdsStatus(next);
    if (next === 0) setKdsTimer('Queued (Position #1)');
    else if (next === 1) setKdsTimer('01:30 remaining');
    else if (next === 2) setKdsTimer('Ready for Counter Pickup / Rider Dispatch');
    else setKdsTimer('Delivered / Handed to Customer');

    setKdsOrders(prev => {
      const updated = [...prev];
      if (updated[0]) {
        const labels = ['Order Queued', 'Barista Prepping', 'Ready for Pickup', 'Completed'];
        updated[0] = { ...updated[0], status: labels[next] };
      }
      return updated;
    });
  };

  // Staff submits daily shift physical count
  const handleSimulateStaffCount = () => {
    const timeString = 'Just now (Staff Shift Count)';
    const staffName = 'Lead Barista on Duty';

    setInventoryItems(prev => prev.map(item => {
      let count = item.currentStock;
      if (item.id === 'beans') count = 2.8;
      if (item.id === 'milk') count = 12.0;
      if (item.id === 'tapa') count = 6;
      if (item.id === 'tubs') count = 80;

      let status: 'normal' | 'low' | 'critical' = 'normal';
      if (count <= item.criticalThreshold) {
        status = 'critical';
      } else if (count <= item.lowThreshold) {
        status = 'low';
      }

      return {
        ...item,
        currentStock: count,
        lastCountedBy: staffName,
        lastCountedShift: timeString,
        status
      };
    }));

    setStaffAuditLogs(prev => [
      `Daily Shift Count logged by ${staffName}: 2 Items CRITICAL, 1 LOW, 3 NORMAL. Owner alerted.`,
      ...prev.slice(0, 4)
    ]);
    setInventoryRestockedNotice('Daily staff physical inventory count recorded & verified in Owner Dashboard!');
    setTimeout(() => {
      setInventoryRestockedNotice(null);
    }, 3500);
  };

  // Owner triggers PO replenishment for Critical / Low items
  const handleOwnerRestockPO = () => {
    setInventoryItems(prev => prev.map(item => {
      if (item.status === 'critical' || item.status === 'low') {
        let restoredStock = item.currentStock;
        if (item.id === 'beans') restoredStock = 18.0;
        if (item.id === 'milk') restoredStock = 45.0;
        if (item.id === 'tapa') restoredStock = 35;
        if (item.id === 'syrup') restoredStock = 20.0;
        return {
          ...item,
          currentStock: restoredStock,
          status: 'normal' as const,
          lastCountedBy: 'Store Owner (PO Reorder Delivered)',
          lastCountedShift: 'Verified Restock Received'
        };
      }
      return item;
    }));

    setStaffAuditLogs(prev => [
      'Store Owner approved Supplier Reorder: Low & Critical items replenished to Normal status',
      ...prev.slice(0, 4)
    ]);
    setInventoryRestockedNotice('Purchase Order approved! Critical and low items replenished to healthy status.');
    setTimeout(() => {
      setInventoryRestockedNotice(null);
    }, 3500);
  };

  const hydraStatusLabels = ['Pending Dispatch', 'Rider Accepted', 'In Transit', 'Delivered & Settled'];
  const kdsStatusLabels = ['Order Queued', 'Barista Prepping', 'Ready for Pickup', 'Served & Settled'];

  return (
    <section id="clients" className="py-24 bg-[#020408] relative overflow-hidden border-t border-white/5">
      
      {/* Background radial ambient glow matching Sleek Interface specification */}
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
            From regional water refilling logistics to artisanal cafe and bakery operations, our platform facilitates seamless integration and custom digital infrastructure for growth-focused brands.
          </p>

          {/* Client Selection Switcher Tabs */}
          <div className="inline-flex p-1 rounded-full bg-[#020408] border border-white/10 shadow-xl mt-6">
            {CLIENT_PROJECTS.map((client, idx) => (
              <button
                key={client.id}
                id={`client-tab-${client.id}`}
                onClick={() => {
                  setSelectedClientIndex(idx);
                  setIframeKey(prev => prev + 1);
                }}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  selectedClientIndex === idx
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {client.id === 'hydra' ? (
                  <Droplet className={`w-4 h-4 ${selectedClientIndex === idx ? 'text-white' : 'text-blue-400'}`} />
                ) : (
                  <Coffee className={`w-4 h-4 ${selectedClientIndex === idx ? 'text-white' : 'text-pink-400'}`} />
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

            {/* Direct Tenant Launch & Sandbox Actions */}
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
                className="px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-200 hover:text-white rounded-full text-sm font-mono transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>{currentClient.subdomain}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Under the Live Production Tenants: Mode Switcher */}
          <div className="px-6 sm:px-8 lg:px-10 py-3 border-b border-white/5 bg-white/[0.01] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-white">Live Production Tenant:</span>
              <a 
                href={currentClient.fullUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                https://{currentClient.subdomain}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Mode Controls */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
              <div className="flex p-1 rounded-full bg-black/40 border border-white/10 text-xs">
                <button
                  onClick={() => setShowcaseMode('console')}
                  className={`px-3.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    showcaseMode === 'console'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Operations Console
                </button>
                <button
                  onClick={() => setShowcaseMode('live-embed')}
                  className={`px-3.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    showcaseMode === 'live-embed'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Live Web View
                </button>
              </div>

              {showcaseMode === 'live-embed' && (
                <div className="flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded-full text-slate-400">
                  <button
                    onClick={() => setEmbedDevice('desktop')}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${embedDevice === 'desktop' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
                    title="Desktop View"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setEmbedDevice('tablet')}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${embedDevice === 'tablet' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
                    title="Tablet View"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setEmbedDevice('mobile')}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${embedDevice === 'mobile' ? 'bg-white/10 text-white' : 'hover:text-white'}`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Body Section */}
          {showcaseMode === 'live-embed' ? (
            /* LIVE TENANT EMBED VIEW */
            <div className="p-6 sm:p-8 lg:p-10 space-y-4">
              {/* Browser Mock Frame Header */}
              <div className="rounded-2xl bg-[#020408] border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>

                  {/* Address Bar */}
                  <div className="flex-1 max-w-xl mx-auto px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-400">https://</span>
                      <span className="text-white font-semibold">{currentClient.subdomain}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider hidden sm:inline">Ordersphere Edge</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIframeKey(k => k + 1)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Reload tenant preview"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={currentClient.fullUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Open in new window"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Device Viewport Wrapper */}
                <div className="bg-[#020408] flex items-center justify-center p-2 sm:p-4 min-h-[580px]">
                  <div 
                    className={`transition-all duration-300 overflow-hidden rounded-xl border border-white/10 shadow-2xl relative bg-[#020408] ${
                      embedDevice === 'mobile' 
                        ? 'w-[375px] h-[640px]' 
                        : embedDevice === 'tablet' 
                        ? 'w-[768px] h-[640px]' 
                        : 'w-full h-[620px]'
                    }`}
                  >
                    <iframe
                      key={iframeKey}
                      src={currentClient.fullUrl}
                      title={`${currentClient.name} Live Production Tenant`}
                      className="w-full h-full border-0 bg-[#020408]"
                      loading="lazy"
                    />

                    {/* Overlay Helper Bar */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs text-slate-300 flex items-center gap-3 shadow-xl">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        Live Tenant Connected
                      </span>
                      <span className="text-white/20">|</span>
                      <a 
                        href={currentClient.fullUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold"
                      >
                        Open Fullscreen Tab <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* OPERATIONS CONSOLE VIEW: 2-Column (Interactive Left, Architecture & Testimonial Right) */
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              
              {/* Left Column: Interactive Operations Simulator */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Live Operations Simulation: {currentClient.name}
                    </span>
                  </div>
                  <span className="text-xs text-blue-400 font-mono font-medium">Ordersphere Realtime SDK</span>
                </div>

                {/* Client-specific interactive mini-apps */}
                {currentClient.id === 'hydra' ? (
                  /* HYDRA WATER REFILLING STATION OPERATIONS SIMULATOR */
                  <div className="p-6 rounded-2xl bg-[#020408] border border-white/10 space-y-6 relative overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
                          <Droplet className="w-4 h-4" />
                          <span>Hydra Water Station Route Dispatcher & Container Ledger</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Simulating automated rider dispatch, 5-gallon container balance, and station water quality
                        </p>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Station Node #01: Metro Hub
                      </span>
                    </div>

                    {/* 1. Rider Delivery Dispatch Stepper */}
                    <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-semibold">Active Dispatch Route #HY-2840</span>
                        <span className="text-xs font-mono text-blue-400 font-semibold">5x Alkaline • 2x Mineral</span>
                      </div>

                      {/* 4-Step Interactive Pipeline */}
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        {hydraStatusLabels.map((step, idx) => (
                          <div 
                            key={step} 
                            className={`p-2 rounded-lg text-center text-[10px] font-semibold border transition-all ${
                              hydraOrderStatus >= idx
                                ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                                : 'bg-white/[0.02] border-white/5 text-slate-500'
                            }`}
                          >
                            <div className="font-mono text-[9px] opacity-70">0{idx + 1}</div>
                            <div className="truncate">{step}</div>
                          </div>
                        ))}
                      </div>

                      {/* Dynamic status feedback */}
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                        <Truck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white">Status: {hydraStatusLabels[hydraOrderStatus]}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{hydraActionMessage}</div>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Assigned Driver: Arnel D. (Rider #04)</span>
                        <button
                          onClick={advanceHydraOrder}
                          className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow cursor-pointer flex items-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Advance Order Step &rarr;</span>
                        </button>
                      </div>
                    </div>

                    {/* 2. 5-Gallon Container Ledger & Quick Exchange */}
                    <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-semibold">5-Gallon Container Deposit Ledger</span>
                        <span className="text-emerald-400 font-semibold">Zero Deposit Loss</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Round 5-Gal Loaned</div>
                          <div className="text-lg font-bold text-white font-mono">{roundLoaned.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">1,420 empties in station warehouse</div>
                        </div>

                        <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Slim 5-Gal Loaned</div>
                          <div className="text-lg font-bold text-cyan-400 font-mono">{slimLoaned.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">890 empties in station warehouse</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-400">Household Container Swap Test:</span>
                        <button
                          onClick={handleContainerExchange}
                          className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Test 4-Bottle Swap</span>
                        </button>
                      </div>

                      {containerActionStatus && (
                        <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{containerActionStatus}</span>
                        </div>
                      )}
                    </div>

                    {/* 3. Station Water Quality & Filtration Telemetry */}
                    <div className="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-semibold">Station Water Purity Telemetry (IoT)</span>
                        <span className="text-blue-400 font-mono font-bold">1,840 / 2,500 Gal Dispensed Today</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-[10px] text-slate-400">TDS Purity Sensor</div>
                          <div className="text-sm font-bold text-emerald-400 font-mono">{tdsLevel} ppm (Pure)</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-[10px] text-slate-400">UV Sterilization</div>
                          <div className="text-sm font-bold text-white font-mono">Active (100%)</div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-[10px] text-slate-400">Pre-Filter Stage</div>
                          <div className="text-sm font-bold text-blue-400 font-mono">88% Lifespan</div>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">Telemetry polled every 15 seconds</span>
                        <button
                          onClick={triggerHydraTelemetryTest}
                          disabled={isStationFlushing}
                          className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${isStationFlushing ? 'animate-spin' : ''}`} />
                          <span>{isStationFlushing ? 'Testing...' : 'Test Sensor Readout'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ILUVKEYKS CAFE & BAKERY OPERATIONS SIMULATOR */
                  <div className="p-6 rounded-2xl bg-[#020408] border border-white/10 space-y-6 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                          <Coffee className="w-4 h-4" />
                          <span>iLuvKeyks Coffee, Tea & Tub Cakes</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Online Ordering Portal, Live Barista Sales Monitoring & Owner Stock Audit
                        </p>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 self-start sm:self-auto">
                        Tenant Node: iluvkeyks.ordersphere.app
                      </span>
                    </div>

                    {/* Three Core Feature Switchers */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/60 rounded-xl border border-white/5">
                      <button
                        onClick={() => setIluvkeyksSubTab('ordering')}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          iluvkeyksSubTab === 'ordering'
                            ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="truncate">1. Online Ordering</span>
                      </button>

                      <button
                        onClick={() => setIluvkeyksSubTab('sales')}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          iluvkeyksSubTab === 'sales'
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="truncate">2. Sales & KDS</span>
                      </button>

                      <button
                        onClick={() => setIluvkeyksSubTab('inventory')}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          iluvkeyksSubTab === 'inventory'
                            ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Boxes className="w-3.5 h-3.5" />
                        <span className="truncate">3. Owner Stock Audit</span>
                        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-mono border border-rose-500/30">
                          2 Critical
                        </span>
                      </button>
                    </div>

                    {/* SUBTAB 1: ONLINE ORDERING APP */}
                    {iluvkeyksSubTab === 'ordering' && (
                      <div className="space-y-4 bg-white/[0.02] p-4 sm:p-5 rounded-2xl border border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-300">
                            Customer Menu & Modifier Customizer
                          </span>
                          <span className="text-[11px] font-mono text-amber-400">
                            Free Delivery &gt; ₱500 • Flat ₱49
                          </span>
                        </div>

                        {/* Menu Item Selector Chips */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {iluvkeyksMenu.map((item, idx) => (
                            <button
                              key={item.id}
                              onClick={() => setSelectedProductIdx(idx)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                selectedProductIdx === idx
                                  ? 'bg-amber-950/60 border-amber-500/60 text-white shadow'
                                  : 'bg-black/40 border-white/5 text-slate-400 hover:text-white'
                              }`}
                            >
                              <div className="text-base">{item.icon}</div>
                              <div className="text-xs font-bold text-white mt-1 truncate">{item.name}</div>
                              <div className="text-[10px] text-amber-400 font-mono mt-0.5">₱{item.price}.00</div>
                            </button>
                          ))}
                        </div>

                        {/* Modifier Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1.5">
                            <label className="text-[11px] text-slate-400 font-medium">Temperature & Ice</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {(['Iced', 'Hot'] as const).map(temp => (
                                <button
                                  key={temp}
                                  onClick={() => setOrderTemp(temp)}
                                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                    orderTemp === temp
                                      ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                                      : 'bg-black/30 border-white/5 text-slate-400'
                                  }`}
                                >
                                  {temp}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] text-slate-400 font-medium">Sweetness Level</label>
                            <div className="grid grid-cols-4 gap-1">
                              {['25%', '50%', '75%', '100%'].map(lvl => (
                                <button
                                  key={lvl}
                                  onClick={() => setOrderSweetness(lvl)}
                                  className={`py-1.5 px-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                    orderSweetness === lvl
                                      ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                                      : 'bg-black/30 border-white/5 text-slate-400'
                                  }`}
                                >
                                  {lvl}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Milks, Add-ons & Fulfillment */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <button
                            onClick={() => setOrderMilk(orderMilk.includes('Oat') ? 'Dairy Milk' : 'Oat Milk (+₱35)')}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              orderMilk.includes('Oat')
                                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                                : 'bg-black/30 border-white/5 text-slate-400'
                            }`}
                          >
                            <span>Oat Milk Alternative</span>
                            <span className="font-mono text-[11px] font-bold">+₱35</span>
                          </button>

                          <button
                            onClick={() => setOrderExtraShot(prev => !prev)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              orderExtraShot
                                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                                : 'bg-black/30 border-white/5 text-slate-400'
                            }`}
                          >
                            <span>Extra Espresso Shot</span>
                            <span className="font-mono text-[11px] font-bold">+₱30</span>
                          </button>
                        </div>

                        {/* Order Summary & Checkout Bar */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/50 p-3.5 rounded-xl border border-white/5">
                          <div>
                            <div className="text-[11px] text-slate-400">
                              Item: ₱{itemSubtotal} • Delivery: {deliveryFee === 0 ? 'FREE' : `₱${deliveryFee}`}
                            </div>
                            <div className="text-lg font-bold text-white font-mono">
                              Total: ₱{currentGrandTotal}.00
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
                              <button
                                onClick={() => setOrderFulfillment('Delivery')}
                                className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                                  orderFulfillment === 'Delivery' ? 'bg-amber-600 text-white' : 'text-slate-400'
                                }`}
                              >
                                Delivery
                              </button>
                              <button
                                onClick={() => setOrderFulfillment('Pickup')}
                                className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                                  orderFulfillment === 'Pickup' ? 'bg-amber-600 text-white' : 'text-slate-400'
                                }`}
                              >
                                Pickup
                              </button>
                            </div>

                            <button
                              onClick={handlePlaceOnlineOrder}
                              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow cursor-pointer flex items-center gap-1.5"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Place Online Order</span>
                            </button>
                          </div>
                        </div>

                        {orderSuccessMsg && (
                          <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>{orderSuccessMsg}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* SUBTAB 2: SALES MONITORING & LIVE BARISTA KDS */}
                    {iluvkeyksSubTab === 'sales' && (
                      <div className="space-y-4 bg-white/[0.02] p-4 sm:p-5 rounded-2xl border border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-300">
                            Real-Time Sales & Barista Kitchen Display
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Live POS & KDS Synced
                          </span>
                        </div>

                        {/* Top Sales Metric Overview */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <div className="text-[10px] text-slate-400 uppercase">Today's Gross Sales</div>
                            <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                              ₱{todayRevenue.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-emerald-400/80">+18.4% vs prev week</div>
                          </div>

                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <div className="text-[10px] text-slate-400 uppercase">Orders Processed</div>
                            <div className="text-base sm:text-lg font-bold text-white font-mono">
                              {todayOrdersCount} Orders
                            </div>
                            <div className="text-[10px] text-slate-400">Zero dropped tickets</div>
                          </div>

                          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                            <div className="text-[10px] text-slate-400 uppercase">Avg Order Value (AOV)</div>
                            <div className="text-base sm:text-lg font-bold text-amber-300 font-mono">
                              ₱{(todayRevenue / todayOrdersCount).toFixed(0)}
                            </div>
                            <div className="text-[10px] text-slate-400">62% GCash • 21% Maya</div>
                          </div>
                        </div>

                        {/* Active Barista Ticket Stepper */}
                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white font-semibold flex items-center gap-1.5">
                              <Coffee className="w-3.5 h-3.5 text-amber-400" />
                              Active Ticket {kdsOrders[0].id} ({kdsOrders[0].customer})
                            </span>
                            <span className="text-xs font-mono text-amber-400 font-semibold">{kdsTimer}</span>
                          </div>

                          <div className="text-xs text-slate-300">
                            {kdsOrders[0].items} • <span className="text-amber-400 font-mono font-bold">₱{kdsOrders[0].total}</span> ({kdsOrders[0].channel})
                          </div>

                          {/* 4-Step Pipeline */}
                          <div className="grid grid-cols-4 gap-1 pt-1">
                            {kdsStatusLabels.map((step, idx) => (
                              <div
                                key={step}
                                className={`p-2 rounded-lg text-center text-[10px] font-semibold border transition-all ${
                                  kdsStatus >= idx
                                    ? 'bg-amber-600/20 border-amber-500/40 text-amber-300'
                                    : 'bg-white/[0.02] border-white/5 text-slate-500'
                                }`}
                              >
                                <div className="font-mono text-[9px] opacity-70">0{idx + 1}</div>
                                <div className="truncate">{step}</div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">Barista Station: Espresso Bar #1</span>
                            <button
                              onClick={advanceKdsOrder}
                              className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow cursor-pointer flex items-center gap-1"
                            >
                              <Zap className="w-3.5 h-3.5" />
                              <span>Advance Ticket Status &rarr;</span>
                            </button>
                          </div>
                        </div>

                        {/* Recent Order Stream */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase">Recent Incoming Orders</div>
                          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                            {kdsOrders.map((ord, i) => (
                              <div key={i} className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-mono font-bold text-white mr-2">{ord.id}</span>
                                  <span className="text-slate-300">{ord.customer}</span>
                                  <span className="text-slate-500 text-[10px] ml-2">({ord.channel})</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono">
                                  <span className="text-slate-400">₱{ord.total}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-amber-300 border border-white/10">
                                    {ord.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUBTAB 3: OWNER DAILY STAFF INVENTORY & STOCK STATUS MONITOR */}
                    {iluvkeyksSubTab === 'inventory' && (
                      <div className="space-y-4 bg-white/[0.02] p-4 sm:p-5 rounded-2xl border border-white/5">
                        
                        {/* Header & Status Badges */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">
                                Store Owner Daily Staff Stock Audit
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
                                Shift Audit Oversight
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Inventory is tracked via daily staff physical counts, alerting the owner to low and critical supplies.
                            </p>
                          </div>

                          {/* Quick Status Count Badges */}
                          <div className="flex items-center gap-1.5 text-[11px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                              {inventoryItems.filter(i => i.status === 'critical').length} Critical
                            </span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                              {inventoryItems.filter(i => i.status === 'low').length} Low
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                              {inventoryItems.filter(i => i.status === 'normal').length} Normal
                            </span>
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            {(['all', 'critical', 'low', 'normal'] as const).map((filterKey) => (
                              <button
                                key={filterKey}
                                onClick={() => setInventoryStatusFilter(filterKey)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer capitalize ${
                                  inventoryStatusFilter === filterKey
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                    : 'text-slate-400 hover:text-white bg-black/30'
                                }`}
                              >
                                {filterKey === 'all' ? 'All Items' : filterKey}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleSimulateStaffCount}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-[11px] font-medium border border-white/10 transition-all cursor-pointer flex items-center gap-1"
                              title="Simulate daily shift physical count submitted by barista staff"
                            >
                              <ClipboardCheck className="w-3 h-3 text-cyan-400" />
                              <span>Log Staff Shift Count</span>
                            </button>
                            <button
                              onClick={handleOwnerRestockPO}
                              className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold transition-all shadow cursor-pointer flex items-center gap-1"
                              title="Owner approves supplier PO replenishment for low/critical items"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Owner Restock PO</span>
                            </button>
                          </div>
                        </div>

                        {/* Inventory Items Grid with Status Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                          {inventoryItems
                            .filter(item => inventoryStatusFilter === 'all' ? true : item.status === inventoryStatusFilter)
                            .map((item) => {
                              const isCritical = item.status === 'critical';
                              const isLow = item.status === 'low';
                              const isNormal = item.status === 'normal';

                              return (
                                <div
                                  key={item.id}
                                  className={`p-3 rounded-xl border transition-all ${
                                    isCritical
                                      ? 'bg-rose-950/20 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                                      : isLow
                                      ? 'bg-amber-950/20 border-amber-500/40'
                                      : 'bg-black/40 border-white/5'
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-1">
                                    <div>
                                      <div className="text-[10px] text-slate-400 uppercase font-semibold">{item.category}</div>
                                      <div className="text-xs font-bold text-white mt-0.5 truncate">{item.name}</div>
                                    </div>
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                                        isCritical
                                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                          : isLow
                                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                      }`}
                                    >
                                      {isCritical && <AlertTriangle className="w-2.5 h-2.5" />}
                                      {isLow && <AlertCircle className="w-2.5 h-2.5" />}
                                      {isNormal && <CheckCircle2 className="w-2.5 h-2.5" />}
                                      <span>{item.status}</span>
                                    </span>
                                  </div>

                                  <div className="mt-2.5 flex items-baseline justify-between border-t border-white/5 pt-2">
                                    <div>
                                      <div className="text-[10px] text-slate-400">Staff Physical Count</div>
                                      <div className={`text-base font-extrabold font-mono ${
                                        isCritical ? 'text-rose-400' : isLow ? 'text-amber-300' : 'text-emerald-400'
                                      }`}>
                                        {item.currentStock} {item.unit}
                                      </div>
                                    </div>
                                    <div className="text-right text-[10px] text-slate-400 font-mono leading-tight">
                                      <div>Low: &le;{item.lowThreshold} {item.unit}</div>
                                      <div className="text-rose-400/90">Crit: &le;{item.criticalThreshold} {item.unit}</div>
                                    </div>
                                  </div>

                                  <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-white/5 pt-1.5">
                                    <span className="truncate">{item.lastCountedBy}</span>
                                    <span className="font-mono text-slate-400 shrink-0">{item.lastCountedShift.split(' (')[0]}</span>
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        {/* Recent Staff Shift Audit Log Stream */}
                        <div className="space-y-2 bg-black/40 p-3 rounded-xl border border-white/5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                              <ClipboardCheck className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Daily Staff Physical Inventory Logs</span>
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">Shift Reconciliation Log</span>
                          </div>

                          <div className="space-y-1.5 font-mono text-[11px]">
                            {staffAuditLogs.map((log, lIdx) => (
                              <div key={lIdx} className="p-1.5 rounded bg-black/50 border border-white/5 text-slate-300 flex items-center justify-between">
                                <span className="truncate">{log}</span>
                                <span className="text-[10px] text-cyan-400 shrink-0 ml-2 font-semibold">Logged</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {inventoryRestockedNotice && (
                          <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span>{inventoryRestockedNotice}</span>
                          </div>
                        )}

                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                          <span>
                            Owner Alert Rule: Critical stock (&le;threshold) triggers instant alert to owner.
                          </span>
                          <span className="text-cyan-400 font-mono">Status: Synced with Store POS</span>
                        </div>

                      </div>
                    )}
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

              {/* Right Column: Case Study, Architectural Solution & Testimonial */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  
                  {/* Challenge & Solution */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                        The Operational Bottleneck
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
          )}

        </div>

      </div>
    </section>
  );
};
