import React from 'react';
import { TabType } from '../types';
import { Compass, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <footer id="main-footer" className="bg-[#012d1d] text-white w-full pt-20 pb-8 border-t border-[#1b4332]">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-2 lg:col-span-2 mb-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#1b4332] flex items-center justify-center text-[#aeeecb]">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Explore Nuwara Eliya
            </h3>
          </div>
          <p className="text-[#86af99] text-sm max-w-sm mb-6 leading-relaxed">
            Discover the breathtaking beauty of Sri Lanka's Little England with our premium tour services,
            tailored city excursions, and scenic highland transfers.
          </p>

          <div className="space-y-2 text-xs text-[#a5d0b9]">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#aeeecb]" />
              <span>Queen Elizabeth Drive, Nuwara Eliya 22200, Sri Lanka</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#aeeecb]" />
              <span>+94 (77) 123-4567 • 24/7 Highland Concierge</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#aeeecb]" />
              <span>reservations@explorenuwaraeliya.com</span>
            </div>
          </div>
        </div>

        {/* Tours Column */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Tours</h4>
          <ul className="space-y-2.5 text-xs text-[#a5d0b9]/90">
            <li>
              <button
                onClick={() => onNavigate('tours')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                City Tours
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('tours')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Drop Tours
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('tours')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Horton Plains Trek
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('tours')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Tea Masterclass
              </button>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5 text-xs text-[#a5d0b9]/90">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Brand Info
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('locations')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Locations
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('transport')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Chauffeur Fleet
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('gallery')}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Photo Gallery
              </button>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
          <ul className="space-y-2.5 text-xs text-[#a5d0b9]/90">
            <li>
              <button
                onClick={onOpenInquiry}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                onClick={onOpenInquiry}
                className="hover:text-[#aeeecb] transition-colors text-left"
              >
                Inquiry
              </button>
            </li>
            <li>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#aeeecb] transition-colors text-left block"
              >
                WhatsApp Direct
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright line */}
      <div className="border-t border-[#1b4332] mt-12 pt-8 text-center px-6 text-xs text-[#86af99]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2024 Explore Nuwara Eliya. All rights reserved.</p>
          <p className="flex items-center space-x-1 text-[11px]">
            <span>Crafted for Ceylon Little England Highlands</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
