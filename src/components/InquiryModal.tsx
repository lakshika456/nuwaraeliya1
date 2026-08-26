import React, { useState, useEffect } from 'react';
import { TOURS_DATA, VEHICLES_DATA } from '../data/mockData';
import { InquiryFormData } from '../types';
import {
  X,
  Send,
  CheckCircle2,
  Calendar,
  Users,
  Car,
  Compass,
  Phone,
  Mail,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  FileCheck,
} from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTourId?: string;
  initialTransportNote?: string;
  currency: string;
  formatPrice: (priceUSD: number) => string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialTourId,
  initialTransportNote,
  currency,
  formatPrice,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    arrivalDate: '',
    departureDate: '',
    adultsCount: 2,
    childrenCount: 0,
    tourType: initialTourId || 'little-england-city-tour',
    selectedTourId: initialTourId,
    transportRequired: true,
    vehicleType: 'sedan',
    specialRequests: initialTransportNote || '',
  });

  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    trainTickets: false,
    breakfastBox: true,
    teaMasterclass: false,
    lakeBoating: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialTourId) {
      setFormData((prev) => ({
        ...prev,
        tourType: initialTourId,
        selectedTourId: initialTourId,
      }));
    }
    if (initialTransportNote) {
      setFormData((prev) => ({
        ...prev,
        specialRequests: (prev.specialRequests ? prev.specialRequests + '\n' : '') + initialTransportNote,
      }));
    }
  }, [initialTourId, initialTransportNote]);

  if (!isOpen) return null;

  const selectedTour = TOURS_DATA.find((t) => t.id === formData.tourType);
  const tourBase = selectedTour ? selectedTour.basePriceUSD : 65;
  const tourTotal = tourBase * (formData.adultsCount + formData.childrenCount * 0.5);

  let vehicleTotal = 0;
  if (formData.transportRequired) {
    if (formData.vehicleType === 'van') vehicleTotal = 65;
    else if (formData.vehicleType === 'suv') vehicleTotal = 85;
    else if (formData.vehicleType === 'tuktuk') vehicleTotal = 28;
    else vehicleTotal = 45;
  }

  let addonsTotal = 0;
  if (addons.trainTickets) addonsTotal += 15 * (formData.adultsCount + formData.childrenCount);
  if (addons.teaMasterclass) addonsTotal += 20 * (formData.adultsCount + formData.childrenCount);
  if (addons.lakeBoating) addonsTotal += 10;

  const estimatedGrandTotal = tourTotal + vehicleTotal + addonsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = 'NE-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="inquiry-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#e1e3e4] animate-fadeIn flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#012d1d] text-white p-6 sm:p-8 rounded-t-3xl flex justify-between items-start relative">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#1b4332] px-3 py-1 rounded-full text-[#aeeecb] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Highland Trip Planning</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">Nuwara Eliya Tour & Transport Inquiry</h2>
            <p className="text-xs sm:text-sm text-[#c1ecd4] mt-1">
              Receive a customized quotation and itinerary confirmation with zero obligation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-[#1b4332] hover:bg-[#2c694e] text-white p-2 rounded-full transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#aeeecb]/40 flex items-center justify-center text-[#012d1d]">
              <CheckCircle2 className="w-12 h-12 text-[#2c694e]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2c694e] bg-[#aeeecb]/20 px-3 py-1 rounded-full">
                Inquiry Successfully Received
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#012d1d] mt-3">
                Thank You, {formData.fullName || 'Guest'}!
              </h3>
              <p className="text-sm text-[#414844] max-w-md mx-auto mt-2">
                Your Highland travel request has been logged under Reference Code:
              </p>
              <div className="font-mono font-bold text-xl text-[#012d1d] bg-[#f3f4f5] px-4 py-2 rounded-xl border border-[#e1e3e4] inline-block my-3 tracking-wider">
                {bookingRef}
              </div>
              <p className="text-xs text-[#414844] max-w-md mx-auto">
                Our local Nuwara Eliya reservation team will contact you at <strong>{formData.email}</strong> or on WhatsApp at <strong>{formData.phone}</strong> with your finalized quotation within 2 hours.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-md">
              <a
                href={`https://wa.me/94771234567?text=Hello!%20I%20just%20submitted%20inquiry%20${bookingRef}%20for%20Nuwara%20Eliya%20tour`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-full text-xs font-bold tracking-wide flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Connect</span>
              </a>

              <button
                onClick={handleReset}
                className="flex-1 bg-[#012d1d] text-white py-3 px-4 rounded-full text-xs font-bold tracking-wide hover:bg-[#1b4332] transition-colors"
              >
                Back to Exploration
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 flex-1">
            {/* Step 1: Personal Details */}
            <div>
              <h3 className="font-serif text-base font-bold text-[#012d1d] mb-3 flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#012d1d] text-white text-xs flex items-center justify-center">1</span>
                <span>Traveler Contact Information</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. James Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#2c694e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. james@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#2c694e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#2c694e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Country of Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. United Kingdom, Germany, Australia"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#2c694e] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Trip Dates & Party Size */}
            <div className="pt-4 border-t border-[#e1e3e4]">
              <h3 className="font-serif text-base font-bold text-[#012d1d] mb-3 flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#012d1d] text-white text-xs flex items-center justify-center">2</span>
                <span>Travel Dates & Guests</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Arrival Date</label>
                  <input
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Adults (12+ yrs)</label>
                  <select
                    value={formData.adultsCount}
                    onChange={(e) => setFormData({ ...formData, adultsCount: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Children (under 12)</label>
                  <select
                    value={formData.childrenCount}
                    onChange={(e) => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} Children</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Tour & Transport Selection */}
            <div className="pt-4 border-t border-[#e1e3e4]">
              <h3 className="font-serif text-base font-bold text-[#012d1d] mb-3 flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#012d1d] text-white text-xs flex items-center justify-center">3</span>
                <span>Select Desired Highland Tour & Transport</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Primary Tour Preference</label>
                  <select
                    value={formData.tourType}
                    onChange={(e) => setFormData({ ...formData, tourType: e.target.value, selectedTourId: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:outline-none"
                  >
                    {TOURS_DATA.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({formatPrice(t.basePriceUSD)}/person)
                      </option>
                    ))}
                    <option value="custom">Custom Multi-Day Highland Itinerary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#414844] mb-1">Vehicle Preference</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:outline-none"
                  >
                    <option value="sedan">Luxury AC Sedan (1-3 Guests)</option>
                    <option value="van">Spacious AC Mini Van (4-8 Guests)</option>
                    <option value="suv">4x4 Highland SUV (1-4 Guests)</option>
                    <option value="tuktuk">Vintage Open-Air Ceylon Tuk-Tuk (1-2 Guests)</option>
                  </select>
                </div>
              </div>

              {/* Add-ons checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-[#414844] mb-2">Optional Highland Add-ons</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center space-x-2 bg-[#f8f9fa] p-2.5 rounded-xl border border-[#e1e3e4] cursor-pointer hover:bg-white">
                    <input
                      type="checkbox"
                      checked={addons.trainTickets}
                      onChange={(e) => setAddons({ ...addons, trainTickets: e.target.checked })}
                      className="rounded text-[#2c694e] focus:ring-[#2c694e]"
                    />
                    <span>Scenic Blue Train Ticket Reservation (+$15/p)</span>
                  </label>

                  <label className="flex items-center space-x-2 bg-[#f8f9fa] p-2.5 rounded-xl border border-[#e1e3e4] cursor-pointer hover:bg-white">
                    <input
                      type="checkbox"
                      checked={addons.teaMasterclass}
                      onChange={(e) => setAddons({ ...addons, teaMasterclass: e.target.checked })}
                      className="rounded text-[#2c694e] focus:ring-[#2c694e]"
                    />
                    <span>Private Tea Sommelier Tasting Flight (+$20/p)</span>
                  </label>

                  <label className="flex items-center space-x-2 bg-[#f8f9fa] p-2.5 rounded-xl border border-[#e1e3e4] cursor-pointer hover:bg-white">
                    <input
                      type="checkbox"
                      checked={addons.breakfastBox}
                      onChange={(e) => setAddons({ ...addons, breakfastBox: e.target.checked })}
                      className="rounded text-[#2c694e] focus:ring-[#2c694e]"
                    />
                    <span>Sunrise Packed Breakfast & Ceylon Tea Flask</span>
                  </label>

                  <label className="flex items-center space-x-2 bg-[#f8f9fa] p-2.5 rounded-xl border border-[#e1e3e4] cursor-pointer hover:bg-white">
                    <input
                      type="checkbox"
                      checked={addons.lakeBoating}
                      onChange={(e) => setAddons({ ...addons, lakeBoating: e.target.checked })}
                      className="rounded text-[#2c694e] focus:ring-[#2c694e]"
                    />
                    <span>Lake Gregory Swan Boat Pass (+$10)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-[#414844] mb-1">
                Custom Notes / Special Destination Requests
              </label>
              <textarea
                rows={2}
                placeholder="Let us know if you need airport pickup, dietary preferences, or specific photo stops..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Estimated Quote Summary Bar */}
            <div className="bg-[#f8f9fa] p-4 rounded-2xl border border-[#e1e3e4] flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-[11px] font-semibold text-[#2c694e] uppercase tracking-wider block">
                  Estimated Total Quote (Estimate Only)
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#012d1d]">
                    {formatPrice(estimatedGrandTotal)}
                  </span>
                  <span className="text-xs text-[#414844]">
                    ({formData.adultsCount + formData.childrenCount} Guests • Private Vehicle)
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full border border-[#c1c8c2] text-xs font-semibold text-[#414844] hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial bg-[#012d1d] hover:bg-[#1b4332] text-white px-8 py-3 rounded-full text-xs font-bold tracking-wide shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Tour Inquiry</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
