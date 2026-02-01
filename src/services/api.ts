import axios from 'axios';
import { Cafe, CafeCategory, PriceLevel, Photo, OpeningHours } from '../types';

// Use Overpass API for "Nearby" search (more powerful for amenity=cafe)
const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';
// Use Nominatim for Search/Geocoding
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org';

// Mock Data for fallback and "featured" list
const MOCK_CAFES: Cafe[] = [
  {
    place_id: 'mock-1',
    name: 'Kopi Senja Utama',
    rating: 4.8,
    user_ratings_total: 1250,
    address: 'Jl. Sudirman No. 45, Jakarta Selatan',
    category: [CafeCategory.COFFEE_SHOP, CafeCategory.INDONESIAN],
    photos: [
      {
        reference: 'mock-photo-1',
        width: 1080,
        height: 720,
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    opening_hours: {
      open_now: true,
      periods: [],
      weekday_text: ['Senin: 07:00 - 22:00', 'Selasa: 07:00 - 22:00']
    },
    price_level: PriceLevel.MODERATE,
    location: {
      lat: -6.2088,
      lng: 106.8456
    },
    is_open_now: true,
    phone_number: '021-555-0123'
  }
];

// Helper to generate deterministic "fake" data based on OSM ID
// This simulates the "Local Review System" for the MVP
const generateMockCafeData = (id: string | number) => {
  const idStr = id.toString();
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = ((hash << 5) - hash) + idStr.charCodeAt(i);
    hash |= 0;
  }
  
  const absHash = Math.abs(hash);
  
  // Deterministic Rating (3.5 - 5.0)
  const rating = 3.5 + (absHash % 15) / 10;
  
  // Deterministic Review Count (10 - 500)
  const user_ratings_total = 10 + (absHash % 490);
  
  // Deterministic Price Level
  const price_level = (absHash % 4);

  // Deterministic Photo
  const photoUrls = [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop'
  ];
  
  const photoUrl = photoUrls[absHash % photoUrls.length];

  return {
    rating: Number(rating.toFixed(1)),
    user_ratings_total,
    price_level,
    photoUrl
  };
};

export const getNearbyCafes = async (
  lat: number,
  lng: number,
  radius: number = 5000,
  keyword?: string
): Promise<Cafe[]> => {
  try {
    // If keyword is present, use Nominatim Search (better for text search)
    if (keyword) {
      const response = await axios.get(`${NOMINATIM_API_URL}/search`, {
        params: {
          q: `${keyword}`, // e.g. "cafe in Jakarta"
          format: 'json',
          addressdetails: 1,
          limit: 20,
          viewbox: `${lng-0.5},${lat-0.5},${lng+0.5},${lat+0.5}`, // rough bounding box hint (approx 50km)
          bounded: 1, // STRICTLY bound to the viewbox
          countrycodes: 'id' // Limit to Indonesia for now to avoid global matches like Bosnia
        }
      });

      return response.data.map((item: any) => {
        // Construct a stable OSM ID (e.g. N123, W456, R789)
        // This is required for the /lookup endpoint to work reliably
        const osmType = item.osm_type ? item.osm_type[0].toUpperCase() : 'N';
        const stableId = `${osmType}${item.osm_id}`;
        
        const mockData = generateMockCafeData(item.place_id); // Keep using place_id for visual consistency if needed, or switch to stableId
        
        return {
          place_id: stableId, // Use the stable OSM ID as our app's ID
          name: item.name || item.display_name.split(',')[0],
          rating: mockData.rating,
          user_ratings_total: mockData.user_ratings_total,
          address: item.display_name, // Nominatim returns full address
          category: [CafeCategory.COFFEE_SHOP], // Default
          photos: [{
            reference: 'osm-photo',
            width: 800,
            height: 600,
            url: mockData.photoUrl
          }],
          opening_hours: { open_now: true, periods: [], weekday_text: [] }, // OSM doesn't always have this
          price_level: mockData.price_level,
          location: {
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon)
          },
          is_open_now: true
        };
      });
    }

    // Default: Use Overpass API to find cafes near location
    // Query: node["amenity"="cafe"](around:radius,lat,lng);
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="cafe"](around:${radius},${lat},${lng});
        way["amenity"="cafe"](around:${radius},${lat},${lng});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await axios.post(OVERPASS_API_URL, query, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const elements = response.data.elements.filter((el: any) => el.tags && el.tags.name);

    // Filter duplicates by name and map to Cafe object
    const uniqueCafes = new Map();
    
    elements.forEach((el: any) => {
      // Use name as key to filter duplicates
      // Also can combine with rough coordinates if we want to allow same name in different locations,
      // but for "Nearby" usually same name close by means duplicate data.
      const nameKey = el.tags.name.toLowerCase().trim();
      
      if (!uniqueCafes.has(nameKey)) {
        // Construct stable OSM ID
        const osmType = el.type ? el.type[0].toUpperCase() : 'N';
        const stableId = `${osmType}${el.id}`;

        const mockData = generateMockCafeData(el.id);
        
        // Determine category from tags if possible
        const categories = [CafeCategory.COFFEE_SHOP];
        if (el.tags.cuisine === 'indonesian') categories.push(CafeCategory.INDONESIAN);
        if (el.tags.cuisine === 'western') categories.push(CafeCategory.WESTERN);
        
        uniqueCafes.set(nameKey, {
          place_id: stableId, // Use stable ID
          name: el.tags.name,
          rating: mockData.rating,
          user_ratings_total: mockData.user_ratings_total,
          address: el.tags['addr:street'] 
            ? `${el.tags['addr:street']} ${el.tags['addr:housenumber'] || ''}` 
            : '',
          category: categories,
          photos: [{
            reference: 'osm-photo',
            width: 800,
            height: 600,
            url: mockData.photoUrl
          }],
          opening_hours: { 
            open_now: true, 
            periods: [], 
            weekday_text: el.tags.opening_hours ? [el.tags.opening_hours] : [] 
          },
          price_level: mockData.price_level,
          location: {
            lat: el.lat || (el.center && el.center.lat), // Handle ways/nodes
            lng: el.lon || (el.center && el.center.lon)
          },
          is_open_now: true,
          website: el.tags.website,
          phone_number: el.tags.phone
        });
      }
    });

    return Array.from(uniqueCafes.values());

  } catch (error) {
    console.error('Error fetching cafes from OSM:', error);
    return MOCK_CAFES;
  }
};

