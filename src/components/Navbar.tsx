import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import { Menu, X, CloudFog, PhoneCall, Compass, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenInquiry: (tourId?: string) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenInquiry,
  currency,
  onCurrencyChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'tours', label: 'Tours' },
    { id: 'transport', label: 'Transport' },
    { id: 'locations', label: 'Locations' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const handleNavClick = (tab: TabType) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro banner for highlands weather & instant contact */}
      <div id="top-announcement-bar" className="bg-[#012d1d] text-[#c1ecd4] text-xs py-1.5 px-4 hidden sm:block border-b border-[#1b4332]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 font-medium">
              <CloudFog className="w-3.5 h-3.5 text-[#aeeecb]" />
              <span>Nuwara Eliya Highlands: <strong>16°C</strong> • Misty Morning • Best Season</span>
            </span>
            <span className="text-[#86af99]">•</span>
            <span className="flex items-center space-x-1 text-[#86af99]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#aeeecb]" />
              <span>Official Sri Lanka Tourism Certified Chauffeur Guides</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-[#86af99]">Currency:</span>
              <select
                id="currency-selector"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="bg-[#1b4332] text-white text-xs rounded px-1.5 py-0.5 border border-[#2c694e] focus:outline-none focus:ring-1 focus:ring-[#aeeecb] cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="LKR">LKR (Rs)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <a
              href="tel:+94771234567"
              className="flex items-center space-x-1 text-[#c1ecd4] hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>+94 (77) 123-4567</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        id="navbar"
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f8f9fa]/95 backdrop-blur-md shadow-md py-3'
            : 'bg-[#f8f9fa]/85 backdrop-blur-md shadow-sm py-4'
        }`}
      >
        <div className="flex justify-between items-center w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          {/* Logo / Brand Name */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-full bg-[#012d1d] flex items-center justify-center text-[#aeeecb] shadow-sm group-hover:bg-[#1b4332] transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#012d1d] tracking-tight block leading-tight">
                Explore Nuwara Eliya
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#2c694e] font-semibold block sm:hidden">
                Little England
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium tracking-wide transition-all duration-200 py-1 ${
                    isActive
                      ? 'text-[#2c694e] font-semibold border-b-2 border-[#2c694e]'
                      : 'text-[#414844] hover:text-[#2c694e]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA & Quick Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="nav-inquiry-btn"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center justify-center bg-[#012d1d] hover:bg-[#1b4332] text-white px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              Inquiry
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              id="mobile-inquiry-quick-btn"
              onClick={() => onOpenInquiry()}
              className="bg-[#012d1d] text-white text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              Inquiry
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#012d1d] hover:bg-[#e7e8e9] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden bg-[#f8f9fa] border-t border-[#e1e3e4] px-6 pt-4 pb-6 shadow-xl animate-fadeIn"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left text-base py-2 px-3 rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#aeeecb]/30 text-[#012d1d] font-bold'
                        : 'text-[#414844] hover:bg-[#edeeef]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-[#e1e3e4] flex items-center justify-between">
                <span className="text-xs text-[#414844]">Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  className="bg-white text-xs border border-[#c1c8c2] rounded px-2 py-1"
                >
                  <option value="USD">USD ($)</option>
                  <option value="LKR">LKR (Rs)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <button
                id="mobile-nav-inquiry-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full bg-[#012d1d] text-white py-3 rounded-full text-sm font-semibold tracking-wide mt-2 text-center"
              >
                Plan Custom Trip / Inquiry
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
