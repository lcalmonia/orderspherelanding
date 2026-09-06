import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientShowcase } from './components/ClientShowcase';
import { PartnerProgram } from './components/PartnerProgram';
import { ArchitectureSection } from './components/ArchitectureSection';
import { RoiCalculator } from './components/RoiCalculator';
import { PartnerInquiryForm } from './components/PartnerInquiryForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LiveClientModal } from './components/LiveClientModal';
import { CLIENT_PROJECTS } from './data/clients';
import { ClientProject } from './types';
import { Handshake, Sparkles } from 'lucide-react';

export default function App() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);
  const [selectedModalClient, setSelectedModalClient] = useState<ClientProject | null>(null);
  const [calcMonthlyOrders, setCalcMonthlyOrders] = useState<number>(3500);
  const [calcEstimatedGains, setCalcEstimatedGains] = useState<number | undefined>(undefined);

  const handleOpenPartnerModal = () => {
    setIsPartnerModalOpen(true);
  };

  const handleOpenClientModal = (client: ClientProject) => {
    setSelectedModalClient(client);
  };

  const handleSelectClientById = (clientId: string) => {
    const found = CLIENT_PROJECTS.find(c => c.id === clientId);
    if (found) {
      setSelectedModalClient(found);
    }
  };

  const handleApplyWithMetrics = (orders: number, revenueEstimate: number) => {
    setCalcMonthlyOrders(orders);
    setCalcEstimatedGains(revenueEstimate);
    setIsPartnerModalOpen(true);
  };

  const scrollToClients = () => {
    const el = document.getElementById('clients');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-[#E2E8F0] flex flex-col selection:bg-blue-600 selection:text-white relative font-sans">
      
      {/* Fixed Navigation */}
      <Navbar onOpenPartnerModal={handleOpenPartnerModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onOpenPartnerModal={handleOpenPartnerModal}
          onExploreClients={scrollToClients}
          onSelectClient={handleSelectClientById}
        />

        {/* Featured Clients Showcase: hydra & iluvkeyks */}
        <ClientShowcase
          onOpenLiveModal={handleOpenClientModal}
          onOpenPartnerModal={handleOpenPartnerModal}
        />

        {/* Partner Program & Opportunities */}
        <PartnerProgram
          onOpenPartnerModal={handleOpenPartnerModal}
        />

        {/* Platform Architecture & Infrastructure */}
        <ArchitectureSection />

        {/* Scale & ROI Feasibility Calculator */}
        <RoiCalculator
          onApplyWithMetrics={handleApplyWithMetrics}
        />

        {/* Embedded Partner Intake / Contact Section */}
        <section id="contact" className="py-24 bg-[#020408] relative border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PartnerInquiryForm
              initialMonthlyOrders={calcMonthlyOrders}
              initialEstimatedGains={calcEstimatedGains}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection
          onOpenPartnerModal={handleOpenPartnerModal}
        />

      </main>

      {/* Footer */}
      <Footer onOpenPartnerModal={handleOpenPartnerModal} />

      {/* Modal: Interactive Live Client Simulation */}
      {selectedModalClient && (
        <LiveClientModal
          client={selectedModalClient}
          onClose={() => setSelectedModalClient(null)}
          onOpenPartnerModal={() => {
            setSelectedModalClient(null);
            setIsPartnerModalOpen(true);
          }}
        />
      )}

      {/* Modal: Partner Application Dialog */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020408]/90 backdrop-blur-xl animate-fadeIn">
          <PartnerInquiryForm
            isModal={true}
            initialMonthlyOrders={calcMonthlyOrders}
            initialEstimatedGains={calcEstimatedGains}
            onClose={() => setIsPartnerModalOpen(false)}
          />
        </div>
      )}

    </div>
  );
}
