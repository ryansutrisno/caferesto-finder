import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, X, Loader2, Navigation } from 'lucide-react';
import axios from 'axios';
import { useLocationStore } from '../../hooks/useLocationStore';
import { useTranslation } from 'react-i18next';

interface LocationResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    type: string;
}

const LocationPicker: React.FC = () => {
    const { cityName, setLocation } = useLocationStore();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<LocationResult[]>([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search logic with debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length > 2) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
                    );
                    setResults(response.data);
                } catch (error) {
                    console.error('Error fetching locations:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSelectLocation = (result: LocationResult) => {
        const city = result.display_name.split(',')[0];
        setLocation(parseFloat(result.lat), parseFloat(result.lon), city);
        setIsOpen(false);
        setQuery('');
        // Optional: reload page to refresh data if needed, or rely on React state reactivity
        window.location.reload();
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        // Reverse geocoding to get city name
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const address = response.data.address;
                        const city = address.city || address.town || address.village || address.county || 'Lokasi Saya';

                        setLocation(latitude, longitude, city);
                        setIsOpen(false);
                        window.location.reload();
                    } catch (error) {
                        console.error('Error getting address:', error);
                        setLocation(latitude, longitude, 'Lokasi Saya');
                        setIsOpen(false);
                        window.location.reload();
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLoading(false);
                    alert('Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.');
                }
            );
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-zinc-600 hover:bg-brown-50 transition-colors border border-transparent hover:border-brown-200"
            >
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="max-w-[100px] truncate">{cityName}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop for Mobile */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Modal/Dropdown */}
                    <div
                        className="fixed inset-x-4 top-20 md:absolute md:inset-auto md:top-full md:right-0 md:mt-2 w-auto md:w-96 bg-white rounded-xl shadow-xl border border-zinc-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                        ref={modalRef}
                    >
                        <div className="p-4 border-b border-zinc-100">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-zinc-900">{t('common.selectLocation', 'Select Location')}</h3>
                                <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-zinc-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-brown-500 focus:ring-1 focus:ring-brown-500 text-sm outline-none"
                                    placeholder={t('common.searchCity', 'Search city...')}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                                {query && (
                                    <button
                                        onClick={() => setQuery('')}
                                        className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="max-h-64 overflow-y-auto">
                            {!query && (
                                <button
                                    onClick={handleGetCurrentLocation}
                                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 text-left transition-colors border-b border-zinc-50"
                                >
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                        {loading && !results.length ? (
                                            <Loader2 className="w-4 h-4 text-orange-600 animate-spin" />
                                        ) : (
                                            <Navigation className="w-4 h-4 text-orange-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-zinc-900 text-sm">{t('common.useCurrentLocation', 'Use my current location')}</p>
                                        <p className="text-xs text-zinc-500">{t('common.nearYou', 'Nearby')}</p>
                                    </div>
                                </button>
                            )}

                            {loading && query && (
                                <div className="p-4 text-center text-zinc-500 text-sm">
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                                    {t('common.searching', 'Searching...')}
                                </div>
                            )}

                            {results.map((result) => (
                                <button
                                    key={result.place_id}
                                    onClick={() => handleSelectLocation(result)}
                                    className="w-full px-4 py-3 flex items-start gap-3 hover:bg-zinc-50 text-left transition-colors border-b border-zinc-50 last:border-none"
                                >
                                    <MapPin className="w-4 h-4 text-zinc-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-zinc-900 text-sm line-clamp-1">{result.display_name.split(',')[0]}</p>
                                        <p className="text-xs text-zinc-500 line-clamp-1">{result.display_name}</p>
                                    </div>
                                </button>
                            ))}

                            {query && !loading && results.length === 0 && (
                                <div className="p-4 text-center text-zinc-500 text-sm">
                                    {t('common.noResults', 'No location found')}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LocationPicker;
