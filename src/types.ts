export interface ClientProject {
  id: string;
  name: string;
  subdomain: string;
  fullUrl: string;
  badge: string;
  industry: string;
  summary: string;
  heroHeadline: string;
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
  challenge: string;
  solution: string;
  techHighlights: string[];
  colorAccent: {
    primary: string;
    glow: string;
    border: string;
    badgeBg: string;
    badgeText: string;
  };
  liveDemoFeatures: {
    title: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

export interface PartnerPathway {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  idealFor: string;
  benefits: string[];
  deliverables: string[];
  ctaText: string;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  iconName: string;
  description: string;
  techDetails: string[];
  metrics: string;
}

export interface PartnerApplicationData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  currentWebsite?: string;
  partnershipType: string;
  currentMonthlyOrders: string;
  primaryGoal: string;
  notes?: string;
}
