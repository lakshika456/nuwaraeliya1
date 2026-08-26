import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/mockData';
import { GalleryPhoto } from '../types';
import { Camera, MapPin, Maximize2, X, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'tea', label: 'Tea Terraces' },
    { id: 'nature', label: 'Waterfalls & Peaks' },
    { id: 'heritage', label: 'Colonial Heritage' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#aeeecb]/30 px-3.5 py-1 rounded-full text-[#012d1d] text-xs font-semibold uppercase tracking-wider mb-3">
          <Camera className="w-3.5 h-3.5 text-[#2c694e]" />
          <span>Highland Visual Chronicle</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#012d1d] mb-4">
          Capturing the Spirit of Little England
        </h2>
        <p className="text-base sm:text-lg text-[#414844] leading-relaxed">
          Glimpses of misty mountain passes, emerald tea plantations at dawn, tumbling waterfalls,
          and charming Victorian landmarks.
        </p>
      </div>

      {/* Categories Tabs */}
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

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e1e3e4]"
          >
            <img
              src={photo.image}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Hover Expand Icon */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#012d1d] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-75">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Bottom Caption & Location */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform">
              <div className="flex items-center space-x-1 text-xs text-[#aeeecb] mb-1 font-medium">
                <MapPin className="w-3 h-3" />
                <span>{photo.location}</span>
              </div>
              <h3 className="font-serif text-lg font-bold leading-tight mb-1">{photo.title}</h3>
              <p className="text-xs text-[#e1e3e4] line-clamp-2">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#012d1d] rounded-2xl overflow-hidden shadow-2xl border border-[#2c694e]/40 flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High Res Image */}
            <div className="w-full md:w-2/3 h-80 md:h-[520px] bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Details Panel */}
            <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between text-white bg-[#012d1d]">
              <div>
                <div className="flex items-center space-x-1.5 text-xs text-[#aeeecb] uppercase tracking-wider font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePhoto.location}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">{activePhoto.title}</h3>
                <p className="text-xs sm:text-sm text-[#c1ecd4] leading-relaxed mb-6">
                  {activePhoto.caption}
                </p>

                <div className="bg-[#1b4332] p-3.5 rounded-xl border border-[#2c694e] text-xs text-[#aeeecb]">
                  <span className="font-bold block text-white mb-1">📸 Photography Note</span>
                  For capturing similar soft golden hues and mist layers, shoot between 06:30 AM – 08:30 AM with polarizing filter.
                </div>
              </div>

              <div className="pt-6 border-t border-[#2c694e]/50 mt-6">
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-full bg-[#2c694e] hover:bg-[#aeeecb] hover:text-[#012d1d] text-white py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
