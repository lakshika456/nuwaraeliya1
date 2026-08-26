import React from 'react';
import { HERO_IMAGE_URL } from '../data/mockData';
import { TabType } from '../types';
import { Sparkles, MapPin, Calendar, Clock, ArrowRight, Mountain, Coffee, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: TabType) => void;
  onOpenInquiry: (tourId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <div id="hero-wrapper" className="relative w-full overflow-hidden">
      {/* Main Hero Banner matching the screenshot */}
      <section
        id="home"
        className="relative min-h-[90vh] md:min-h-[92vh] flex items-center justify-center pt-16 pb-24 px-4 sm:px-6 lg:px-8"
      >
        {/* Background Image Container with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            id="hero-bg-image"
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('${HERO_IMAGE_URL}')`,
            }}
          />
          {/* Multi-stage gradient matching design spec */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#012d1d]/35 via-[#012d1d]/15 to-[#f8f9fa]/95" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#f8f9fa]/20 to-[#f8f9fa]/90 pointer-events-none" />
        </div>

        {/* Hero Content Block */}
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* Subtle Highland Badge */}
          <div
            id="hero-badge"
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#2c694e]/20 text-[#012d1d] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm animate-fade-in"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2c694e]" />
            <span>Sri Lanka’s Premier Highland Travel Specialist</span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-main-title"
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-[#012d1d] mb-4 tracking-tight leading-[1.12]"
          >
            Explore Nuwara Eliya
          </h1>

          {/* Italic Tagline */}
          <p
            id="hero-subtitle"
            className="font-serif text-xl sm:text-2xl md:text-[26px] text-[#414844] mb-6 italic font-medium"
          >
            Discover the beauty of Little England
          </p>

          {/* Description */}
          <p
            id="hero-description"
            className="font-sans text-base sm:text-lg md:text-[18px] text-[#414844] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Immerse yourself in the breathtaking landscapes of Sri Lanka's central highlands.
            We offer flexible city tours, scenic drop tours, and tailored experiences to make
            your journey unforgettable.
          </p>

          {/* Call-to-Action Buttons matching screenshot */}
          <div id="hero-actions" className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
            <button
              id="hero-explore-tours-btn"
              onClick={() => onNavigate('tours')}
              className="bg-[#012d1d] hover:bg-[#1b4332] text-white px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span>Explore Tours</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-view-locations-btn"
              onClick={() => onNavigate('locations')}
              className="border-[1.5px] border-[#2c694e] text-[#2c694e] bg-white/70 hover:bg-[#f3f4f5] px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5"
            >
              <span>View Locations</span>
            </button>
          </div>

          {/* Quick Highland Highlights Strip */}
          <div
            id="hero-highlights-strip"
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
          >
            <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-xl border border-[#e1e3e4] text-center shadow-sm">
              <Mountain className="w-5 h-5 text-[#2c694e] mx-auto mb-1" />
              <div className="font-serif font-bold text-base text-[#012d1d]">1,868 m</div>
              <div className="text-xs text-[#414844]">Highland Elevation</div>
            </div>

            <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-xl border border-[#e1e3e4] text-center shadow-sm">
              <Coffee className="w-5 h-5 text-[#2c694e] mx-auto mb-1" />
              <div className="font-serif font-bold text-base text-[#012d1d]">Pure Ceylon</div>
              <div className="text-xs text-[#414844]">Artisan Tea Capital</div>
            </div>

            <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-xl border border-[#e1e3e4] text-center shadow-sm">
              <Clock className="w-5 h-5 text-[#2c694e] mx-auto mb-1" />
              <div className="font-serif font-bold text-base text-[#012d1d]">1894 Era</div>
              <div className="text-xs text-[#414844]">British Heritage</div>
            </div>

            <div className="bg-white/85 backdrop-blur-md p-3.5 rounded-xl border border-[#e1e3e4] text-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#2c694e] mx-auto mb-1" />
              <div className="font-serif font-bold text-base text-[#012d1d]">100% Tailored</div>
              <div className="text-xs text-[#414844]">Private Transport</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
