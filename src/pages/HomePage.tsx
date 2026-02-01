import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import CafeCard from '../components/cafe/CafeCard';
import SEO from '../components/utils/SEO';
import { getNearbyCafes } from '../services/api';
import { Cafe } from '../types';
import { Loader2, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocationStore } from '../hooks/useLocationStore';

const HomePage: React.FC = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  
  // Use global location store
  const { latitude, longitude, cityName } = useLocationStore();

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true);
        // Fetch cafes based on store location (which defaults to Jakarta or user selection)
        const data = await getNearbyCafes(latitude, longitude);
        setCafes(data);
      } catch (err) {
        setError(t('common.error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
  }, [latitude, longitude, t]); // Re-fetch when location changes

  return (
    <div className="min-h-screen">
      <SEO 
        title={cityName ? `Best Cafes in ${cityName}` : undefined}
        description={t('home.heroSubtitle')}
      />
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-zinc-900 mb-2">{t('home.popularTitle')}</h2>
            <p className="text-orange-600 flex items-center gap-1 font-medium">
              <MapPin className="w-4 h-4" />
              {t('home.nearYou', 'Showing recommendations near you')} {cityName ? `(${cityName})` : ''}
            </p>
          </div>
          <a href="/search" className="hidden md:inline-flex text-brown-500 font-medium hover:text-brown-600">
            {t('common.seeAll')} &rarr;
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-brown-500" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-outline"
            >
              {t('common.tryAgain')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cafes.map((cafe) => (
              <CafeCard key={cafe.place_id} cafe={cafe} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <a href="/search" className="btn btn-outline w-full">
            {t('common.seeAll')}
          </a>
        </div>
      </section>

      <section className="bg-cream-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-brown-600 mb-4">{t('home.categoriesTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { id: 'coffee_shop', name: t('home.categories.coffee_shop'), icon: '☕' },
              { id: 'family_restaurant', name: t('home.categories.family_restaurant'), icon: '🍽️' },
              { id: 'indonesian', name: t('home.categories.indonesian'), icon: '🥘' },
              { id: 'western', name: t('home.categories.western'), icon: '🍔' },
            ].map((cat) => (
              <a 
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="font-bold text-zinc-800 group-hover:text-brown-500">{cat.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
