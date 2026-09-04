import { ClientProject } from '../types';

export const CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'hydrapure',
    name: 'HydraPure Systems',
    subdomain: 'hydrapure.ordersphere.app',
    fullUrl: 'https://hydrapure.ordersphere.app',
    badge: 'IoT & Bio-Hydration Tech',
    industry: 'Health, Wellness & Clean Tech',
    summary: 'Custom high-frequency subscription engine, IoT telemetry filter replenishment, and automated multi-warehouse temperature-monitored distribution.',
    heroHeadline: 'Automated Mineralized Water Delivery with Intelligent Cartridge Telemetry',
    stats: [
      { label: 'Active Subscribers', value: '48,500+', detail: 'Auto-billed & dispatched monthly' },
      { label: 'Checkout Latency', value: '82ms', detail: 'Edge-rendered global cart checkout' },
      { label: 'Renewal Retention', value: '94.2%', detail: 'Predictive filter life cycle cadence' },
      { label: 'Carrier Dispatch', value: '100% Automated', detail: 'Zero-touch API fulfillment routing' }
    ],
    challenge: 'HydraPure operated on standard off-the-shelf software that failed to handle custom IoT smart-filter usage signals, dynamic scheduled deliveries, and multi-tier B2B corporate office bulk refills.',
    solution: 'Ordersphere engineered a bespoke headless architecture paired with an IoT webhook consumer that computes individual household mineral cartridge exhaustion in real-time, auto-generating replenishment dispatches before the customer ever runs low.',
    techHighlights: [
      'Smart Usage Telemetry Webhook Ingestion Engine',
      'Dynamic Automated Reorder Scheduling with 1-Click SMS Rescheduling',
      'Multi-Warehouse Geo-routing across 6 regional fulfillment hubs',
      'Wholesale & Corporate Office Portal with Tiered Net-30 Invoicing'
    ],
    colorAccent: {
      primary: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.25)',
      border: 'border-cyan-500/40',
      badgeBg: 'bg-cyan-950/80',
      badgeText: 'text-cyan-300'
    },
    liveDemoFeatures: [
      {
        title: 'Smart Cartridge Health Monitor',
        description: 'Simulates live household filter lifespan and triggers automated replenishment.'
      },
      {
        title: 'Flexible Cadence Subscription Control',
        description: 'Allows buyers to pause, swap mineral formulas, or gift shipments in 2 taps.'
      },
      {
        title: 'Cold-Chain Delivery Tracker',
        description: 'End-to-end GPS and temperature logs from regional depot to doorstep.'
      }
    ],
    testimonial: {
      quote: "Before partnering with Ordersphere, scaling past 5,000 subscribers caused our previous platform to crash every first of the month. Ordersphere custom-built our infrastructure from the ground up. We now handle tens of thousands of automated orders without a single hiccup.",
      author: 'Dr. Marcus Vance',
      role: 'Co-Founder & Chief Operations Officer, HydraPure Systems',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'iluvkeyks',
    name: 'iLuvKeyks Artisanal Patisserie',
    subdomain: 'iluvkeyks.orderspher.app',
    fullUrl: 'https://iluvkeyks.orderspher.app',
    badge: 'Artisan Confections & Custom Bakery',
    industry: 'Specialty Food, Events & Gourmet Gifts',
    summary: 'Interactive 3D custom tiered cake customizer, real-time kitchen baking slot reservation, localized cold-courier dispatch, and live bakery counter POS synchronization.',
    heroHeadline: 'Bespoke Multi-Tier Celebration Cake Architecture & Kitchen Dispatch',
    stats: [
      { label: 'Custom Cake Orders', value: '18,200+', detail: 'Unique layer, flavor & piping orders' },
      { label: 'Production Capacity', value: '100% Synced', detail: 'Zero overbooking of kitchen oven slots' },
      { label: 'Mobile Conversion', value: '+52%', detail: 'Interactive touch-first 3D cake architect' },
      { label: 'In-Store POS Sync', value: 'Sub-second', detail: 'Unified ingredient & pastry stock balance' }
    ],
    challenge: 'Custom artisanal cakes require precise scheduling: maximum 12 wedding cakes per day, custom ingredient lead times (48-72h), and real-time validation of delivery distance to ensure fragile tiers do not melt in transit.',
    solution: 'Ordersphere designed a specialized visual cake builder coupled with an intelligent Kitchen Display System (KDS) and strict delivery radius geo-fence. Kitchen staff receive automated production manifests with exact assembly diagrams and pickup windows.',
    techHighlights: [
      'Interactive Multi-Tier Cake Builder with Instant Dynamic Pricing',
      'Oven-Capacity Slot Reservation Engine (Anti-Overbooking Algorithm)',
      'Precision Geo-Radius Delivery Dispatch with Fragile Goods Handling',
      'Dual-Way In-Store POS & Kitchen Display System (KDS) Synchronization'
    ],
    colorAccent: {
      primary: 'from-amber-400 to-rose-500',
      glow: 'rgba(244, 63, 94, 0.25)',
      border: 'border-rose-500/40',
      badgeBg: 'bg-rose-950/80',
      badgeText: 'text-rose-300'
    },
    liveDemoFeatures: [
      {
        title: 'Interactive Layer & Flavor Builder',
        description: 'Choose chiffon sponge, ganache fillings, exterior frosting finish, and bespoke toppers.'
      },
      {
        title: 'Baking Slot Calendar Engine',
        description: 'Real-time kitchen capacity heat map that reserves oven time and guarantees freshness.'
      },
      {
        title: 'Specialty Fragile Courier Routing',
        description: 'Automated dispatching to vetted climate-controlled courier partners.'
      }
    ],
    testimonial: {
      quote: "Our bakers used to spend four hours every morning responding to Instagram DMs and manually checking calendar slots. Ordersphere transformed iLuvKeyks into an effortless, scalable online bakery powerhouse. Our revenue tripled in 6 months.",
      author: 'Elena Rostova',
      role: 'Master Pastry Chef & Founder, iLuvKeyks Studio',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    }
  }
];

