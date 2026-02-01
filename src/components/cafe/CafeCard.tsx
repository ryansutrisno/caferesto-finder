import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Cafe } from '../../types';
import { getPhotoUrl } from '../../services/api';
import RatingBadge from '../ui/RatingBadge';
import { useTranslation } from 'react-i18next';

interface CafeCardProps {
  cafe: Cafe;
}

const CafeCard: React.FC<CafeCardProps> = ({ cafe }) => {
  const { t } = useTranslation();
  const photoUrl = cafe.photos.length > 0 
    ? (cafe.photos[0].url || getPhotoUrl(cafe.photos[0].reference))
    : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop';

  const categoryKey = cafe.category[0]?.toLowerCase() || 'coffee_shop';
  const categoryLabel = t(`home.categories.${categoryKey}`, cafe.category[0]?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Cafe');

  return (
    <Link to={`/cafe/${cafe.place_id}`} className="group block h-full">
      <article className="card h-full flex flex-col overflow-hidden border border-brown-500/5 group-hover:border-brown-500/20">
        <div className="relative aspect-video overflow-hidden bg-zinc-100">
          <img 
            src={photoUrl} 
            alt={cafe.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <RatingBadge rating={cafe.rating} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
             <span className="text-white text-xs font-medium bg-brown-500/80 backdrop-blur-sm px-2 py-1 rounded-full">
               {categoryLabel}
             </span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-brown-500 transition-colors line-clamp-1">
            {cafe.name}
          </h3>
          
          <div className="flex items-start gap-1.5 text-zinc-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="line-clamp-2">{cafe.address || t('common.addressNotAvailable', 'Address not available')}</p>
          </div>
          
          <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{cafe.is_open_now ? t('common.openNow') : t('common.closed')}</span>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs font-bold ${i < (cafe.price_level || 1) ? 'text-brown-500' : 'text-zinc-300'}`}
                >
                  $
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CafeCard;
