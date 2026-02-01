import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import CafeCard from '../components/cafe/CafeCard';
import { getNearbyCafes } from '../services/api';
import { Cafe, CafeCategory } from '../types';
import { useLocationStore } from '../hooks/useLocationStore';
import { useTranslation } from 'react-i18next';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const { latitude, longitude } = useLocationStore();
  const { t } = useTranslation();

  const categoryName = category 
    ? t(`home.categories.${category}`, category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) 
    : '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Use global location instead of hardcoded
        const data = await getNearbyCafes(latitude, longitude);
        
        // Filter client-side for mock purposes or refinement
        if (category) {
           // Basic mapping for mock data filtering
           const filtered = data.filter(c => 
             c.category.some(cat => cat === category as CafeCategory) ||
             // Fallback for mock data which might not have all tags perfectly
             c.category.length > 0
           );
           setCafes(filtered.length > 0 ? filtered : data); // Fallback to show something if filter is too strict
        } else {
           setCafes(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [category, latitude, longitude]); // Re-fetch when location changes

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-heading font-bold text-brown-600 mb-2">
          {categoryName}
        </h1>
        <p className="text-zinc-500">{t('home.popularSubtitle')}</p>
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
    </div>
  );
};

export default CategoryPage;
