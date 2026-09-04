import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/clients';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onOpenPartnerModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenPartnerModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#020408] relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Partnership & Platform Questions
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Everything you need to know about partnering with Ordersphere, scaling your digital infrastructure, or transitioning your physical retail business online.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base font-semibold text-white font-sans">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 text-center space-y-3">
          <h4 className="text-base font-bold text-white font-sans">
            Have a custom operational requirement or question?
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Our principal solutions architects evaluate complex ERP, WMS, and physical POS constraints during confidential partner audits.
          </p>
          <button
            onClick={onOpenPartnerModal}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Speak With a Solutions Architect</span>
          </button>
        </div>

      </div>
    </section>
  );
};
