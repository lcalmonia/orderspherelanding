import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Sparkles,
  X,
  Clock,
  Download
} from 'lucide-react';

interface PartnerInquiryFormProps {
  initialMonthlyOrders?: number;
  initialEstimatedGains?: number;
  onClose?: () => void;
  isModal?: boolean;
}

export const PartnerInquiryForm: React.FC<PartnerInquiryFormProps> = ({
  initialMonthlyOrders = 3500,
  initialEstimatedGains,
  onClose,
  isModal = false
}) => {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [isOfflineOnly, setIsOfflineOnly] = useState(false);
  const [partnershipType, setPartnershipType] = useState('retail-to-online');
  const [monthlyOrders, setMonthlyOrders] = useState(`${initialMonthlyOrders.toLocaleString()} orders/month`);
  const [goals, setGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialMonthlyOrders) {
      setMonthlyOrders(`${initialMonthlyOrders.toLocaleString()} orders/month`);
    }
  }, [initialMonthlyOrders]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate enterprise intake API processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className={`relative ${isModal ? 'w-full max-w-2xl bg-[#020408] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]' : 'w-full rounded-3xl bg-white/[0.02] border border-white/10 p-8 shadow-2xl'}`}>
      
      {/* Close button if rendered in modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {!isSubmitted ? (
        <div className="space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner Application & Digital Audit</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
              Let's Scale Your Digital Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We are actively vetting forward-thinking retail brands, regional producers, and e-commerce enterprises looking to partner with Ordersphere. Complete this form to initiate a confidential architecture review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Row 1: Business Name & Contact Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Business or Brand Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Artisans or Velvet & Vine"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Contact Person & Title *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Lin, Managing Director"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Work Email *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Current Website or Offline Checkbox */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Current Website / Instagram / Location</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-blue-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOfflineOnly}
                    onChange={(e) => {
                      setIsOfflineOnly(e.target.checked);
                      if (e.target.checked) setWebsite('Physical Store Only');
                    }}
                    className="rounded accent-blue-500"
                  />
                  <span>Physical Store Only (No Website Yet)</span>
                </label>
              </div>
              <input
                type="text"
                disabled={isOfflineOnly}
                placeholder="https://yourbrand.com or @yourbrand"
                value={isOfflineOnly ? 'Physical Brick & Mortar Only' : website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors disabled:opacity-60"
              />
            </div>

            {/* Row 4: Partnership Model Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Preferred Partnership Track *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPartnershipType('retail-to-online')}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    partnershipType === 'retail-to-online'
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Retail-to-Online</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Bring physical store online</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPartnershipType('enterprise-scale')}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    partnershipType === 'enterprise-scale'
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Enterprise Scale</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Headless migration & speed</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPartnershipType('strategic-alliance')}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    partnershipType === 'strategic-alliance'
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Strategic Co-Venture</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Aligned revenue share</div>
                </button>
              </div>
            </div>

            {/* Row 5: Current Monthly Volume & Key Objectives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Current Monthly Orders / Customers
                </label>
                <select
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(e.target.value)}
                  className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="New Launch (0 - 500 orders/mo)">New Launch (0 - 500 orders/mo)</option>
                  <option value="Scaling (500 - 5,000 orders/mo)">Scaling (500 - 5,000 orders/mo)</option>
                  <option value="High-Volume (5,000 - 25,000 orders/mo)">High-Volume (5,000 - 25,000 orders/mo)</option>
                  <option value="Enterprise (25,000+ orders/mo)">Enterprise (25,000+ orders/mo)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Target Launch Window
                </label>
                <select className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none">
                  <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                  <option value="Q3 2026 Cohort">Q3 2026 Cohort</option>
                  <option value="Q4 Holiday Preparation">Q4 Holiday Preparation</option>
                  <option value="Exploring Feasibility">Exploring Feasibility</option>
                </select>
              </div>
            </div>

            {/* Row 6: Operational challenges */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                What custom workflows or infrastructure do you need built?
              </label>
              <textarea
                rows={3}
                placeholder="e.g. POS register sync with physical warehouse, automated subscription reorders, custom product configurator, high-speed mobile checkout..."
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              ></textarea>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing Partner Readiness...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Partner Application & Book Architecture Review</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NDA & Confidentiality Guaranteed</span>
              </div>
              <span>Response SLA: Within 12 Hours</span>
            </div>

          </form>

        </div>
      ) : (
        /* Confirmed submission card */
        <div className="text-center py-8 px-4 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-sans">
              Partnership Application Received!
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{contactName}</span>. Your application for <span className="text-blue-400 font-semibold">{businessName || 'your brand'}</span> has been routed to our Lead Solutions Architect.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#020408] border border-white/10 text-left space-y-3 max-w-md mx-auto text-xs">
            <div className="font-semibold text-white uppercase tracking-wider flex items-center justify-between border-b border-white/10 pb-2 font-mono">
              <span>Next Steps & Scheduling</span>
              <span className="text-emerald-400">Status: In Review</span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-300">
              <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>We will email your preliminary architecture proposal to <strong className="text-white">{email}</strong> within 12 hours.</span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-300">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Direct calendar invite will include live demo sandboxes of <strong className="text-white">hydra.ordersphere.app</strong> and <strong className="text-white">iluvkeyks.ordersphere.app</strong>.</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                if (isModal && onClose) onClose();
                else setIsSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              {isModal ? 'Return to Showcase' : 'Submit Another Inquiry'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
