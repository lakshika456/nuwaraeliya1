import React, { useState } from 'react';
import { LOCATIONS_DATA } from '../data/mockData';
import { LocationItem } from '../types';
import { MapPin, Compass, Mountain, Clock, Sparkles, Lightbulb, ArrowRight, DollarSign } from 'lucide-react';

interface LocationsSectionProps {
  onPlanTripToLocation?: (locName: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onPlanTripToLocation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Sights' },
    { id: 'tea', label: 'Tea Estates' },
    { id: 'waterfall', label: 'Waterfalls' },
    { id: 'nature', label: 'Nature & Parks' },
    { id: 'heritage', label: 'Colonial Heritage' },
    { id: 'lake', label: 'Lakes' },
  ];

  const filteredLocations = LOCATIONS_DATA.filter((loc) => {
    if (activeCategory === 'all') return true;
    return loc.category === activeCategory;
  });

  return (
    <section id="locations" className="py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#aeeecb]/30 px-3.5 py-1 rounded-full text-[#012d1d] text-xs font-semibold uppercase tracking-wider mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#2c694e]" />
          <span>Little England Highlights & Landmarks</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#012d1d] mb-4">
          Iconic Nuwara Eliya Destinations
        </h2>
        <p className="text-base sm:text-lg text-[#414844] leading-relaxed">
          From historic British colonial structures to sheer 1,000m cliff drops, lush high-grown tea
          plantations, and mirror mountain lakes.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#012d1d] text-white shadow-sm'
                  : 'bg-[#f3f4f5] text-[#414844] hover:bg-[#e7e8e9]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLocations.map((loc) => (
          <div
            key={loc.id}
            id={`location-card-${loc.id}`}
            className="bg-white rounded-2xl overflow-hidden border border-[#e1e3e4] hover:border-[#2c694e]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Image Container */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={loc.image}
                alt={loc.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <span className="absolute top-3 left-3 bg-[#012d1d]/85 backdrop-blur-sm text-[#aeeecb] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {loc.categoryLabel}
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center space-x-3 text-xs text-[#c1ecd4] mb-1">
                  <span className="flex items-center space-x-1">
                    <Mountain className="w-3.5 h-3.5" />
                    <span>{loc.elevation}</span>
                  </span>
                  <span>•</span>
                  <span>{loc.distanceFromTown}</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold line-clamp-1">{loc.name}</h3>
              </div>
            </div>

            {/* Description & Guide Info */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#414844] leading-relaxed mb-4">{loc.shortDesc}</p>

                <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#e1e3e4] space-y-1.5 text-xs text-[#191c1d] mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#414844]">Best Time:</span>
                    <span className="font-medium text-[#2c694e] text-right line-clamp-1">
                      {loc.bestTimeToVisit.split('.')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#414844]">Entry Fee:</span>
                    <span className="font-medium text-[#012d1d]">{loc.entryFee}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e1e3e4] flex items-center justify-between">
                <button
                  onClick={() => setSelectedLocation(loc)}
                  className="text-xs font-semibold text-[#2c694e] hover:text-[#012d1d] flex items-center space-x-1"
                >
                  <span>Explore Guide & Tips</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onPlanTripToLocation && (
                  <button
                    onClick={() => onPlanTripToLocation(loc.name)}
                    className="bg-[#f3f4f5] hover:bg-[#012d1d] hover:text-white text-[#012d1d] text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  >
                    Add to Itinerary
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Guide Modal */}
      {selectedLocation && (
        <div
          id="location-guide-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn">
            {/* Header Image */}
            <div className="relative h-64 w-full">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="bg-[#2c694e] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                  {selectedLocation.categoryLabel}
                </span>
                <h2 className="font-serif text-2xl font-bold">{selectedLocation.name}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Quick Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] text-xs">
                <div>
                  <span className="text-[#414844] block">Elevation</span>
                  <span className="font-bold text-[#012d1d]">{selectedLocation.elevation}</span>
                </div>
                <div>
                  <span className="text-[#414844] block">Distance</span>
                  <span className="font-bold text-[#012d1d]">{selectedLocation.distanceFromTown}</span>
                </div>
                <div>
                  <span className="text-[#414844] block">Entry Fee</span>
                  <span className="font-bold text-[#012d1d]">{selectedLocation.entryFee}</span>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="font-serif text-base font-bold text-[#012d1d] mb-2">About this Destination</h3>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                  {selectedLocation.fullDesc}
                </p>
              </div>

              {/* Best Time to Visit */}
              <div className="bg-[#aeeecb]/20 p-3.5 rounded-xl border border-[#2c694e]/30">
                <h4 className="text-xs font-bold text-[#012d1d] flex items-center space-x-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#2c694e]" />
                  <span>Best Time for Clear Mountain Views</span>
                </h4>
                <p className="text-xs text-[#414844]">{selectedLocation.bestTimeToVisit}</p>
              </div>

              {/* Practical Tips */}
              <div>
                <h3 className="font-serif text-base font-bold text-[#012d1d] mb-2 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-[#d4a373]" />
                  <span>Local Insider Tips</span>
                </h3>
                <ul className="space-y-2">
                  {selectedLocation.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-[#414844] flex items-start space-x-2 bg-[#f8f9fa] p-2.5 rounded-lg border border-[#e1e3e4]">
                      <span className="text-[#2c694e] font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#e1e3e4] flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="px-5 py-2 rounded-full border border-[#c1c8c2] text-xs font-semibold text-[#414844] hover:bg-[#f3f4f5]"
                >
                  Close Guide
                </button>
                {onPlanTripToLocation && (
                  <button
                    onClick={() => {
                      const locName = selectedLocation.name;
                      setSelectedLocation(null);
                      onPlanTripToLocation(locName);
                    }}
                    className="bg-[#012d1d] hover:bg-[#1b4332] text-white px-6 py-2 rounded-full text-xs font-semibold tracking-wide"
                  >
                    Include in Custom Trip
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
