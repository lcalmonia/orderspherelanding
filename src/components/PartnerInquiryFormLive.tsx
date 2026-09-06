import React, { useEffect, useState } from 'react';
import { Building2, Send, CheckCircle2, ShieldCheck, Calendar, User, Mail, Phone, Globe, Sparkles, X, Clock } from 'lucide-react';

interface Props {
  initialMonthlyOrders?: number;
  initialEstimatedGains?: number;
  onClose?: () => void;
  isModal?: boolean;
}

export const PartnerInquiryFormLive: React.FC<Props> = ({ initialMonthlyOrders = 3500, onClose, isModal = false }) => {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [partnershipType, setPartnershipType] = useState('retail-to-online');
  const [monthlyOrders, setMonthlyOrders] = useState('');
  const [launchWindow, setLaunchWindow] = useState('Immediate (Next 30 Days)');
  const [goals, setGoals] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMonthlyOrders(initialMonthlyOrders >= 25000 ? 'Enterprise (25,000+ orders/mo)' : initialMonthlyOrders >= 5000 ? 'High-Volume (5,000 - 25,000 orders/mo)' : initialMonthlyOrders >= 500 ? 'Scaling (500 - 5,000 orders/mo)' : 'New Launch (0 - 500 orders/mo)');
  }, [initialMonthlyOrders]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/partner-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, contactName, email, phone, website, partnershipType, monthlyOrders, launchWindow, goals, honeypot: honeypot ? '__HONEYPOT__' : '' })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to submit your application. Please try again.');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <div className={`${isModal ? 'w-full max-w-2xl bg-[#020408] border border-white/10 rounded-3xl p-8 shadow-2xl' : 'w-full rounded-3xl bg-white/[0.02] border border-white/10 p-8 shadow-2xl'} text-center space-y-6`}>
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto"><CheckCircle2 className="w-8 h-8" /></div>
      <div className="space-y-2"><h3 className="text-2xl font-bold text-white">Partnership Application Received!</h3><p className="text-sm text-slate-400 max-w-md mx-auto">Thank you, <span className="text-white font-semibold">{contactName}</span>. Your application for <span className="text-blue-400 font-semibold">{businessName}</span> has been securely received.</p></div>
      <div className="p-5 rounded-2xl bg-[#020408] border border-white/10 text-left space-y-3 max-w-md mx-auto text-xs">
        <div className="font-semibold text-white uppercase tracking-wider flex items-center justify-between border-b border-white/10 pb-2 font-mono"><span>Next Steps</span><span className="text-emerald-400">Status: New</span></div>
        <div className="flex items-start gap-2.5 text-slate-300"><Clock className="w-4 h-4 text-blue-400 shrink-0" /><span>Our team will review your application and contact you using the email and phone number provided.</span></div>
        <div className="flex items-start gap-2.5 text-slate-300"><Calendar className="w-4 h-4 text-cyan-400 shrink-0" /><span>We will coordinate the architecture review and scheduling after initial assessment.</span></div>
      </div>
      <button onClick={() => { if (isModal && onClose) onClose(); else setSubmitted(false); }} className="px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold text-xs">{isModal ? 'Return to Showcase' : 'Submit Another Inquiry'}</button>
    </div>;
  }

  return <div className={`relative ${isModal ? 'w-full max-w-2xl bg-[#020408] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]' : 'w-full rounded-3xl bg-white/[0.02] border border-white/10 p-8 shadow-2xl'}`}>
    {isModal && onClose && <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white" aria-label="Close modal"><X className="w-5 h-5" /></button>}
    <div className="space-y-6">
      <div className="space-y-2"><div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400"><Sparkles className="w-3.5 h-3.5" />Partner Application & Digital Audit</div><h3 className="text-2xl sm:text-3xl font-bold text-white">Let's Scale Your Digital Infrastructure</h3><p className="text-xs sm:text-sm text-slate-400">Complete this form to initiate a confidential architecture review. Your application is securely stored for our team.</p></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={<Building2 className="w-3.5 h-3.5 text-blue-400" />} label="Business or Brand Name *"><input required value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="e.g. Apex Artisans" className={input} /></Field>
          <Field icon={<User className="w-3.5 h-3.5 text-blue-400" />} label="Contact Person & Title *"><input required value={contactName} onChange={e => setContactName(e.target.value)} placeholder="e.g. Sarah Lin, Owner" className={input} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={<Mail className="w-3.5 h-3.5 text-blue-400" />} label="Work Email *"><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" className={input} /></Field>
          <Field icon={<Phone className="w-3.5 h-3.5 text-blue-400" />} label="Phone Number"><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="09xx xxx xxxx" className={input} /></Field>
        </div>
        <Field icon={<Globe className="w-3.5 h-3.5 text-blue-400" />} label="Current Website / Instagram / Location"><input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://yourbrand.com or @yourbrand" className={input} /></Field>
        <div className="space-y-1.5"><label className="text-xs font-semibold text-slate-300">Preferred Partnership Track *</label><div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{[['retail-to-online','Retail-to-Online','Bring physical store online'],['enterprise-scale','Enterprise Scale','Headless migration & speed'],['strategic-alliance','Strategic Co-Venture','Aligned revenue share']].map(([id,title,sub]) => <button key={id} type="button" onClick={() => setPartnershipType(id)} className={`p-3 rounded-xl border text-xs text-left ${partnershipType === id ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-white/[0.02] border-white/10 text-slate-400'}`}><div className="font-bold">{title}</div><div className="text-[10px] text-slate-400 mt-0.5">{sub}</div></button>)}</div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Field label="Current Monthly Orders / Customers"><select value={monthlyOrders} onChange={e => setMonthlyOrders(e.target.value)} className={input}><option>New Launch (0 - 500 orders/mo)</option><option>Scaling (500 - 5,000 orders/mo)</option><option>High-Volume (5,000 - 25,000 orders/mo)</option><option>Enterprise (25,000+ orders/mo)</option></select></Field><Field label="Target Launch Window"><select value={launchWindow} onChange={e => setLaunchWindow(e.target.value)} className={input}><option>Immediate (Next 30 Days)</option><option>Q3 2026 Cohort</option><option>Q4 Holiday Preparation</option><option>Exploring Feasibility</option></select></Field></div>
        <Field label="What custom workflows or infrastructure do you need built?"><textarea required rows={3} value={goals} onChange={e => setGoals(e.target.value)} placeholder="e.g. POS sync, online ordering, delivery, inventory, subscriptions..." className={input} /></Field>
        <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />
        {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">{error}</div>}
        <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2">{isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting securely...</> : <><Send className="w-4 h-4" />Submit Partner Application & Book Architecture Review</>}</button>
        <div className="flex items-center justify-between text-[11px] text-slate-400"><div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />NDA & Confidentiality</div><span>Response SLA: Within 12 Hours</span></div>
      </form>
    </div>
  </div>;
};

const input = 'w-full bg-[#020408] border border-white/10 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none';
const Field: React.FC<{ label: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ label, icon, children }) => <div className="space-y-1.5"><label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">{icon}{label}</label>{children}</div>;
