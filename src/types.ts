export type TabType = 'home' | 'tours' | 'transport' | 'locations' | 'gallery' | 'inquiry';

export type TourCategory = 'all' | 'city' | 'drop' | 'hiking' | 'tea';

export interface TourItem {
  id: string;
  title: string;
  category: 'city' | 'drop' | 'hiking' | 'tea';
  subtitle: string;
  duration: string;
  basePriceUSD: number;
  featuredImage: string;
  images: string[];
  rating: number;
  reviewCount: number;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    time: string;
    title: string;
    description: string;
  }[];
  badge?: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  type: string;
  capacity: string;
  luggage: string;
  image: string;
  ratePerDayUSD: number;
  ratePerKmUSD: number;
  features: string[];
  popularFor: string;
}

export interface ScenicRoute {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  highlights: string[];
  estimatedCostUSD: {
    sedan: number;
    van: number;
    suv: number;
    tuktuk?: number;
  };
}

export interface LocationItem {
  id: string;
  name: string;
  category: 'tea' | 'waterfall' | 'nature' | 'heritage' | 'lake';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  gallery: string[];
  elevation: string;
  distanceFromTown: string;
  entryFee: string;
  bestTimeToVisit: string;
  tips: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'nature' | 'tea' | 'heritage' | 'wildlife' | 'culture';
  location: string;
  image: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  caption: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  adultsCount: number;
  childrenCount: number;
  tourType: string;
  selectedTourId?: string;
  transportRequired: boolean;
  vehicleType: string;
  specialRequests: string;
}
