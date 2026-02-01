import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Phone, Globe, Navigation, Share2, ArrowLeft, Loader2 } from 'lucide-react';
import { getCafeDetails, getPhotoUrl } from '../services/api';
import { Cafe } from '../types';
import RatingBadge from '../components/ui/RatingBadge';
import LeafletMap from '../components/ui/LeafletMap';
import { useTranslation } from 'react-i18next';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDetail = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getCafeDetails(id);
          setCafe(data);
          if (data?.photos.length > 0) {
            setActivePhoto(data.photos[0].url || getPhotoUrl(data.photos[0].reference, 1200));
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDetail();
  }, [id]);

  const handleShare = async () => {
    if (!cafe) return;

    if (navigator.share && navigator.canShare && navigator.canShare({ url: window.location.href })) {
      try {
        await navigator.share({
          title: cafe.name,
          text: `Check out ${cafe.name} on CafeFinder!`,
          url: window.location.href,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          // Fallback if sharing fails unexpectedly
          navigator.clipboard.writeText(window.location.href);
          alert(t('common.linkCopied', 'Link copied to clipboard!'));
        }
      }
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      alert(t('common.linkCopied', 'Link copied to clipboard!'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brown-500" />
      </div>
    );
  }

  if (!cafe) {
    return <div className="text-center py-20">Cafe tidak ditemukan</div>;
  }

  return (
    <div className="bg-cream-50 min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative h-auto min-h-[50vh] md:h-[50vh] bg-zinc-900 flex flex-col justify-end">
        <img 
          src={activePhoto || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'} 
          alt={cafe.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4 z-20">
          <a href="/" className="btn bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-none rounded-full px-4">
            <ArrowLeft className="w-5 h-5 mr-2" /> {t('common.back')}
          </a>
        </div>

        <div className="relative z-10 p-4 md:p-8 container mx-auto mt-20 md:mt-0 pb-12 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-4">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  {cafe.category[0]?.replace('_', ' ') || 'CAFE'}
                </span>
                {cafe.is_open_now ? (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">{t('common.bukaSekarang')}</span>
                ) : (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">{t('common.tutup')}</span>
                )}
              </div>
              <h1 className="text-2xl md:text-5xl font-heading font-bold text-white mb-2 leading-tight">{cafe.name}</h1>
              <div className="flex items-start text-zinc-300 text-sm md:text-base mb-4 md:mb-0">
                <MapPin className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2 md:line-clamp-none">{cafe.address || t('common.addressNotAvailable', 'Address not available')}</span>
              </div>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto pb-1">
              <button className="flex-1 md:flex-none btn btn-primary justify-center px-6" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${cafe.location.lat},${cafe.location.lng}`, '_blank')}>
                <Navigation className="w-4 h-4 mr-2" /> {t('common.directions')}
              </button>
              <button className="flex-1 md:flex-none btn bg-white text-zinc-900 hover:bg-zinc-100 justify-center px-6" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" /> {t('common.share')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Thumbs */}
            {cafe.photos.length > 1 && (
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg mb-4">{t('common.gallery')}</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {cafe.photos.map((photo, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActivePhoto(photo.url || getPhotoUrl(photo.reference, 1200))}
                      className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-all"
                    >
                      <img 
                        src={photo.url || getPhotoUrl(photo.reference, 200)} 
                        alt={`Gallery ${idx}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl font-heading">{t('detail.aboutTitle', { name: cafe.name })}</h3>
                <RatingBadge rating={cafe.rating} showCount count={cafe.user_ratings_total} className="scale-110" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brown-500 mt-1" />
                    <div>
                      <p className="font-bold text-zinc-900">{t('common.hours')}</p>
                      <ul className="text-sm text-zinc-600 mt-1 space-y-1">
                        {cafe.opening_hours?.weekday_text?.map((text, i) => (
                          <li key={i} className={i === new Date().getDay() - 1 ? "font-bold text-orange-600" : ""}>{text}</li>
                        )) || <li className="text-zinc-400">{t('common.noOperatingHours')}</li>}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brown-500" />
                    <div>
                      <p className="font-bold text-zinc-900">{t('common.phone')}</p>
                      <p className="text-sm text-zinc-600">{cafe.phone_number || '-'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-brown-500" />
                    <div>
                      <p className="font-bold text-zinc-900">{t('common.website')}</p>
                      <a href={cafe.website} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate block max-w-[200px]">
                        {cafe.website || '-'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="font-bold text-brown-500 w-5 text-center">$</div>
                    <div>
                      <p className="font-bold text-zinc-900">{t('common.priceRange')}</p>
                      <div className="flex text-sm mt-1 gap-0.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <span 
                            key={i} 
                            className={`font-bold ${i < (cafe.price_level || 1) ? 'text-brown-500' : 'text-zinc-300'}`}
                          >
                            $
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews (Placeholder for now as API might not return many without specific fields) */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl font-heading mb-6">{t('common.reviews')}</h3>
              <div className="text-center py-8 text-zinc-500">
                <p>{t('common.seeReviews', { count: cafe.user_ratings_total })}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline mt-4"
                >
                  {t('common.openInMaps')}
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Map */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">{t('common.location')}</h3>
              <div className="aspect-square bg-zinc-100 rounded-lg overflow-hidden mb-4 relative z-0">
                 <LeafletMap 
                    center={[cafe.location.lat, cafe.location.lng]} 
                    markers={[{ lat: cafe.location.lat, lng: cafe.location.lng, title: cafe.name }]} 
                 />
              </div>
              <p className="text-sm text-zinc-600 mb-4">{cafe.address || t('common.addressNotAvailable', 'Address not available')}</p>
              <button className="btn btn-primary w-full" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${cafe.location.lat},${cafe.location.lng}`, '_blank')}>
                {t('common.directions')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