export const PARTNER_PATHWAYS = [
  {
    id: 'retail-to-online',
    title: 'Retail-to-Online Expansion',
    badge: 'Offline-to-Digital',
    subtitle: 'Take your physical retail storefront, wholesale workshop, or regional service into a borderless, 24/7 digital powerhouse.',
    idealFor: 'Brick-and-mortar boutiques, artisanal food producers, regional hardware, specialty apparel, and local brand owners looking to capture new online territories.',
    benefits: [
      'Zero-hassle onboarding: We build your custom cloud store from architecture to launch',
      'Real-time physical POS inventory sync (Square, Clover, Shopify POS, Lightspeed)',
      'Automated local pickup, regional courier delivery, and national shipping routes',
      'Modern, blazing fast mobile PWA experience that loads in under 400ms'
    ],
    deliverables: [
      'Dedicated tenant domain: yourbrand.ordersphere.app or your custom domain',
      'Customized checkout and instant payment gateway (Apple Pay, Google Pay, Cards, BNPL)',
      'Back-office merchant admin console for orders, inventory, and staff accounts',
      'Dedicated integration specialist and launch marketing analytics setup'
    ],
    ctaText: 'Launch Your Business Online'
  },
  {
    id: 'enterprise-scale',
    title: 'Enterprise Infrastructure Scaling',
    badge: 'High-Volume Scaling',
    subtitle: 'Outgrow rigid monolithic platforms with headless, distributed architecture engineered for massive traffic spikes and complex logistics.',
    idealFor: 'Growing e-commerce enterprises hitting performance bottlenecks, checkout timeouts during flash sales, or requiring multi-warehouse custom logic.',
    benefits: [
      'Handles 50,000+ simultaneous checkouts without latency drops or crashes',
      'Custom ERP, WMS, and 3PL fulfillment integrations built to your exact specifications',
      'Multi-currency, localized taxation, and international border clearance modules',
      '99.99% guaranteed enterprise uptime with 24/7 engineering pod support'
    ],
    deliverables: [
      'Complete headless microservices migration without customer data loss',
      'Sub-100ms globally distributed Edge API endpoints',
      'Custom event streaming for order routing and real-time inventory locking',
      'Automated reconciliation and enterprise finance audit exports'
    ],
    ctaText: 'Scale Your Infrastructure'
  },
  {
    id: 'strategic-alliance',
    title: 'Strategic Growth & Co-Venture',
    badge: 'Partner Alliance',
    subtitle: 'Align your business with Ordersphere as a technology partner with shared upside, continuous co-development, and dedicated engineering capacity.',
    idealFor: 'Ambitious brand founders, multi-location franchise operators, and venture-backed retail innovators seeking a permanent digital engineering arm.',
    benefits: [
      'No exorbitant upfront software agency fees; aligned revenue-share or venture pricing',
      'Dedicated full-stack engineering team assigned to your roadmap continuously',
      'Access to Ordersphere’s proprietary proprietary commerce libraries and AI algorithms',
      'Co-marketing and cross-promotion across the Ordersphere partner network'
    ],
    deliverables: [
      'Dedicated engineering sprint allocation every two weeks',
      'Custom feature ideation, A/B testing, and conversion rate optimization',
      'Bespoke mobile iOS/Android apps published directly under your brand',
      'Quarterly executive strategy and infrastructure roadmap reviews'
    ],
    ctaText: 'Inquire About Strategic Alliance'
  }
];

