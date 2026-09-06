import { ClientProject } from '../types';

export const CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'hydra',
    name: 'Hydra Water Refilling Station',
    subdomain: 'hydra.ordersphere.app',
    fullUrl: 'https://hydra.ordersphere.app',
    badge: 'Water Refilling & Delivery Logistics',
    industry: 'Water Station Operations, Route Logistics & POS',
    summary: 'Complete water refilling station operations platform with rider route dispatch, 5-gallon container balance ledger, recurring auto-refill subscriptions, loyalty redemptions, and station POS.',
    heroHeadline: 'Water Refilling Station Operations, Gallon Ledger & Rider Dispatch',
    stats: [
      { label: 'Active Delivery Households', value: '4,850+', detail: 'Weekly & bi-weekly automated dispatch' },
      { label: 'Gallon Containers Tracked', value: '18,400', detail: 'Round & slim 5-gal ledger with deposit sync' },
      { label: 'Average Dispatch Velocity', value: '< 18 mins', detail: 'Live rider status & localized route batching' },
      { label: 'Counter POS Reconciliation', value: '100% Synced', detail: 'Daily cash drawer, bottle deposits & refills' }
    ],
    challenge: 'Hydra struggled with manual paper logbooks, leading to untracked 5-gallon loaner containers, chaotic delivery driver routes, uncollected bottle deposits, and missed recurring household refill schedules.',
    solution: 'Ordersphere engineered a specialized Water Refilling Station platform featuring real-time rider dispatch (Pending → Accepted → In Transit → Completed), an automated 5-gallon container deposit ledger, recurring delivery subscriptions, and station counter POS reconciliation.',
    techHighlights: [
      'Real-Time Rider Dispatch & Route Status Machine (Pending to Completed)',
      '5-Gallon Slim & Round Container Balance Ledger with Deposit Accounting',
      'Automated Refill Cadence Subscriptions with SMS Route Alerts',
      'Unified Counter POS & End-of-Day Cash Drawer Settlement',
      'Water Station Filtration & Quality Telemetry (TDS Sensor & UV Sterilization)'
    ],
    colorAccent: {
      primary: 'from-blue-500 to-cyan-400',
      glow: 'rgba(14, 99, 196, 0.25)',
      border: 'border-blue-500/40',
      badgeBg: 'bg-blue-950/80',
      badgeText: 'text-blue-300'
    },
    liveDemoFeatures: [
      {
        title: 'Rider Route Dispatcher',
        description: 'Simulates dispatching delivery riders and transitioning orders from Pending to Delivered.'
      },
      {
        title: 'Gallon Container Balance Ledger',
        description: 'Tracks loaned vs returned 5-gallon containers and computes bottle deposits in real time.'
      },
      {
        title: 'Station Filtration Telemetry',
        description: 'Live sensor monitoring of TDS levels, UV sterilizer status, and daily gallons dispensed.'
      }
    ],
    testimonial: {
      quote: "Before Ordersphere, we were losing hundreds of 5-gallon water bottles every quarter and delivery riders were crossing paths inefficiently. Ordersphere's water station manager automated our entire route dispatch, container deposits, and daily counter balancing. It completely transformed our business operations.",
      author: 'Ramon De La Cruz',
      role: 'Operations Director, Hydra Water Refilling Station',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'iluvkeyks',
    name: 'iLuvKeyks Coffee and Tea',
    subdomain: 'iluvkeyks.ordersphere.app',
    fullUrl: 'https://iluvkeyks.ordersphere.app',
    badge: 'Online Ordering, Sales Monitoring & Stock Status Audit',
    industry: 'Coffee, Tea & Tub Cakes | Cafe & Bakery Operations',
    summary: 'All-in-one digital ordering and operations platform: customer online ordering with drink & meal customization and delivery logistics, real-time barista sales monitoring & KDS queue, and an owner dashboard to monitor daily staff inventory counts and low/critical stock levels.',
    heroHeadline: 'Online Ordering App, Real-Time Sales Monitoring & Owner Stock Audit',
    stats: [
      { label: 'Monthly Orders Placed', value: '24,600+', detail: 'Coffee, tea, tub cakes & rice meals' },
      { label: 'Sales Monitoring Sync', value: 'Real-Time', detail: 'Live barista KDS & revenue analytics' },
      { label: 'Staff Audit Accuracy', value: '100%', detail: 'Daily shift counts & critical stock alerts' },
      { label: 'Online Order Growth', value: '+68%', detail: 'Direct delivery with ₱49 flat / free >₱500' }
    ],
    challenge: 'Managing busy cafe walk-ins while handling online orders caused staff friction and drink delays, while the owner lacked visibility over daily staff physical inventory counts—resulting in surprise low-stock and critical stockouts during peak shifts.',
    solution: 'Ordersphere engineered a unified solution for iLuvKeyks: a customer online ordering portal with flexible drink/food modifiers, a real-time sales monitoring dashboard with live barista KDS tickets, and an owner inventory module where staff submit daily shift counts, instantly alerting the owner when supplies reach low or critical thresholds.',
    techHighlights: [
      'Customer Online Ordering Portal with Pickup & Doorstep Delivery',
      'Rich Modifier Matrix (Temperature, Sweetness, Ice, Milk Alternatives, Add-ons)',
      'Real-Time Sales Monitoring, Revenue Analytics & Live Barista Order KDS',
      'Owner Stock Audit Dashboard: Daily Staff Shift Counts & Low/Critical Warning Engine',
      'Role-Based Staff Access (Store Owner, Operations Manager, Shift Lead Barista)'
    ],
    colorAccent: {
      primary: 'from-amber-500 to-orange-500',
      glow: 'rgba(245, 158, 11, 0.25)',
      border: 'border-amber-500/40',
      badgeBg: 'bg-amber-950/80',
      badgeText: 'text-amber-300'
    },
    liveDemoFeatures: [
      {
        title: 'Online Ordering & Modifiers',
        description: 'Configure drink temperatures, sweetness levels, ice, alternative milks, and signature tub cakes.'
      },
      {
        title: 'Real-Time Sales Monitoring',
        description: 'Track live orders, barista prep statuses, average order value, and daily gross revenue.'
      },
      {
        title: 'Owner Daily Stock Monitor',
        description: 'Audit daily staff physical counts and proactively track items flagged as Normal, Low, or Critical.'
      }
    ],
    testimonial: {
      quote: "Ordersphere gave iLuvKeyks the exact operational clarity we needed: customers order their favorite coffee, tea, tub cakes, and rice meals online with tailored sweetness and ice, while I as the owner can monitor live sales and review daily staff inventory counts at a glance. Seeing low and critical stock warnings ahead of time eliminated surprise stockouts completely.",
      author: 'Store Owner & Operations Team',
      role: 'iLuvKeyks Coffee and Tea',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
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
    a: 'Absolutely! While every client receives a dedicated cloud tenant on our secure network (like hydra.ordersphere.app or iluvkeyks.ordersphere.app), you can easily attach your primary domain (e.g., yourbrand.com) with automated SSL provisioning, DNS routing, and global edge acceleration.'
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
