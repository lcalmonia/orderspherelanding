import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientShowcase } from './components/ClientShowcase';
import { PartnerProgram } from './components/PartnerProgram';
import { ArchitectureSection } from './components/ArchitectureSection';
import { RoiCalculator } from './components/RoiCalculator';
import { PartnerInquiryFormLive } from './components/PartnerInquiryFormLive';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LiveClientModal } from './components/LiveClientModal';
import { CLIENT_PROJECTS } from './data/clients';
import { ClientProject } from './types';

export default function App() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);
  const [selectedModalClient, setSelectedModalClient] = useState<ClientProject | null>(null);
  const [calcMonthlyOrders, setCalcMonthlyOrders] = useState<number>(3500);
  const [calcEstimatedGains, setCalcEstimatedGains] = useState<number | undefined>(undefined);

  const handleOpenPartnerModal = () => setIsPartnerModalOpen(true);
  const handleOpenClientModal = (client: ClientProject) => setSelectedModalClient(client);
  const handleSelectClientById = (clientId: string) => {
    const found = CLIENT_PROJECTS.find(c => c.id === clientId);
    if (found) setSelectedModalClient(found);
  };
  const handleApplyWithMetrics = (orders: number, revenueEstimate: number) => {
    setCalcMonthlyOrders(orders);
    setCalcEstimatedGains(revenueEstimate);
    setIsPartnerModalOpen(true);
  };
  const scrollToClients = () => document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#020408] text-[#E2E8F0] flex flex-col selection:bg-blue-600 selection:text-white relative font-sans">
      <Navbar onOpenPartnerModal={handleOpenPartnerModal} />
      <main className="flex-1">
        <Hero onOpenPartnerModal={handleOpenPartnerModal} onExploreClients={scrollToClients} onSelectClient={handleSelectClientById} />
        <ClientShowcase onOpenLiveModal={handleOpenClientModal} onOpenPartnerModal={handleOpenPartnerModal} />
        <PartnerProgram onOpenPartnerModal={handleOpenPartnerModal} />
        <ArchitectureSection />
        <RoiCalculator onApplyWithMetrics={handleApplyWithMetrics} />
        <section id="contact" className="py-24 bg-[#020408] relative border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PartnerInquiryFormLive initialMonthlyOrders={calcMonthlyOrders} initialEstimatedGains={calcEstimatedGains} />
          </div>
        </section>
        <FaqSection onOpenPartnerModal={handleOpenPartnerModal} />
      </main>
      <Footer onOpenPartnerModal={handleOpenPartnerModal} />
      {selectedModalClient && <LiveClientModal client={selectedModalClient} onClose={() => setSelectedModalClient(null)} onOpenPartnerModal={() => { setSelectedModalClient(null); setIsPartnerModalOpen(true); }} />}
      {isPartnerModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020408]/90 backdrop-blur-xl animate-fadeIn"><PartnerInquiryFormLive isModal initialMonthlyOrders={calcMonthlyOrders} initialEstimatedGains={calcEstimatedGains} onClose={() => setIsPartnerModalOpen(false)} /></div>}
    </div>
  );
}