export const ARCHITECTURE_PILLARS = [
  {
    id: 'headless-edge',
    title: 'Distributed Headless Storefronts',
    subtitle: 'Sub-100ms global delivery on Edge CDNs',
    description: 'Bespoke React/PWA user interfaces decoupled from backend monoliths. Delivers instantaneous page transitions, dynamic cart manipulation, and offline-resilient local storage.',
    icon: 'Zap',
    specs: ['React 19 & Tailwind Engine', 'Edge SSR & Static Invalidation', 'Web Vitals: 99+ Performance', 'Native iOS/Android PWA ready']
  },
  {
    id: 'order-orchestrator',
    title: 'Event-Driven Order Orchestrator',
    subtitle: 'Zero-drop queue processing during peak flash sales',
    description: 'High-throughput transactional queue built with optimistic inventory locking, ensuring thousands of simultaneous buyers never purchase the same remaining unit.',
    icon: 'Cpu',
    specs: ['Atomic Stock Reservation', 'Distributed Idempotent Checkout', 'Multi-Payment Fallback Failover', 'Real-time Webhook Dispatcher']
  },
  {
    id: 'pos-inventory-sync',
    title: 'Omnichannel POS & Warehouse Bridge',
    subtitle: 'Bidirectional sync across physical registers & online hubs',
    description: 'Eliminates phantom inventory by synchronizing physical cash register transactions, warehouse shipments, and digital cart purchases in real-time.',
    icon: 'Layers',
    specs: ['Square, Clover, Lightspeed & Custom POS', 'Multi-Location Bin & Rack Tracking', 'Safety Stock Buffers', 'Automated Low-Stock PO Triggers']
  },
  {
    id: 'smart-logistics',
    title: 'Dynamic Geo-Fencing & Carrier Dispatch',
    subtitle: 'Automated least-cost, fastest-route fulfillment',
    description: 'Intelligent dispatch algorithm that assigns orders to the closest store location or regional 3PL depot, generating shipping labels and customer tracking automatically.',
    icon: 'Truck',
    specs: ['Automated Rate Shopping (FedEx, UPS, Local Couriers)', 'Fragile & Temperature Cold-Chain Routing', 'Curbside Pickup Scheduling', 'Live GPS Customer Notifications']
  }
];

export const FAQ_ITEMS = [
  {
    q: 'What is Ordersphere and how do you differ from Shopify or generic agencies?',
    a: 'Ordersphere is a specialized e-commerce software engineering firm and platform provider. Unlike rigid off-the-shelf platforms like Shopify or WooCommerce—which lock you into generic templates and charge recurring fees for hundreds of conflicting plugins—Ordersphere builds custom, scalable digital infrastructure tailored specifically to your business workflows. Plus, we provide the ongoing engineering partnership so you never have to hire an in-house software team.'
  },
  {
    q: 'Can we use our own custom domain like mybrand.com instead of .ordersphere.app?',
    a: 'Absolutely! While every client receives a dedicated cloud tenant on our secure network (like hydrapure.ordersphere.app or iluvkeyks.orderspher.app), you can easily attach your primary domain (e.g., yourbrand.com) with automated SSL provisioning, DNS routing, and global edge acceleration.'
  },
  {
    q: 'We are currently a physical retail store with no online presence. How quickly can we launch?',
    a: 'Our "Retail-to-Online" acceleration program is designed to take brick-and-mortar brands from zero to live e-commerce in as little as 2 to 4 weeks. We ingest your current product catalog, connect directly to your point-of-sale register, set up payment processing, and train your staff on fulfilling online orders.'
  },
  {
    q: 'How does Ordersphere handle massive traffic surges, Black Friday, or flash drops?',
    a: 'Our architecture uses decentralized edge compute, isolated tenant micro-databases, and asynchronous event queues. During viral TikTok surges or holiday drops, our systems auto-scale compute instances dynamically, maintaining sub-100ms response times and preventing checkout crashes.'
  },
  {
    q: 'What does a business partnership with Ordersphere entail?',
    a: 'We look for growth-focused brands with high potential. Depending on your business model, partnerships range from dedicated managed enterprise agreements to performance-aligned co-development where Ordersphere acts as your CTO and engineering division. We invest our technical capabilities into your brand’s long-term digital expansion.'
  }
];
