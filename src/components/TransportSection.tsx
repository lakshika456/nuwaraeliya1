import React, { useState } from 'react';
import { VEHICLES_DATA, SCENIC_ROUTES } from '../data/mockData';
import { VehicleOption, ScenicRoute } from '../types';
import { Car, Users, Briefcase, CheckCircle2, ShieldCheck, ArrowRight, Compass, Sparkles, MapPin, Gauge } from 'lucide-react';

interface TransportSectionProps {
  onSelectTransportForInquiry: (vehicleName: string, routeNote?: string) => void;
  formatPrice: (priceUSD: number) => string;
}

export const TransportSection: React.FC<TransportSectionProps> = ({
  onSelectTransportForInquiry,
  formatPrice,
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('ne-to-ella');
  const [selectedVehicleType, setSelectedVehicleType] = useState<'sedan' | 'van' | 'suv'>('sedan');

  const currentRoute = SCENIC_ROUTES.find((r) => r.id === selectedRouteId) || SCENIC_ROUTES[0];

  const getEstimatedCost = (route: ScenicRoute, type: 'sedan' | 'van' | 'suv') => {
    return route.estimatedCostUSD[type] || route.estimatedCostUSD.sedan;
  };

  return (
    <section id="transport" className="py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#aeeecb]/30 px-3.5 py-1 rounded-full text-[#012d1d] text-xs font-semibold uppercase tracking-wider mb-3">
          <Car className="w-3.5 h-3.5 text-[#2c694e]" />
          <span>Premium Mountain Chauffeur Fleet</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#012d1d] mb-4">
          Highland Transport & Scenic Transfers
        </h2>
        <p className="text-base sm:text-lg text-[#414844] leading-relaxed">
          Navigate the winding hill country roads with confidence. Our private modern fleet, experienced
          mountain drivers, and transparent pricing guarantee a smooth and leisurely voyage.
        </p>
      </div>

      {/* Interactive Transfer Rate Calculator */}
      <div className="bg-[#012d1d] text-white rounded-3xl p-6 sm:p-10 mb-16 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2c694e]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#aeeecb] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Instant Route & Transfer Cost Estimator</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6">
            Calculate Your Highland Intercity Transfer
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Step 1: Select Route */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1ecd4]">
                1. Select Destination Route
              </label>
              <div className="space-y-2">
                {SCENIC_ROUTES.map((route) => {
                  const isSelected = selectedRouteId === route.id;
                  return (
                    <button
                      key={route.id}
                      onClick={() => setSelectedRouteId(route.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm ${
                        isSelected
                          ? 'bg-[#1b4332] border-[#aeeecb] text-white font-bold shadow-md'
                          : 'bg-[#012d1d]/60 border-[#2c694e]/40 text-[#c1ecd4] hover:bg-[#1b4332]/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-[#aeeecb]" />
                        <span>{route.from} → {route.to}</span>
                      </div>
                      <span className="text-[11px] text-[#aeeecb]/80">{route.distanceKm} km</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Vehicle Class */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#c1ecd4]">
                2. Choose Vehicle Class
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedVehicleType('sedan')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedVehicleType === 'sedan'
                      ? 'bg-[#1b4332] border-[#aeeecb] text-white font-bold'
                      : 'bg-[#012d1d]/60 border-[#2c694e]/40 text-[#c1ecd4] hover:bg-[#1b4332]/60'
                  }`}
                >
                  <Car className="w-5 h-5 mx-auto mb-1 text-[#aeeecb]" />
                  <div className="text-xs font-bold">Sedan</div>
                  <div className="text-[10px] text-[#86af99]">1-3 Guests</div>
                </button>

                <button
                  onClick={() => setSelectedVehicleType('van')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedVehicleType === 'van'
                      ? 'bg-[#1b4332] border-[#aeeecb] text-white font-bold'
                      : 'bg-[#012d1d]/60 border-[#2c694e]/40 text-[#c1ecd4] hover:bg-[#1b4332]/60'
                  }`}
                >
                  <Users className="w-5 h-5 mx-auto mb-1 text-[#aeeecb]" />
                  <div className="text-xs font-bold">Mini Van</div>
                  <div className="text-[10px] text-[#86af99]">4-8 Guests</div>
                </button>

                <button
                  onClick={() => setSelectedVehicleType('suv')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedVehicleType === 'suv'
                      ? 'bg-[#1b4332] border-[#aeeecb] text-white font-bold'
                      : 'bg-[#012d1d]/60 border-[#2c694e]/40 text-[#c1ecd4] hover:bg-[#1b4332]/60'
                  }`}
                >
                  <Gauge className="w-5 h-5 mx-auto mb-1 text-[#aeeecb]" />
                  <div className="text-xs font-bold">4x4 SUV</div>
                  <div className="text-[10px] text-[#86af99]">Luxury 4WD</div>
                </button>
              </div>

              {/* Route Highlights on route */}
              <div className="bg-[#1b4332]/80 p-3.5 rounded-xl border border-[#2c694e]/50 text-xs">
                <span className="font-semibold text-[#aeeecb] block mb-1.5">
                  Scenic Stops Included En Route:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentRoute.highlights.map((h, i) => (
                    <span key={i} className="bg-[#012d1d] px-2 py-0.5 rounded text-[11px] text-white">
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Estimated Cost Summary Card */}
            <div className="bg-white text-[#191c1d] p-6 rounded-2xl shadow-xl border border-[#c1ecd4] flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase text-[#2c694e] tracking-wider">
                    Instant Quote
                  </span>
                  <span className="text-xs text-[#414844] font-medium">All-Inclusive</span>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#012d1d]">
                  {formatPrice(getEstimatedCost(currentRoute, selectedVehicleType))}
                </div>
                <div className="text-xs text-[#414844] mt-1">
                  Total for private vehicle with fuel, tolls & driver guide
                </div>

                <div className="mt-4 pt-3 border-t border-[#e1e3e4] space-y-1.5 text-xs text-[#414844]">
                  <div className="flex justify-between">
                    <span>Route:</span>
                    <span className="font-bold text-[#012d1d]">{currentRoute.from} to {currentRoute.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance & Duration:</span>
                    <span className="font-bold text-[#012d1d]">{currentRoute.distanceKm} km (~{currentRoute.duration})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle Class:</span>
                    <span className="font-bold text-[#012d1d] capitalize">{selectedVehicleType}</span>
                  </div>
                </div>
              </div>

              <button
                id="book-calculated-transfer-btn"
                onClick={() =>
                  onSelectTransportForInquiry(
                    selectedVehicleType.toUpperCase(),
                    `Transfer from ${currentRoute.from} to ${currentRoute.to} (${currentRoute.distanceKm} km)`
                  )
                }
                className="w-full bg-[#012d1d] hover:bg-[#1b4332] text-white py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all mt-6 flex items-center justify-center space-x-2"
              >
                <span>Reserve Transfer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Showcase Grid */}
      <div className="mb-8">
        <h3 className="font-serif text-2xl font-bold text-[#012d1d] mb-6">
          Our Full Fleet of Maintained Vehicles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VEHICLES_DATA.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#e1e3e4] hover:border-[#2c694e]/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={v.image}
                    alt={v.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#012d1d]/85 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
                    {v.type}
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="font-serif text-lg font-bold text-[#012d1d] mb-2">{v.name}</h4>
                  <div className="flex items-center space-x-4 text-xs text-[#414844] mb-4">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-[#2c694e]" />
                      <span>{v.capacity}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#2c694e]" />
                      <span>{v.luggage}</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    {v.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-xs text-[#191c1d]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2c694e] shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#414844] italic bg-[#f8f9fa] p-2 rounded">
                    Best for: {v.popularFor}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#e1e3e4] flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] text-[#414844] block">Full Day Rate</span>
                    <span className="font-serif font-bold text-base text-[#012d1d]">
                      {formatPrice(v.ratePerDayUSD)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#414844] block">Per Km Rate</span>
                    <span className="text-xs font-semibold text-[#2c694e]">
                      {formatPrice(v.ratePerKmUSD)}/km
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTransportForInquiry(v.name)}
                  className="w-full bg-[#f3f4f5] hover:bg-[#012d1d] hover:text-white text-[#012d1d] py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Select Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Standards Assurance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#f8f9fa] p-6 rounded-2xl border border-[#e1e3e4]">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-6 h-6 text-[#2c694e] shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm text-[#012d1d]">Tourist Board Certified Chauffeurs</h4>
            <p className="text-xs text-[#414844] mt-1 leading-relaxed">
              All drivers possess government Tourist Driver National Licenses with background checks and fluent English.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Car className="w-6 h-6 text-[#2c694e] shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm text-[#012d1d]">Mountain Safety Inspected Fleet</h4>
            <p className="text-xs text-[#414844] mt-1 leading-relaxed">
              Our vehicles undergo rigorous brake and tire inspections customized for steep highland curves and wet mountain fog.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Sparkles className="w-6 h-6 text-[#2c694e] shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm text-[#012d1d]">Zero Hidden Charges</h4>
            <p className="text-xs text-[#414844] mt-1 leading-relaxed">
              Prices include fuel, driver accommodation, highway tolls, parking charges, and comprehensive passenger insurance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