export const getCafeDetails = async (placeId: string): Promise<Cafe | null> => {
  // Check if it's a mock ID
  if (placeId.startsWith('mock-')) {
    return MOCK_CAFES.find(c => c.place_id === placeId) || null;
  }

  try {
    // Use Nominatim Lookup for details
    // Note: Nominatim ID needs prefix (N for node, W for way, R for relation). 
    // Our search results usually return just the number for ID, but let's assume Node for simplicity or handle it.
    // Actually, Overpass results are mostly Nodes for cafes.
    // Let's try to lookup as Node first.
    
    const response = await axios.get(`${NOMINATIM_API_URL}/lookup`, {
      params: {
        osm_ids: placeId, // Now placeId IS the OSM ID (e.g. W123, N456)
        format: 'json',
        addressdetails: 1,
        extratags: 1
      }
    });

    if (response.data && response.data.length > 0) {
      const item = response.data[0];
      const mockData = generateMockCafeData(placeId);
      
      return {
        place_id: placeId,
        name: item.name || item.display_name.split(',')[0],
        rating: mockData.rating,
        user_ratings_total: mockData.user_ratings_total,
        address: item.display_name,
        category: [CafeCategory.COFFEE_SHOP],
        photos: [{
          reference: 'osm-photo',
          width: 800,
          height: 600,
          url: mockData.photoUrl
        }],
        opening_hours: { 
          open_now: true, 
          periods: [], 
          weekday_text: item.extratags?.opening_hours ? [item.extratags.opening_hours] : [] 
        },
        price_level: mockData.price_level,
        location: {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon)
        },
        is_open_now: true,
        website: item.extratags?.website,
        phone_number: item.extratags?.phone
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching cafe details:', error);
    return null;
  }
};

export const getPhotoUrl = (reference: string, maxWidth: number = 400): string => {
  // If it's a URL already (from our mock data), return it
  if (reference === 'osm-photo' || reference.startsWith('http')) {
    // We can't easily access the specific URL here without the ID, 
    // so we might need to pass the URL as reference or handle it differently.
    // In our generateMockCafeData, we set the photo object's url property.
    // The component usually checks `photo.url` first.
    return ''; 
  }
  return '';
};
