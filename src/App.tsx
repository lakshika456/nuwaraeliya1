/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WeatherWidget } from './components/WeatherWidget';
import { HomeOverview } from './components/HomeOverview';
import { ToursSection } from './components/ToursSection';
import { TransportSection } from './components/TransportSection';
import { LocationsSection } from './components/LocationsSection';
import { GallerySection } from './components/GallerySection';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedTourForInquiry, setSelectedTourForInquiry] = useState<string | undefined>(undefined);
  const [selectedTransportNote, setSelectedTransportNote] = useState<string | undefined>(undefined);
  const [currency, setCurrency] = useState<string>('USD');

  // Currency conversion rates
  const formatPrice = (priceUSD: number): string => {
    switch (currency) {
      case 'LKR':
        return `Rs ${(priceUSD * 310).toLocaleString()}`;
      case 'EUR':
        return `€${Math.round(priceUSD * 0.92)}`;
      case 'GBP':
        return `£${Math.round(priceUSD * 0.79)}`;
      case 'USD':
      default:
        return `$${priceUSD}`;
    }
  };

  const handleOpenInquiry = (tourId?: string, transportNote?: string) => {
    setSelectedTourForInquiry(tourId);
    setSelectedTransportNote(transportNote);
    setInquiryModalOpen(true);
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'inquiry') {
      handleOpenInquiry();
    } else {
      setActiveTab(tab);
    }
  };

  const handleSelectTourForInquiry = (tourId: string) => {
    handleOpenInquiry(tourId);
  };

  const handleSelectTransportForInquiry = (vehicleName: string, routeNote?: string) => {
    handleOpenInquiry(undefined, `Preferred Vehicle: ${vehicleName}${routeNote ? ` • ${routeNote}` : ''}`);
  };

  const handlePlanTripToLocation = (locName: string) => {
    handleOpenInquiry(undefined, `Interested in visiting: ${locName}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#191c1d]">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenInquiry={() => handleOpenInquiry()}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Content Area based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            <HeroSection
              onNavigate={setActiveTab}
              onOpenInquiry={() => handleOpenInquiry()}
            />
            <WeatherWidget />
            <HomeOverview
              onNavigate={setActiveTab}
              onOpenInquiry={handleOpenInquiry}
              formatPrice={formatPrice}
            />
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="pt-6 animate-fadeIn">
            <ToursSection
              onSelectTourForInquiry={handleSelectTourForInquiry}
              currency={currency}
              formatPrice={formatPrice}
            />
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="pt-6 animate-fadeIn">
            <TransportSection
              onSelectTransportForInquiry={handleSelectTransportForInquiry}
              formatPrice={formatPrice}
            />
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="pt-6 animate-fadeIn">
            <LocationsSection onPlanTripToLocation={handlePlanTripToLocation} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="pt-6 animate-fadeIn">
            <GallerySection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialTourId={selectedTourForInquiry}
        initialTransportNote={selectedTransportNote}
        currency={currency}
        formatPrice={formatPrice}
      />
    </div>
  );
}
