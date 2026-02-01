import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  latitude: number;
  longitude: number;
  cityName: string;
  setLocation: (lat: number, lng: number, city: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      latitude: -6.2088, // Default Jakarta
      longitude: 106.8456,
      cityName: 'Jakarta',
      setLocation: (lat, lng, city) => set({ latitude: lat, longitude: lng, cityName: city }),
    }),
    {
      name: 'user-location-storage',
    }
  )
);
