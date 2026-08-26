import React, { useState } from 'react';
import { TOURS_DATA } from '../data/mockData';
import { TourItem, TourCategory } from '../types';
import { Clock, Star, CheckCircle2, XCircle, ArrowRight, Sparkles, MapPin, Compass, Shield, Users } from 'lucide-react';

interface ToursSectionProps {
  onSelectTourForInquiry: (tourId: string) => void;
  currency: string;
  formatPrice: (priceUSD: number) => string;
}

export const ToursSection: React.FC<ToursSectionProps> = ({
  onSelectTourForInquiry,
  currency,
  formatPrice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TourCategory>('all');
  const [activeTourModal, setActiveTourModal] = useState<TourItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: TourCategory; label: string }[] = [
    { id: 'all', label: 'All Experiences' },
    { id: 'city', label: 'City Heritage Tours' },
    { id: 'drop', label: 'Scenic Drop Tours' },
    { id: 'hiking', label: 'Hiking & Treks' },
    { id: 'tea', label: 'Tea Masterclasses' },
  ];

  const filteredTours = TOURS_DATA.filter((tour) => {
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tours" className="py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#aeeecb]/30 px-3.5 py-1 rounded-full text-[#012d1d] text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5 text-[#2c694e]" />
          <span>Curated Highland Itineraries</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#012d1d] mb-4">
          Unforgettable Tours in Little England
        </h2>
        <p className="text-base sm:text-lg text-[#414844] leading-relaxed">
          From sunrise treks over Horton Plains to orthodox Ceylon tea factory tastings and seamless
          intercity drop transfers to Ella and Kandy.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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

        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search tours, waterfalls, tea..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-sm px-4 py-2 rounded-full border border-[#e1e3e4] focus:outline-none focus:ring-2 focus:ring-[#2c694e] text-[#191c1d]"
          />
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour) => (
          <div
            key={tour.id}
            id={`tour-card-${tour.id}`}
            className="bg-white rounded-2xl overflow-hidden border border-[#e1e3e4] hover:border-[#2c694e]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Tour Image with Badge & Rating */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={tour.featuredImage}
                alt={tour.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {tour.badge && (
                <span className="absolute top-3 left-3 bg-[#012d1d] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {tour.badge}
                </span>
              )}

              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1 text-xs font-bold text-[#012d1d]">
                <Star className="w-3.5 h-3.5 fill-[#d4a373] text-[#d4a373]" />
                <span>{tour.rating}</span>
                <span className="text-[#414844] font-normal">({tour.reviewCount})</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white flex items-center space-x-2 text-xs">
                <span className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-[#aeeecb]" />
                  <span>{tour.duration}</span>
                </span>
              </div>
            </div>

            {/* Tour Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#012d1d] mb-2 group-hover:text-[#2c694e] transition-colors leading-snug">
                  {tour.title}
                </h3>
                <p className="text-xs text-[#414844] line-clamp-2 mb-4 leading-relaxed">
                  {tour.overview}
                </p>

                {/* Key Highlights Bullet points */}
                <div className="space-y-1.5 mb-6">
                  {tour.highlights.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#191c1d]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2c694e] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 border-t border-[#e1e3e4] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#414844] block">From</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="font-serif text-2xl font-bold text-[#012d1d]">
                      {formatPrice(tour.basePriceUSD)}
                    </span>
                    <span className="text-xs text-[#414844]">/ person</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTourModal(tour)}
                    className="text-xs font-semibold text-[#2c694e] hover:text-[#012d1d] px-3 py-2 rounded-lg hover:bg-[#f3f4f5] transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onSelectTourForInquiry(tour.id)}
                    className="bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tour Detail Modal */}
      {activeTourModal && (
        <div
          id="tour-detail-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full">
              <img
                src={activeTourModal.featuredImage}
                alt={activeTourModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setActiveTourModal(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-colors"
              >
                ✕
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-[#2c694e] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  {activeTourModal.category.toUpperCase()} TOUR
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">{activeTourModal.title}</h2>
                <p className="text-sm text-[#e1e3e4] italic mt-1">{activeTourModal.subtitle}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Info Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4]">
                <div>
                  <span className="text-xs text-[#414844] block">Duration</span>
                  <span className="font-semibold text-sm text-[#012d1d]">{activeTourModal.duration}</span>
                </div>
                <div>
                  <span className="text-xs text-[#414844] block">Price</span>
                  <span className="font-serif font-bold text-lg text-[#012d1d]">
                    {formatPrice(activeTourModal.basePriceUSD)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#414844] block">Rating</span>
                  <span className="font-semibold text-sm text-[#012d1d]">
                    ★ {activeTourModal.rating} ({activeTourModal.reviewCount})
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#414844] block">Tour Type</span>
                  <span className="font-semibold text-sm text-[#2c694e]">100% Private</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#012d1d] mb-2">Tour Overview</h3>
                <p className="text-sm text-[#414844] leading-relaxed">{activeTourModal.overview}</p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#012d1d] mb-3">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTourModal.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#191c1d] bg-[#f8f9fa] p-2.5 rounded-lg border border-[#e1e3e4]">
                      <CheckCircle2 className="w-4 h-4 text-[#2c694e] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#012d1d] mb-4">Detailed Itinerary Timeline</h3>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#d4a373]">
                  {activeTourModal.itinerary.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#012d1d] border-2 border-[#d4a373]" />
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xs font-bold text-[#2c694e] bg-[#aeeecb]/30 px-2 py-0.5 rounded">
                          {step.time}
                        </span>
                        <h4 className="text-sm font-bold text-[#012d1d]">{step.title}</h4>
                      </div>
                      <p className="text-xs text-[#414844] mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#e1e3e4]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c694e] mb-2 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Included in this tour</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#414844]">
                    {activeTourModal.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#2c694e] font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ba1a1a] mb-2 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4" />
                    <span>Not Included</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#414844]">
                    {activeTourModal.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#ba1a1a] font-bold">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-[#e1e3e4] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs text-[#414844]">Instant Inquiries & Tailored Adjustments</span>
                  <div className="font-serif text-xl font-bold text-[#012d1d]">
                    Starting at {formatPrice(activeTourModal.basePriceUSD)}
                  </div>
                </div>

                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTourModal(null)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-[#c1c8c2] text-xs font-semibold text-[#414844] hover:bg-[#f3f4f5]"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const tourId = activeTourModal.id;
                      setActiveTourModal(null);
                      onSelectTourForInquiry(tourId);
                    }}
                    className="flex-1 sm:flex-initial bg-[#012d1d] hover:bg-[#1b4332] text-white px-7 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-md transition-all"
                  >
                    Book / Inquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
