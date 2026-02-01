import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import CafeCard from '../components/cafe/CafeCard';
import { getNearbyCafes } from '../services/api';
import { Cafe } from '../types';
import { useLocationStore } from '../hooks/useLocationStore';
import { useTranslation } from 'react-i18next';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);
  const { latitude, longitude } = useLocationStore();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Pass query as keyword, and use global location
        const data = await getNearbyCafes(latitude, longitude, 5000, query);
        setCafes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, latitude, longitude]); // Re-fetch when location changes

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchInput });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-brown-500 focus:ring-1 focus:ring-brown-500 shadow-sm"
          />
        </form>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-zinc-900">
          {query ? `${t('common.searchResults', 'Search results for')} "${query}"` : t('common.allCafes', 'All Cafes')}
        </h1>
        <p className="text-zinc-500">{cafes.length} {t('common.placesFound', 'places found')}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brown-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cafes.map((cafe) => (
            <CafeCard key={cafe.place_id} cafe={cafe} />
          ))}
        </div>
      )}
      
      {!loading && cafes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-zinc-300">
          <p className="text-zinc-500">{t('common.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
