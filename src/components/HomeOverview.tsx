import React from 'react';
import { TOURS_DATA, LOCATIONS_DATA, TESTIMONIALS } from '../data/mockData';
import { TabType } from '../types';
import {
  Compass,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  Quote,
} from 'lucide-react';

interface HomeOverviewProps {
  onNavigate: (tab: TabType) => void;
  onOpenInquiry: (tourId?: string) => void;
  formatPrice: (priceUSD: number) => string;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onNavigate,
  onOpenInquiry,
  formatPrice,
}) => {
  const featuredTours = TOURS_DATA.slice(0, 3);
  const featuredLocations = LOCATIONS_DATA.slice(0, 3);

  return (
    <div id="home-overview-container" className="space-y-24 py-10">
      {/* Featured Tours Section */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#aeeecb]/30 px-3.5 py-1 rounded-full text-[#012d1d] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2c694e]" />
              <span>Signature Highland Itineraries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#012d1d]">
              Most Popular Nuwara Eliya Tours
            </h2>
            <p className="text-sm sm:text-base text-[#414844] mt-1">
              Carefully designed by local highland experts with flexible timings and private chauffeur service.
            </p>
          </div>

          <button
            onClick={() => onNavigate('tours')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#2c694e] hover:text-[#012d1d] transition-colors self-start md:self-auto"
          >
            <span>View All 6+ Highland Tours</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#e1e3e4] hover:border-[#2c694e]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tour.featuredImage}
                  alt={tour.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {tour.badge && (
                  <span className="absolute top-3 left-3 bg-[#012d1d] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {tour.badge}
                  </span>
                )}

                <div className="absolute top-3 right-3 bg-white/90 px-2 py-0.5 rounded-full flex items-center space-x-1 text-xs font-bold text-[#012d1d]">
                  <Star className="w-3 h-3 fill-[#d4a373] text-[#d4a373]" />
                  <span>{tour.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 text-white flex items-center space-x-1.5 text-xs bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  <Clock className="w-3 h-3 text-[#aeeecb]" />
                  <span>{tour.duration}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#012d1d] mb-2 group-hover:text-[#2c694e] transition-colors leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-xs text-[#414844] line-clamp-2 mb-4 leading-relaxed">
                    {tour.overview}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {tour.highlights.slice(0, 2).map((hl, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-[#191c1d]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2c694e] shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e1e3e4] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#414844] block">From</span>
                    <span className="font-serif text-xl font-bold text-[#012d1d]">
                      {formatPrice(tour.basePriceUSD)}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenInquiry(tour.id)}
                    className="bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Travel With Us Section */}
      <section className="bg-[#012d1d] text-white py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#aeeecb] block mb-2">
              Highland Hospitality Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Why Explore Nuwara Eliya With Us?
            </h2>
            <p className="text-sm sm:text-base text-[#c1ecd4] leading-relaxed">
              We specialize solely in the Sri Lankan central highlands, offering insider access to
              historic tea factories, misty trails, and picturesque transfers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1b4332] p-6 rounded-2xl border border-[#2c694e]/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#012d1d] flex items-center justify-center text-[#aeeecb] mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">Highland Native Guides</h3>
                <p className="text-xs text-[#c1ecd4] leading-relaxed">
                  English-speaking chauffeurs born in Nuwara Eliya who know every hidden tea trail,
                  waterfall viewpoint, and strawberry farm.
                </p>
              </div>
            </div>

            <div className="bg-[#1b4332] p-6 rounded-2xl border border-[#2c694e]/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#012d1d] flex items-center justify-center text-[#aeeecb] mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">Safety-Inspected Fleet</h3>
                <p className="text-xs text-[#c1ecd4] leading-relaxed">
                  Clean, modern air-conditioned sedans, vans, and 4x4s tuned specifically for mountain
                  hairpin curves and misty roads.
                </p>
              </div>
            </div>

            <div className="bg-[#1b4332] p-6 rounded-2xl border border-[#2c694e]/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#012d1d] flex items-center justify-center text-[#aeeecb] mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">100% Tailored Flexibility</h3>
                <p className="text-xs text-[#c1ecd4] leading-relaxed">
                  Stop for photos whenever the clouds part or pause for fresh Ceylon tea at historic
                  colonial planters clubs without rushing.
                </p>
              </div>
            </div>

            <div className="bg-[#1b4332] p-6 rounded-2xl border border-[#2c694e]/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#012d1d] flex items-center justify-center text-[#aeeecb] mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">Fair & Direct Pricing</h3>
                <p className="text-xs text-[#c1ecd4] leading-relaxed">
                  Transparent quotes with zero hidden commissions, fuel costs included, and direct
                  support for local estate communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations Strip */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#aeeecb]/30 px-3.5 py-1 rounded-full text-[#012d1d] text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#2c694e]" />
              <span>Must-Visit Landmarks</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#012d1d]">
              Explore Little England Highlights
            </h2>
          </div>

          <button
            onClick={() => onNavigate('locations')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#2c694e] hover:text-[#012d1d] transition-colors self-start md:self-auto"
          >
            <span>View All Sights & Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredLocations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => onNavigate('locations')}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e1e3e4]"
            >
              <img
                src={loc.image}
                alt={loc.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <span className="absolute top-4 left-4 bg-[#012d1d]/85 text-[#aeeecb] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {loc.categoryLabel}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-xs text-[#c1ecd4] mb-1">{loc.distanceFromTown}</div>
                <h3 className="font-serif text-xl font-bold mb-2 leading-snug">{loc.name}</h3>
                <p className="text-xs text-[#e1e3e4] line-clamp-2">{loc.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guest Reviews & Testimonials */}
      <section className="bg-[#f8f9fa] py-16 px-4 sm:px-8 lg:px-12 border-y border-[#e1e3e4]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2c694e] block mb-2">
              Guest Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#012d1d] mb-3">
              Memories from the Highlands
            </h2>
            <div className="flex justify-center items-center space-x-1 text-sm font-semibold text-[#012d1d]">
              <div className="flex text-[#d4a373]">
                {'★★★★★'.split('').map((star, idx) => (
                  <span key={idx}>{star}</span>
                ))}
              </div>
              <span className="ml-2">4.9 / 5.0 from 300+ international guests</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-[#e1e3e4] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#aeeecb] mb-4" />
                  <p className="text-xs sm:text-sm text-[#414844] italic leading-relaxed mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-[#e1e3e4]">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#2c694e]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#012d1d]">{t.author}</h4>
                    <span className="text-[11px] text-[#414844]">{t.country} • {t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Planner Action Banner */}
      <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#012d1d] via-[#1b4332] to-[#012d1d] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#aeeecb] block mb-2">
              Ready to Explore Nuwara Eliya?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Let Us Craft Your Tailored Little England Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#c1ecd4] leading-relaxed">
              Tell us your travel dates, group size, and must-see highland destinations. Receive a
              personalized itinerary and transparent quote within hours.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry()}
            className="bg-[#aeeecb] hover:bg-white text-[#012d1d] px-8 py-4 rounded-full text-sm font-bold tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap shrink-0"
          >
            Start Trip Inquiry
          </button>
        </div>
      </section>
    </div>
  );
};
