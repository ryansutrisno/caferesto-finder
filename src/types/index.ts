export enum CafeCategory {
  COFFEE_SHOP = 'coffee_shop',
  FAMILY_RESTAURANT = 'family_restaurant',
  FAST_FOOD = 'fast_food',
  INDONESIAN = 'indonesian',
  WESTERN = 'western',
  ASIAN = 'asian',
  OPEN_24H = 'open_24h'
}

export enum PriceLevel {
  FREE = 0,
  INEXPENSIVE = 1,
  MODERATE = 2,
  EXPENSIVE = 3,
  VERY_EXPENSIVE = 4
}

export interface TimePeriod {
  open: {
    day: number; // 0-6
    time: string; // HHMM
  };
  close?: {
    day: number;
    time: string;
  };
}

export interface OpeningHours {
  open_now: boolean;
  periods: TimePeriod[];
  weekday_text: string[];
}

export interface Photo {
  reference: string;
  width: number;
  height: number;
  url?: string;
}

export interface Cafe {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  address: string;
  category: CafeCategory[];
  photos: Photo[];
  opening_hours?: OpeningHours;
  price_level: PriceLevel;
  location: {
    lat: number;
    lng: number;
  };
  phone_number?: string;
  website?: string;
  is_open_now?: boolean;
}

export interface Review {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  profile_photo_url?: string;
}

export interface SearchFilters {
  category?: CafeCategory[];
  priceRange?: [number, number];
  rating?: number;
  openNow?: boolean;
  sortBy?: 'rating' | 'review_count' | 'distance' | 'price';
}

export interface LocalStorageData {
  recentSearches: string[];
  favoriteCafes: string[]; // array of place_id
  lastLocation?: {
    lat: number;
    lng: number;
  };
  searchHistory: SearchHistory[];
}

export interface SearchHistory {
  query: string;
  timestamp: number;
  resultsCount: number;
}
